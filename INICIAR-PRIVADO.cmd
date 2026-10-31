@echo off
cd /d "%~dp0"
powershell -NoProfile -File scripts\start-private.ps1
pause
