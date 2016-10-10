#!/bin/bash

echo enter commit message
read COMMIT_MESSAGE
echo "npm run build"
npm run build

echo "git add -A"
git add -A

echo "git commit -m '$COMMIT_MESSAGE'"
git commit -m "new commit"

echo "git push heroku master"
git push heroku master
