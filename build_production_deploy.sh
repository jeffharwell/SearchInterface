#!/bin/bash

echo "Switching to the production environment"
grunt production
echo "Building"
grunt build
echo "Back to Development"
grunt replace:development
echo "Pushing the new build to git"
git status
git add dist
git commit -m "New production build"
git push origin master
echo "Finished"
