import { MUSE_STUDIES, ROUND_META } from "@/lib/game/content";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shell } from "./Shell";
import type { RoundType } from "@/lib/game/types";

export function ArchiveScreen() {
  const memory = useGame((s) => s.memory);
  const goTitle = useGame((s) => s.goTitle);

  return (
    <Shell
      footer={
        <Button variant="secondary" className="w-full" onClick={goTitle}>
          Back to the roof
        </Button>
      }
    >
      <div className="space-y-6 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">The Muse</p>
          <h2 className="mt-1 font-display text-4xl">What I've learned</h2>
          <p className="mt-2 text-sm text-muted">
            I keep a private notebook. Every night I rewrite the mix. I never stop studying the table.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Stat label="Nights" value={String(memory.nightsPlayed)} />
          <Stat label="Guest wins" value={String(memory.winsAsGuest)} />
          <Stat label="Echo wins" value={String(memory.winsAsEcho)} />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted">Round affinity</h3>
          {(Object.keys(ROUND_META) as RoundType[]).map((t) => {
            const a = memory.roundAffinity[t];
            return (
              <div key={t} className="flex items-center gap-3">
                <span className="w-16 text-sm">{ROUND_META[t].title}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-subtle">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${Math.min(100, a.avgScore)}%` }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-xs tabular-nums text-muted">
                  {a.played ? Math.round(a.avgScore) : "—"}
                </span>
              </div>
            );
          })}
        </div>

        {memory.lastNotes.length ? (
          <div className="rounded-[20px] bg-elevated p-4 shadow-[var(--shadow-border)]">
            <p className="text-xs font-medium text-muted">Last notes</p>
            <ul className="mt-2 space-y-2 text-sm text-fg">
              {memory.lastNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted">Studies</h3>
          {MUSE_STUDIES.map((s) => {
            const open = memory.unlocked.includes(s.id);
            return (
              <article
                key={s.id}
                className="rounded-[16px] bg-elevated p-4 shadow-[var(--shadow-border)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-xl">{s.title}</h4>
                  <Badge tone={open ? "ok" : "mute"}>{open ? "Read" : "Sealed"}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted">{open ? s.line : "Play another night."}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] bg-elevated p-3 text-center shadow-[var(--shadow-border)]">
      <div className="font-display text-2xl tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-subtle-fg">{label}</div>
    </div>
  );
}
