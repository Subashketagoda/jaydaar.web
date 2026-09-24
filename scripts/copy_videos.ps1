$sourceDir = "C:\Users\User\Downloads\videos"
$destDir = "c:\Users\User\Desktop\jaydaar\assets\videos"

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$files = Get-ChildItem -Path $sourceDir -Filter *.mp4

$mapping = @{
    "New year" = "jaydaar_new_year_collection.mp4"
    "quiet luxury" = "jaydaar_quiet_luxury_heritage.mp4"
    "Geethma" = "jaydaar_kandyan_saree_bride.mp4"
    "Draped in elegance" = "jaydaar_draped_elegance_saree.mp4"
    "wrap top" = "jaydaar_wrap_top_palazzo.mp4"
    "Sunset hues" = "jaydaar_sunset_hues_flame.mp4"
    "Noir Bloom" = "jaydaar_noir_bloom.mp4"
}

$count = 1
foreach ($f in $files) {
    $matched = $false
    foreach ($key in $mapping.Keys) {
        if ($f.Name -like "*$key*") {
            $destName = $mapping[$key]
            $destPath = Join-Path $destDir $destName
            Copy-Item -Path $f.FullName -Destination $destPath -Force
            Write-Host "Copied: $($f.Name) -> $destName"
            $matched = $true
            break
        }
    }
    if (-not $matched) {
        $destName = "jaydaar_campaign_$count.mp4"
        $destPath = Join-Path $destDir $destName
        Copy-Item -Path $f.FullName -Destination $destPath -Force
        Write-Host "Copied fallback: $($f.Name) -> $destName"
        $count++
    }
}

Write-Host "Done copying videos. Destination list:"
Get-ChildItem -Path $destDir | Select-Object Name, Length
