# Set the target directory
$contentDir = Join-Path $PSScriptRoot "../content"

# List folders that will be deleted (dry run)
Write-Host "The following folders will be deleted:" -ForegroundColor Yellow
Get-ChildItem -Recurse -Directory -Path $contentDir | 
    Where-Object { $_.Name -match "-" -and $_.Name -notmatch " " } | 
    ForEach-Object {
        Write-Host $_.FullName -ForegroundColor Red
    }

# Prompt for confirmation
$confirmation = Read-Host "Are you sure you want to delete these folders? (y/n)"
if ($confirmation -eq 'y') {
    # Delete the folders
    Get-ChildItem -Recurse -Directory -Path $contentDir | 
        Where-Object { $_.Name -match "-" -and $_.Name -notmatch " " } | 
        ForEach-Object {
            try {
                Remove-Item $_.FullName -Recurse -Force
                Write-Host "Deleted: $($_.FullName)" -ForegroundColor Green
            }
            catch {
                Write-Host "Error deleting $($_.FullName): $_" -ForegroundColor Red
            }
        }
    Write-Host "Deletion complete" -ForegroundColor Green
}
else {
    Write-Host "Operation cancelled" -ForegroundColor Yellow
}