import { useEffect } from "react";
import { unlockAudio } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { TitleScreen } from "./TitleScreen";
import { SetupScreen } from "./SetupScreen";
import { ArchiveScreen } from "./ArchiveScreen";
import { PracticeScreen } from "./PracticeScreen";
import { BriefingScreen } from "./BriefingScreen";
import { RoleScreen } from "./RoleScreen";
import { BoardScreen } from "./BoardScreen";
import { InterludeScreen } from "./InterludeScreen";
import { AccuseScreen } from "./AccuseScreen";
import { RevealScreen } from "./RevealScreen";
import { RoundHost } from "./rounds/RoundHost";

export function GameApp() {
  const hydrate = useGame((s) => s.hydrate);
  const hydrated = useGame((s) => s.hydrated);
  const phase = useGame((s) => s.phase);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") unlockAudio();
    };
    document.addEventListener("visibilitychange", onVis);
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (!hydrated) {
    return <div className="min-h-dvh bg-bg" />;
  }

  switch (phase) {
    case "title":
      return <TitleScreen />;
    case "setup":
      return <SetupScreen />;
    case "archive":
      return <ArchiveScreen />;
    case "practice":
      return <PracticeScreen />;
    case "briefing":
      return <BriefingScreen />;
    case "role":
      return <RoleScreen />;
    case "board":
      return <BoardScreen />;
    case "round":
      return <RoundHost />;
    case "interlude":
      return <InterludeScreen />;
    case "accuse":
      return <AccuseScreen />;
    case "reveal":
      return <RevealScreen />;
    default:
      return <TitleScreen />;
  }
}
