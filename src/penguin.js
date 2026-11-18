// Penguin art + personality. Zero dependencies.
const c = (code, s, on) => (on ? `\x1b[${code}m${s}\x1b[0m` : s);

export const MOODS = {
  happy: {
    eyes: "o o",
    beak: "v",
    lines: ["Noot noot!", "Noot noot noot~", "Nice. Noot.", "Clean run. Noot noot!", "You're doing great. Noot!"],
  },
  angry: {
    eyes: "> <",
    beak: "M",
    lines: ["NOOT NOOT!!!", "NOOT. NOOT. NOOT.", "That broke. Noot.", "Have you tried reading the error? NOOT!", "Not my fault. NOOT!"],
  },
  sad: {
    eyes: "; ;",
    beak: "v",
    lines: ["noot... :(", "It's ok. Try again. noot.", "*sad flipper noises*"],
  },
  sleepy: {
    eyes: "- -",
    beak: "v",
    lines: ["zzz... noot...", "Go to sleep. It's late. noot.", "Commit and rest. noot."],
  },
  proud: {
    eyes: "^ ^",
    beak: "v",
    lines: ["Committed! NOOT NOOT!", "Ship it. Noot noot!", "Another commit for the pile. Noot!"],
  },
};

export function pick(arr, rnd = Math.random) {
  return arr[Math.floor(rnd() * arr.length)];
}

export function render(mood = "happy", message, { color = true } = {}) {
  const m = MOODS[mood] || MOODS.happy;
  const msg = message ?? pick(m.lines);
  const w = Math.max(msg.length, 4);
  const bubble = [
    " " + "_".repeat(w + 2),
    "< " + msg.padEnd(w) + " >",
    " " + "-".repeat(w + 2),
  ];
  const body = c(90, "", false);
  const art = [
    `      ${c(90, "  .--.", color)}`,
    `      ${c(90, " ( ", color)}${c(97, m.eyes, color)}${c(90, " )", color)}`,
    `      ${c(90, " /", color)}${c(93, m.beak, color)}${c(90, "\\", color)}`,
    `      ${c(90, "/ ", color)}${c(97, "||", color)}${c(90, " \\", color)}`,
    `     ${c(90, "(  ", color)}${c(97, "||", color)}${c(90, "  )", color)}`,
    `      ${c(33, "_", color)}${c(90, "\\", color)}${c(97, "||", color)}${c(90, "/", color)}${c(33, "_", color)}`,
    `     ${c(33, "(_/  \\_)", color)}`,
  ];
  void body;
  return [...bubble, "   \\", ...art].join("\n");
}

export function moodForExit(code) {
  return code === 0 ? "happy" : "angry";
}
