import {
  HEAT_KINDS,
  MUSE_OPENERS,
  MUSE_STUDIES,
  ROUND_META,
  TWISTS,
} from "./content";
import { pick, pickN, shuffle, mulberry32 } from "./rng";
import type {
  MuseMemory,
  NightLog,
  Player,
  Role,
  RoundPlan,
  RoundType,
  Twist,
} from "./types";

const ALL_ROUNDS: RoundType[] = ["rumor", "sketch", "pulse", "heat", "tell", "wire"];

export function musePersona(memory: MuseMemory): string {
  if (memory.nightsPlayed === 0) return "new";
  if (memory.accusationAccuracy < 0.35 && memory.accusationAttempts >= 2) return "teacher";
  if (memory.rushiness > 0.7) return "brake";
  if (memory.winsAsEcho > memory.winsAsGuest) return "hunter";
  return "trickster";
}

export function planNight(seed: number, memory: MuseMemory, longNight: boolean): {
  rounds: RoundPlan[];
  museLine: string;
  museWhy: string;
} {
  const rng = mulberry32(seed);
  const persona = musePersona(memory);
  const count = longNight ? 5 : 4;

  const scored = ALL_ROUNDS.map((type) => {
    const aff = memory.roundAffinity[type];
    let weight = 1;
    if (aff.played > 0 && aff.avgScore > 70) weight += 0.35;
    if (aff.played > 0 && aff.avgScore < 35) weight += 0.5;
    if (persona === "teacher" && (type === "tell" || type === "wire")) weight += 0.6;
    if (persona === "brake" && (type === "pulse" || type === "heat")) weight += 0.4;
    if (persona === "hunter" && (type === "rumor" || type === "sketch")) weight += 0.3;
    if (persona === "trickster") weight += rng() * 0.4;
    return { type, weight };
  });

  const picked: RoundType[] = [];
  const pool = scored.slice();
  while (picked.length < count && pool.length) {
    const total = pool.reduce((s, p) => s + p.weight, 0);
    let r = rng() * total;
    let idx = 0;
    for (let i = 0; i < pool.length; i++) {
      r -= pool[i]!.weight;
      if (r <= 0) {
        idx = i;
        break;
      }
    }
    picked.push(pool[idx]!.type);
    pool.splice(idx, 1);
  }

  if (!picked.includes("tell") && count >= 4 && rng() > 0.45) {
    picked[picked.length - 2] = "tell";
  }

  const twistPool = shuffle(rng, TWISTS);
  const rounds: RoundPlan[] = picked.map((type, i) => {
    const meta = ROUND_META[type];
    let seconds = meta.seconds;
    const useTwist = i > 0 && rng() > 0.35;
    const twist: Twist | undefined = useTwist ? twistPool[i % twistPool.length] : undefined;
    if (twist?.id === "shortfuse") seconds = Math.round(seconds * 0.62);
    if (twist?.id === "overtime") seconds = Math.round(seconds * 1.35);
    if (persona === "brake" && (type === "pulse" || type === "heat")) {
      seconds = Math.max(7, Math.round(seconds * 0.8));
    }
    return {
      id: `${type}-${i}-${seed.toString(16)}`,
      type,
      title: meta.title,
      blurb: meta.blurb,
      twist,
      heatKind: type === "heat" ? pick(rng, HEAT_KINDS) : undefined,
      seconds,
    };
  });

  const opener = pick(rng, MUSE_OPENERS);
  const whyBits: string[] = [];
  if (memory.nightsPlayed === 0) {
    whyBits.push("First night. I'm starting you on a classic mix.");
  } else {
    whyBits.push(`Night ${memory.nightsPlayed + 1}. Persona: ${persona}.`);
    const best = [...ALL_ROUNDS].sort(
      (a, b) => memory.roundAffinity[b].avgScore - memory.roundAffinity[a].avgScore,
    )[0];
    if (best && memory.roundAffinity[best].played) {
      whyBits.push(`You play ${ROUND_META[best].title} like you own it. I mixed the rest.`);
    }
    if (memory.rushiness > 0.65) whyBits.push("You tap early. Heat will punish that.");
    if (memory.accusationAccuracy < 0.4 && memory.accusationAttempts) {
      whyBits.push("Your accusations have been guesses. More tells tonight.");
    }
  }

  return {
    rounds,
    museLine: opener,
    museWhy: whyBits.join(" "),
  };
}

export function softInfo(players: Player[], echoId: string, seed: number): string {
  const rng = mulberry32(seed ^ 91);
  const echo = players.find((p) => p.id === echoId);
  const others = players.filter((p) => p.id !== echoId && p.kind === "bot");
  const decoy = pick(rng, others.length ? others : players);
  const templates = [
    `One of these two laughed a half-second late: ${echo?.name} or ${decoy.name}.`,
    `The Echo did not arrive with the first elevator. Neither did ${decoy.name}.`,
    `Someone rewrote a name on the list. It was not ${pick(rng, others)?.name ?? "Jules"}.`,
    `I will not name them. I will say this: ${echo?.name} and ${decoy.name} should not both be comfortable.`,
  ];
  return pick(rng, templates);
}

export function museNotesAfterNight(
  memory: MuseMemory,
  you: Player,
  winner: "guests" | "echo",
  log: NightLog[],
): { notes: string[]; unlocked: string[]; memory: MuseMemory } {
  const notes: string[] = [];
  const next = structuredClone(memory) as MuseMemory;
  next.nightsPlayed += 1;
  next.lastPlayedAt = Date.now();
  if (you.role === "guest") {
    if (winner === "guests") next.winsAsGuest += 1;
  } else if (winner === "echo") next.winsAsEcho += 1;

  for (const entry of log) {
    const aff = next.roundAffinity[entry.type];
    const n = aff.played + 1;
    aff.avgScore = (aff.avgScore * aff.played + entry.playerScore) / n;
    aff.played = n;
  }

  const rush = log.filter((l) => l.type === "pulse" || l.type === "heat");
  if (rush.length) {
    const avg = rush.reduce((s, l) => s + l.playerScore, 0) / rush.length;
    next.rushiness = next.rushiness * 0.6 + (avg > 70 ? 0.8 : avg < 40 ? 0.25 : 0.5) * 0.4;
  }

  notes.push(
    winner === "guests"
      ? "The uninvited one is gone. The roof is quieter. I am not."
      : "The Echo walked out with the lantern. I'll remember how you missed them.",
  );

  const weakest = [...ALL_ROUNDS].sort(
    (a, b) => next.roundAffinity[a].avgScore - next.roundAffinity[b].avgScore,
  )[0];
  if (weakest && next.roundAffinity[weakest].played) {
    notes.push(`${ROUND_META[weakest].title} is where you leak. Next night starts there.`);
  }

  const study = MUSE_STUDIES.find((s) => !next.unlocked.includes(s.id));
  const unlocked = [...next.unlocked];
  if (study && next.nightsPlayed % 1 === 0) {
    unlocked.push(study.id);
    next.unlocked = unlocked;
    notes.push(`I studied ${study.title}. ${study.line}`);
  }

  if (you.tells.length) {
    notes.push(`I wrote down a tell: “${you.tells[you.tells.length - 1]}”.`);
  }

  next.lastNotes = notes;
  return { notes, unlocked, memory: next };
}

export function assignRoles(players: Player[], seed: number): Player[] {
  const rng = mulberry32(seed ^ 7);
  const echoIndex = Math.floor(rng() * players.length);
  return players.map((p, i) => ({
    ...p,
    role: (i === echoIndex ? "echo" : "guest") as Role,
    score: 0,
    suspicion: i === echoIndex ? 0.15 + rng() * 0.2 : rng() * 0.12,
    tells: [],
  }));
}

export function pickNTwists(seed: number, n: number): Twist[] {
  return pickN(mulberry32(seed), TWISTS, n);
}
