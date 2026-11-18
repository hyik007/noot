<div align="center">

# 🐧 noot

**A penguin that lives in your terminal.**
It cheers your wins, screams **NOOT NOOT** at your failures, and celebrates every commit.

[![CI](https://github.com/hyik007/noot/actions/workflows/ci.yml/badge.svg)](https://github.com/hyik007/noot/actions)
[![npm](https://img.shields.io/npm/v/noot-cli?color=38bdf8)](https://www.npmjs.com/package/noot-cli)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
![deps](https://img.shields.io/badge/dependencies-0-brightgreen)

</div>

```text
 _____________________
< Not my fault. NOOT! >
 ---------------------
   \
        .--.
       ( > < )
       /M\
      / || \
     (  ||  )
      _\||/_
     (_/  \_)
```

## Try it (no install)

```bash
npx noot-cli
npx noot-cli run npm test
```

## Why?

Terminals are cold. Failures hurt. A tiny penguin makes both better.

- **Zero dependencies**: one small Node.js CLI, works on Windows, macOS and Linux
- **Reacts to every failed command** via a one-line shell hook (bash, zsh, fish, PowerShell)
- **Git hook**: noot celebrates each `git commit`
- **Levels & streaks**: win streaks level your penguin up from *Egg* to *Emperor*
- **Moods**: happy, angry, sad, sleepy (late-night coding), proud

## Install

```bash
npm i -g noot-cli
```

## Usage

| Command | What it does |
| :-- | :-- |
| `noot` | Say hello (sleepy after midnight) |
| `noot say "ship it"` | Make noot say anything |
| `noot run <cmd>` | Run a command, then noot reacts to the exit code (exit code is preserved) |
| `noot init bash\|zsh\|fish\|powershell` | Print the shell hook so noot reacts to *every* failed command |
| `noot git-hook` | Install a post-commit hook in the current repo |
| `noot stats` | Level, streak, wins, fails |
| `noot moods` | See all moods |

### Make noot watch your shell

```bash
noot init zsh >> ~/.zshrc       # or bash / fish / powershell
```

### Cheer every commit

```bash
cd my-repo && noot git-hook
```

## Levels

`Egg → Chick → Waddler → Slider → Ice Breaker → Arctic Hacker → Emperor`

Wins give 1 XP, commits give 2 XP. Failures reset your streak (noot is not judging. noot is a little judging).

## Contributing

New moods, quips and shells are very welcome. Open a PR! Run `npm test`.

## License

MIT, made with 🐧 by [@hyik007](https://github.com/hyik007)

> If noot made you smile, a ⭐ keeps the penguin fed.
