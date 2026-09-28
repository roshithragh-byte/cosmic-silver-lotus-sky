import { useCallback, useState } from "react";
import { useGame } from "@/lib/game/store";
import { TimerBar } from "../TimerBar";
import { Badge } from "@/components/ui/badge";
import { RumorRound } from "./RumorRound";
import { SketchRound } from "./SketchRound";
import { PulseRound } from "./PulseRound";
import { HeatRound } from "./HeatRound";
import { TellRound } from "./TellRound";
import { WireRound } from "./WireRound";
import { Shell } from "../Shell";

export function RoundHost() {
  const night = useGame((s) => s.night);
  const finishRound = useGame((s) => s.finishRound);
  const [locked, setLocked] = useState(false);
  if (!night) return null;
  const plan = night.rounds[night.roundIndex];
  if (!plan) return null;

  const settle = useCallback(
    (score: number, leak: number, headline: string) => {
      if (locked) return;
      setLocked(true);
      finishRound(score, leak, headline);
    },
    [finishRound, locked],
  );

  const onTimeout = () => {
    settle(12, 0.08, `${plan.title} ran out of lantern.`);
  };

  const pulse = plan.type === "pulse";

  return (
    <Shell>
      <div className="space-y-4 pt-1">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">
              {plan.title}
            </p>
            <h2 className="font-display text-3xl">{plan.blurb}</h2>
          </div>
          {plan.twist ? <Badge>{plan.twist.label}</Badge> : null}
        </div>
        {!pulse ? (
          <TimerBar seconds={plan.seconds} running={!locked} onDone={onTimeout} />
        ) : null}
        {plan.type === "rumor" ? <RumorRound onSettle={settle} /> : null}
        {plan.type === "sketch" ? <SketchRound seconds={plan.seconds} onSettle={settle} /> : null}
        {plan.type === "pulse" ? <PulseRound seconds={plan.seconds} onSettle={settle} /> : null}
        {plan.type === "heat" ? <HeatRound onSettle={settle} /> : null}
        {plan.type === "tell" ? <TellRound onSettle={settle} /> : null}
        {plan.type === "wire" ? <WireRound onSettle={settle} /> : null}
      </div>
    </Shell>
  );
}
