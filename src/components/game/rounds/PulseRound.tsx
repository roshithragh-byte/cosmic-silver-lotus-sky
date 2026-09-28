import { useEffect, useRef, useState } from "react";
import { scorePulse } from "@/lib/game/engine";
import { sfxPlay } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { cn } from "@/lib/utils";

export function PulseRound({
  seconds,
  onSettle,
}: {
  seconds: number;
  onSettle: (score: number, leak: number, headline: string) => void;
}) {
  const pulse = useGame((s) => s.runtime.pulse);
  const setRuntime = useGame((s) => s.setRuntime);
  const you = useGame((s) => s.players.find((p) => p.id === s.youId));
  const [left, setLeft] = useState(seconds);
  const answered = useRef(false);
  const pulseRef = useRef(pulse);
  const youRef = useRef(you);
  const settleRef = useRef(onSettle);
  pulseRef.current = pulse;
  youRef.current = you;
  settleRef.current = onSettle;

  const index = pulse?.index ?? 0;

  useEffect(() => {
    if (!pulseRef.current || pulseRef.current.finished) return;
    answered.current = false;
    setLeft(seconds);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const remain = Math.max(0, seconds - (now - start) / 1000);
      setLeft(remain);
      if (remain <= 0) {
        if (!answered.current) answer(null);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);

    function answer(n: number | null) {
      const current = pulseRef.current;
      const me = youRef.current;
      if (!current || current.finished || answered.current || !me) return;
      answered.current = true;
      const q = current.questions[current.index];
      if (!q) return;
      if (n === q.correct) sfxPlay.success();
      else sfxPlay.fail();
      const picked = current.picked.slice();
      picked[current.index] = n;
      const last = current.index >= current.questions.length - 1;
      if (last) {
        setRuntime({ pulse: { ...current, picked, finished: true, index: current.index } });
        const { score, leak } = scorePulse(picked, current.questions, me.role === "echo");
        settleRef.current(
          score,
          leak,
          score > 70 ? "The lantern liked your tempo." : "The questions got ahead of you.",
        );
      } else {
        setRuntime({ pulse: { ...current, picked, index: current.index + 1 } });
      }
    }
  }, [index, seconds, setRuntime]);

  if (!pulse || !you) return null;
  const q = pulse.questions[pulse.index];
  if (!q) return null;

  const pick = (n: number | null) => {
    if (pulse.finished || answered.current) return;
    answered.current = true;
    if (n === q.correct) sfxPlay.success();
    else sfxPlay.fail();
    const picked = pulse.picked.slice();
    picked[pulse.index] = n;
    const last = pulse.index >= pulse.questions.length - 1;
    if (last) {
      setRuntime({ pulse: { ...pulse, picked, finished: true, index: pulse.index } });
      const { score, leak } = scorePulse(picked, pulse.questions, you.role === "echo");
      onSettle(
        score,
        leak,
        score > 70 ? "The lantern liked your tempo." : "The questions got ahead of you.",
      );
    } else {
      setRuntime({ pulse: { ...pulse, picked, index: pulse.index + 1 } });
    }
  };

  const pct = left / seconds;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-subtle">
          <div className={cn("h-full bg-accent", left < 3 && "bg-echo")} style={{ width: `${pct * 100}%` }} />
        </div>
        <span className="font-mono text-xs tabular-nums text-muted">
          {pulse.index + 1}/{pulse.questions.length}
        </span>
      </div>
      <h3 className="font-display text-2xl">{q.prompt}</h3>
      <div className="grid grid-cols-1 gap-2">
        {q.answers.map((a, i) => (
          <button
            key={a}
            type="button"
            onClick={() => pick(i)}
            className="min-h-12 rounded-[14px] bg-elevated px-4 py-3 text-left text-sm shadow-[var(--shadow-border)] active:scale-[0.98]"
          >
            <span className="mr-2 font-mono text-xs text-subtle-fg">{["A", "B", "C", "D"][i]}</span>
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}
