import { create } from "zustand";
import { sfxPlay, setMuted, unlockAudio } from "./audio";
import {
  buildHeat,
  buildPulse,
  buildRumor,
  buildSketch,
  buildTell,
  buildWire,
  echoIdOf,
  endNightWinner,
  makeBots,
  makeHotseatPlayers,
} from "./engine";
import { assignRoles, museNotesAfterNight, planNight, softInfo } from "./muse";
import { freshSeed } from "./rng";
import { defaultMemory, defaultProfile, defaultSettings, loadSave, writeSave } from "./save";
import type {
  Mode,
  MuseMemory,
  Night,
  Phase,
  Player,
  PlayerLook,
  Profile,
  RoundRuntime,
  RoundType,
  Settings,
} from "./types";

interface GameState {
  hydrated: boolean;
  phase: Phase;
  mode: Mode;
  profile: Profile;
  settings: Settings;
  memory: MuseMemory;
  players: Player[];
  night: Night | null;
  runtime: RoundRuntime;
  youId: string;
  hotseatNames: string[];
  hotseatCover: boolean;
  privateReady: boolean;
  lastNotes: string[];
  softLine: string;
  juice: number;
  practiceType: RoundType | null;
  hydrate: () => void;
  setName: (name: string) => void;
  setLook: (look: PlayerLook) => void;
  toggleMute: () => void;
  toggleMotion: () => void;
  goTitle: () => void;
  goSetup: (mode: Mode) => void;
  goArchive: () => void;
  goPractice: () => void;
  goRole: () => void;
  setHotseatName: (index: number, name: string) => void;
  addHotseat: () => void;
  removeHotseat: () => void;
  startNight: (opts?: { practice?: RoundType }) => void;
  revealRole: () => void;
  beginBoard: () => void;
  beginRound: () => void;
  finishRound: (playerScore: number, echoLeak: number, headline: string) => void;
  continueInterlude: () => void;
  setRuntime: (patch: RoundRuntime) => void;
  accuse: (id: string) => void;
  confirmAccuse: () => void;
  bumpJuice: (n?: number) => void;
  addTell: (line: string) => void;
  dismissCover: () => void;
}

function persist(partial: { memory?: MuseMemory; settings?: Settings; profile?: Profile }) {
  const cur = loadSave();
  writeSave({
    version: 1,
    memory: partial.memory ?? cur.memory,
    settings: partial.settings ?? cur.settings,
    profile: partial.profile ?? cur.profile,
  });
}

function youPlayer(profile: Profile): Player {
  return {
    id: "you",
    name: profile.name || "You",
    kind: "human",
    look: profile.look,
    role: "guest",
    score: 0,
    suspicion: 0,
    tells: [],
  };
}

export const useGame = create<GameState>((set, get) => ({
  hydrated: false,
  phase: "title",
  mode: "solo",
  profile: defaultProfile(),
  settings: defaultSettings(),
  memory: defaultMemory(),
  players: [],
  night: null,
  runtime: {},
  youId: "you",
  hotseatNames: ["You", "Alex", "Sam", "Rio"],
  hotseatCover: false,
  privateReady: false,
  lastNotes: [],
  softLine: "",
  juice: 0,
  practiceType: null,

  hydrate: () => {
    const save = loadSave();
    setMuted(save.settings.mute);
    set({
      hydrated: true,
      memory: save.memory,
      settings: save.settings,
      profile: save.profile,
      lastNotes: save.memory.lastNotes,
    });
  },

  setName: (name) => {
    const profile = { ...get().profile, name: name.slice(0, 16) };
    set({ profile });
    persist({ profile });
  },
  setLook: (look) => {
    const profile = { ...get().profile, look };
    set({ profile });
    persist({ profile });
  },
  toggleMute: () => {
    const settings = { ...get().settings, mute: !get().settings.mute };
    setMuted(settings.mute);
    set({ settings });
    persist({ settings });
  },
  toggleMotion: () => {
    const settings = {
      ...get().settings,
      reduceMotion: !get().settings.reduceMotion,
    };
    set({ settings });
    persist({ settings });
  },
  goTitle: () =>
    set({
      phase: "title",
      night: null,
      runtime: {},
      practiceType: null,
      privateReady: false,
    }),
  goSetup: (mode) => set({ phase: "setup", mode }),
  goArchive: () => set({ phase: "archive" }),
  goPractice: () => set({ phase: "practice", mode: "practice" }),
  goRole: () =>
    set({
      phase: "role",
      privateReady: false,
      hotseatCover: get().mode === "hotseat",
    }),
  setHotseatName: (index, name) => {
    const hotseatNames = get().hotseatNames.slice();
    hotseatNames[index] = name.slice(0, 16);
    set({ hotseatNames });
  },
  addHotseat: () => {
    if (get().hotseatNames.length >= 6) return;
    set({ hotseatNames: [...get().hotseatNames, `Guest ${get().hotseatNames.length + 1}`] });
  },
  removeHotseat: () => {
    if (get().hotseatNames.length <= 3) return;
    set({ hotseatNames: get().hotseatNames.slice(0, -1) });
  },

  startNight: (opts) => {
    unlockAudio();
    sfxPlay.muse();
    const { profile, memory, mode, hotseatNames } = get();
    const seed = freshSeed();
    const practice = opts?.practice;
    const planned = planNight(seed, memory, false);
    const rounds = practice
      ? [
          {
            ...planned.rounds[0]!,
            type: practice,
            title: practice[0]!.toUpperCase() + practice.slice(1),
            id: `practice-${practice}`,
          },
        ]
      : planned.rounds;

    let players: Player[];
    let youId = "you";
    if (mode === "hotseat") {
      players = makeHotseatPlayers(hotseatNames);
      youId = "p0";
    } else {
      players = [youPlayer(profile), ...makeBots()];
      youId = "you";
    }
    players = assignRoles(players, seed);
    const night: Night = {
      seed,
      mode: practice ? "practice" : mode,
      roundIndex: 0,
      rounds,
      log: [],
      museLine: planned.museLine,
      museWhy: planned.museWhy,
      accusedId: null,
      winner: null,
      startedAt: Date.now(),
    };
    set({
      players,
      night,
      youId,
      runtime: {},
      phase: practice ? "role" : "briefing",
      practiceType: practice ?? null,
      privateReady: false,
      hotseatCover: mode === "hotseat",
      softLine: softInfo(players, echoIdOf(players), seed),
    });
  },

  revealRole: () => {
    sfxPlay.whoosh();
    set({ privateReady: true, hotseatCover: false });
  },
  beginBoard: () => {
    sfxPlay.round();
    set({ phase: "board", privateReady: false });
  },
  beginRound: () => {
    const { night, players, youId } = get();
    if (!night) return;
    const plan = night.rounds[night.roundIndex];
    if (!plan) return;
    sfxPlay.round();
    const seed = night.seed + night.roundIndex * 17;
    const you = players.find((p) => p.id === youId)!;
    const speaker = players.find((p) => p.kind === "bot") ?? players[0]!;
    const echo = echoIdOf(players);
    const runtime: RoundRuntime = {};
    if (plan.type === "rumor") runtime.rumor = buildRumor(seed, speaker.name, plan.twist?.id);
    if (plan.type === "sketch") runtime.sketch = buildSketch(seed, you.role === "echo");
    if (plan.type === "pulse") {
      runtime.pulse = {
        index: 0,
        questions: buildPulse(seed, 5, plan.twist?.id),
        picked: [null, null, null, null, null],
        timedOut: [],
        finished: false,
      };
    }
    if (plan.type === "heat") runtime.heat = buildHeat(plan.heatKind ?? "lantern", seed);
    if (plan.type === "tell") runtime.tell = buildTell(players, echo, seed);
    if (plan.type === "wire") {
      const glitch = players.find((p) => p.id === echo)?.name ?? "someone";
      runtime.wire = buildWire(seed, glitch);
    }
    set({ runtime, phase: "round" });
  },

  finishRound: (playerScore, echoLeak, headline) => {
    const { night, players, youId, practiceType } = get();
    if (!night) return;
    const plan = night.rounds[night.roundIndex];
    if (!plan) return;
    const nextPlayers = players.map((p) => {
      if (p.id === youId) {
        return {
          ...p,
          score: p.score + playerScore,
          suspicion: Math.min(1, p.suspicion + (p.role === "echo" ? echoLeak : 0)),
        };
      }
      if (p.role === "echo") {
        return { ...p, suspicion: Math.min(1, p.suspicion + echoLeak), score: p.score + Math.round(60 - echoLeak * 80) };
      }
      return { ...p, score: p.score + Math.round(30 + Math.random() * 40) };
    });
    const log = [
      ...night.log,
      { roundId: plan.id, type: plan.type, headline, playerScore, echoLeak },
    ];
    const nextIndex = night.roundIndex + 1;
    const done = nextIndex >= night.rounds.length;
    sfxPlay.success();
    if (practiceType) {
      set({ players: nextPlayers, night: { ...night, log }, phase: "reveal", lastNotes: [headline] });
      return;
    }
    set({
      players: nextPlayers,
      night: { ...night, log, roundIndex: done ? night.roundIndex : nextIndex },
      phase: done ? "accuse" : "interlude",
      juice: get().juice + 1,
    });
  },

  continueInterlude: () => set({ phase: "board" }),

  setRuntime: (patch) => set({ runtime: { ...get().runtime, ...patch } }),

  accuse: (id) => {
    const night = get().night;
    if (!night) return;
    sfxPlay.vote();
    set({ night: { ...night, accusedId: id } });
  },

  confirmAccuse: () => {
    const { night, players, youId, memory } = get();
    if (!night) return;
    const accused = night.accusedId;
    const winner = endNightWinner(players, accused);
    const you = players.find((p) => p.id === youId)!;
    const accAttempts = memory.accusationAttempts + 1;
    const accHits = (memory.accusationAccuracy * memory.accusationAttempts + (winner === "guests" ? 1 : 0)) / accAttempts;
    let mem: MuseMemory = {
      ...memory,
      accusationAttempts: accAttempts,
      accusationAccuracy: accHits,
    };
    const after = museNotesAfterNight(mem, you, winner, night.log);
    mem = after.memory;
    persist({ memory: mem });
    sfxPlay.reveal();
    set({
      memory: mem,
      lastNotes: after.notes,
      night: { ...night, winner },
      phase: "reveal",
    });
  },

  bumpJuice: (n = 1) => set({ juice: get().juice + n }),
  addTell: (line) => {
    const { players, youId } = get();
    set({
      players: players.map((p) => (p.id === youId ? { ...p, tells: [...p.tells, line] } : p)),
    });
  },
  dismissCover: () => set({ hotseatCover: false }),
}));

export function currentYou() {
  const s = useGame.getState();
  return s.players.find((p) => p.id === s.youId);
}

export function currentPlan() {
  const n = useGame.getState().night;
  if (!n) return null;
  return n.rounds[n.roundIndex] ?? null;
}
