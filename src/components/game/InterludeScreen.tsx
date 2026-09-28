import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Shell } from "./Shell";

export function InterludeScreen() {
  const night = useGame((s) => s.night);
  const continueInterlude = useGame((s) => s.continueInterlude);
  if (!night) return null;
  const last = night.log[night.log.length - 1];
  const next = night.rounds[night.roundIndex];

  return (
    <Shell
      footer={
        <Button size="lg" className="w-full" onClick={continueInterlude}>
          {next ? "Back to the roof" : "Continue"}
        </Button>
      }
    >
      <div className="space-y-4 pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">Muse</p>
        <h2 className="font-display text-4xl">{last?.headline ?? "The lantern dips."}</h2>
        <p className="text-sm text-muted">
          {next
            ? `Next is ${next.title}${next.twist ? ` with ${next.twist.label}` : ""}. Nobody sits this one out.`
            : "The list is closed. Time to point."}
        </p>
        {last ? (
          <p className="font-mono text-sm tabular-nums text-muted">
            Your take · {Math.round(last.playerScore)}
          </p>
        ) : null}
      </div>
    </Shell>
  );
}
