

echo Exécution de la commande 'ionic build'...
ionic build

echo.
echo Copie du fichier index.html vers 404.html...
copy "www\index.html" "www\404.html"

echo.
echo Exécution de la commande 'firebase deploy'...
firebase deploy

echo.
echo Tâches terminées.
pause