import type { ReactNode } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { APP_NAME } from "@/lib/game/content";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Shell({
  children,
  footer,
  wide = false,
}: {
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  const settings = useGame((s) => s.settings);
  const toggleMute = useGame((s) => s.toggleMute);
  const phase = useGame((s) => s.phase);
  const goTitle = useGame((s) => s.goTitle);

  return (
    <div
      className={cn(
        "relative min-h-dvh bg-bg text-fg",
        settings.reduceMotion && "reduce-motion",
      )}
    >
      <header className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2">
        <button
          type="button"
          onClick={goTitle}
          className="font-display text-lg tracking-tight text-fg"
        >
          {APP_NAME}
        </button>
        <div className="flex items-center gap-1">
          {phase !== "title" ? (
            <span className="mr-2 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-subtle-fg sm:inline">
              {phase}
            </span>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            aria-label={settings.mute ? "Unmute" : "Mute"}
            onClick={toggleMute}
            className="size-10"
          >
            {settings.mute ? <VolumeX /> : <Volume2 />}
          </Button>
        </div>
      </header>
      <main className={cn("mx-auto px-4 pb-8", wide ? "max-w-3xl" : "max-w-lg")}>{children}</main>
      {footer ? (
        <div className="sticky bottom-0 border-t border-border bg-bg/90 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm">
          <div className="mx-auto max-w-lg">{footer}</div>
        </div>
      ) : null}
    </div>
  );
}
