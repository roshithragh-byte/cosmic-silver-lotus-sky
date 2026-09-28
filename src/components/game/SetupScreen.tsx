import { LOOKS } from "@/lib/game/content";
import { unlockAudio } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shell } from "./Shell";
import { cn } from "@/lib/utils";

const LOOK_BG: Record<string, string> = {
  ink: "bg-look-ink",
  bone: "bg-look-bone",
  rust: "bg-look-rust",
  sage: "bg-look-sage",
  slate: "bg-look-slate",
  wine: "bg-look-wine",
};

export function SetupScreen() {
  const mode = useGame((s) => s.mode);
  const profile = useGame((s) => s.profile);
  const setName = useGame((s) => s.setName);
  const setLook = useGame((s) => s.setLook);
  const startNight = useGame((s) => s.startNight);
  const names = useGame((s) => s.hotseatNames);
  const setHotseatName = useGame((s) => s.setHotseatName);
  const addHotseat = useGame((s) => s.addHotseat);
  const removeHotseat = useGame((s) => s.removeHotseat);
  const goTitle = useGame((s) => s.goTitle);

  return (
    <Shell
      footer={
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            unlockAudio();
            startNight();
          }}
        >
          Deal the night
        </Button>
      }
    >
      <div className="stagger-in space-y-6 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">
            {mode === "hotseat" ? "Hot seat" : "Solo with the house"}
          </p>
          <h2 className="mt-1 font-display text-4xl">The guest list</h2>
          <p className="mt-2 text-sm text-muted">
            {mode === "hotseat"
              ? "One device. Pass it when the screen says so. Don't peek."
              : "You plus five regulars. One of you is the Echo."}
          </p>
        </div>

        {mode === "solo" ? (
          <>
            <label className="block space-y-2">
              <span className="text-xs font-medium text-muted">Your name</span>
              <Input
                value={profile.name}
                maxLength={16}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </label>
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted">Look</span>
              <div className="grid grid-cols-6 gap-2">
                {LOOKS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLook(l.id)}
                    className={cn(
                      "flex h-14 flex-col items-center justify-center rounded-[12px] bg-elevated text-[10px] text-muted shadow-[var(--shadow-border)]",
                      profile.look === l.id && "ring-2 ring-accent",
                    )}
                    aria-label={l.label}
                  >
                    <span className={cn("mb-1 size-5 rounded-full", LOOK_BG[l.id])} />
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {names.map((n, i) => (
              <Input
                key={i}
                value={n}
                onChange={(e) => setHotseatName(i, e.target.value)}
                aria-label={`Player ${i + 1}`}
              />
            ))}
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={addHotseat}>
                Add seat
              </Button>
              <Button variant="ghost" className="flex-1" onClick={removeHotseat}>
                Remove
              </Button>
            </div>
          </div>
        )}

        <button type="button" className="text-sm text-muted" onClick={goTitle}>
          Back
        </button>
      </div>
    </Shell>
  );
}
