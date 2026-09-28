type Bus = "master" | "sfx" | "music";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfx: GainNode | null = null;
let music: GainNode | null = null;
let unlocked = false;
let muted = false;

function ensure() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC({ latencyHint: "interactive" });
    master = ctx.createGain();
    sfx = ctx.createGain();
    music = ctx.createGain();
    sfx.connect(master);
    music.connect(master);
    master.connect(ctx.destination);
    master.gain.value = muted ? 0 : 0.85;
    sfx.gain.value = 0.7;
    music.gain.value = 0.22;
  }
  return ctx;
}

export function unlockAudio() {
  const c = ensure();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  unlocked = true;
}

export function setMuted(next: boolean) {
  muted = next;
  if (!master || !ctx) return;
  master.gain.setTargetAtTime(next ? 0 : 0.85, ctx.currentTime, 0.03);
}

export function isUnlocked() {
  return unlocked;
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType = "sine",
  gain = 0.12,
  bus: Bus = "sfx",
  slide?: number,
) {
  const c = ensure();
  if (!c || !sfx || !music || muted) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slide), c.currentTime + dur);
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(g);
  g.connect(bus === "music" ? music : sfx);
  osc.start();
  osc.stop(c.currentTime + dur + 0.02);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

function noise(dur: number, gain = 0.04) {
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

export const sfxPlay = {
  tick: () => tone(880, 0.05, "square", 0.04),
  tock: () => tone(520, 0.06, "square", 0.035),
  tap: () => {
    tone(240, 0.05, "triangle", 0.08);
    noise(0.04, 0.03);
  },
  success: () => {
    tone(523, 0.09, "sine", 0.08);
    tone(784, 0.14, "sine", 0.07);
  },
  fail: () => tone(180, 0.22, "sawtooth", 0.06, "sfx", 90),
  whoosh: () => {
    tone(420, 0.18, "sine", 0.04, "sfx", 180);
    noise(0.12, 0.03);
  },
  vote: () => tone(330, 0.16, "triangle", 0.07),
  muse: () => {
    tone(392, 0.2, "sine", 0.05);
    tone(494, 0.28, "sine", 0.045);
    tone(587, 0.36, "sine", 0.04);
  },
  reveal: () => {
    tone(196, 0.4, "triangle", 0.08, "sfx", 110);
    noise(0.3, 0.05);
  },
  round: () => {
    tone(262, 0.12, "sine", 0.06);
    tone(392, 0.18, "sine", 0.05);
  },
};
