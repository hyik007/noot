import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { render, moodForExit, MOODS } from "../src/penguin.js";
import { record, load, level } from "../src/stats.js";

test("moodForExit", () => {
  assert.equal(moodForExit(0), "happy");
  assert.equal(moodForExit(2), "angry");
});

test("render includes message and no ansi when color off", () => {
  const s = render("angry", "hello", { color: false });
  assert.match(s, /hello/);
  assert.doesNotMatch(s, /\x1b\[/);
});

test("every mood renders", () => {
  for (const m of Object.keys(MOODS)) assert.ok(render(m, "x", { color: false }).length > 20);
});

test("stats streak and level", () => {
  const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "noot-")), "s.json");
  record("win", f); record("win", f); record("fail", f); record("win", f);
  const s = load(f);
  assert.equal(s.wins, 3);
  assert.equal(s.fails, 1);
  assert.equal(s.streak, 1);
  assert.equal(s.bestStreak, 2);
  assert.ok(level(s).lv >= 1);
});
