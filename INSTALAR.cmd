@echo off
cd /d "%~dp0"
powershell -NoProfile -File scripts\install.ps1
pause
