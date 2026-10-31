$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Instale Node.js 22.12+ e reabra o terminal.' }
if (-not (Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) { throw 'Execute INSTALAR.cmd primeiro.' }
Write-Host 'RETRO OS 003L INTEGRAÇÃO privado: http://127.0.0.1:4576 — sem backend social'
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4576 --strictPort
