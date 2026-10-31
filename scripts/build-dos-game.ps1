param([Parameter(Mandatory=$true)][string]$NasmPath)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path -LiteralPath $NasmPath -PathType Leaf)) { throw 'Informe o caminho para NASM 2.16.03.' }
& $NasmPath -f bin games-source/disquete-perdido/game.asm -o public/emulation/DISQUETE.COM
if ($LASTEXITCODE -ne 0) { throw 'Falha de compilação do jogo original.' }
Get-FileHash -LiteralPath public/emulation/DISQUETE.COM -Algorithm SHA256
