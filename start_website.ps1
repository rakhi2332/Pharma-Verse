Write-Host "Launching PharmaVerse AI Application..." -ForegroundColor Cyan

$backendPath = "c:\Users\P MALLESH YADAV\OneDrive\Desktop\pharma AI\backend"
$frontendPath = "c:\Users\P MALLESH YADAV\OneDrive\Desktop\pharma AI\frontend"

Write-Host "Starting Backend API Server (Port 5000)..." -ForegroundColor Yellow
Start-Process cmd -ArgumentList "/k node server.js" -WorkingDirectory $backendPath

Write-Host "Starting Frontend Dev Server (Port 5173)..." -ForegroundColor Yellow
Start-Process cmd -ArgumentList "/k npm.cmd run dev" -WorkingDirectory $frontendPath

Write-Host "Waiting 5 seconds for servers to start..." -ForegroundColor Gray
Start-Sleep -Seconds 5

Write-Host "Opening http://localhost:5173/login in browser..." -ForegroundColor Green
Start-Process "http://localhost:5173/login"
