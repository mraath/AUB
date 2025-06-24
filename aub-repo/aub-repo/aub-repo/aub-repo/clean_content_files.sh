#!/bin/bash

# This script removes specific file types from the 'content' folder and its subfolders.
# It should be run from the root of your Git repository.

echo "Starting file cleanup in 'content' folder..."

# Define the target directory
CONTENT_DIR="content"

# Define the file extensions/names to remove
FILE_PATTERNS=("*.txt" "*.json" "*.hash" "desktop.ini")

# 1. Ensure the content directory exists
if [ ! -d "$CONTENT_DIR" ]; then
  echo "Error: The '$CONTENT_DIR' directory does not exist. Exiting."
  exit 1
fi

# 2. Find and remove the specified files
echo "Searching for files to remove: ${FILE_PATTERNS[@]} in '$CONTENT_DIR/'..."

for pattern in "${FILE_PATTERNS[@]}"; do
  # Using find with -delete is efficient and robust for many files.
  # -name "$pattern" finds files matching the pattern.
  # -type f ensures only files (not directories) are considered.
  # -print0 and xargs -0 are for safe handling of filenames with spaces or special characters.
  find "$CONTENT_DIR" -type f -name "$pattern" -print0 | while IFS= read -r -d $'\0' file; do
    echo "Deleting: $file"
    rm "$file" || { echo "Error deleting $file. Please check permissions."; exit 1; }
  done
done

echo "File cleanup finished. Please check 'git status' and commit the deletions."