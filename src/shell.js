// Shell integration snippets: noot reacts to failed commands automatically.
export const SNIPPETS = {
  bash: `# add to ~/.bashrc
__noot_prompt() { local c=$?; [ $c -ne 0 ] && noot react $c; return $c; }
PROMPT_COMMAND="__noot_prompt;\${PROMPT_COMMAND}"`,
  zsh: `# add to ~/.zshrc
__noot_precmd() { local c=$?; [ $c -ne 0 ] && noot react $c; }
precmd_functions+=(__noot_precmd)`,
  powershell: `# add to your $PROFILE
$global:__nootOldPrompt = $function:prompt
function global:prompt {
  if ($global:LASTEXITCODE -ne 0 -and $global:LASTEXITCODE -ne $null) { noot react $global:LASTEXITCODE; $global:LASTEXITCODE = 0 }
  & $global:__nootOldPrompt
}`,
  fish: `# add to ~/.config/fish/config.fish
function __noot_postexec --on-event fish_postexec
  set -l c $status
  test $c -ne 0; and noot react $c
end`,
};

export const GIT_HOOK = `#!/bin/sh
# installed by noot
noot react 0 --mood proud --commit || true
`;
