export type Mode = "solo" | "hotseat" | "practice";

export type Phase =
  | "title"
  | "setup"
  | "archive"
  | "practice"
  | "briefing"
  | "role"
  | "board"
  | "round"
  | "interlude"
  | "accuse"
  | "reveal";

export type RoundType = "rumor" | "sketch" | "pulse" | "heat" | "tell" | "wire";

export type Role = "guest" | "echo";

export type PersonaId = "mira" | "jules" | "ren" | "sable" | "theo";

export type PlayerLook =
  | "ink"
  | "bone"
  | "rust"
  | "sage"
  | "slate"
  | "wine";

export type HeatKind = "lantern" | "sequence" | "cups";

export interface Player {
  id: string;
  name: string;
  kind: "human" | "bot";
  personaId?: PersonaId;
  look: PlayerLook;
  role: Role;
  score: number;
  suspicion: number;
  tells: string[];
}

export interface Twist {
  id: string;
  label: string;
  blurb: string;
}

export interface RoundPlan {
  id: string;
  type: RoundType;
  title: string;
  blurb: string;
  twist?: Twist;
  heatKind?: HeatKind;
  seconds: number;
}

export interface NightLog {
  roundId: string;
  type: RoundType;
  headline: string;
  playerScore: number;
  echoLeak: number;
}

export interface Night {
  seed: number;
  mode: Mode;
  roundIndex: number;
  rounds: RoundPlan[];
  log: NightLog[];
  museLine: string;
  museWhy: string;
  accusedId: string | null;
  winner: "guests" | "echo" | null;
  startedAt: number;
}

export interface MuseMemory {
  version: number;
  nightsPlayed: number;
  winsAsGuest: number;
  winsAsEcho: number;
  roundAffinity: Record<RoundType, { played: number; avgScore: number }>;
  accusationAccuracy: number;
  accusationAttempts: number;
  rushiness: number;
  sketchStrokesAvg: number;
  favoriteTwistIds: string[];
  unlocked: string[];
  lastNotes: string[];
  lastPlayedAt: number | null;
}

export interface Settings {
  mute: boolean;
  reduceMotion: boolean;
  shake: boolean;
}

export interface Profile {
  name: string;
  look: PlayerLook;
}

export interface RumorState {
  words: string[];
  party: number[];
  poison: number[];
  clue: string;
  clueCount: number;
  speakerName: string;
  picked: number[];
  finished: boolean;
  result: "hit" | "miss" | "poison" | "neutral" | null;
}

export interface SketchState {
  prompt: string;
  fakePrompt: string;
  isFakeArtist: boolean;
  phase: "draw" | "guess" | "done";
  guessOptions: string[];
  correctGuess: string;
  pickedGuess: string | null;
  strokeCount: number;
}

export interface PulseState {
  index: number;
  questions: PulseQuestion[];
  picked: (number | null)[];
  timedOut: boolean[];
  finished: boolean;
}

export interface PulseQuestion {
  prompt: string;
  answers: string[];
  correct: number;
  sabotaged: boolean;
}

export interface HeatState {
  kind: HeatKind;
  started: boolean;
  finished: boolean;
  result: "perfect" | "good" | "miss" | null;
  payload: Record<string, number | string | boolean | number[]>;
}

export interface TellState {
  statements: TellStatement[];
  accusedId: string | null;
  finished: boolean;
}

export interface TellStatement {
  speakerId: string;
  speakerName: string;
  text: string;
  isLie: boolean;
}

export interface WireState {
  pairs: [string, string][];
  left: string[];
  right: string[];
  connected: Record<string, string>;
  selectedLeft: string | null;
  swipePhase: boolean;
  swipeResult: "ok" | "slow" | "fast" | null;
  glitchGuest: string;
  spotted: boolean | null;
  finished: boolean;
}

export interface RoundRuntime {
  rumor?: RumorState;
  sketch?: SketchState;
  pulse?: PulseState;
  heat?: HeatState;
  tell?: TellState;
  wire?: WireState;
}
