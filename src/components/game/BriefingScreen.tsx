import { PERSONAS } from "@/lib/game/content";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GuestAvatar } from "./GuestAvatar";
import { Shell } from "./Shell";

export function BriefingScreen() {
  const night = useGame((s) => s.night);
  const players = useGame((s) => s.players);
  const goRole = useGame((s) => s.goRole);
  if (!night) return null;

  return (
    <Shell
      footer={
        <Button size="lg" className="w-full" onClick={goRole}>
          Sit down
        </Button>
      }
    >
      <div className="stagger-in space-y-6 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">The Muse</p>
          <h2 className="mt-1 font-display text-4xl italic">{night.museLine}</h2>
          <p className="mt-3 text-sm text-muted">{night.museWhy}</p>
        </div>

        <div className="space-y-2">
          {night.rounds.map((r, i) => (
            <div
              key={r.id}
              className="flex items-start justify-between gap-3 rounded-[16px] bg-elevated p-3 shadow-[var(--shadow-border)]"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-subtle-fg">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{r.title}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{r.blurb}</p>
              </div>
              {r.twist ? <Badge>{r.twist.label}</Badge> : null}
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-muted">On the roof</h3>
          <ul className="space-y-2">
            {players.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <GuestAvatar player={p} size="sm" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{p.name}</div>
                  <div className="truncate text-xs text-muted">
                    {p.personaId ? PERSONAS[p.personaId].title : "You"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  );
}
