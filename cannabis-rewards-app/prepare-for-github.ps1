# Create a temporary directory
$tempDir = "cannabis-rewards-app-temp"
New-Item -ItemType Directory -Force -Path $tempDir

# Copy all necessary files
Copy-Item -Path "server.js" -Destination $tempDir
Copy-Item -Path "package.json" -Destination $tempDir
Copy-Item -Path "README.md" -Destination $tempDir
Copy-Item -Path "render.yaml" -Destination $tempDir
Copy-Item -Path "Procfile" -Destination $tempDir
Copy-Item -Path ".gitignore" -Destination $tempDir

# Create and copy models directory
New-Item -ItemType Directory -Force -Path "$tempDir/models"
Copy-Item -Path "models/*" -Destination "$tempDir/models"

# Create and copy routes directory
New-Item -ItemType Directory -Force -Path "$tempDir/routes"
Copy-Item -Path "routes/*" -Destination "$tempDir/routes"

# Create and copy client directory
New-Item -ItemType Directory -Force -Path "$tempDir/client"
Copy-Item -Path "client/src" -Destination "$tempDir/client" -Recurse
Copy-Item -Path "client/package.json" -Destination "$tempDir/client"
Copy-Item -Path "client/public" -Destination "$tempDir/client" -Recurse

# Create zip file
Compress-Archive -Path $tempDir -DestinationPath "cannabis-rewards-app.zip" -Force

# Clean up
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "Project has been prepared and zipped as 'cannabis-rewards-app.zip'"
Write-Host "You can now upload this zip file to GitHub" 