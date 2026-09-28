import { PERSONAS } from "@/lib/game/content";
import type { Player } from "@/lib/game/types";
import { cn } from "@/lib/utils";

const LOOK: Record<string, string> = {
  ink: "bg-look-ink",
  bone: "bg-look-bone",
  rust: "bg-look-rust",
  sage: "bg-look-sage",
  slate: "bg-look-slate",
  wine: "bg-look-wine",
};

export function GuestAvatar({
  player,
  size = "md",
  selected = false,
}: {
  player: Player;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
}) {
  const dim = size === "lg" ? "size-20" : size === "sm" ? "size-9" : "size-12";
  const src = player.personaId ? PERSONAS[player.personaId].image : null;
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full shadow-[var(--shadow-border)]",
        dim,
        selected && "ring-2 ring-accent ring-offset-2 ring-offset-bg",
        !src && LOOK[player.look],
      )}
    >
      {src ? (
        <img
          src={src}
          alt={player.name}
          crossOrigin="anonymous"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
        />
      ) : (
        <span className="flex size-full items-center justify-center font-display text-lg text-bg">
          {player.name.slice(0, 1)}
        </span>
      )}
    </div>
  );
}
