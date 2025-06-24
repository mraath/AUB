#!/bin/bash

# This script automates fixing case-sensitivity issues in Git
# by renaming all files and directories to lowercase and ensuring Git registers these changes.
# It should be run from the root of your Git repository on a case-insensitive file system
# (like Git Bash on Windows, or macOS terminal).

echo "Starting Git case-sensitivity fix script..."

# 1. Ensure a clean Git working directory
# This is crucial to avoid losing uncommitted changes.
if ! git diff-index --quiet HEAD --; then
  echo "Error: Your Git working directory is not clean. Please commit or stash all changes before running this script."
  exit 1
fi

# 2. Temporarily disable Git's core.ignorecase
# This allows 'git mv' to recognize and commit case-only renames on case-insensitive file systems.
echo "Setting git config core.ignorecase to false for this operation..."
git config core.ignorecase false

# 3. Find and rename all directories to lowercase (deepest first)
# We process directories from deepest to shallowest to avoid issues if a parent directory is renamed first.
echo "Processing directories..."
find . -depth -type d -print0 | while IFS= read -r -d $'\0' dir; do
  # Skip Git's own internal directory
  if [[ "$dir" == "./.git" ]]; then
    continue
  fi

  dir_basename=$(basename "$dir")
  # Convert to lowercase and sanitize (replace spaces with hyphens, remove special chars)
  dir_lowercase=$(echo "$dir_basename" | tr '[:upper:]' '[:lower:]' | sed 's/[[:space:]]/-/g' | sed 's/[^a-z0-9\-\_\.]//g')
  
  parent_dir=$(dirname "$dir")
  new_dir_path="${parent_dir}/${dir_lowercase}"

  # If the base name (case-sensitive) is different from its lowercase/sanitized version
  if [[ "$dir_basename" != "$dir_lowercase" ]]; then
    echo "Renaming directory: '$dir' -> '$new_dir_path'"
    # Use 'git mv' so Git registers this as a rename (important for history)
    git mv "$dir" "$new_dir_path" || { echo "Error renaming directory $dir. Exiting."; exit 1; }
  fi
done

# 4. Find and rename all files to lowercase
echo "Processing files..."
find . -type f -print0 | while IFS= read -r -d $'\0' file; do
  # Skip files in Git's internal directory
  if [[ "$file" == "./.git"* ]]; then
    continue
  fi

  file_basename=$(basename "$file")
  # Convert to lowercase and sanitize (replace spaces with hyphens, remove special chars)
  file_lowercase=$(echo "$file_basename" | tr '[:upper:]' '[:lower:]' | sed 's/[[:space:]]/-/g' | sed 's/[^a-z0-9\-\_\.]//g')

  parent_dir=$(dirname "$file")
  new_file_path="${parent_dir}/${file_lowercase}"

  # If the base name (case-sensitive) is different from its lowercase/sanitized version
  if [[ "$file_basename" != "$file_lowercase" ]]; then
    echo "Renaming file: '$file' -> '$new_file_path'"
    # Use 'git mv' so Git registers this as a rename (important for history)
    git mv "$file" "$new_file_path" || { echo "Error renaming file $file. Exiting."; exit 1; }
  fi
done

# 5. Commit the changes
echo "Committing case changes to Git..."
# Use git add . to stage any remaining untracked case-only changes (though git mv should handle most)
git add .
git commit -m "Automated: Standardize all file/directory names to lowercase in Git history" || echo "No new case changes to commit."

# 6. Re-enable Git's core.ignorecase
# It's generally good practice to set it back to true on case-insensitive systems
echo "Setting git config core.ignorecase back to true..."
git config core.ignorecase true

echo "Git case-sensitivity fix script finished."
echo "Please remember to push these changes to your remote repository: 'git push origin NewSchemaFromTXT'"