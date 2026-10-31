$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
$checks = @(@('node_modules/typescript/bin/tsc','--noEmit'), @('node_modules/eslint/bin/eslint.js','src'), @('node_modules/vitest/vitest.mjs','run'), @('node_modules/vite/bin/vite.js','build'))
foreach ($check in $checks) { node @check; if ($LASTEXITCODE -ne 0) { throw "Falha em $($check[0])" } }
node node_modules/@playwright/test/cli.js test --project=edge --project=chrome
if ($LASTEXITCODE -ne 0) { throw 'Falha nos testes Playwright.' }
