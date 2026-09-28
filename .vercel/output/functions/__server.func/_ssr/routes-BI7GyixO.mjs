import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as BookOpen, n as Volume2, o as ArrowRight, r as Users, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BI7GyixO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ctx = null;
var master = null;
var sfx = null;
var music = null;
var muted = false;
function ensure() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
		master = ctx.createGain();
		sfx = ctx.createGain();
		music = ctx.createGain();
		sfx.connect(master);
		music.connect(master);
		master.connect(ctx.destination);
		master.gain.value = muted ? 0 : .85;
		sfx.gain.value = .7;
		music.gain.value = .22;
	}
	return ctx;
}
function unlockAudio() {
	const c = ensure();
	if (!c) return;
	if (c.state === "suspended") c.resume();
}
function setMuted(next) {
	muted = next;
	if (!master || !ctx) return;
	master.gain.setTargetAtTime(next ? 0 : .85, ctx.currentTime, .03);
}
function tone(freq, dur, type = "sine", gain = .12, bus = "sfx", slide) {
	const c = ensure();
	if (!c || !sfx || !music || muted) return;
	const osc = c.createOscillator();
	const g = c.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, c.currentTime);
	if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slide), c.currentTime + dur);
	g.gain.setValueAtTime(1e-4, c.currentTime);
	g.gain.exponentialRampToValueAtTime(gain, c.currentTime + .012);
	g.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + dur);
	osc.connect(g);
	g.connect(bus === "music" ? music : sfx);
	osc.start();
	osc.stop(c.currentTime + dur + .02);
	osc.onended = () => {
		osc.disconnect();
		g.disconnect();
	};
}
function noise(dur, gain = .04) {
	const c = ensure();
	if (!c || !sfx || muted) return;
	const buffer = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
	const src = c.createBufferSource();
	const g = c.createGain();
	const filter = c.createBiquadFilter();
	filter.type = "highpass";
	filter.frequency.value = 800;
	src.buffer = buffer;
	g.gain.value = gain;
	src.connect(filter);
	filter.connect(g);
	g.connect(sfx);
	src.start();
	src.stop(c.currentTime + dur);
}
var sfxPlay = {
	tick: () => tone(880, .05, "square", .04),
	tock: () => tone(520, .06, "square", .035),
	tap: () => {
		tone(240, .05, "triangle", .08);
		noise(.04, .03);
	},
	success: () => {
		tone(523, .09, "sine", .08);
		tone(784, .14, "sine", .07);
	},
	fail: () => tone(180, .22, "sawtooth", .06, "sfx", 90),
	whoosh: () => {
		tone(420, .18, "sine", .04, "sfx", 180);
		noise(.12, .03);
	},
	vote: () => tone(330, .16, "triangle", .07),
	muse: () => {
		tone(392, .2, "sine", .05);
		tone(494, .28, "sine", .045);
		tone(587, .36, "sine", .04);
	},
	reveal: () => {
		tone(196, .4, "triangle", .08, "sfx", 110);
		noise(.3, .05);
	},
	round: () => {
		tone(262, .12, "sine", .06);
		tone(392, .18, "sine", .05);
	}
};
var APP_NAME = "Afterparty";
var APP_TAGLINE = "Someone here was not invited.";
var LOOKS = [
	{
		id: "ink",
		label: "Ink"
	},
	{
		id: "bone",
		label: "Bone"
	},
	{
		id: "rust",
		label: "Rust"
	},
	{
		id: "sage",
		label: "Sage"
	},
	{
		id: "slate",
		label: "Slate"
	},
	{
		id: "wine",
		label: "Wine"
	}
];
var PERSONAS = {
	mira: {
		name: "Mira",
		title: "The host",
		bio: "She sent the invites. She also lost the original list.",
		image: "/images/mira.jpg",
		honesty: .82,
		speed: .7,
		chaos: .2
	},
	jules: {
		name: "Jules",
		title: "The bartender",
		bio: "Has been mixing the same drink for twelve years. Notices everything.",
		image: "/images/jules.jpg",
		honesty: .7,
		speed: .45,
		chaos: .15
	},
	ren: {
		name: "Ren",
		title: "The photographer",
		bio: "Takes pictures instead of answering questions.",
		image: "/images/ren.jpg",
		honesty: .6,
		speed: .55,
		chaos: .35
	},
	sable: {
		name: "Sable",
		title: "The actor",
		bio: "Never drops character. Tonight that might be a problem.",
		image: "/images/sable.jpg",
		honesty: .35,
		speed: .65,
		chaos: .7
	},
	theo: {
		name: "Theo",
		title: "The intern",
		bio: "Knows everyone's secrets and none of the right names.",
		image: "/images/theo.jpg",
		honesty: .5,
		speed: .85,
		chaos: .55
	}
};
var ROUND_META = {
	rumor: {
		title: "Rumor",
		blurb: "One word. Several names. Don't touch the poison.",
		seconds: 28
	},
	sketch: {
		title: "Sketch",
		blurb: "Draw what you heard. Someone heard something else.",
		seconds: 22
	},
	pulse: {
		title: "Pulse",
		blurb: "Answer before the lantern dies.",
		seconds: 11
	},
	heat: {
		title: "Heat",
		blurb: "Hands, timing, a little luck. Don't flinch.",
		seconds: 12
	},
	tell: {
		title: "Tell",
		blurb: "Someone is talking around the truth.",
		seconds: 24
	},
	wire: {
		title: "Wire",
		blurb: "Match the cables. Watch the security cam.",
		seconds: 26
	}
};
var TWISTS = [
	{
		id: "fog",
		label: "Fog",
		blurb: "One option is hidden until the last second."
	},
	{
		id: "double",
		label: "Double",
		blurb: "Two clues, one board. The second may be a lie."
	},
	{
		id: "silent",
		label: "Silent",
		blurb: "The prompt is withheld. Memory only."
	},
	{
		id: "spotlight",
		label: "Spotlight",
		blurb: "One guest is forced to go first."
	},
	{
		id: "overtime",
		label: "Overtime",
		blurb: "The lantern burns longer — and so do mistakes."
	},
	{
		id: "shortfuse",
		label: "Short fuse",
		blurb: "Half the time. Twice the tells."
	},
	{
		id: "openhand",
		label: "Open hand",
		blurb: "Votes are public. Bluffing gets expensive."
	},
	{
		id: "echo-ear",
		label: "Echo ear",
		blurb: "The Echo hears a slightly wrong version."
	},
	{
		id: "mirror",
		label: "Mirror",
		blurb: "The last round's winner is watched extra close."
	},
	{
		id: "blackout",
		label: "Blackout",
		blurb: "Names vanish. Faces stay."
	}
];
var HEAT_KINDS = [
	"lantern",
	"sequence",
	"cups"
];
var RUMOR_WORDS = [
	"OLIVE",
	"ROOFTOP",
	"LANTERN",
	"WHISKEY",
	"INVITE",
	"MIRROR",
	"COAT",
	"SMOKE",
	"JAZZ",
	"KEY",
	"BALCONY",
	"LIPSTICK",
	"NEIGHBOR",
	"ICE",
	"VINYL",
	"HOST",
	"SECRET",
	"CANDLE",
	"ELEVATOR",
	"GLASS",
	"RUMOR",
	"PLUSONE",
	"TAXI",
	"VELVET",
	"PASSWORD",
	"ALIBI",
	"PHOTO",
	"RING",
	"STAIRWELL",
	"TOAST",
	"ASH",
	"NOTE",
	"WINDOW",
	"PERFUME",
	"DOORMAN",
	"SPARK",
	"GUEST",
	"BOTTLE",
	"SILK",
	"SHADOW",
	"INTERCOM",
	"MATCH",
	"COUCH",
	"CITY",
	"CLOCK",
	"LETTER",
	"TIE",
	"RAIN",
	"KNIFE",
	"CAKE",
	"PLAYLIST",
	"LOCK",
	"FIREESC",
	"HAT",
	"PITCHER",
	"STREET",
	"TABLE",
	"MASK",
	"GLOVE",
	"NIGHT"
];
var RUMOR_CLUES = [
	{
		clue: "NIGHTCAP",
		hits: [
			"WHISKEY",
			"OLIVE",
			"TOAST",
			"GLASS",
			"BOTTLE"
		]
	},
	{
		clue: "ENTRANCE",
		hits: [
			"INVITE",
			"DOORMAN",
			"ELEVATOR",
			"KEY",
			"INTERCOM"
		]
	},
	{
		clue: "GLOW",
		hits: [
			"LANTERN",
			"CANDLE",
			"SPARK",
			"MATCH",
			"WINDOW"
		]
	},
	{
		clue: "COVER",
		hits: [
			"COAT",
			"HAT",
			"MASK",
			"VELVET",
			"SILK"
		]
	},
	{
		clue: "UPSTAIRS",
		hits: [
			"ROOFTOP",
			"BALCONY",
			"STAIRWELL",
			"FIREESC",
			"ELEVATOR"
		]
	},
	{
		clue: "PROOF",
		hits: [
			"PHOTO",
			"ALIBI",
			"LETTER",
			"NOTE",
			"PASSWORD"
		]
	},
	{
		clue: "GOSSIP",
		hits: [
			"RUMOR",
			"SECRET",
			"PLUSONE",
			"GUEST",
			"HOST"
		]
	},
	{
		clue: "TABLE",
		hits: [
			"OLIVE",
			"ICE",
			"CAKE",
			"GLASS",
			"PITCHER"
		]
	}
];
var SKETCH_PROMPTS = [
	{
		prompt: "A paper lantern on a rooftop",
		fake: "A streetlamp in the rain",
		decoys: ["A birthday candle", "A lighthouse"],
		shapes: [
			"glow",
			"box",
			"rail"
		]
	},
	{
		prompt: "An olive in a martini",
		fake: "A grape on a fork",
		decoys: ["A balloon on a string", "A planet with a ring"],
		shapes: [
			"glass",
			"dot",
			"stem"
		]
	},
	{
		prompt: "The lost guest list",
		fake: "A restaurant menu",
		decoys: ["A love letter", "A concert ticket"],
		shapes: [
			"paper",
			"lines",
			"fold"
		]
	},
	{
		prompt: "A taxi waiting downstairs",
		fake: "A city bus at dawn",
		decoys: ["A yellow dog", "A goldfish bowl"],
		shapes: [
			"car",
			"light",
			"wheel"
		]
	},
	{
		prompt: "Someone hiding behind a plant",
		fake: "A cat in a window",
		decoys: ["A coat on a chair", "A statue in a lobby"],
		shapes: [
			"leaf",
			"person",
			"pot"
		]
	},
	{
		prompt: "A vinyl record spinning",
		fake: "A clock at midnight",
		decoys: ["A manhole cover", "A pizza"],
		shapes: [
			"disc",
			"label",
			"arm"
		]
	},
	{
		prompt: "Keys left in a bowl",
		fake: "Coins in a fountain",
		decoys: ["Candy in a dish", "Rings on a tray"],
		shapes: [
			"bowl",
			"key",
			"table"
		]
	},
	{
		prompt: "The fire escape at 2am",
		fake: "A ladder into a pool",
		decoys: ["Train tracks", "A jungle gym"],
		shapes: [
			"ladder",
			"rail",
			"window"
		]
	},
	{
		prompt: "A toast no one drinks",
		fake: "A broken champagne tower",
		decoys: ["A science beaker", "A trophy"],
		shapes: [
			"glass",
			"raise",
			"fizz"
		]
	},
	{
		prompt: "The intern spilling ice",
		fake: "A bartender juggling bottles",
		decoys: ["A penguin on ice", "A broken snowglobe"],
		shapes: [
			"person",
			"cubes",
			"floor"
		]
	}
];
var PULSE_BANK = [
	{
		prompt: "A good host never does which of these?",
		answers: [
			"Lose the guest list",
			"Open a second bottle",
			"Dim the lantern",
			"Play vinyl"
		],
		correct: 0
	},
	{
		prompt: "In Codenames, a clue of '2' means you should guess",
		answers: [
			"Exactly one word",
			"Up to two related words",
			"Any two players",
			"The assassin first"
		],
		correct: 1
	},
	{
		prompt: "The quietest person at a party is often",
		answers: [
			"Asleep",
			"The photographer",
			"The DJ",
			"The doorman's cousin"
		],
		correct: 1
	},
	{
		prompt: "Which object belongs on a rooftop at night?",
		answers: [
			"A lawnmower",
			"A lantern",
			"A surfboard",
			"A filing cabinet"
		],
		correct: 1
	},
	{
		prompt: "Mafia / Werewolf is really a game about",
		answers: [
			"Combat math",
			"Information and lying",
			"Collecting sets",
			"Racing"
		],
		correct: 1
	},
	{
		prompt: "If someone 'wasn't on the list', they are a",
		answers: [
			"Plus-one",
			"Waiter",
			"Neighbor",
			"All of these, maybe"
		],
		correct: 3
	},
	{
		prompt: "Kahoot's tension comes from",
		answers: [
			"Hidden roles",
			"A shrinking timer",
			"Drawing badly",
			"A board of tiles"
		],
		correct: 1
	},
	{
		prompt: "The safest alibi at 1am is",
		answers: [
			"I was in the elevator",
			"I was on the roof the whole time",
			"I don't drink",
			"Ask Mira"
		],
		correct: 0
	},
	{
		prompt: "A 'tell' in cards is",
		answers: [
			"A mandatory bet",
			"An unintentional leak",
			"The dealer button",
			"A wild card"
		],
		correct: 1
	},
	{
		prompt: "Gartic Phone breaks down when",
		answers: [
			"The drawing is too accurate",
			"The phrase mutates each pass",
			"Timers are long",
			"Everyone is honest"
		],
		correct: 1
	},
	{
		prompt: "Mario Party minigames reward",
		answers: [
			"Only luck",
			"Timing more than story",
			"Hidden traitor votes",
			"Essay answers"
		],
		correct: 1
	},
	{
		prompt: "If the Echo wants to look human they should",
		answers: [
			"Win every round",
			"Lose on purpose always",
			"Play well, miss once",
			"Never speak"
		],
		correct: 2
	},
	{
		prompt: "Olive, lantern, whiskey — the best one-word clue is",
		answers: [
			"SPORT",
			"NIGHTCAP",
			"ENGINE",
			"SCHOOL"
		],
		correct: 1
	},
	{
		prompt: "Among Us tasks exist to",
		answers: [
			"Pad the runtime",
			"Give cover for movement",
			"Replace voting",
			"Teach wiring"
		],
		correct: 1
	},
	{
		prompt: "The bartender's job in a mystery is to",
		answers: [
			"Be ignored",
			"See who arrived twice",
			"Spill drinks",
			"Change the music"
		],
		correct: 1
	},
	{
		prompt: "A paper guest list is dangerous because",
		answers: [
			"It can be rewritten",
			"Paper cuts",
			"It blows away",
			"Ink runs in rain"
		],
		correct: 0
	},
	{
		prompt: "Wavelength-style games ask you to",
		answers: [
			"Aim a hidden dial with a clue",
			"Draw a map",
			"Eliminate a player",
			"Roll dice"
		],
		correct: 0
	},
	{
		prompt: "The first person to accuse is often",
		answers: [
			"Always right",
			"Performing confidence",
			"The Echo for sure",
			"The host"
		],
		correct: 1
	},
	{
		prompt: "A rooftop has one real exit. That means",
		answers: [
			"Nobody can leave",
			"Alibis get tight",
			"The elevator is fake",
			"Jumping is allowed"
		],
		correct: 1
	},
	{
		prompt: "In The Resistance, nobody is eliminated so that",
		answers: [
			"Spies keep lying all game",
			"Games end faster",
			"Roles stay secret forever",
			"Voting is banned"
		],
		correct: 0
	}
];
var TELL_LINES = [
	{
		persona: "mira",
		truth: "I double-checked the elevator camera. Someone came up twice.",
		lie: "I wrote every name myself. Nobody extra is here."
	},
	{
		persona: "jules",
		truth: "The rust jacket ordered a drink and never picked it up.",
		lie: "I wasn't behind the bar after midnight. Couldn't have seen a thing."
	},
	{
		persona: "ren",
		truth: "I have a photo of six people on the roof. Count again.",
		lie: "My camera died at ten. I have nothing."
	},
	{
		persona: "sable",
		truth: "I was rehearsing a monologue in the stairwell. I heard a second voice answering itself.",
		lie: "I've been on this couch the entire night. Ask anyone."
	},
	{
		persona: "theo",
		truth: "I collected coats. One of them had a fake invite in the pocket.",
		lie: "Mira asked me to print extra invites. I definitely did not."
	}
];
var WIRE_COLORS = [
	"bone",
	"rust",
	"sage",
	"slate"
];
var MUSE_OPENERS = [
	"I watched the last night. I'm changing the rules.",
	"You rush the easy rounds. So those get sharper.",
	"The table talks too little. I'm putting a microphone on it.",
	"Someone here is getting comfortable. That's a mistake.",
	"I studied the classics. Then I tore a page out.",
	"A rooftop is a closed system. Pressure does the rest."
];
var MUSE_STUDIES = [
	{
		id: "codenames",
		title: "Codenames",
		line: "One word should do too much work. That's the pleasure and the trap."
	},
	{
		id: "gartic",
		title: "Gartic Phone",
		line: "Meaning dies in transit. The Echo just helps it along."
	},
	{
		id: "kahoot",
		title: "Kahoot",
		line: "A shrinking bar makes honest people look guilty."
	},
	{
		id: "among",
		title: "Among Us",
		line: "Busy hands are a costume. Watch the hands that hesitate."
	},
	{
		id: "werewolf",
		title: "Werewolf",
		line: "The first accusation is theatre. The second is information."
	},
	{
		id: "jackbox",
		title: "Jackbox",
		line: "Pass the device. Privacy is a social contract, not a setting."
	},
	{
		id: "mario",
		title: "Mario Party",
		line: "A ten-second game can tell you more than a speech."
	},
	{
		id: "fake-artist",
		title: "Fake Artist",
		line: "Draw with the group, or the group draws you out."
	},
	{
		id: "avalon",
		title: "The Resistance",
		line: "Nobody sits out. The liar has to keep lying."
	},
	{
		id: "suspectives",
		title: "Suspectives",
		line: "Easy personal answers become evidence later."
	}
];
var PRACTICE_ROUNDS = [
	"rumor",
	"sketch",
	"pulse",
	"heat",
	"tell",
	"wire"
];
function mulberry32(seed) {
	let a = seed >>> 0;
	return function next() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function pick(rng, list) {
	return list[Math.floor(rng() * list.length)];
}
function pickN(rng, list, n) {
	const copy = list.slice();
	const out = [];
	while (out.length < n && copy.length) {
		const i = Math.floor(rng() * copy.length);
		out.push(copy.splice(i, 1)[0]);
	}
	return out;
}
function shuffle(rng, list) {
	const copy = list.slice();
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		const tmp = copy[i];
		copy[i] = copy[j];
		copy[j] = tmp;
	}
	return copy;
}
function freshSeed() {
	return (Math.floor(Math.random() * 4294967295) ^ Date.now()) >>> 0;
}
function makeBots() {
	return Object.keys(PERSONAS).map((id) => {
		return {
			id,
			name: PERSONAS[id].name,
			kind: "bot",
			personaId: id,
			look: {
				mira: "bone",
				jules: "slate",
				ren: "sage",
				sable: "wine",
				theo: "rust"
			}[id],
			role: "guest",
			score: 0,
			suspicion: 0,
			tells: []
		};
	});
}
function makeHotseatPlayers(names) {
	const looks = [
		"ink",
		"bone",
		"rust",
		"sage",
		"slate",
		"wine"
	];
	return names.map((name, i) => ({
		id: `p${i}`,
		name: name.trim() || `Guest ${i + 1}`,
		kind: "human",
		look: looks[i % looks.length],
		role: "guest",
		score: 0,
		suspicion: 0,
		tells: []
	}));
}
function buildRumor(seed, speakerName, twistId) {
	const rng = mulberry32(seed ^ 21);
	const pack = pick(rng, RUMOR_CLUES);
	const partyWords = pack.hits.filter((w) => RUMOR_WORDS.includes(w));
	const poison = pickN(rng, RUMOR_WORDS.filter((w) => !partyWords.includes(w)), 3);
	const rest = pickN(rng, RUMOR_WORDS.filter((w) => !partyWords.includes(w) && !poison.includes(w)), 16 - partyWords.length - poison.length);
	const words = shuffle(rng, [
		...partyWords,
		...poison,
		...rest
	]);
	const party = partyWords.map((w) => words.indexOf(w)).filter((i) => i >= 0);
	return {
		words,
		party,
		poison: poison.map((w) => words.indexOf(w)).filter((i) => i >= 0),
		clue: twistId === "double" ? `${pack.clue} / ${pick(rng, [
			"SMOKE",
			"LATE",
			"MIRROR"
		])}` : pack.clue,
		clueCount: Math.min(party.length, 2 + (rng() > .5 ? 1 : 0)),
		speakerName,
		picked: [],
		finished: false,
		result: null
	};
}
function applyRumorPick(state, index) {
	if (state.finished || state.picked.includes(index)) return state;
	const picked = [...state.picked, index];
	if (state.poison.includes(index)) return {
		...state,
		picked,
		finished: true,
		result: "poison"
	};
	if (state.party.includes(index)) {
		if (picked.filter((i) => state.party.includes(i)).length >= state.clueCount) return {
			...state,
			picked,
			finished: true,
			result: "hit"
		};
		return {
			...state,
			picked,
			result: "hit"
		};
	}
	return {
		...state,
		picked,
		finished: true,
		result: "neutral"
	};
}
function rumorScore(state, isEcho) {
	const hits = state.picked.filter((i) => state.party.includes(i)).length;
	const poisoned = state.result === "poison";
	if (isEcho) return {
		score: poisoned ? 80 : hits === 0 ? 40 : 15,
		leak: poisoned ? .05 : hits >= 2 ? .25 : .1
	};
	return {
		score: poisoned ? 8 : 20 * hits + (state.result === "hit" ? 20 : 0),
		leak: poisoned ? .2 : 0
	};
}
function buildSketch(seed, isEcho) {
	const rng = mulberry32(seed ^ 33);
	const item = pick(rng, SKETCH_PROMPTS);
	const options = shuffle(rng, [
		item.prompt,
		item.fake,
		...item.decoys
	]).slice(0, 4);
	if (!options.includes(item.prompt)) options[0] = item.prompt;
	return {
		prompt: isEcho ? item.fake : item.prompt,
		fakePrompt: item.fake,
		isFakeArtist: isEcho,
		phase: "draw",
		guessOptions: shuffle(rng, options),
		correctGuess: item.prompt,
		pickedGuess: null,
		strokeCount: 0
	};
}
function buildPulse(seed, count, twistId) {
	const rng = mulberry32(seed ^ 44);
	return pickN(rng, PULSE_BANK, count).map((q, i) => {
		const sabotaged = twistId === "echo-ear" && i === 0;
		let answers = q.answers.slice();
		let correct = q.correct;
		if (sabotaged) {
			answers = shuffle(rng, answers);
			correct = answers.indexOf(q.answers[q.correct]);
		}
		return {
			prompt: q.prompt,
			answers,
			correct,
			sabotaged
		};
	});
}
function buildHeat(kind, seed) {
	const rng = mulberry32(seed ^ 55);
	if (kind === "lantern") return {
		kind,
		started: false,
		finished: false,
		result: null,
		payload: {
			peakAt: .55 + rng() * .25,
			window: .09
		}
	};
	if (kind === "sequence") return {
		kind,
		started: false,
		finished: false,
		result: null,
		payload: {
			seq: Array.from({ length: 4 }, () => Math.floor(rng() * 4)),
			step: 0,
			showing: 1
		}
	};
	return {
		kind,
		started: false,
		finished: false,
		result: null,
		payload: {
			ball: Math.floor(rng() * 3),
			picks: [],
			shuffles: 4
		}
	};
}
function buildTell(players, echoId, seed) {
	const rng = mulberry32(seed ^ 66);
	const bots = players.filter((p) => p.kind === "bot");
	const pool = bots.length ? bots : players;
	return {
		statements: pickN(rng, pool, Math.min(4, pool.length)).map((s) => {
			const line = TELL_LINES.find((t) => t.persona === s.personaId) ?? TELL_LINES[0];
			const lie = s.id === echoId || rng() > (s.personaId ? .55 : .7);
			return {
				speakerId: s.id,
				speakerName: s.name,
				text: lie ? line.lie : line.truth,
				isLie: lie
			};
		}),
		accusedId: null,
		finished: false
	};
}
function buildWire(seed, glitchName) {
	const rng = mulberry32(seed ^ 77);
	const colors = shuffle(rng, [...WIRE_COLORS]);
	const right = shuffle(rng, colors.slice());
	return {
		pairs: colors.map((c, i) => [c, right[i]]),
		left: colors.slice(),
		right,
		connected: {},
		selectedLeft: null,
		swipePhase: false,
		swipeResult: null,
		glitchGuest: glitchName,
		spotted: null,
		finished: false
	};
}
function scorePulse(picked, questions, isEcho) {
	let correct = 0;
	questions.forEach((q, i) => {
		if (picked[i] === q.correct) correct += 1;
	});
	const ratio = questions.length ? correct / questions.length : 0;
	if (isEcho) return {
		score: Math.round(50 + (.5 - Math.abs(ratio - .5)) * 80),
		leak: ratio > .9 ? .2 : .05
	};
	return {
		score: Math.round(ratio * 100),
		leak: ratio < .3 ? .1 : 0
	};
}
function echoIdOf(players) {
	return players.find((p) => p.role === "echo")?.id ?? players[0].id;
}
function endNightWinner(players, accusedId) {
	const echo = echoIdOf(players);
	if (accusedId && accusedId === echo) return "guests";
	return "echo";
}
var ALL_ROUNDS = [
	"rumor",
	"sketch",
	"pulse",
	"heat",
	"tell",
	"wire"
];
function musePersona(memory) {
	if (memory.nightsPlayed === 0) return "new";
	if (memory.accusationAccuracy < .35 && memory.accusationAttempts >= 2) return "teacher";
	if (memory.rushiness > .7) return "brake";
	if (memory.winsAsEcho > memory.winsAsGuest) return "hunter";
	return "trickster";
}
function planNight(seed, memory, longNight) {
	const rng = mulberry32(seed);
	const persona = musePersona(memory);
	const count = longNight ? 5 : 4;
	const scored = ALL_ROUNDS.map((type) => {
		const aff = memory.roundAffinity[type];
		let weight = 1;
		if (aff.played > 0 && aff.avgScore > 70) weight += .35;
		if (aff.played > 0 && aff.avgScore < 35) weight += .5;
		if (persona === "teacher" && (type === "tell" || type === "wire")) weight += .6;
		if (persona === "brake" && (type === "pulse" || type === "heat")) weight += .4;
		if (persona === "hunter" && (type === "rumor" || type === "sketch")) weight += .3;
		if (persona === "trickster") weight += rng() * .4;
		return {
			type,
			weight
		};
	});
	const picked = [];
	const pool = scored.slice();
	while (picked.length < count && pool.length) {
		const total = pool.reduce((s, p) => s + p.weight, 0);
		let r = rng() * total;
		let idx = 0;
		for (let i = 0; i < pool.length; i++) {
			r -= pool[i].weight;
			if (r <= 0) {
				idx = i;
				break;
			}
		}
		picked.push(pool[idx].type);
		pool.splice(idx, 1);
	}
	if (!picked.includes("tell") && count >= 4 && rng() > .45) picked[picked.length - 2] = "tell";
	const twistPool = shuffle(rng, TWISTS);
	const rounds = picked.map((type, i) => {
		const meta = ROUND_META[type];
		let seconds = meta.seconds;
		const twist = i > 0 && rng() > .35 ? twistPool[i % twistPool.length] : void 0;
		if (twist?.id === "shortfuse") seconds = Math.round(seconds * .62);
		if (twist?.id === "overtime") seconds = Math.round(seconds * 1.35);
		if (persona === "brake" && (type === "pulse" || type === "heat")) seconds = Math.max(7, Math.round(seconds * .8));
		return {
			id: `${type}-${i}-${seed.toString(16)}`,
			type,
			title: meta.title,
			blurb: meta.blurb,
			twist,
			heatKind: type === "heat" ? pick(rng, HEAT_KINDS) : void 0,
			seconds
		};
	});
	const opener = pick(rng, MUSE_OPENERS);
	const whyBits = [];
	if (memory.nightsPlayed === 0) whyBits.push("First night. I'm starting you on a classic mix.");
	else {
		whyBits.push(`Night ${memory.nightsPlayed + 1}. Persona: ${persona}.`);
		const best = [...ALL_ROUNDS].sort((a, b) => memory.roundAffinity[b].avgScore - memory.roundAffinity[a].avgScore)[0];
		if (best && memory.roundAffinity[best].played) whyBits.push(`You play ${ROUND_META[best].title} like you own it. I mixed the rest.`);
		if (memory.rushiness > .65) whyBits.push("You tap early. Heat will punish that.");
		if (memory.accusationAccuracy < .4 && memory.accusationAttempts) whyBits.push("Your accusations have been guesses. More tells tonight.");
	}
	return {
		rounds,
		museLine: opener,
		museWhy: whyBits.join(" ")
	};
}
function softInfo(players, echoId, seed) {
	const rng = mulberry32(seed ^ 91);
	const echo = players.find((p) => p.id === echoId);
	const others = players.filter((p) => p.id !== echoId && p.kind === "bot");
	const decoy = pick(rng, others.length ? others : players);
	return pick(rng, [
		`One of these two laughed a half-second late: ${echo?.name} or ${decoy.name}.`,
		`The Echo did not arrive with the first elevator. Neither did ${decoy.name}.`,
		`Someone rewrote a name on the list. It was not ${pick(rng, others)?.name ?? "Jules"}.`,
		`I will not name them. I will say this: ${echo?.name} and ${decoy.name} should not both be comfortable.`
	]);
}
function museNotesAfterNight(memory, you, winner, log) {
	const notes = [];
	const next = structuredClone(memory);
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
		next.rushiness = next.rushiness * .6 + (avg > 70 ? .8 : avg < 40 ? .25 : .5) * .4;
	}
	notes.push(winner === "guests" ? "The uninvited one is gone. The roof is quieter. I am not." : "The Echo walked out with the lantern. I'll remember how you missed them.");
	const weakest = [...ALL_ROUNDS].sort((a, b) => next.roundAffinity[a].avgScore - next.roundAffinity[b].avgScore)[0];
	if (weakest && next.roundAffinity[weakest].played) notes.push(`${ROUND_META[weakest].title} is where you leak. Next night starts there.`);
	const study = MUSE_STUDIES.find((s) => !next.unlocked.includes(s.id));
	const unlocked = [...next.unlocked];
	if (study && next.nightsPlayed % 1 === 0) {
		unlocked.push(study.id);
		next.unlocked = unlocked;
		notes.push(`I studied ${study.title}. ${study.line}`);
	}
	if (you.tells.length) notes.push(`I wrote down a tell: “${you.tells[you.tells.length - 1]}”.`);
	next.lastNotes = notes;
	return {
		notes,
		unlocked,
		memory: next
	};
}
function assignRoles(players, seed) {
	const rng = mulberry32(seed ^ 7);
	const echoIndex = Math.floor(rng() * players.length);
	return players.map((p, i) => ({
		...p,
		role: i === echoIndex ? "echo" : "guest",
		score: 0,
		suspicion: i === echoIndex ? .15 + rng() * .2 : rng() * .12,
		tells: []
	}));
}
var KEY = "afterparty-save-v1";
var SAVE_VERSION = 1;
var ROUND_TYPES = [
	"rumor",
	"sketch",
	"pulse",
	"heat",
	"tell",
	"wire"
];
function defaultMemory() {
	return {
		version: SAVE_VERSION,
		nightsPlayed: 0,
		winsAsGuest: 0,
		winsAsEcho: 0,
		roundAffinity: Object.fromEntries(ROUND_TYPES.map((t) => [t, {
			played: 0,
			avgScore: 0
		}])),
		accusationAccuracy: 0,
		accusationAttempts: 0,
		rushiness: .5,
		sketchStrokesAvg: 40,
		favoriteTwistIds: [],
		unlocked: ["codenames", "werewolf"],
		lastNotes: [],
		lastPlayedAt: null
	};
}
function defaultSettings() {
	return {
		mute: false,
		reduceMotion: false,
		shake: true
	};
}
function defaultProfile() {
	return {
		name: "You",
		look: "bone"
	};
}
function migrate(raw) {
	const base = {
		version: SAVE_VERSION,
		memory: defaultMemory(),
		settings: defaultSettings(),
		profile: defaultProfile()
	};
	return {
		...base,
		...raw,
		version: SAVE_VERSION,
		memory: {
			...base.memory,
			...raw.memory,
			version: SAVE_VERSION
		},
		settings: {
			...base.settings,
			...raw.settings
		},
		profile: {
			...base.profile,
			...raw.profile
		}
	};
}
function loadSave() {
	if (typeof window === "undefined") return {
		version: SAVE_VERSION,
		memory: defaultMemory(),
		settings: defaultSettings(),
		profile: defaultProfile()
	};
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return {
			version: SAVE_VERSION,
			memory: defaultMemory(),
			settings: defaultSettings(),
			profile: defaultProfile()
		};
		return migrate(JSON.parse(raw));
	} catch {
		return {
			version: SAVE_VERSION,
			memory: defaultMemory(),
			settings: defaultSettings(),
			profile: defaultProfile()
		};
	}
}
function writeSave(blob) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(KEY, JSON.stringify({
			...blob,
			version: SAVE_VERSION
		}));
	} catch {}
}
function persist(partial) {
	const cur = loadSave();
	writeSave({
		version: 1,
		memory: partial.memory ?? cur.memory,
		settings: partial.settings ?? cur.settings,
		profile: partial.profile ?? cur.profile
	});
}
function youPlayer(profile) {
	return {
		id: "you",
		name: profile.name || "You",
		kind: "human",
		look: profile.look,
		role: "guest",
		score: 0,
		suspicion: 0,
		tells: []
	};
}
var useGame = create((set, get) => ({
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
	hotseatNames: [
		"You",
		"Alex",
		"Sam",
		"Rio"
	],
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
			lastNotes: save.memory.lastNotes
		});
	},
	setName: (name) => {
		const profile = {
			...get().profile,
			name: name.slice(0, 16)
		};
		set({ profile });
		persist({ profile });
	},
	setLook: (look) => {
		const profile = {
			...get().profile,
			look
		};
		set({ profile });
		persist({ profile });
	},
	toggleMute: () => {
		const settings = {
			...get().settings,
			mute: !get().settings.mute
		};
		setMuted(settings.mute);
		set({ settings });
		persist({ settings });
	},
	toggleMotion: () => {
		const settings = {
			...get().settings,
			reduceMotion: !get().settings.reduceMotion
		};
		set({ settings });
		persist({ settings });
	},
	goTitle: () => set({
		phase: "title",
		night: null,
		runtime: {},
		practiceType: null,
		privateReady: false
	}),
	goSetup: (mode) => set({
		phase: "setup",
		mode
	}),
	goArchive: () => set({ phase: "archive" }),
	goPractice: () => set({
		phase: "practice",
		mode: "practice"
	}),
	goRole: () => set({
		phase: "role",
		privateReady: false,
		hotseatCover: get().mode === "hotseat"
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
		const rounds = practice ? [{
			...planned.rounds[0],
			type: practice,
			title: practice[0].toUpperCase() + practice.slice(1),
			id: `practice-${practice}`
		}] : planned.rounds;
		let players;
		let youId = "you";
		if (mode === "hotseat") {
			players = makeHotseatPlayers(hotseatNames);
			youId = "p0";
		} else {
			players = [youPlayer(profile), ...makeBots()];
			youId = "you";
		}
		players = assignRoles(players, seed);
		const night = {
			seed,
			mode: practice ? "practice" : mode,
			roundIndex: 0,
			rounds,
			log: [],
			museLine: planned.museLine,
			museWhy: planned.museWhy,
			accusedId: null,
			winner: null,
			startedAt: Date.now()
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
			softLine: softInfo(players, echoIdOf(players), seed)
		});
	},
	revealRole: () => {
		sfxPlay.whoosh();
		set({
			privateReady: true,
			hotseatCover: false
		});
	},
	beginBoard: () => {
		sfxPlay.round();
		set({
			phase: "board",
			privateReady: false
		});
	},
	beginRound: () => {
		const { night, players, youId } = get();
		if (!night) return;
		const plan = night.rounds[night.roundIndex];
		if (!plan) return;
		sfxPlay.round();
		const seed = night.seed + night.roundIndex * 17;
		const you = players.find((p) => p.id === youId);
		const speaker = players.find((p) => p.kind === "bot") ?? players[0];
		const echo = echoIdOf(players);
		const runtime = {};
		if (plan.type === "rumor") runtime.rumor = buildRumor(seed, speaker.name, plan.twist?.id);
		if (plan.type === "sketch") runtime.sketch = buildSketch(seed, you.role === "echo");
		if (plan.type === "pulse") runtime.pulse = {
			index: 0,
			questions: buildPulse(seed, 5, plan.twist?.id),
			picked: [
				null,
				null,
				null,
				null,
				null
			],
			timedOut: [],
			finished: false
		};
		if (plan.type === "heat") runtime.heat = buildHeat(plan.heatKind ?? "lantern", seed);
		if (plan.type === "tell") runtime.tell = buildTell(players, echo, seed);
		if (plan.type === "wire") runtime.wire = buildWire(seed, players.find((p) => p.id === echo)?.name ?? "someone");
		set({
			runtime,
			phase: "round"
		});
	},
	finishRound: (playerScore, echoLeak, headline) => {
		const { night, players, youId, practiceType } = get();
		if (!night) return;
		const plan = night.rounds[night.roundIndex];
		if (!plan) return;
		const nextPlayers = players.map((p) => {
			if (p.id === youId) return {
				...p,
				score: p.score + playerScore,
				suspicion: Math.min(1, p.suspicion + (p.role === "echo" ? echoLeak : 0))
			};
			if (p.role === "echo") return {
				...p,
				suspicion: Math.min(1, p.suspicion + echoLeak),
				score: p.score + Math.round(60 - echoLeak * 80)
			};
			return {
				...p,
				score: p.score + Math.round(30 + Math.random() * 40)
			};
		});
		const log = [...night.log, {
			roundId: plan.id,
			type: plan.type,
			headline,
			playerScore,
			echoLeak
		}];
		const nextIndex = night.roundIndex + 1;
		const done = nextIndex >= night.rounds.length;
		sfxPlay.success();
		if (practiceType) {
			set({
				players: nextPlayers,
				night: {
					...night,
					log
				},
				phase: "reveal",
				lastNotes: [headline]
			});
			return;
		}
		set({
			players: nextPlayers,
			night: {
				...night,
				log,
				roundIndex: done ? night.roundIndex : nextIndex
			},
			phase: done ? "accuse" : "interlude",
			juice: get().juice + 1
		});
	},
	continueInterlude: () => set({ phase: "board" }),
	setRuntime: (patch) => set({ runtime: {
		...get().runtime,
		...patch
	} }),
	accuse: (id) => {
		const night = get().night;
		if (!night) return;
		sfxPlay.vote();
		set({ night: {
			...night,
			accusedId: id
		} });
	},
	confirmAccuse: () => {
		const { night, players, youId, memory } = get();
		if (!night) return;
		const accused = night.accusedId;
		const winner = endNightWinner(players, accused);
		const you = players.find((p) => p.id === youId);
		const accAttempts = memory.accusationAttempts + 1;
		const accHits = (memory.accusationAccuracy * memory.accusationAttempts + (winner === "guests" ? 1 : 0)) / accAttempts;
		let mem = {
			...memory,
			accusationAttempts: accAttempts,
			accusationAccuracy: accHits
		};
		const after = museNotesAfterNight(mem, you, winner, night.log);
		mem = after.memory;
		persist({ memory: mem });
		sfxPlay.reveal();
		set({
			memory: mem,
			lastNotes: after.notes,
			night: {
				...night,
				winner
			},
			phase: "reveal"
		});
	},
	bumpJuice: (n = 1) => set({ juice: get().juice + n }),
	addTell: (line) => {
		const { players, youId } = get();
		set({ players: players.map((p) => p.id === youId ? {
			...p,
			tells: [...p.tells, line]
		} : p) });
	},
	dismissCover: () => set({ hotseatCover: false })
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:size-4", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:opacity-90",
			secondary: "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-fg hover:bg-subtle",
			echo: "bg-echo text-fg hover:opacity-90"
		},
		size: {
			md: "h-11 rounded-[12px] px-4 text-sm",
			lg: "h-12 rounded-[14px] px-5 text-base",
			sm: "h-9 rounded-[10px] px-3 text-sm",
			icon: "size-11 rounded-[12px]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Badge({ className, tone = "mute", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
			mute: "text-muted bg-subtle",
			echo: "text-fg bg-echo/20",
			ok: "text-ok bg-ok/15",
			accent: "text-accent-fg bg-accent"
		}[tone], className),
		children
	});
}
function TitleScreen() {
	const goSetup = useGame((s) => s.goSetup);
	const goArchive = useGame((s) => s.goArchive);
	const goPractice = useGame((s) => s.goPractice);
	const nights = useGame((s) => s.memory.nightsPlayed);
	const start = (mode) => {
		unlockAudio();
		goSetup(mode);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/rooftop.jpg",
				alt: "",
				crossOrigin: "anonymous",
				className: "absolute inset-0 size-full object-cover opacity-55 outline outline-1 -outline-offset-1 outline-white/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex min-h-dvh flex-col justify-end px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stagger-in mx-auto w-full max-w-lg space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "mute",
							children: "A living party night"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-6xl leading-[0.92] tracking-tight sm:text-7xl",
							children: APP_NAME
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "max-w-sm text-base text-muted",
							children: [APP_TAGLINE, " The Muse watches, then rewrites the next round."]
						}),
						nights > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs uppercase tracking-[0.18em] text-subtle-fg",
							children: [
								"Muse memory · ",
								nights,
								" night",
								nights === 1 ? "" : "s"
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "w-full justify-between",
									onClick: () => start("solo"),
									children: ["Start a night", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									variant: "secondary",
									className: "w-full justify-between",
									onClick: () => start("hotseat"),
									children: ["Hot seat · pass the phone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: goPractice,
										children: "Practice"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										onClick: goArchive,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), "Muse"]
									})]
								})
							]
						})
					]
				})
			})
		]
	});
}
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("h-11 w-full rounded-[12px] bg-subtle px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", className),
	...props
}));
Input.displayName = "Input";
function Shell({ children, footer, wide = false }) {
	const settings = useGame((s) => s.settings);
	const toggleMute = useGame((s) => s.toggleMute);
	const phase = useGame((s) => s.phase);
	const goTitle = useGame((s) => s.goTitle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative min-h-dvh bg-bg text-fg", settings.reduceMotion && "reduce-motion"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: goTitle,
					className: "font-display text-lg tracking-tight text-fg",
					children: APP_NAME
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [phase !== "title" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-subtle-fg sm:inline",
						children: phase
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": settings.mute ? "Unmute" : "Mute",
						onClick: toggleMute,
						className: "size-10",
						children: settings.mute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: cn("mx-auto px-4 pb-8", wide ? "max-w-3xl" : "max-w-lg"),
				children
			}),
			footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-0 border-t border-border bg-bg/90 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-lg",
					children: footer
				})
			}) : null
		]
	});
}
var LOOK_BG = {
	ink: "bg-look-ink",
	bone: "bg-look-bone",
	rust: "bg-look-rust",
	sage: "bg-look-sage",
	slate: "bg-look-slate",
	wine: "bg-look-wine"
};
function SetupScreen() {
	const mode = useGame((s) => s.mode);
	const profile = useGame((s) => s.profile);
	const setName = useGame((s) => s.setName);
	const setLook = useGame((s) => s.setLook);
	const startNight = useGame((s) => s.startNight);
	const names = useGame((s) => s.hotseatNames);
	const setHotseatName = useGame((s) => s.setHotseatName);
	const addHotseat = useGame((s) => s.addHotseat);
	const removeHotseat = useGame((s) => s.removeHotseat);
	const goTitle = useGame((s) => s.goTitle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => {
				unlockAudio();
				startNight();
			},
			children: "Deal the night"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in space-y-6 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
						children: mode === "hotseat" ? "Hot seat" : "Solo with the house"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-4xl",
						children: "The guest list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: mode === "hotseat" ? "One device. Pass it when the screen says so. Don't peek." : "You plus five regulars. One of you is the Echo."
					})
				] }),
				mode === "solo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: "Your name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: profile.name,
						maxLength: 16,
						onChange: (e) => setName(e.target.value),
						placeholder: "Name"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: "Look"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-6 gap-2",
						children: LOOKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setLook(l.id),
							className: cn("flex h-14 flex-col items-center justify-center rounded-[12px] bg-elevated text-[10px] text-muted shadow-[var(--shadow-border)]", profile.look === l.id && "ring-2 ring-accent"),
							"aria-label": l.label,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mb-1 size-5 rounded-full", LOOK_BG[l.id]) }), l.label]
						}, l.id))
					})]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [names.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: n,
						onChange: (e) => setHotseatName(i, e.target.value),
						"aria-label": `Player ${i + 1}`
					}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "flex-1",
							onClick: addHotseat,
							children: "Add seat"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "flex-1",
							onClick: removeHotseat,
							children: "Remove"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm text-muted",
					onClick: goTitle,
					children: "Back"
				})
			]
		})
	});
}
function ArchiveScreen() {
	const memory = useGame((s) => s.memory);
	const goTitle = useGame((s) => s.goTitle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			className: "w-full",
			onClick: goTitle,
			children: "Back to the roof"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
						children: "The Muse"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-4xl",
						children: "What I've learned"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "I keep a private notebook. Every night I rewrite the mix. I never stop studying the table."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Nights",
							value: String(memory.nightsPlayed)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Guest wins",
							value: String(memory.winsAsGuest)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Echo wins",
							value: String(memory.winsAsEcho)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium text-muted",
						children: "Round affinity"
					}), Object.keys(ROUND_META).map((t) => {
						const a = memory.roundAffinity[t];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-16 text-sm",
									children: ROUND_META[t].title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 flex-1 overflow-hidden rounded-full bg-subtle",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-accent",
										style: { width: `${Math.min(100, a.avgScore)}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-10 text-right font-mono text-xs tabular-nums text-muted",
									children: a.played ? Math.round(a.avgScore) : "—"
								})
							]
						}, t);
					})]
				}),
				memory.lastNotes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[20px] bg-elevated p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: "Last notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2 text-sm text-fg",
						children: memory.lastNotes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n }, n))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium text-muted",
						children: "Studies"
					}), MUSE_STUDIES.map((s) => {
						const open = memory.unlocked.includes(s.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-[16px] bg-elevated p-4 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-xl",
									children: s.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: open ? "ok" : "mute",
									children: open ? "Read" : "Sealed"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: open ? s.line : "Play another night."
							})]
						}, s.id);
					})]
				})
			]
		})
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[16px] bg-elevated p-3 text-center shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl tabular-nums",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-[0.14em] text-subtle-fg",
			children: label
		})]
	});
}
function PracticeScreen() {
	const startNight = useGame((s) => s.startNight);
	const goTitle = useGame((s) => s.goTitle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
					children: "Sandbox"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-4xl",
					children: "One round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "No Echo. No night. Just the game under your hands."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: PRACTICE_ROUNDS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						unlockAudio();
						startNight({ practice: t });
					},
					className: "rounded-[20px] bg-elevated p-4 text-left shadow-[var(--shadow-border)] transition-transform duration-150 ease-out active:scale-[0.96]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl",
						children: ROUND_META[t].title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: ROUND_META[t].blurb
					})]
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: goTitle,
				children: "Back"
			})
		]
	}) });
}
var LOOK = {
	ink: "bg-look-ink",
	bone: "bg-look-bone",
	rust: "bg-look-rust",
	sage: "bg-look-sage",
	slate: "bg-look-slate",
	wine: "bg-look-wine"
};
function GuestAvatar({ player, size = "md", selected = false }) {
	const dim = size === "lg" ? "size-20" : size === "sm" ? "size-9" : "size-12";
	const src = player.personaId ? PERSONAS[player.personaId].image : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative shrink-0 overflow-hidden rounded-full shadow-[var(--shadow-border)]", dim, selected && "ring-2 ring-accent ring-offset-2 ring-offset-bg", !src && LOOK[player.look]),
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: player.name,
			crossOrigin: "anonymous",
			className: "size-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-full items-center justify-center font-display text-lg text-bg",
			children: player.name.slice(0, 1)
		})
	});
}
function BriefingScreen() {
	const night = useGame((s) => s.night);
	const players = useGame((s) => s.players);
	const goRole = useGame((s) => s.goRole);
	if (!night) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: goRole,
			children: "Sit down"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in space-y-6 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
						children: "The Muse"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-4xl italic",
						children: night.museLine
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: night.museWhy
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: night.rounds.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 rounded-[16px] bg-elevated p-3 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-subtle-fg",
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: r.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: r.blurb
						})] }), r.twist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: r.twist.label }) : null]
					}, r.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-medium text-muted",
					children: "On the roof"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: players.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestAvatar, {
							player: p,
							size: "sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm font-medium",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs text-muted",
								children: p.personaId ? PERSONAS[p.personaId].title : "You"
							})]
						})]
					}, p.id))
				})] })
			]
		})
	});
}
function RoleScreen() {
	const players = useGame((s) => s.players);
	const mode = useGame((s) => s.mode);
	const practiceType = useGame((s) => s.practiceType);
	const beginBoard = useGame((s) => s.beginBoard);
	const beginRound = useGame((s) => s.beginRound);
	const humans = players.filter((p) => p.kind === "human");
	const [cursor, setCursor] = (0, import_react.useState)(0);
	const [open, setOpen] = (0, import_react.useState)(mode !== "hotseat");
	const person = humans[cursor] ?? players[0];
	if (practiceType) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: beginRound,
			children: "Play"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
					children: "Practice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "No Echo tonight"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Hands only. The Muse is taking notes anyway."
				})
			]
		})
	});
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => setOpen(true),
			children: ["I'm ", person.name]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[60vh] flex-col items-center justify-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
					children: "Pass the device"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-5xl",
					children: person.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm text-muted",
					children: "Everyone else looks away. Then tap."
				})
			]
		})
	});
	const isEcho = person.role === "echo";
	const next = () => {
		if (cursor + 1 < humans.length) {
			setCursor(cursor + 1);
			setOpen(false);
		} else beginBoard();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: next,
			children: "Hide this · continue"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[60vh] flex-col items-center justify-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestAvatar, {
					player: person,
					size: "lg"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
					children: person.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-5xl",
					children: isEcho ? "You are the Echo" : "You belong here"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-sm text-sm text-muted",
					children: isEcho ? "Blend in. Sabotage quietly. Survive the last vote." : "Find the uninvited guest. Do not name them until the roof goes quiet."
				})
			]
		})
	});
}
function BoardScreen() {
	const night = useGame((s) => s.night);
	const players = useGame((s) => s.players);
	const beginRound = useGame((s) => s.beginRound);
	const softLine = useGame((s) => s.softLine);
	if (!night) return null;
	const plan = night.rounds[night.roundIndex];
	if (!plan) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		wide: true,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "lg",
			className: "w-full",
			onClick: beginRound,
			children: ["Start ", plan.title]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 pt-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
						children: [
							"Round ",
							night.roundIndex + 1,
							" of ",
							night.rounds.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-4xl",
						children: plan.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: plan.blurb
					}),
					plan.twist ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: plan.twist.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-muted",
							children: plan.twist.blurb
						})]
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-[24px] bg-elevated p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/rooftop.jpg",
						alt: "",
						crossOrigin: "anonymous",
						className: "absolute inset-0 size-full object-cover opacity-25"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative grid grid-cols-3 gap-2",
						children: night.rounds.map((r, i) => {
							const meta = ROUND_META[r.type];
							const here = i === night.roundIndex;
							const done = i < night.roundIndex;
							const guest = players[i % players.length];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex min-h-24 flex-col justify-between rounded-[16px] bg-bg/80 p-3", here && "ring-1 ring-accent", done && "opacity-50"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] uppercase tracking-[0.16em] text-subtle-fg",
									children: meta.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestAvatar, {
									player: guest,
									size: "sm"
								})]
							}, r.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[20px] bg-elevated p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
						children: "Soft info"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm italic text-fg",
						children: softLine
					})]
				})
			]
		})
	});
}
function InterludeScreen() {
	const night = useGame((s) => s.night);
	const continueInterlude = useGame((s) => s.continueInterlude);
	if (!night) return null;
	const last = night.log[night.log.length - 1];
	const next = night.rounds[night.roundIndex];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: continueInterlude,
			children: next ? "Back to the roof" : "Continue"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
					children: "Muse"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: last?.headline ?? "The lantern dips."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: next ? `Next is ${next.title}${next.twist ? ` with ${next.twist.label}` : ""}. Nobody sits this one out.` : "The list is closed. Time to point."
				}),
				last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-sm tabular-nums text-muted",
					children: ["Your take · ", Math.round(last.playerScore)]
				}) : null
			]
		})
	});
}
function AccuseScreen() {
	const players = useGame((s) => s.players);
	const night = useGame((s) => s.night);
	const accuse = useGame((s) => s.accuse);
	const confirmAccuse = useGame((s) => s.confirmAccuse);
	const youId = useGame((s) => s.youId);
	if (!night) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			disabled: !night.accusedId,
			onClick: confirmAccuse,
			children: "Point"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
					children: "Last call"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-4xl",
					children: "Who was not invited?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "One finger. No take-backs. Ghosts still count — nobody sat out."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: players.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => accuse(p.id),
					className: cn("flex w-full items-center gap-3 rounded-[16px] bg-elevated p-3 text-left shadow-[var(--shadow-border)]", night.accusedId === p.id && "ring-1 ring-accent"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestAvatar, {
						player: p,
						selected: night.accusedId === p.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "truncate font-medium",
							children: [p.name, p.id === youId ? " · you" : ""]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-xs tabular-nums text-muted",
							children: [
								p.score,
								" pts · sus ",
								Math.round(p.suspicion * 100)
							]
						})]
					})]
				}) }, p.id))
			})]
		})
	});
}
function RevealScreen() {
	const night = useGame((s) => s.night);
	const players = useGame((s) => s.players);
	const lastNotes = useGame((s) => s.lastNotes);
	const goTitle = useGame((s) => s.goTitle);
	const goArchive = useGame((s) => s.goArchive);
	const startNight = useGame((s) => s.startNight);
	const practiceType = useGame((s) => s.practiceType);
	if (!night) return null;
	const echo = players.find((p) => p.id === echoIdOf(players));
	const accused = players.find((p) => p.id === night.accusedId);
	const win = night.winner === "guests";
	if (practiceType) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: goTitle,
			children: "Back"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl",
				children: "Hands warm."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: lastNotes[0] ?? "The Muse filed that away."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: goArchive,
				children: "Muse notes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => startNight(),
				children: "Another night"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
					children: win ? "Caught" : "Walked"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-5xl",
					children: win ? "The list holds" : "They left with the lantern"
				})] }),
				echo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 rounded-[20px] bg-elevated p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestAvatar, {
						player: echo,
						size: "lg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.16em] text-echo",
							children: "The Echo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-3xl",
							children: echo.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: echo.personaId ? PERSONAS[echo.personaId].bio : "You were never on the paper."
						}),
						accused && accused.id !== echo.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								"The finger landed on ",
								accused.name,
								"."
							]
						}) : null
					] })]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: [...players].sort((a, b) => b.score - a.score).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestAvatar, {
								player: p,
								size: "sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate text-sm",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm tabular-nums text-muted",
								children: p.score
							})
						]
					}, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[20px] bg-elevated p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: "Muse, after hours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2 text-sm",
						children: lastNotes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n }, n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm text-muted",
					onClick: goTitle,
					children: "Close the roof"
				})
			]
		})
	});
}
function TimerBar({ seconds, running, onDone }) {
	const [left, setLeft] = (0, import_react.useState)(seconds);
	const done = (0, import_react.useRef)(false);
	const onDoneRef = (0, import_react.useRef)(onDone);
	onDoneRef.current = onDone;
	(0, import_react.useEffect)(() => {
		setLeft(seconds);
		done.current = false;
	}, [seconds, running]);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		let raf = 0;
		const start = performance.now();
		const tick = (now) => {
			const elapsed = (now - start) / 1e3;
			const remain = Math.max(0, seconds - elapsed);
			setLeft(remain);
			if (remain <= 0) {
				if (!done.current) {
					done.current = true;
					sfxPlay.fail();
					onDoneRef.current();
				}
				return;
			}
			if (remain < 3 && Math.floor(remain * 4) !== Math.floor((remain + .016) * 4)) sfxPlay.tick();
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [running, seconds]);
	const pct = Math.max(0, Math.min(1, left / seconds));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 flex-1 overflow-hidden rounded-full bg-subtle",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full bg-accent", left < 3 && "bg-echo"),
				style: { width: `${pct * 100}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-8 text-right font-mono text-xs tabular-nums text-muted",
			children: Math.ceil(left)
		})]
	});
}
function RumorRound({ onSettle }) {
	const rumor = useGame((s) => s.runtime.rumor);
	const setRuntime = useGame((s) => s.setRuntime);
	const you = useGame((s) => s.players.find((p) => p.id === s.youId));
	if (!rumor || !you) return null;
	const pick = (i) => {
		if (rumor.finished) return;
		sfxPlay.tap();
		const next = applyRumorPick(rumor, i);
		setRuntime({ rumor: next });
		if (next.finished) {
			const { score, leak } = rumorScore(next, you.role === "echo");
			const headline = next.result === "poison" ? "Someone touched the poison word." : next.result === "hit" ? `${you.name} walked the rumor clean.` : "The rumor went cold.";
			window.setTimeout(() => onSettle(score, leak, headline), 480);
		}
	};
	const lockIn = () => {
		if (rumor.finished) return;
		const next = {
			...rumor,
			finished: true,
			result: rumor.picked.length ? rumor.result : "neutral"
		};
		setRuntime({ rumor: next });
		const { score, leak } = rumorScore(next, you.role === "echo");
		onSettle(score, leak, "They stopped talking.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[20px] bg-elevated p-4 text-center shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [rumor.speakerName, " says"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl italic",
						children: rumor.clue
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-xs text-subtle-fg",
						children: ["for ", rumor.clueCount]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: rumor.words.map((w, i) => {
					const chosen = rumor.picked.includes(i);
					const showKey = rumor.finished && (rumor.party.includes(i) || rumor.poison.includes(i));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: rumor.finished,
						onClick: () => pick(i),
						className: cn("h-14 rounded-[12px] bg-subtle text-sm font-medium shadow-[var(--shadow-border)]", chosen && "ring-1 ring-accent", showKey && rumor.party.includes(i) && "bg-ok/20", showKey && rumor.poison.includes(i) && "bg-echo/30"),
						children: w
					}, `${w}-${i}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "w-full",
				onClick: lockIn,
				disabled: rumor.finished,
				children: "End guess"
			}),
			you.role === "echo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-echo",
				children: "You want the poison. Don't look hungry."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-muted",
				children: "Party words score. Neutral stops you. Poison is the Echo's trap."
			})
		]
	});
}
function SketchRound({ onSettle }) {
	const sketch = useGame((s) => s.runtime.sketch);
	const setRuntime = useGame((s) => s.setRuntime);
	const canvasRef = (0, import_react.useRef)(null);
	const drawing = (0, import_react.useRef)(false);
	const strokes = (0, import_react.useRef)(0);
	const [inked, setInked] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const c = canvasRef.current;
		if (!c) return;
		const ctx = c.getContext("2d");
		if (!ctx) return;
		const resize = () => {
			const r = c.getBoundingClientRect();
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			c.width = r.width * dpr;
			c.height = r.height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.strokeStyle = "#f4f4f0";
			ctx.lineWidth = 3.2;
		};
		resize();
	}, []);
	const pos = (e) => {
		const r = e.currentTarget.getBoundingClientRect();
		return {
			x: e.clientX - r.left,
			y: e.clientY - r.top
		};
	};
	const down = (e) => {
		if (sketch?.phase !== "draw") return;
		drawing.current = true;
		e.currentTarget.setPointerCapture(e.pointerId);
		const ctx = e.currentTarget.getContext("2d");
		if (!ctx) return;
		const p = pos(e);
		ctx.beginPath();
		ctx.moveTo(p.x, p.y);
	};
	const move = (e) => {
		if (!drawing.current) return;
		const ctx = e.currentTarget.getContext("2d");
		if (!ctx) return;
		const p = pos(e);
		ctx.lineTo(p.x, p.y);
		ctx.stroke();
		strokes.current += 1;
		setInked(true);
	};
	const up = () => {
		drawing.current = false;
	};
	if (!sketch) return null;
	const toGuess = () => {
		sfxPlay.whoosh();
		setRuntime({ sketch: {
			...sketch,
			phase: "guess",
			strokeCount: strokes.current
		} });
	};
	const pick = (g) => {
		if (sketch.pickedGuess) return;
		sfxPlay.tap();
		const correct = g === sketch.correctGuess;
		const leak = sketch.isFakeArtist ? correct ? .22 : .04 : 0;
		const score = correct ? inked ? 82 : 40 : 18;
		setRuntime({ sketch: {
			...sketch,
			phase: "done",
			pickedGuess: g
		} });
		window.setTimeout(() => onSettle(score, leak, correct ? "The room read the drawing." : "The drawing lied, or the reader did."), 500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: sketch.phase === "draw" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center font-display text-2xl",
				children: sketch.prompt
			}),
			sketch.isFakeArtist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-echo",
				children: "This is the fake title. Draw like you belong."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-muted",
				children: "One picture. Don't over-explain."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-56 w-full touch-none rounded-[20px] bg-subtle shadow-[var(--shadow-border)]",
				onPointerDown: down,
				onPointerMove: move,
				onPointerUp: up,
				onPointerCancel: up
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				variant: "secondary",
				onClick: toGuess,
				children: "That's the picture"
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "What did the table actually try to draw?"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-2",
			children: sketch.guessOptions.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => pick(g),
				className: cn("rounded-[14px] bg-elevated px-4 py-3 text-left text-sm shadow-[var(--shadow-border)]", sketch.pickedGuess === g && "ring-1 ring-accent", sketch.phase === "done" && g === sketch.correctGuess && "bg-ok/20"),
				children: g
			}, g))
		})] })
	});
}
function PulseRound({ seconds, onSettle }) {
	const pulse = useGame((s) => s.runtime.pulse);
	const setRuntime = useGame((s) => s.setRuntime);
	const you = useGame((s) => s.players.find((p) => p.id === s.youId));
	const [left, setLeft] = (0, import_react.useState)(seconds);
	const answered = (0, import_react.useRef)(false);
	const pulseRef = (0, import_react.useRef)(pulse);
	const youRef = (0, import_react.useRef)(you);
	const settleRef = (0, import_react.useRef)(onSettle);
	pulseRef.current = pulse;
	youRef.current = you;
	settleRef.current = onSettle;
	const index = pulse?.index ?? 0;
	(0, import_react.useEffect)(() => {
		if (!pulseRef.current || pulseRef.current.finished) return;
		answered.current = false;
		setLeft(seconds);
		let raf = 0;
		const start = performance.now();
		const tick = (now) => {
			const remain = Math.max(0, seconds - (now - start) / 1e3);
			setLeft(remain);
			if (remain <= 0) {
				if (!answered.current) answer(null);
				return;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
		function answer(n) {
			const current = pulseRef.current;
			const me = youRef.current;
			if (!current || current.finished || answered.current || !me) return;
			answered.current = true;
			const q = current.questions[current.index];
			if (!q) return;
			if (n === q.correct) sfxPlay.success();
			else sfxPlay.fail();
			const picked = current.picked.slice();
			picked[current.index] = n;
			if (current.index >= current.questions.length - 1) {
				setRuntime({ pulse: {
					...current,
					picked,
					finished: true,
					index: current.index
				} });
				const { score, leak } = scorePulse(picked, current.questions, me.role === "echo");
				settleRef.current(score, leak, score > 70 ? "The lantern liked your tempo." : "The questions got ahead of you.");
			} else setRuntime({ pulse: {
				...current,
				picked,
				index: current.index + 1
			} });
		}
	}, [
		index,
		seconds,
		setRuntime
	]);
	if (!pulse || !you) return null;
	const q = pulse.questions[pulse.index];
	if (!q) return null;
	const pick = (n) => {
		if (pulse.finished || answered.current) return;
		answered.current = true;
		if (n === q.correct) sfxPlay.success();
		else sfxPlay.fail();
		const picked = pulse.picked.slice();
		picked[pulse.index] = n;
		if (pulse.index >= pulse.questions.length - 1) {
			setRuntime({ pulse: {
				...pulse,
				picked,
				finished: true,
				index: pulse.index
			} });
			const { score, leak } = scorePulse(picked, pulse.questions, you.role === "echo");
			onSettle(score, leak, score > 70 ? "The lantern liked your tempo." : "The questions got ahead of you.");
		} else setRuntime({ pulse: {
			...pulse,
			picked,
			index: pulse.index + 1
		} });
	};
	const pct = left / seconds;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 flex-1 overflow-hidden rounded-full bg-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full bg-accent", left < 3 && "bg-echo"),
						style: { width: `${pct * 100}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs tabular-nums text-muted",
					children: [
						pulse.index + 1,
						"/",
						pulse.questions.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: q.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-2",
				children: q.answers.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => pick(i),
					className: "min-h-12 rounded-[14px] bg-elevated px-4 py-3 text-left text-sm shadow-[var(--shadow-border)] active:scale-[0.98]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 font-mono text-xs text-subtle-fg",
						children: [
							"A",
							"B",
							"C",
							"D"
						][i]
					}), a]
				}, a))
			})
		]
	});
}
function HeatRound({ onSettle }) {
	const heat = useGame((s) => s.runtime.heat);
	const setRuntime = useGame((s) => s.setRuntime);
	const settled = (0, import_react.useRef)(false);
	if (!heat) return null;
	const finish = (result) => {
		if (heat.finished || settled.current) return;
		settled.current = true;
		const score = result === "perfect" ? 100 : result === "good" ? 64 : 18;
		setRuntime({ heat: {
			...heat,
			finished: true,
			result
		} });
		if (result === "miss") sfxPlay.fail();
		else sfxPlay.success();
		onSettle(score, result === "miss" ? .12 : .02, result === "perfect" ? "Hands like a bartender." : result === "good" ? "Close enough to stay invited." : "The roof saw you flinch.");
	};
	if (!heat.started) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: heat.kind === "lantern" ? "Tap when the lantern is brightest. Not early. Not late." : heat.kind === "sequence" ? "Watch the glasses. Repeat the order." : "Follow the ring. Tap the cup that hid it."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "w-full",
			onClick: () => {
				sfxPlay.round();
				setRuntime({ heat: {
					...heat,
					started: true
				} });
			},
			children: "I'm ready"
		})]
	});
	if (heat.kind === "lantern") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lantern, {
		finish,
		peak: Number(heat.payload.peakAt),
		window: Number(heat.payload.window)
	});
	if (heat.kind === "sequence") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequence, {
		finish,
		seq: heat.payload.seq
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cups, {
		finish,
		ballStart: Number(heat.payload.ball)
	});
}
function Lantern({ finish, peak, window }) {
	const [t, setT] = (0, import_react.useState)(0);
	const fired = (0, import_react.useRef)(false);
	const finishRef = (0, import_react.useRef)(finish);
	finishRef.current = finish;
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const start = performance.now();
		const loop = (now) => {
			const u = Math.min(1, (now - start) / 2800);
			setT(u);
			if (u >= 1) {
				if (!fired.current) {
					fired.current = true;
					finishRef.current("miss");
				}
				return;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	const glow = Math.max(0, 1 - Math.abs(t - peak) / .28);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "relative flex h-64 w-full items-center justify-center overflow-hidden rounded-[24px] bg-elevated",
		onClick: () => {
			if (fired.current) return;
			fired.current = true;
			const dist = Math.abs(t - peak);
			finish(dist < window * .55 ? "perfect" : dist < window * 1.4 ? "good" : "miss");
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-28 rounded-full bg-accent",
			style: {
				opacity: .15 + glow * .85,
				transform: `scale(${.7 + glow * .55})`
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute bottom-4 text-xs text-muted",
			children: "Tap the peak"
		})]
	});
}
function Sequence({ finish, seq }) {
	const [lit, setLit] = (0, import_react.useState)(null);
	const [input, setInput] = (0, import_react.useState)([]);
	const [listen, setListen] = (0, import_react.useState)(false);
	const finishRef = (0, import_react.useRef)(finish);
	finishRef.current = finish;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const play = async () => {
			for (let i = 0; i < seq.length; i++) {
				if (cancelled) return;
				setLit(seq[i]);
				sfxPlay.tock();
				await wait(320);
				setLit(null);
				await wait(140);
			}
			if (!cancelled) setListen(true);
		};
		play();
		return () => {
			cancelled = true;
		};
	}, [seq]);
	const tap = (i) => {
		if (!listen) return;
		sfxPlay.tap();
		const next = [...input, i];
		setInput(next);
		const idx = next.length - 1;
		if (next[idx] !== seq[idx]) {
			finishRef.current("miss");
			return;
		}
		if (next.length === seq.length) finishRef.current("perfect");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-2",
		children: [
			0,
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => tap(i),
			className: cn("h-24 rounded-[16px] bg-subtle shadow-[var(--shadow-border)]", lit === i && "bg-accent")
		}, i))
	});
}
function Cups({ finish, ballStart }) {
	const [order, setOrder] = (0, import_react.useState)([
		0,
		1,
		2
	]);
	const [ball, setBall] = (0, import_react.useState)(ballStart);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [show, setShow] = (0, import_react.useState)(true);
	const finishRef = (0, import_react.useRef)(finish);
	finishRef.current = finish;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const run = async () => {
			await wait(700);
			if (cancelled) return;
			setShow(false);
			const o = [
				0,
				1,
				2
			];
			let b = ballStart;
			for (let s = 0; s < 5; s++) {
				const a = s % 2;
				const c = a + 1;
				sfxPlay.tock();
				const tmp = o[a];
				o[a] = o[c];
				o[c] = tmp;
				if (b === a) b = c;
				else if (b === c) b = a;
				setOrder([...o]);
				setBall(b);
				await wait(280);
			}
			if (!cancelled) setBusy(false);
		};
		run();
		return () => {
			cancelled = true;
		};
	}, [ballStart]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center gap-3 pt-6",
		children: order.map((cup, visual) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			disabled: busy,
			onClick: () => finishRef.current(visual === ball ? "perfect" : "miss"),
			className: "relative flex h-32 w-20 flex-col items-center justify-end rounded-[16px] bg-elevated shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-3 text-xs text-muted",
				children: visual + 1
			}), show && visual === ballStart ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-6 size-4 rounded-full bg-accent" }) : null]
		}, cup))
	});
}
function wait(ms) {
	return new Promise((r) => window.setTimeout(r, ms));
}
function TellRound({ onSettle }) {
	const tell = useGame((s) => s.runtime.tell);
	const setRuntime = useGame((s) => s.setRuntime);
	const players = useGame((s) => s.players);
	if (!tell) return null;
	const echo = echoIdOf(players);
	const pick = (id) => {
		sfxPlay.vote();
		setRuntime({ tell: {
			...tell,
			accusedId: id
		} });
	};
	const lock = () => {
		if (!tell.accusedId || tell.finished) return;
		const statement = tell.statements.find((s) => s.speakerId === tell.accusedId);
		const hitEcho = tell.accusedId === echo;
		const hitLie = statement?.isLie ?? false;
		const score = hitEcho ? 90 : hitLie ? 55 : 20;
		const leak = hitEcho ? .18 : .04;
		setRuntime({ tell: {
			...tell,
			finished: true
		} });
		onSettle(score, leak, hitEcho ? "You pointed at the uninvited one." : hitLie ? "You caught a lie. Not necessarily the Echo." : "That was a true thing, said by a nervous guest.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Four remarks. Point at the one that does not sit right."
			}),
			tell.statements.map((s) => {
				const speaker = players.find((p) => p.id === s.speakerId);
				if (!speaker) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => pick(s.speakerId),
					className: cn("flex w-full gap-3 rounded-[16px] bg-elevated p-3 text-left shadow-[var(--shadow-border)]", tell.accusedId === s.speakerId && "ring-1 ring-accent"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestAvatar, {
						player: speaker,
						size: "sm",
						selected: tell.accusedId === s.speakerId
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: s.speakerName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: s.text
					})] })]
				}, s.speakerId);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				disabled: !tell.accusedId || tell.finished,
				onClick: lock,
				children: "That's the tell"
			})
		]
	});
}
var COLOR = {
	bone: "bg-look-bone",
	rust: "bg-look-rust",
	sage: "bg-look-sage",
	slate: "bg-look-slate"
};
function WireRound({ onSettle }) {
	const wire = useGame((s) => s.runtime.wire);
	const setRuntime = useGame((s) => s.setRuntime);
	const start = (0, import_react.useRef)(null);
	const [holding, setHolding] = (0, import_react.useState)(false);
	if (!wire) return null;
	const pairOk = Object.keys(wire.connected).length === wire.left.length;
	const tapLeft = (c) => {
		if (wire.swipePhase) return;
		sfxPlay.tap();
		setRuntime({ wire: {
			...wire,
			selectedLeft: c
		} });
	};
	const tapRight = (c) => {
		if (!wire.selectedLeft || wire.swipePhase) return;
		sfxPlay.tock();
		const connected = {
			...wire.connected,
			[wire.selectedLeft]: c
		};
		const done = Object.keys(connected).length === wire.left.length;
		setRuntime({ wire: {
			...wire,
			connected,
			selectedLeft: null,
			swipePhase: done
		} });
	};
	const swipeStart = () => {
		start.current = performance.now();
		setHolding(true);
	};
	const swipeEnd = () => {
		if (start.current == null) return;
		const dt = performance.now() - start.current;
		setHolding(false);
		let swipeResult = "ok";
		if (dt < 280) swipeResult = "fast";
		else if (dt > 900) swipeResult = "slow";
		sfxPlay[swipeResult === "ok" ? "success" : "fail"]();
		const next = {
			...wire,
			swipeResult,
			finished: true
		};
		setRuntime({ wire: next });
	};
	const spot = (yes) => {
		const correct = yes;
		const wires = pairOk ? 40 : 10;
		const swipe = wire.swipeResult === "ok" ? 40 : 10;
		const cam = correct ? 20 : 0;
		onSettle(wires + swipe + cam, correct ? .16 : .05, correct ? `The cam caught ${wire.glitchGuest}.` : "The cables are done. The Echo is still on the roof.");
	};
	if (wire.finished && wire.swipeResult) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Security cam"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"One guest mismatched a pair on purpose. Was it ",
					wire.glitchGuest,
					"?"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => spot(true),
					children: "That's the glitch"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => spot(false),
					children: "Not them"
				})]
			})
		]
	});
	if (wire.swipePhase) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Hold the keycard. Release in the middle — not a slap, not a linger."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onPointerDown: swipeStart,
			onPointerUp: swipeEnd,
			onPointerCancel: swipeEnd,
			className: cn("flex h-28 w-full items-center justify-center rounded-[20px] bg-elevated text-sm shadow-[var(--shadow-border)]", holding && "bg-accent text-accent-fg"),
			children: holding ? "Release…" : "Hold to swipe"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Match left to right. Color to color. Then the keycard."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: wire.left.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => tapLeft(c),
					className: cn("flex h-12 w-full items-center gap-2 rounded-[12px] bg-subtle px-3", wire.selectedLeft === c && "ring-1 ring-accent", wire.connected[c] && "opacity-40"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-4 rounded-full", COLOR[c]) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm capitalize",
						children: c
					})]
				}, `l-${c}`))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: wire.right.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => tapRight(c),
					className: "flex h-12 w-full items-center justify-end gap-2 rounded-[12px] bg-subtle px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm capitalize",
						children: c
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-4 rounded-full", COLOR[c]) })]
				}, `r-${c}`))
			})]
		})]
	});
}
function RoundHost() {
	const night = useGame((s) => s.night);
	const finishRound = useGame((s) => s.finishRound);
	const [locked, setLocked] = (0, import_react.useState)(false);
	if (!night) return null;
	const plan = night.rounds[night.roundIndex];
	if (!plan) return null;
	const settle = (0, import_react.useCallback)((score, leak, headline) => {
		if (locked) return;
		setLocked(true);
		finishRound(score, leak, headline);
	}, [finishRound, locked]);
	const onTimeout = () => {
		settle(12, .08, `${plan.title} ran out of lantern.`);
	};
	const pulse = plan.type === "pulse";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 pt-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-subtle-fg",
					children: plan.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: plan.blurb
				})] }), plan.twist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: plan.twist.label }) : null]
			}),
			!pulse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerBar, {
				seconds: plan.seconds,
				running: !locked,
				onDone: onTimeout
			}) : null,
			plan.type === "rumor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RumorRound, { onSettle: settle }) : null,
			plan.type === "sketch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SketchRound, {
				seconds: plan.seconds,
				onSettle: settle
			}) : null,
			plan.type === "pulse" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PulseRound, {
				seconds: plan.seconds,
				onSettle: settle
			}) : null,
			plan.type === "heat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatRound, { onSettle: settle }) : null,
			plan.type === "tell" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TellRound, { onSettle: settle }) : null,
			plan.type === "wire" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WireRound, { onSettle: settle }) : null
		]
	}) });
}
function GameApp() {
	const hydrate = useGame((s) => s.hydrate);
	const hydrated = useGame((s) => s.hydrated);
	const phase = useGame((s) => s.phase);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
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
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-bg" });
	switch (phase) {
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {});
		case "setup": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupScreen, {});
		case "archive": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveScreen, {});
		case "practice": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeScreen, {});
		case "briefing": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingScreen, {});
		case "role": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleScreen, {});
		case "board": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardScreen, {});
		case "round": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundHost, {});
		case "interlude": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterludeScreen, {});
		case "accuse": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccuseScreen, {});
		case "reveal": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealScreen, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {});
	}
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
