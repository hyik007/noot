import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const statsFile = () => process.env.NOOT_STATS || path.join(os.homedir(), ".noot.json");

export function load(file = statsFile()) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return { wins: 0, fails: 0, commits: 0, streak: 0, bestStreak: 0 };
  }
}

export function record(kind, file = statsFile()) {
  const s = load(file);
  if (kind === "win") {
    s.wins++;
    s.streak++;
    s.bestStreak = Math.max(s.bestStreak, s.streak);
  } else if (kind === "fail") {
    s.fails++;
    s.streak = 0;
  } else if (kind === "commit") {
    s.commits++;
  }
  try {
    fs.writeFileSync(file, JSON.stringify(s, null, 2));
  } catch {
    /* read-only home: ignore */
  }
  return s;
}

export function level(s) {
  const xp = s.wins + s.commits * 2;
  const lv = Math.floor(Math.sqrt(xp / 2)) + 1;
  const title = ["Egg", "Chick", "Waddler", "Slider", "Ice Breaker", "Arctic Hacker", "Emperor"][Math.min(lv - 1, 6)];
  return { xp, lv, title };
}
