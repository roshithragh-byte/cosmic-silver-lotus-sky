import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { GuestAvatar } from "./GuestAvatar";
import { Shell } from "./Shell";
import { cn } from "@/lib/utils";

export function AccuseScreen() {
  const players = useGame((s) => s.players);
  const night = useGame((s) => s.night);
  const accuse = useGame((s) => s.accuse);
  const confirmAccuse = useGame((s) => s.confirmAccuse);
  const youId = useGame((s) => s.youId);
  if (!night) return null;

  return (
    <Shell
      footer={
        <Button size="lg" className="w-full" disabled={!night.accusedId} onClick={confirmAccuse}>
          Point
        </Button>
      }
    >
      <div className="space-y-5 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">Last call</p>
          <h2 className="mt-1 font-display text-4xl">Who was not invited?</h2>
          <p className="mt-2 text-sm text-muted">One finger. No take-backs. Ghosts still count — nobody sat out.</p>
        </div>
        <ul className="space-y-2">
          {players.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => accuse(p.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[16px] bg-elevated p-3 text-left shadow-[var(--shadow-border)]",
                  night.accusedId === p.id && "ring-1 ring-accent",
                )}
              >
                <GuestAvatar player={p} selected={night.accusedId === p.id} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">
                    {p.name}
                    {p.id === youId ? " · you" : ""}
                  </div>
                  <div className="font-mono text-xs tabular-nums text-muted">
                    {p.score} pts · sus {Math.round(p.suspicion * 100)}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
