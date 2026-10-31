param([string]$PrivateDataDirectory=(Join-Path (Split-Path $PSScriptRoot -Parent) '..\RETRO-OS-003N-FIX-PRIVATE'))
$ErrorActionPreference='Stop'
$root=Split-Path $PSScriptRoot -Parent
$resolved=(Resolve-Path -LiteralPath $PrivateDataDirectory).Path
if(-not (Test-Path -LiteralPath (Join-Path $resolved 'manifest.json'))){throw 'Manifesto de instalação privada ausente.'}
$env:RETRO_PRIVATE_GAMES_DIR=$resolved
Set-Location -LiteralPath $root
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4676 --strictPort
