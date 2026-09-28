import { useState } from "react";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { GuestAvatar } from "./GuestAvatar";
import { Shell } from "./Shell";

export function RoleScreen() {
  const players = useGame((s) => s.players);
  const mode = useGame((s) => s.mode);
  const practiceType = useGame((s) => s.practiceType);
  const beginBoard = useGame((s) => s.beginBoard);
  const beginRound = useGame((s) => s.beginRound);
  const humans = players.filter((p) => p.kind === "human");
  const [cursor, setCursor] = useState(0);
  const [open, setOpen] = useState(mode !== "hotseat");
  const person = humans[cursor] ?? players[0]!;

  if (practiceType) {
    return (
      <Shell
        footer={
          <Button size="lg" className="w-full" onClick={beginRound}>
            Play
          </Button>
        }
      >
        <div className="space-y-4 pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">Practice</p>
          <h2 className="font-display text-4xl">No Echo tonight</h2>
          <p className="text-sm text-muted">Hands only. The Muse is taking notes anyway.</p>
        </div>
      </Shell>
    );
  }

  if (!open) {
    return (
      <Shell
        footer={
          <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
            I'm {person.name}
          </Button>
        }
      >
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">Pass the device</p>
          <h2 className="mt-3 font-display text-5xl">{person.name}</h2>
          <p className="mt-3 max-w-xs text-sm text-muted">Everyone else looks away. Then tap.</p>
        </div>
      </Shell>
    );
  }

  const isEcho = person.role === "echo";
  const next = () => {
    if (cursor + 1 < humans.length) {
      setCursor(cursor + 1);
      setOpen(false);
    } else {
      beginBoard();
    }
  };

  return (
    <Shell
      footer={
        <Button size="lg" className="w-full" onClick={next}>
          Hide this · continue
        </Button>
      }
    >
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <GuestAvatar player={person} size="lg" />
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg">
          {person.name}
        </p>
        <h2 className="mt-2 font-display text-5xl">{isEcho ? "You are the Echo" : "You belong here"}</h2>
        <p className="mt-3 max-w-sm text-sm text-muted">
          {isEcho
            ? "Blend in. Sabotage quietly. Survive the last vote."
            : "Find the uninvited guest. Do not name them until the roof goes quiet."}
        </p>
      </div>
    </Shell>
  );
}
