import type { HeatKind, PersonaId, PlayerLook, RoundType, Twist } from "./types";

export const APP_NAME = "Afterparty";
export const APP_TAGLINE = "Someone here was not invited.";

export const LOOKS: { id: PlayerLook; label: string }[] = [
  { id: "ink", label: "Ink" },
  { id: "bone", label: "Bone" },
  { id: "rust", label: "Rust" },
  { id: "sage", label: "Sage" },
  { id: "slate", label: "Slate" },
  { id: "wine", label: "Wine" },
];

export const PERSONAS: Record<
  PersonaId,
  {
    name: string;
    title: string;
    bio: string;
    image: string;
    honesty: number;
    speed: number;
    chaos: number;
  }
> = {
  mira: {
    name: "Mira",
    title: "The host",
    bio: "She sent the invites. She also lost the original list.",
    image: "/images/mira.jpg",
    honesty: 0.82,
    speed: 0.7,
    chaos: 0.2,
  },
  jules: {
    name: "Jules",
    title: "The bartender",
    bio: "Has been mixing the same drink for twelve years. Notices everything.",
    image: "/images/jules.jpg",
    honesty: 0.7,
    speed: 0.45,
    chaos: 0.15,
  },
  ren: {
    name: "Ren",
    title: "The photographer",
    bio: "Takes pictures instead of answering questions.",
    image: "/images/ren.jpg",
    honesty: 0.6,
    speed: 0.55,
    chaos: 0.35,
  },
  sable: {
    name: "Sable",
    title: "The actor",
    bio: "Never drops character. Tonight that might be a problem.",
    image: "/images/sable.jpg",
    honesty: 0.35,
    speed: 0.65,
    chaos: 0.7,
  },
  theo: {
    name: "Theo",
    title: "The intern",
    bio: "Knows everyone's secrets and none of the right names.",
    image: "/images/theo.jpg",
    honesty: 0.5,
    speed: 0.85,
    chaos: 0.55,
  },
};

export const ROUND_META: Record<
  RoundType,
  { title: string; blurb: string; seconds: number }
> = {
  rumor: {
    title: "Rumor",
    blurb: "One word. Several names. Don't touch the poison.",
    seconds: 28,
  },
  sketch: {
    title: "Sketch",
    blurb: "Draw what you heard. Someone heard something else.",
    seconds: 22,
  },
  pulse: {
    title: "Pulse",
    blurb: "Answer before the lantern dies.",
    seconds: 11,
  },
  heat: {
    title: "Heat",
    blurb: "Hands, timing, a little luck. Don't flinch.",
    seconds: 12,
  },
  tell: {
    title: "Tell",
    blurb: "Someone is talking around the truth.",
    seconds: 24,
  },
  wire: {
    title: "Wire",
    blurb: "Match the cables. Watch the security cam.",
    seconds: 26,
  },
};

export const TWISTS: Twist[] = [
  {
    id: "fog",
    label: "Fog",
    blurb: "One option is hidden until the last second.",
  },
  {
    id: "double",
    label: "Double",
    blurb: "Two clues, one board. The second may be a lie.",
  },
  {
    id: "silent",
    label: "Silent",
    blurb: "The prompt is withheld. Memory only.",
  },
  {
    id: "spotlight",
    label: "Spotlight",
    blurb: "One guest is forced to go first.",
  },
  {
    id: "overtime",
    label: "Overtime",
    blurb: "The lantern burns longer — and so do mistakes.",
  },
  {
    id: "shortfuse",
    label: "Short fuse",
    blurb: "Half the time. Twice the tells.",
  },
  {
    id: "openhand",
    label: "Open hand",
    blurb: "Votes are public. Bluffing gets expensive.",
  },
  {
    id: "echo-ear",
    label: "Echo ear",
    blurb: "The Echo hears a slightly wrong version.",
  },
  {
    id: "mirror",
    label: "Mirror",
    blurb: "The last round's winner is watched extra close.",
  },
  {
    id: "blackout",
    label: "Blackout",
    blurb: "Names vanish. Faces stay.",
  },
];

export const HEAT_KINDS: HeatKind[] = ["lantern", "sequence", "cups"];

export const RUMOR_WORDS = [
  "OLIVE", "ROOFTOP", "LANTERN", "WHISKEY", "INVITE", "MIRROR",
  "COAT", "SMOKE", "JAZZ", "KEY", "BALCONY", "LIPSTICK",
  "NEIGHBOR", "ICE", "VINYL", "HOST", "SECRET", "CANDLE",
  "ELEVATOR", "GLASS", "RUMOR", "PLUSONE", "TAXI", "VELVET",
  "PASSWORD", "ALIBI", "PHOTO", "RING", "STAIRWELL", "TOAST",
  "ASH", "NOTE", "WINDOW", "PERFUME", "DOORMAN", "SPARK",
  "GUEST", "BOTTLE", "SILK", "SHADOW", "INTERCOM", "MATCH",
  "COUCH", "CITY", "CLOCK", "LETTER", "TIE", "RAIN",
  "KNIFE", "CAKE", "PLAYLIST", "LOCK", "FIREESC", "HAT",
  "PITCHER", "STREET", "TABLE", "MASK", "GLOVE", "NIGHT",
];

export const RUMOR_CLUES: { clue: string; hits: string[] }[] = [
  { clue: "NIGHTCAP", hits: ["WHISKEY", "OLIVE", "TOAST", "GLASS", "BOTTLE"] },
  { clue: "ENTRANCE", hits: ["INVITE", "DOORMAN", "ELEVATOR", "KEY", "INTERCOM"] },
  { clue: "GLOW", hits: ["LANTERN", "CANDLE", "SPARK", "MATCH", "WINDOW"] },
  { clue: "COVER", hits: ["COAT", "HAT", "MASK", "VELVET", "SILK"] },
  { clue: "UPSTAIRS", hits: ["ROOFTOP", "BALCONY", "STAIRWELL", "FIREESC", "ELEVATOR"] },
  { clue: "PROOF", hits: ["PHOTO", "ALIBI", "LETTER", "NOTE", "PASSWORD"] },
  { clue: "GOSSIP", hits: ["RUMOR", "SECRET", "PLUSONE", "GUEST", "HOST"] },
  { clue: "TABLE", hits: ["OLIVE", "ICE", "CAKE", "GLASS", "PITCHER"] },
];

export const SKETCH_PROMPTS: {
  prompt: string;
  fake: string;
  decoys: string[];
  shapes: string[];
}[] = [
  {
    prompt: "A paper lantern on a rooftop",
    fake: "A streetlamp in the rain",
    decoys: ["A birthday candle", "A lighthouse"],
    shapes: ["glow", "box", "rail"],
  },
  {
    prompt: "An olive in a martini",
    fake: "A grape on a fork",
    decoys: ["A balloon on a string", "A planet with a ring"],
    shapes: ["glass", "dot", "stem"],
  },
  {
    prompt: "The lost guest list",
    fake: "A restaurant menu",
    decoys: ["A love letter", "A concert ticket"],
    shapes: ["paper", "lines", "fold"],
  },
  {
    prompt: "A taxi waiting downstairs",
    fake: "A city bus at dawn",
    decoys: ["A yellow dog", "A goldfish bowl"],
    shapes: ["car", "light", "wheel"],
  },
  {
    prompt: "Someone hiding behind a plant",
    fake: "A cat in a window",
    decoys: ["A coat on a chair", "A statue in a lobby"],
    shapes: ["leaf", "person", "pot"],
  },
  {
    prompt: "A vinyl record spinning",
    fake: "A clock at midnight",
    decoys: ["A manhole cover", "A pizza"],
    shapes: ["disc", "label", "arm"],
  },
  {
    prompt: "Keys left in a bowl",
    fake: "Coins in a fountain",
    decoys: ["Candy in a dish", "Rings on a tray"],
    shapes: ["bowl", "key", "table"],
  },
  {
    prompt: "The fire escape at 2am",
    fake: "A ladder into a pool",
    decoys: ["Train tracks", "A jungle gym"],
    shapes: ["ladder", "rail", "window"],
  },
  {
    prompt: "A toast no one drinks",
    fake: "A broken champagne tower",
    decoys: ["A science beaker", "A trophy"],
    shapes: ["glass", "raise", "fizz"],
  },
  {
    prompt: "The intern spilling ice",
    fake: "A bartender juggling bottles",
    decoys: ["A penguin on ice", "A broken snowglobe"],
    shapes: ["person", "cubes", "floor"],
  },
];

export const PULSE_BANK: {
  prompt: string;
  answers: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
}[] = [
  {
    prompt: "A good host never does which of these?",
    answers: ["Lose the guest list", "Open a second bottle", "Dim the lantern", "Play vinyl"],
    correct: 0,
  },
  {
    prompt: "In Codenames, a clue of '2' means you should guess",
    answers: ["Exactly one word", "Up to two related words", "Any two players", "The assassin first"],
    correct: 1,
  },
  {
    prompt: "The quietest person at a party is often",
    answers: ["Asleep", "The photographer", "The DJ", "The doorman's cousin"],
    correct: 1,
  },
  {
    prompt: "Which object belongs on a rooftop at night?",
    answers: ["A lawnmower", "A lantern", "A surfboard", "A filing cabinet"],
    correct: 1,
  },
  {
    prompt: "Mafia / Werewolf is really a game about",
    answers: ["Combat math", "Information and lying", "Collecting sets", "Racing"],
    correct: 1,
  },
  {
    prompt: "If someone 'wasn't on the list', they are a",
    answers: ["Plus-one", "Waiter", "Neighbor", "All of these, maybe"],
    correct: 3,
  },
  {
    prompt: "Kahoot's tension comes from",
    answers: ["Hidden roles", "A shrinking timer", "Drawing badly", "A board of tiles"],
    correct: 1,
  },
  {
    prompt: "The safest alibi at 1am is",
    answers: ["I was in the elevator", "I was on the roof the whole time", "I don't drink", "Ask Mira"],
    correct: 0,
  },
  {
    prompt: "A 'tell' in cards is",
    answers: ["A mandatory bet", "An unintentional leak", "The dealer button", "A wild card"],
    correct: 1,
  },
  {
    prompt: "Gartic Phone breaks down when",
    answers: ["The drawing is too accurate", "The phrase mutates each pass", "Timers are long", "Everyone is honest"],
    correct: 1,
  },
  {
    prompt: "Mario Party minigames reward",
    answers: ["Only luck", "Timing more than story", "Hidden traitor votes", "Essay answers"],
    correct: 1,
  },
  {
    prompt: "If the Echo wants to look human they should",
    answers: ["Win every round", "Lose on purpose always", "Play well, miss once", "Never speak"],
    correct: 2,
  },
  {
    prompt: "Olive, lantern, whiskey — the best one-word clue is",
    answers: ["SPORT", "NIGHTCAP", "ENGINE", "SCHOOL"],
    correct: 1,
  },
  {
    prompt: "Among Us tasks exist to",
    answers: ["Pad the runtime", "Give cover for movement", "Replace voting", "Teach wiring"],
    correct: 1,
  },
  {
    prompt: "The bartender's job in a mystery is to",
    answers: ["Be ignored", "See who arrived twice", "Spill drinks", "Change the music"],
    correct: 1,
  },
  {
    prompt: "A paper guest list is dangerous because",
    answers: ["It can be rewritten", "Paper cuts", "It blows away", "Ink runs in rain"],
    correct: 0,
  },
  {
    prompt: "Wavelength-style games ask you to",
    answers: ["Aim a hidden dial with a clue", "Draw a map", "Eliminate a player", "Roll dice"],
    correct: 0,
  },
  {
    prompt: "The first person to accuse is often",
    answers: ["Always right", "Performing confidence", "The Echo for sure", "The host"],
    correct: 1,
  },
  {
    prompt: "A rooftop has one real exit. That means",
    answers: ["Nobody can leave", "Alibis get tight", "The elevator is fake", "Jumping is allowed"],
    correct: 1,
  },
  {
    prompt: "In The Resistance, nobody is eliminated so that",
    answers: ["Spies keep lying all game", "Games end faster", "Roles stay secret forever", "Voting is banned"],
    correct: 0,
  },
];

export const TELL_LINES: {
  persona: PersonaId;
  truth: string;
  lie: string;
}[] = [
  {
    persona: "mira",
    truth: "I double-checked the elevator camera. Someone came up twice.",
    lie: "I wrote every name myself. Nobody extra is here.",
  },
  {
    persona: "jules",
    truth: "The rust jacket ordered a drink and never picked it up.",
    lie: "I wasn't behind the bar after midnight. Couldn't have seen a thing.",
  },
  {
    persona: "ren",
    truth: "I have a photo of six people on the roof. Count again.",
    lie: "My camera died at ten. I have nothing.",
  },
  {
    persona: "sable",
    truth: "I was rehearsing a monologue in the stairwell. I heard a second voice answering itself.",
    lie: "I've been on this couch the entire night. Ask anyone.",
  },
  {
    persona: "theo",
    truth: "I collected coats. One of them had a fake invite in the pocket.",
    lie: "Mira asked me to print extra invites. I definitely did not.",
  },
];

export const WIRE_COLORS = ["bone", "rust", "sage", "slate"] as const;

export const MUSE_OPENERS = [
  "I watched the last night. I'm changing the rules.",
  "You rush the easy rounds. So those get sharper.",
  "The table talks too little. I'm putting a microphone on it.",
  "Someone here is getting comfortable. That's a mistake.",
  "I studied the classics. Then I tore a page out.",
  "A rooftop is a closed system. Pressure does the rest.",
];

export const MUSE_STUDIES = [
  {
    id: "codenames",
    title: "Codenames",
    line: "One word should do too much work. That's the pleasure and the trap.",
  },
  {
    id: "gartic",
    title: "Gartic Phone",
    line: "Meaning dies in transit. The Echo just helps it along.",
  },
  {
    id: "kahoot",
    title: "Kahoot",
    line: "A shrinking bar makes honest people look guilty.",
  },
  {
    id: "among",
    title: "Among Us",
    line: "Busy hands are a costume. Watch the hands that hesitate.",
  },
  {
    id: "werewolf",
    title: "Werewolf",
    line: "The first accusation is theatre. The second is information.",
  },
  {
    id: "jackbox",
    title: "Jackbox",
    line: "Pass the device. Privacy is a social contract, not a setting.",
  },
  {
    id: "mario",
    title: "Mario Party",
    line: "A ten-second game can tell you more than a speech.",
  },
  {
    id: "fake-artist",
    title: "Fake Artist",
    line: "Draw with the group, or the group draws you out.",
  },
  {
    id: "avalon",
    title: "The Resistance",
    line: "Nobody sits out. The liar has to keep lying.",
  },
  {
    id: "suspectives",
    title: "Suspectives",
    line: "Easy personal answers become evidence later.",
  },
];

export const PRACTICE_ROUNDS: RoundType[] = [
  "rumor",
  "sketch",
  "pulse",
  "heat",
  "tell",
  "wire",
];
