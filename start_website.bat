@echo off
title Launching PharmaVerse AI Platform
echo ====================================================================
echo        PHARMAVERSE B.PHARMACY AI PLATFORM — ONE-CLICK LAUNCHER
echo ====================================================================
echo.

echo [1/2] Starting Backend API Server (Port 5000)...
cd /d "c:\Users\P MALLESH YADAV\OneDrive\Desktop\pharma AI\backend"
start "PharmaVerse Backend API" cmd /k "node server.js"

echo.
echo [2/2] Starting Frontend Dev Server (Port 5173)...
cd /d "c:\Users\P MALLESH YADAV\OneDrive\Desktop\pharma AI\frontend"
start "PharmaVerse Frontend Dev" cmd /k "npm run dev"

echo.
echo Waiting 3 seconds for local servers to start...
timeout /t 3 /nobreak >nul

echo.
echo Opening Semester Notes in browser...
start http://localhost:5173/semesters

exit
