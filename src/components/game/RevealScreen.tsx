import { PERSONAS } from "@/lib/game/content";
import { echoIdOf } from "@/lib/game/engine";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { GuestAvatar } from "./GuestAvatar";
import { Shell } from "./Shell";

export function RevealScreen() {
  const night = useGame((s) => s.night);
  const players = useGame((s) => s.players);
  const lastNotes = useGame((s) => s.lastNotes);
  const goTitle = useGame((s) => s.goTitle);
  const goArchive = useGame((s) => s.goArchive);
  const startNight = useGame((s) => s.startNight);
  const practiceType = useGame((s) => s.practiceType);
  if (!night) return null;

  const echo = players.find((p) => p.id === echoIdOf(players));
  const accused = players.find((p) => p.id === night.accusedId);
  const win = night.winner === "guests";

  if (practiceType) {
    return (
      <Shell
        footer={
          <Button size="lg" className="w-full" onClick={goTitle}>
            Back
          </Button>
        }
      >
        <div className="space-y-3 pt-8">
          <h2 className="font-display text-4xl">Hands warm.</h2>
          <p className="text-sm text-muted">{lastNotes[0] ?? "The Muse filed that away."}</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell
      footer={
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={goArchive}>
            Muse notes
          </Button>
          <Button onClick={() => startNight()}>Another night</Button>
        </div>
      }
    >
      <div className="space-y-6 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">
            {win ? "Caught" : "Walked"}
          </p>
          <h2 className="mt-1 font-display text-5xl">{win ? "The list holds" : "They left with the lantern"}</h2>
        </div>

        {echo ? (
          <div className="flex items-center gap-4 rounded-[20px] bg-elevated p-4 shadow-[var(--shadow-border)]">
            <GuestAvatar player={echo} size="lg" />
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-echo">The Echo</div>
              <div className="font-display text-3xl">{echo.name}</div>
              <p className="text-sm text-muted">
                {echo.personaId ? PERSONAS[echo.personaId].bio : "You were never on the paper."}
              </p>
              {accused && accused.id !== echo.id ? (
                <p className="mt-2 text-sm text-muted">The finger landed on {accused.name}.</p>
              ) : null}
            </div>
          </div>
        ) : null}

        <ul className="space-y-2">
          {[...players].sort((a, b) => b.score - a.score).map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <GuestAvatar player={p} size="sm" />
              <span className="flex-1 truncate text-sm">{p.name}</span>
              <span className="font-mono text-sm tabular-nums text-muted">{p.score}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-[20px] bg-elevated p-4 shadow-[var(--shadow-border)]">
          <p className="text-xs font-medium text-muted">Muse, after hours</p>
          <ul className="mt-2 space-y-2 text-sm">
            {lastNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>

        <button type="button" className="text-sm text-muted" onClick={goTitle}>
          Close the roof
        </button>
      </div>
    </Shell>
  );
}
