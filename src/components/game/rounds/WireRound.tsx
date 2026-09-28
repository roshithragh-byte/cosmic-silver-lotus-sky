import { useRef, useState } from "react";
import { sfxPlay } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COLOR: Record<string, string> = {
  bone: "bg-look-bone",
  rust: "bg-look-rust",
  sage: "bg-look-sage",
  slate: "bg-look-slate",
};

export function WireRound({
  onSettle,
}: {
  onSettle: (score: number, leak: number, headline: string) => void;
}) {
  const wire = useGame((s) => s.runtime.wire);
  const setRuntime = useGame((s) => s.setRuntime);
  const start = useRef<number | null>(null);
  const [holding, setHolding] = useState(false);
  if (!wire) return null;

  const pairOk = Object.keys(wire.connected).length === wire.left.length;

  const tapLeft = (c: string) => {
    if (wire.swipePhase) return;
    sfxPlay.tap();
    setRuntime({ wire: { ...wire, selectedLeft: c } });
  };
  const tapRight = (c: string) => {
    if (!wire.selectedLeft || wire.swipePhase) return;
    sfxPlay.tock();
    const connected = { ...wire.connected, [wire.selectedLeft]: c };
    const done = Object.keys(connected).length === wire.left.length;
    setRuntime({
      wire: { ...wire, connected, selectedLeft: null, swipePhase: done },
    });
  };

  const swipeStart = () => {
    start.current = performance.now();
    setHolding(true);
  };
  const swipeEnd = () => {
    if (start.current == null) return;
    const dt = performance.now() - start.current;
    setHolding(false);
    let swipeResult: "ok" | "slow" | "fast" = "ok";
    if (dt < 280) swipeResult = "fast";
    else if (dt > 900) swipeResult = "slow";
    sfxPlay[swipeResult === "ok" ? "success" : "fail"]();
    const next = { ...wire, swipeResult, finished: true };
    setRuntime({ wire: next });
  };

  const spot = (yes: boolean) => {
    const correct = yes;
    const wires = pairOk ? 40 : 10;
    const swipe = wire.swipeResult === "ok" ? 40 : 10;
    const cam = correct ? 20 : 0;
    onSettle(
      wires + swipe + cam,
      correct ? 0.16 : 0.05,
      correct
        ? `The cam caught ${wire.glitchGuest}.`
        : "The cables are done. The Echo is still on the roof.",
    );
  };

  if (wire.finished && wire.swipeResult) {
    return (
      <div className="space-y-4">
        <p className="font-display text-2xl">Security cam</p>
        <p className="text-sm text-muted">
          One guest mismatched a pair on purpose. Was it {wire.glitchGuest}?
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => spot(true)}>That's the glitch</Button>
          <Button variant="secondary" onClick={() => spot(false)}>
            Not them
          </Button>
        </div>
      </div>
    );
  }

  if (wire.swipePhase) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted">Hold the keycard. Release in the middle — not a slap, not a linger.</p>
        <button
          type="button"
          onPointerDown={swipeStart}
          onPointerUp={swipeEnd}
          onPointerCancel={swipeEnd}
          className={cn(
            "flex h-28 w-full items-center justify-center rounded-[20px] bg-elevated text-sm shadow-[var(--shadow-border)]",
            holding && "bg-accent text-accent-fg",
          )}
        >
          {holding ? "Release…" : "Hold to swipe"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">Match left to right. Color to color. Then the keycard.</p>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          {wire.left.map((c) => (
            <button
              key={`l-${c}`}
              type="button"
              onClick={() => tapLeft(c)}
              className={cn(
                "flex h-12 w-full items-center gap-2 rounded-[12px] bg-subtle px-3",
                wire.selectedLeft === c && "ring-1 ring-accent",
                wire.connected[c] && "opacity-40",
              )}
            >
              <span className={cn("size-4 rounded-full", COLOR[c])} />
              <span className="text-sm capitalize">{c}</span>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {wire.right.map((c) => (
            <button
              key={`r-${c}`}
              type="button"
              onClick={() => tapRight(c)}
              className="flex h-12 w-full items-center justify-end gap-2 rounded-[12px] bg-subtle px-3"
            >
              <span className="text-sm capitalize">{c}</span>
              <span className={cn("size-4 rounded-full", COLOR[c])} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
