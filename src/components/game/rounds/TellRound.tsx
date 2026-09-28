import { sfxPlay } from "@/lib/game/audio";
import { echoIdOf } from "@/lib/game/engine";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { GuestAvatar } from "../GuestAvatar";
import { cn } from "@/lib/utils";

export function TellRound({
  onSettle,
}: {
  onSettle: (score: number, leak: number, headline: string) => void;
}) {
  const tell = useGame((s) => s.runtime.tell);
  const setRuntime = useGame((s) => s.setRuntime);
  const players = useGame((s) => s.players);
  if (!tell) return null;
  const echo = echoIdOf(players);

  const pick = (id: string) => {
    sfxPlay.vote();
    setRuntime({ tell: { ...tell, accusedId: id } });
  };

  const lock = () => {
    if (!tell.accusedId || tell.finished) return;
    const statement = tell.statements.find((s) => s.speakerId === tell.accusedId);
    const hitEcho = tell.accusedId === echo;
    const hitLie = statement?.isLie ?? false;
    const score = hitEcho ? 90 : hitLie ? 55 : 20;
    const leak = hitEcho ? 0.18 : 0.04;
    setRuntime({ tell: { ...tell, finished: true } });
    onSettle(
      score,
      leak,
      hitEcho
        ? "You pointed at the uninvited one."
        : hitLie
          ? "You caught a lie. Not necessarily the Echo."
          : "That was a true thing, said by a nervous guest.",
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">Four remarks. Point at the one that does not sit right.</p>
      {tell.statements.map((s) => {
        const speaker = players.find((p) => p.id === s.speakerId);
        if (!speaker) return null;
        return (
          <button
            key={s.speakerId}
            type="button"
            onClick={() => pick(s.speakerId)}
            className={cn(
              "flex w-full gap-3 rounded-[16px] bg-elevated p-3 text-left shadow-[var(--shadow-border)]",
              tell.accusedId === s.speakerId && "ring-1 ring-accent",
            )}
          >
            <GuestAvatar player={speaker} size="sm" selected={tell.accusedId === s.speakerId} />
            <div>
              <div className="text-xs text-muted">{s.speakerName}</div>
              <p className="text-sm">{s.text}</p>
            </div>
          </button>
        );
      })}
      <Button className="w-full" disabled={!tell.accusedId || tell.finished} onClick={lock}>
        That's the tell
      </Button>
    </div>
  );
}
