$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Instale o Node.js LTS (22 ou superior) em https://nodejs.org/ e reabra o PowerShell.' }
if (Get-Command npm -ErrorAction SilentlyContinue) { npm install }
elseif (Get-Command pnpm -ErrorAction SilentlyContinue) { pnpm install --frozen-lockfile }
else {
  $bundledPnpm = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pnpm/bin/pnpm.cjs'
  if (Test-Path -LiteralPath $bundledPnpm) { node $bundledPnpm install --frozen-lockfile }
  else { throw 'Instale npm (incluído no Node.js) ou pnpm para continuar.' }
}
if ($LASTEXITCODE -ne 0) { throw 'A instalação falhou. Consulte a saída acima.' }
