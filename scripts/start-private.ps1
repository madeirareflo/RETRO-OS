$ErrorActionPreference = 'Stop'
$retroRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $retroRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Instale Node.js 24 ou superior.' }
if (-not (Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) { throw 'Instale as dependências: npx pnpm@11.25.0 install --frozen-lockfile' }
$retroBackend = Start-Process -FilePath (Get-Command node).Source -ArgumentList 'server/social.mjs' -WorkingDirectory $retroRoot -WindowStyle Hidden -PassThru
try {
    Start-Sleep -Milliseconds 700
    if ($retroBackend.HasExited) { throw 'O backend não iniciou. Verifique se a porta 4190 já está em uso.' }
    Write-Host 'RETRO OS 003E PRIVADO. Backend somente em 127.0.0.1:4190.'
    & node 'node_modules/vite/bin/vite.js' --host 127.0.0.1 --port 5173 --strictPort
} finally {
    if (-not $retroBackend.HasExited) { Stop-Process -Id $retroBackend.Id }
}
