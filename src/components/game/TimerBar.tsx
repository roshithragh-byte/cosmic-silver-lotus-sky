import { useEffect, useRef, useState } from "react";
import { sfxPlay } from "@/lib/game/audio";
import { cn } from "@/lib/utils";

export function TimerBar({
  seconds,
  running,
  onDone,
}: {
  seconds: number;
  running: boolean;
  onDone: () => void;
}) {
  const [left, setLeft] = useState(seconds);
  const done = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setLeft(seconds);
    done.current = false;
  }, [seconds, running]);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const remain = Math.max(0, seconds - elapsed);
      setLeft(remain);
      if (remain <= 0) {
        if (!done.current) {
          done.current = true;
          sfxPlay.fail();
          onDoneRef.current();
        }
        return;
      }
      if (remain < 3 && Math.floor(remain * 4) !== Math.floor((remain + 0.016) * 4)) {
        sfxPlay.tick();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, seconds]);

  const pct = Math.max(0, Math.min(1, left / seconds));
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-subtle">
        <div
          className={cn(
            "h-full rounded-full bg-accent",
            left < 3 && "bg-echo",
          )}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <span className="w-8 text-right font-mono text-xs tabular-nums text-muted">
        {Math.ceil(left)}
      </span>
    </div>
  );
}
