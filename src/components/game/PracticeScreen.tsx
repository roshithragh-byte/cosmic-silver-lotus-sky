import { PRACTICE_ROUNDS, ROUND_META } from "@/lib/game/content";
import { unlockAudio } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Shell } from "./Shell";

export function PracticeScreen() {
  const startNight = useGame((s) => s.startNight);
  const goTitle = useGame((s) => s.goTitle);

  return (
    <Shell>
      <div className="space-y-6 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">Sandbox</p>
          <h2 className="mt-1 font-display text-4xl">One round</h2>
          <p className="mt-2 text-sm text-muted">No Echo. No night. Just the game under your hands.</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PRACTICE_ROUNDS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                unlockAudio();
                startNight({ practice: t });
              }}
              className="rounded-[20px] bg-elevated p-4 text-left shadow-[var(--shadow-border)] transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              <div className="font-display text-2xl">{ROUND_META[t].title}</div>
              <p className="mt-1 text-xs text-muted">{ROUND_META[t].blurb}</p>
            </button>
          ))}
        </div>
        <Button variant="ghost" onClick={goTitle}>
          Back
        </Button>
      </div>
    </Shell>
  );
}
