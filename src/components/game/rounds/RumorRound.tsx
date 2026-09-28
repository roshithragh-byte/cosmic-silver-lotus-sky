import { applyRumorPick, rumorScore } from "@/lib/game/engine";
import { sfxPlay } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RumorRound({
  onSettle,
}: {
  onSettle: (score: number, leak: number, headline: string) => void;
}) {
  const rumor = useGame((s) => s.runtime.rumor);
  const setRuntime = useGame((s) => s.setRuntime);
  const you = useGame((s) => s.players.find((p) => p.id === s.youId));
  if (!rumor || !you) return null;

  const pick = (i: number) => {
    if (rumor.finished) return;
    sfxPlay.tap();
    const next = applyRumorPick(rumor, i);
    setRuntime({ rumor: next });
    if (next.finished) {
      const { score, leak } = rumorScore(next, you.role === "echo");
      const headline =
        next.result === "poison"
          ? "Someone touched the poison word."
          : next.result === "hit"
            ? `${you.name} walked the rumor clean.`
            : "The rumor went cold.";
      window.setTimeout(() => onSettle(score, leak, headline), 480);
    }
  };

  const lockIn = () => {
    if (rumor.finished) return;
    const next = { ...rumor, finished: true, result: rumor.picked.length ? rumor.result : "neutral" };
    setRuntime({ rumor: next });
    const { score, leak } = rumorScore(next, you.role === "echo");
    onSettle(score, leak, "They stopped talking.");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[20px] bg-elevated p-4 text-center shadow-[var(--shadow-border)]">
        <p className="text-xs text-muted">{rumor.speakerName} says</p>
        <p className="font-display text-4xl italic">{rumor.clue}</p>
        <p className="mt-1 font-mono text-xs text-subtle-fg">for {rumor.clueCount}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {rumor.words.map((w, i) => {
          const chosen = rumor.picked.includes(i);
          const showKey = rumor.finished && (rumor.party.includes(i) || rumor.poison.includes(i));
          return (
            <button
              key={`${w}-${i}`}
              type="button"
              disabled={rumor.finished}
              onClick={() => pick(i)}
              className={cn(
                "h-14 rounded-[12px] bg-subtle text-sm font-medium shadow-[var(--shadow-border)]",
                chosen && "ring-1 ring-accent",
                showKey && rumor.party.includes(i) && "bg-ok/20",
                showKey && rumor.poison.includes(i) && "bg-echo/30",
              )}
            >
              {w}
            </button>
          );
        })}
      </div>
      <Button variant="secondary" className="w-full" onClick={lockIn} disabled={rumor.finished}>
        End guess
      </Button>
      {you.role === "echo" ? (
        <p className="text-center text-xs text-echo">You want the poison. Don't look hungry.</p>
      ) : (
        <p className="text-center text-xs text-muted">Party words score. Neutral stops you. Poison is the Echo's trap.</p>
      )}
    </div>
  );
}
