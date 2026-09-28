import type { MuseMemory, Profile, Settings } from "./types";
import type { RoundType } from "./types";

const KEY = "afterparty-save-v1";
const SAVE_VERSION = 1;

const ROUND_TYPES: RoundType[] = ["rumor", "sketch", "pulse", "heat", "tell", "wire"];

export function defaultMemory(): MuseMemory {
  const roundAffinity = Object.fromEntries(
    ROUND_TYPES.map((t) => [t, { played: 0, avgScore: 0 }]),
  ) as MuseMemory["roundAffinity"];
  return {
    version: SAVE_VERSION,
    nightsPlayed: 0,
    winsAsGuest: 0,
    winsAsEcho: 0,
    roundAffinity,
    accusationAccuracy: 0,
    accusationAttempts: 0,
    rushiness: 0.5,
    sketchStrokesAvg: 40,
    favoriteTwistIds: [],
    unlocked: ["codenames", "werewolf"],
    lastNotes: [],
    lastPlayedAt: null,
  };
}

export function defaultSettings(): Settings {
  return { mute: false, reduceMotion: false, shake: true };
}

export function defaultProfile(): Profile {
  return { name: "You", look: "bone" };
}

export interface SaveBlob {
  version: number;
  memory: MuseMemory;
  settings: Settings;
  profile: Profile;
}

function migrate(raw: SaveBlob): SaveBlob {
  const base = {
    version: SAVE_VERSION,
    memory: defaultMemory(),
    settings: defaultSettings(),
    profile: defaultProfile(),
  };
  return {
    ...base,
    ...raw,
    version: SAVE_VERSION,
    memory: { ...base.memory, ...raw.memory, version: SAVE_VERSION },
    settings: { ...base.settings, ...raw.settings },
    profile: { ...base.profile, ...raw.profile },
  };
}

export function loadSave(): SaveBlob {
  if (typeof window === "undefined") {
    return {
      version: SAVE_VERSION,
      memory: defaultMemory(),
      settings: defaultSettings(),
      profile: defaultProfile(),
    };
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      return {
        version: SAVE_VERSION,
        memory: defaultMemory(),
        settings: defaultSettings(),
        profile: defaultProfile(),
      };
    }
    return migrate(JSON.parse(raw) as SaveBlob);
  } catch {
    return {
      version: SAVE_VERSION,
      memory: defaultMemory(),
      settings: defaultSettings(),
      profile: defaultProfile(),
    };
  }
}

export function writeSave(blob: SaveBlob) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...blob, version: SAVE_VERSION }));
  } catch {
    /* private mode / quota */
  }
}
