import {
  PERSONAS,
  PULSE_BANK,
  RUMOR_CLUES,
  RUMOR_WORDS,
  SKETCH_PROMPTS,
  TELL_LINES,
  WIRE_COLORS,
} from "./content";
import { mulberry32, pick, pickN, shuffle } from "./rng";
import type {
  HeatState,
  Player,
  PulseQuestion,
  RoundPlan,
  RumorState,
  SketchState,
  TellState,
  WireState,
} from "./types";

export function makeBots(): Player[] {
  return (Object.keys(PERSONAS) as Array<keyof typeof PERSONAS>).map((id) => {
    const p = PERSONAS[id];
    return {
      id,
      name: p.name,
      kind: "bot" as const,
      personaId: id,
      look: (
        {
          mira: "bone",
          jules: "slate",
          ren: "sage",
          sable: "wine",
          theo: "rust",
        } as const
      )[id],
      role: "guest" as const,
      score: 0,
      suspicion: 0,
      tells: [],
    };
  });
}

export function makeHotseatPlayers(names: string[]): Player[] {
  const looks = ["ink", "bone", "rust", "sage", "slate", "wine"] as const;
  return names.map((name, i) => ({
    id: `p${i}`,
    name: name.trim() || `Guest ${i + 1}`,
    kind: "human" as const,
    look: looks[i % looks.length],
    role: "guest" as const,
    score: 0,
    suspicion: 0,
    tells: [],
  }));
}

export function buildRumor(seed: number, speakerName: string, twistId?: string): RumorState {
  const rng = mulberry32(seed ^ 21);
  const pack = pick(rng, RUMOR_CLUES);
  const partyWords = pack.hits.filter((w) => RUMOR_WORDS.includes(w));
  const poison = pickN(
    rng,
    RUMOR_WORDS.filter((w) => !partyWords.includes(w)),
    3,
  );
  const rest = pickN(
    rng,
    RUMOR_WORDS.filter((w) => !partyWords.includes(w) && !poison.includes(w)),
    16 - partyWords.length - poison.length,
  );
  const words = shuffle(rng, [...partyWords, ...poison, ...rest]);
  const party = partyWords.map((w) => words.indexOf(w)).filter((i) => i >= 0);
  const poisonIdx = poison.map((w) => words.indexOf(w)).filter((i) => i >= 0);
  const clue = twistId === "double" ? `${pack.clue} / ${pick(rng, ["SMOKE", "LATE", "MIRROR"])}` : pack.clue;
  return {
    words,
    party,
    poison: poisonIdx,
    clue,
    clueCount: Math.min(party.length, 2 + (rng() > 0.5 ? 1 : 0)),
    speakerName,
    picked: [],
    finished: false,
    result: null,
  };
}

export function applyRumorPick(state: RumorState, index: number): RumorState {
  if (state.finished || state.picked.includes(index)) return state;
  const picked = [...state.picked, index];
  if (state.poison.includes(index)) {
    return { ...state, picked, finished: true, result: "poison" };
  }
  if (state.party.includes(index)) {
    const hits = picked.filter((i) => state.party.includes(i)).length;
    if (hits >= state.clueCount) {
      return { ...state, picked, finished: true, result: "hit" };
    }
    return { ...state, picked, result: "hit" };
  }
  return { ...state, picked, finished: true, result: "neutral" };
}

export function rumorScore(state: RumorState, isEcho: boolean): { score: number; leak: number } {
  const hits = state.picked.filter((i) => state.party.includes(i)).length;
  const poisoned = state.result === "poison";
  if (isEcho) {
    return {
      score: poisoned ? 80 : hits === 0 ? 40 : 15,
      leak: poisoned ? 0.05 : hits >= 2 ? 0.25 : 0.1,
    };
  }
  return {
    score: poisoned ? 8 : 20 * hits + (state.result === "hit" ? 20 : 0),
    leak: poisoned ? 0.2 : 0,
  };
}

export function buildSketch(seed: number, isEcho: boolean): SketchState {
  const rng = mulberry32(seed ^ 33);
  const item = pick(rng, SKETCH_PROMPTS);
  const options = shuffle(rng, [item.prompt, item.fake, ...item.decoys]).slice(0, 4);
  if (!options.includes(item.prompt)) options[0] = item.prompt;
  return {
    prompt: isEcho ? item.fake : item.prompt,
    fakePrompt: item.fake,
    isFakeArtist: isEcho,
    phase: "draw",
    guessOptions: shuffle(rng, options),
    correctGuess: item.prompt,
    pickedGuess: null,
    strokeCount: 0,
  };
}

export function buildPulse(seed: number, count: number, twistId?: string): PulseQuestion[] {
  const rng = mulberry32(seed ^ 44);
  const qs = pickN(rng, PULSE_BANK, count);
  return qs.map((q, i) => {
    const sabotaged = twistId === "echo-ear" && i === 0;
    let answers = q.answers.slice();
    let correct = q.correct;
    if (sabotaged) {
      answers = shuffle(rng, answers);
      correct = answers.indexOf(q.answers[q.correct]!) as 0 | 1 | 2 | 3;
    }
    return {
      prompt: q.prompt,
      answers,
      correct,
      sabotaged,
    };
  });
}

export function buildHeat(kind: NonNullable<RoundPlan["heatKind"]>, seed: number): HeatState {
  const rng = mulberry32(seed ^ 55);
  if (kind === "lantern") {
    return {
      kind,
      started: false,
      finished: false,
      result: null,
      payload: { peakAt: 0.55 + rng() * 0.25, window: 0.09 },
    };
  }
  if (kind === "sequence") {
    const seq = Array.from({ length: 4 }, () => Math.floor(rng() * 4));
    return {
      kind,
      started: false,
      finished: false,
      result: null,
      payload: { seq, step: 0, showing: 1 },
    };
  }
  const ball = Math.floor(rng() * 3);
  return {
    kind,
    started: false,
    finished: false,
    result: null,
    payload: { ball, picks: [], shuffles: 4 },
  };
}

export function buildTell(players: Player[], echoId: string, seed: number): TellState {
  const rng = mulberry32(seed ^ 66);
  const bots = players.filter((p) => p.kind === "bot");
  const pool = bots.length ? bots : players;
  const speakers = pickN(rng, pool, Math.min(4, pool.length));
  const statements = speakers.map((s) => {
    const line = TELL_LINES.find((t) => t.persona === s.personaId) ?? TELL_LINES[0]!;
    const isEcho = s.id === echoId;
    const lie = isEcho || rng() > (s.personaId ? 0.55 : 0.7);
    return {
      speakerId: s.id,
      speakerName: s.name,
      text: lie ? line.lie : line.truth,
      isLie: lie,
    };
  });
  return { statements, accusedId: null, finished: false };
}

export function buildWire(seed: number, glitchName: string): WireState {
  const rng = mulberry32(seed ^ 77);
  const colors = shuffle(rng, [...WIRE_COLORS]);
  const right = shuffle(rng, colors.slice());
  const pairs: [string, string][] = colors.map((c, i) => [c, right[i]!]);
  return {
    pairs,
    left: colors.slice(),
    right,
    connected: {},
    selectedLeft: null,
    swipePhase: false,
    swipeResult: null,
    glitchGuest: glitchName,
    spotted: null,
    finished: false,
  };
}

export function scorePulse(
  picked: (number | null)[],
  questions: PulseQuestion[],
  isEcho: boolean,
): { score: number; leak: number } {
  let correct = 0;
  questions.forEach((q, i) => {
    if (picked[i] === q.correct) correct += 1;
  });
  const ratio = questions.length ? correct / questions.length : 0;
  if (isEcho) {
    return { score: Math.round(50 + (0.5 - Math.abs(ratio - 0.5)) * 80), leak: ratio > 0.9 ? 0.2 : 0.05 };
  }
  return { score: Math.round(ratio * 100), leak: ratio < 0.3 ? 0.1 : 0 };
}

export function echoIdOf(players: Player[]): string {
  return players.find((p) => p.role === "echo")?.id ?? players[0]!.id;
}

export function endNightWinner(players: Player[], accusedId: string | null): "guests" | "echo" {
  const echo = echoIdOf(players);
  if (accusedId && accusedId === echo) return "guests";
  return "echo";
}

export function botVote(players: Player[], seed: number): string {
  const rng = mulberry32(seed ^ 99);
  const echo = players.find((p) => p.role === "echo");
  const humans = players.filter((p) => p.kind === "human");
  const suspects = [...players].sort((a, b) => b.suspicion - a.suspicion);
  if (echo && rng() > 0.55) return suspects.find((p) => p.id !== echo.id)?.id ?? humans[0]!.id;
  return suspects[0]?.id ?? players[0]!.id;
}
