$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) { throw 'Execute scripts/install.ps1 primeiro.' }
node node_modules/vite/bin/vite.js --host 127.0.0.1
