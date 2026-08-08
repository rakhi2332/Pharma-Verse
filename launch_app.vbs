Set WshShell = CreateObject("WScript.Shell")
' Launch Backend API Server (Port 5000)
WshShell.Run "cmd /c cd /d ""c:\Users\P MALLESH YADAV\OneDrive\Desktop\pharma AI\backend"" && node server.js", 0, False
' Launch Frontend Vite Server (Port 5173)
WshShell.Run "cmd /c cd /d ""c:\Users\P MALLESH YADAV\OneDrive\Desktop\pharma AI\frontend"" && npm run dev", 0, False
' Wait 5 seconds for server initialization
WScript.Sleep 5000
' Open Default Web Browser to http://localhost:5173/login
WshShell.Run "http://localhost:5173/login", 1, False
