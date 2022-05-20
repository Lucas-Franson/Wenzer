@ECHO OFF

ECHO Buildando backend...
cd wenzer_back
cmd /c "npm run build"

ECHO Buildando frontend...
cd ../wenzer_web
cmd /c "npm run build"

ECHO Finalizado