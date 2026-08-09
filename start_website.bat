@echo off
title Launching PharmaVerse AI Platform
echo ====================================================================
echo        PHARMAVERSE B.PHARMACY AI PLATFORM — ONE-CLICK LAUNCHER
echo ====================================================================
echo.

echo [1/3] Starting Backend API Server (Port 5000)...
cd /d "c:\Users\P MALLESH YADAV\OneDrive\Desktop\pharma AI\backend"
start "PharmaVerse Backend API" cmd /k "node server.js"

echo.
echo [2/3] Starting Frontend Dev Server (Port 5173)...
cd /d "c:\Users\P MALLESH YADAV\OneDrive\Desktop\pharma AI\frontend"
start "PharmaVerse Frontend Dev" cmd /k "npx --no-install vite --port 5173 --host"

echo.
echo [3/3] Waiting 4 seconds for servers to initialize...
timeout /t 4 /nobreak >nul

echo.
echo Opening browser to http://localhost:5173/login ...
start http://localhost:5173/login

exit
