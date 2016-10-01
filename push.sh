#!/bin/bash

echo "npm run build"
npm run build

echo "git add -A"
git add -A

echo "git commit -m 'new 'commit'"
git commit -m "new commit"

echo "git push heroku master"
git push heroku master
