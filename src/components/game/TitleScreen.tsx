import { ArrowRight, BookOpen, Users } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/game/content";
import { unlockAudio } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TitleScreen() {
  const goSetup = useGame((s) => s.goSetup);
  const goArchive = useGame((s) => s.goArchive);
  const goPractice = useGame((s) => s.goPractice);
  const nights = useGame((s) => s.memory.nightsPlayed);

  const start = (mode: "solo" | "hotseat") => {
    unlockAudio();
    goSetup(mode);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <img
        src="/images/rooftop.jpg"
        alt=""
        crossOrigin="anonymous"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-55 outline outline-1 -outline-offset-1 outline-white/10"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-16">
        <div className="stagger-in mx-auto w-full max-w-lg space-y-5">
          <Badge tone="mute">A living party night</Badge>
          <h1 className="font-display text-6xl leading-[0.92] tracking-tight sm:text-7xl">
            {APP_NAME}
          </h1>
          <p className="max-w-sm text-base text-muted">{APP_TAGLINE} The Muse watches, then rewrites the next round.</p>
          {nights > 0 ? (
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-fg">
              Muse memory · {nights} night{nights === 1 ? "" : "s"}
            </p>
          ) : null}
          <div className="flex flex-col gap-2 pt-2">
            <Button size="lg" className="w-full justify-between" onClick={() => start("solo")}>
              Start a night
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full justify-between"
              onClick={() => start("hotseat")}
            >
              Hot seat · pass the phone
              <Users />
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" onClick={goPractice}>
                Practice
              </Button>
              <Button variant="ghost" onClick={goArchive}>
                <BookOpen />
                Muse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
