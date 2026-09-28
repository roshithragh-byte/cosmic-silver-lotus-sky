import { useEffect, useRef, useState } from "react";
import { sfxPlay } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Finish = (r: "perfect" | "good" | "miss") => void;

export function HeatRound({
  onSettle,
}: {
  onSettle: (score: number, leak: number, headline: string) => void;
}) {
  const heat = useGame((s) => s.runtime.heat);
  const setRuntime = useGame((s) => s.setRuntime);
  const settled = useRef(false);
  if (!heat) return null;

  const finish: Finish = (result) => {
    if (heat.finished || settled.current) return;
    settled.current = true;
    const score = result === "perfect" ? 100 : result === "good" ? 64 : 18;
    setRuntime({ heat: { ...heat, finished: true, result } });
    if (result === "miss") sfxPlay.fail();
    else sfxPlay.success();
    onSettle(
      score,
      result === "miss" ? 0.12 : 0.02,
      result === "perfect"
        ? "Hands like a bartender."
        : result === "good"
          ? "Close enough to stay invited."
          : "The roof saw you flinch.",
    );
  };

  if (!heat.started) {
    return (
      <div className="space-y-4 pt-4">
        <p className="text-sm text-muted">
          {heat.kind === "lantern"
            ? "Tap when the lantern is brightest. Not early. Not late."
            : heat.kind === "sequence"
              ? "Watch the glasses. Repeat the order."
              : "Follow the ring. Tap the cup that hid it."}
        </p>
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            sfxPlay.round();
            setRuntime({ heat: { ...heat, started: true } });
          }}
        >
          I'm ready
        </Button>
      </div>
    );
  }

  if (heat.kind === "lantern") return <Lantern finish={finish} peak={Number(heat.payload.peakAt)} window={Number(heat.payload.window)} />;
  if (heat.kind === "sequence") return <Sequence finish={finish} seq={heat.payload.seq as number[]} />;
  return <Cups finish={finish} ballStart={Number(heat.payload.ball)} />;
}

function Lantern({
  finish,
  peak,
  window,
}: {
  finish: Finish;
  peak: number;
  window: number;
}) {
  const [t, setT] = useState(0);
  const fired = useRef(false);
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const u = Math.min(1, (now - start) / 2800);
      setT(u);
      if (u >= 1) {
        if (!fired.current) {
          fired.current = true;
          finishRef.current("miss");
        }
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const glow = Math.max(0, 1 - Math.abs(t - peak) / 0.28);

  return (
    <button
      type="button"
      className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-[24px] bg-elevated"
      onClick={() => {
        if (fired.current) return;
        fired.current = true;
        const dist = Math.abs(t - peak);
        finish(dist < window * 0.55 ? "perfect" : dist < window * 1.4 ? "good" : "miss");
      }}
    >
      <span
        className="size-28 rounded-full bg-accent"
        style={{ opacity: 0.15 + glow * 0.85, transform: `scale(${0.7 + glow * 0.55})` }}
      />
      <span className="absolute bottom-4 text-xs text-muted">Tap the peak</span>
    </button>
  );
}

function Sequence({ finish, seq }: { finish: Finish; seq: number[] }) {
  const [lit, setLit] = useState<number | null>(null);
  const [input, setInput] = useState<number[]>([]);
  const [listen, setListen] = useState(false);
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    let cancelled = false;
    const play = async () => {
      for (let i = 0; i < seq.length; i++) {
        if (cancelled) return;
        setLit(seq[i]!);
        sfxPlay.tock();
        await wait(320);
        setLit(null);
        await wait(140);
      }
      if (!cancelled) setListen(true);
    };
    void play();
    return () => {
      cancelled = true;
    };
  }, [seq]);

  const tap = (i: number) => {
    if (!listen) return;
    sfxPlay.tap();
    const next = [...input, i];
    setInput(next);
    const idx = next.length - 1;
    if (next[idx] !== seq[idx]) {
      finishRef.current("miss");
      return;
    }
    if (next.length === seq.length) finishRef.current("perfect");
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {[0, 1, 2, 3].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => tap(i)}
          className={cn(
            "h-24 rounded-[16px] bg-subtle shadow-[var(--shadow-border)]",
            lit === i && "bg-accent",
          )}
        />
      ))}
    </div>
  );
}

function Cups({ finish, ballStart }: { finish: Finish; ballStart: number }) {
  const [order, setOrder] = useState([0, 1, 2]);
  const [ball, setBall] = useState(ballStart);
  const [busy, setBusy] = useState(true);
  const [show, setShow] = useState(true);
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await wait(700);
      if (cancelled) return;
      setShow(false);
      const o = [0, 1, 2];
      let b = ballStart;
      for (let s = 0; s < 5; s++) {
        const a = s % 2;
        const c = a + 1;
        sfxPlay.tock();
        const tmp = o[a]!;
        o[a] = o[c]!;
        o[c] = tmp;
        if (b === a) b = c;
        else if (b === c) b = a;
        setOrder([...o]);
        setBall(b);
        await wait(280);
      }
      if (!cancelled) setBusy(false);
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [ballStart]);

  return (
    <div className="flex justify-center gap-3 pt-6">
      {order.map((cup, visual) => (
        <button
          key={cup}
          type="button"
          disabled={busy}
          onClick={() => finishRef.current(visual === ball ? "perfect" : "miss")}
          className="relative flex h-32 w-20 flex-col items-center justify-end rounded-[16px] bg-elevated shadow-[var(--shadow-border)]"
        >
          <span className="mb-3 text-xs text-muted">{visual + 1}</span>
          {show && visual === ballStart ? (
            <span className="absolute top-6 size-4 rounded-full bg-accent" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

function wait(ms: number) {
  return new Promise((r) => window.setTimeout(r, ms));
}
