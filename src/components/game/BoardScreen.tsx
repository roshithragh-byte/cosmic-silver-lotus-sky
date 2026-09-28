import { ROUND_META } from "@/lib/game/content";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GuestAvatar } from "./GuestAvatar";
import { Shell } from "./Shell";
import { cn } from "@/lib/utils";

export function BoardScreen() {
  const night = useGame((s) => s.night);
  const players = useGame((s) => s.players);
  const beginRound = useGame((s) => s.beginRound);
  const softLine = useGame((s) => s.softLine);
  if (!night) return null;
  const plan = night.rounds[night.roundIndex];
  if (!plan) return null;

  return (
    <Shell
      wide
      footer={
        <Button size="lg" className="w-full" onClick={beginRound}>
          Start {plan.title}
        </Button>
      }
    >
      <div className="space-y-6 pt-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">
            Round {night.roundIndex + 1} of {night.rounds.length}
          </p>
          <h2 className="mt-1 font-display text-4xl">{plan.title}</h2>
          <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
          {plan.twist ? (
            <p className="mt-2 text-sm">
              <Badge>{plan.twist.label}</Badge>
              <span className="ml-2 text-muted">{plan.twist.blurb}</span>
            </p>
          ) : null}
        </div>

        <div className="relative overflow-hidden rounded-[24px] bg-elevated p-4 shadow-[var(--shadow-border)]">
          <img
            src="/images/rooftop.jpg"
            alt=""
            crossOrigin="anonymous"
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div className="relative grid grid-cols-3 gap-2">
            {night.rounds.map((r, i) => {
              const meta = ROUND_META[r.type];
              const here = i === night.roundIndex;
              const done = i < night.roundIndex;
              const guest = players[i % players.length]!;
              return (
                <div
                  key={r.id}
                  className={cn(
                    "flex min-h-24 flex-col justify-between rounded-[16px] bg-bg/80 p-3",
                    here && "ring-1 ring-accent",
                    done && "opacity-50",
                  )}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle-fg">
                    {meta.title}
                  </div>
                  <GuestAvatar player={guest} size="sm" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[20px] bg-elevated p-4 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">Soft info</p>
          <p className="mt-2 text-sm italic text-fg">{softLine}</p>
        </div>
      </div>
    </Shell>
  );
}
