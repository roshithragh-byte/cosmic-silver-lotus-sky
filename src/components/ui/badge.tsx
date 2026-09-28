import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "mute",
  children,
}: {
  className?: string;
  tone?: "mute" | "echo" | "ok" | "accent";
  children: ReactNode;
}) {
  const tones = {
    mute: "text-muted bg-subtle",
    echo: "text-fg bg-echo/20",
    ok: "text-ok bg-ok/15",
    accent: "text-accent-fg bg-accent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
