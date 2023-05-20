#!/bin/bash

echo "Testing production build..."

npm run build

echo "Running git add ."
git add .

echo "Running git commit..."
read -p "Enter commit description: " description

git commit -m "$description"

echo "Pushing to Azure DevOps remote repository..."
git push -u azure-devops master

echo "Pushing to Github remote repository..."
git push -u github-prod master