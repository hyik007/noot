#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { render, moodForExit, MOODS } from "../src/penguin.js";
import { record, load, level } from "../src/stats.js";
import { SNIPPETS, GIT_HOOK } from "../src/shell.js";

const args = process.argv.slice(2);
const cmd = args[0];
const color = process.stdout.isTTY && !process.env.NO_COLOR;
const out = (s) => process.stdout.write(s + "\n");
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};

const HELP = `noot - a penguin that lives in your terminal

Usage:
  noot                       say hello
  noot say <message>         make noot say something
  noot run <command...>      run a command; noot cheers or screams
  noot react <exit-code>     react to an exit code (used by shell hooks)
  noot init <shell>          print shell hook: bash | zsh | fish | powershell
  noot git-hook              install a post-commit hook in this repo
  noot stats                 show your noot level & streak
  noot moods                 show every mood

Env: NO_COLOR=1 disables colors, NOOT_STATS=<file> changes the stats file.`;

function celebrate(s) {
  const { lv, title } = level(s);
  if (s.streak > 0 && s.streak % 10 === 0) out(`  Streak x${s.streak}! You are now a Lv.${lv} ${title}.`);
}

async function main() {
  switch (cmd) {
    case undefined: {
      const h = new Date().getHours();
      out(render(h >= 0 && h < 5 ? "sleepy" : "happy", undefined, { color }));
      break;
    }
    case "-h":
    case "--help":
    case "help":
      out(HELP);
      break;
    case "-v":
    case "--version":
      out(JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url))).version);
      break;
    case "say":
      out(render("happy", args.slice(1).join(" ") || "Noot noot!", { color }));
      break;
    case "moods":
      for (const m of Object.keys(MOODS)) out(render(m, m, { color }) + "\n");
      break;
    case "react": {
      const code = parseInt(args[1] ?? "0", 10) || 0;
      const mood = flag("--mood") || moodForExit(code);
      const s = record(args.includes("--commit") ? "commit" : code === 0 ? "win" : "fail");
      out(render(mood, code === 0 ? undefined : `${MOODS.angry.lines[code % MOODS.angry.lines.length]} (exit ${code})`, { color }));
      celebrate(s);
      break;
    }
    case "run": {
      const rest = args.slice(1);
      if (!rest.length) return out("usage: noot run <command...>");
      const child = spawn(rest[0], rest.slice(1), { stdio: "inherit", shell: true });
      child.on("exit", (code) => {
        const c = code ?? 1;
        const s = record(c === 0 ? "win" : "fail");
        out(render(moodForExit(c), undefined, { color }));
        celebrate(s);
        process.exit(c);
      });
      break;
    }
    case "init": {
      const sh = args[1];
      if (!SNIPPETS[sh]) return out(`usage: noot init <${Object.keys(SNIPPETS).join("|")}>`);
      out(SNIPPETS[sh]);
      break;
    }
    case "git-hook": {
      const dir = path.join(process.cwd(), ".git", "hooks");
      if (!fs.existsSync(path.join(process.cwd(), ".git"))) return out("Not a git repo. noot is confused.");
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "post-commit"), GIT_HOOK, { mode: 0o755 });
      out(render("proud", "Hook installed. I'll cheer every commit!", { color }));
      break;
    }
    case "stats": {
      const s = load();
      const { xp, lv, title } = level(s);
      out(render("proud", `Lv.${lv} ${title}`, { color }));
      out(`\n  wins: ${s.wins}   fails: ${s.fails}   commits: ${s.commits}\n  streak: ${s.streak}   best: ${s.bestStreak}   xp: ${xp}`);
      break;
    }
    default:
      out(`noot doesn't know "${cmd}".\n\n${HELP}`);
      process.exitCode = 1;
  }
}

main();
