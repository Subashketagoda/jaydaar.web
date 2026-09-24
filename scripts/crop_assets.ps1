Add-Type -AssemblyName System.Drawing

$brainDir = "C:\Users\User\.gemini\antigravity-ide\brain\a2db0749-3359-4cc2-a557-c50f72cf1f9d\.user_uploaded"
$outDir = "C:\Users\User\Desktop\jaydaar\assets\images"

function Export-CroppedCell {
    [CmdletBinding()]
    [Diagnostics.CodeAnalysis.SuppressMessageAttribute("PSUseApprovedVerbs", "")]
    param(
        [System.Drawing.Bitmap]$sourceImg,
        [int]$x,
        [int]$y,
        [int]$w,
        [int]$h,
        [string]$outputFilename
    )

    # Clamp coordinates
    if ($x + $w -gt $sourceImg.Width) { $w = $sourceImg.Width - $x }
    if ($y + $h -gt $sourceImg.Height) { $h = $sourceImg.Height - $y }

    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = New-Object System.Drawing.Bitmap($w, $h)
    $graphics = [System.Drawing.Graphics]::FromImage($cropped)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $graphics.DrawImage($sourceImg, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect, [System.Drawing.GraphicsUnit]::Pixel)

    $destPath = Join-Path $outDir $outputFilename
    $cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $graphics.Dispose()
    $cropped.Dispose()
    Write-Host "Saved: $outputFilename ($w x $h)"
}

# 1. Grid 1: media_1790181023089.jpg (1024 x 695) - 3 rows x 6 cols
$grid1Path = Join-Path $brainDir "media_1790181023089.jpg"
if (Test-Path $grid1Path) {
    $img1 = [System.Drawing.Bitmap]::FromFile($grid1Path)
    $colW1 = 1024.0 / 6.0
    $rowH1 = 695.0 / 3.0

    # Row 0
    Export-CroppedCell $img1 ([int](0 * $colW1)) ([int](0 * $rowH1)) ([int]$colW1) ([int]$rowH1) "lookbook_couple_sarong_red_01.jpg"
    Export-CroppedCell $img1 ([int](1 * $colW1)) ([int](0 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_crop_top_marble_01.jpg"
    Export-CroppedCell $img1 ([int](2 * $colW1)) ([int](0 * $rowH1)) ([int]$colW1) ([int]$rowH1) "lookbook_women_marble_black_01.jpg"
    Export-CroppedCell $img1 ([int](3 * $colW1)) ([int](0 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_men_white_shirt_black_sarong.jpg"
    Export-CroppedCell $img1 ([int](4 * $colW1)) ([int](0 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_couple_royal_black_matching.jpg"
    Export-CroppedCell $img1 ([int](5 * $colW1)) ([int](0 * $rowH1)) ([int]$colW1) ([int]$rowH1) "lookbook_couple_outdoor_black.jpg"

    # Row 1
    Export-CroppedCell $img1 ([int](0 * $colW1)) ([int](1 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_men_black_shirt_geometric_sarong.jpg"
    Export-CroppedCell $img1 ([int](1 * $colW1)) ([int](1 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_women_floral_batik_skirt_set.jpg"
    Export-CroppedCell $img1 ([int](2 * $colW1)) ([int](1 * $rowH1)) ([int]$colW1) ([int]$rowH1) "lookbook_portrait_marble_top.jpg"
    Export-CroppedCell $img1 ([int](3 * $colW1)) ([int](1 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_men_amber_sunset_batik_sarong.jpg"
    Export-CroppedCell $img1 ([int](4 * $colW1)) ([int](1 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_couple_crimson_heritage_set.jpg"
    Export-CroppedCell $img1 ([int](5 * $colW1)) ([int](1 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_women_marble_top_wrap_skirt.jpg"

    # Row 2
    Export-CroppedCell $img1 ([int](0 * $colW1)) ([int](2 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_women_vortex_circles_red_set.jpg"
    Export-CroppedCell $img1 ([int](1 * $colW1)) ([int](2 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_couple_vintage_radio_red_set.jpg"
    Export-CroppedCell $img1 ([int](2 * $colW1)) ([int](2 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_men_vortex_circles_red_sarong.jpg"
    Export-CroppedCell $img1 ([int](3 * $colW1)) ([int](2 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_men_flame_batik_sarong.jpg"
    Export-CroppedCell $img1 ([int](4 * $colW1)) ([int](2 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_couple_flame_batik_matching_set.jpg"
    Export-CroppedCell $img1 ([int](5 * $colW1)) ([int](2 * $rowH1)) ([int]$colW1) ([int]$rowH1) "product_women_flame_batik_sarong_skirt.jpg"

    $img1.Dispose()
}

# 2. Grid 2: media_1790181023241.jpg (1024 x 687) - 3 rows x 6 cols
$grid2Path = Join-Path $brainDir "media_1790181023241.jpg"
if (Test-Path $grid2Path) {
    $img2 = [System.Drawing.Bitmap]::FromFile($grid2Path)
    $colW2 = 1024.0 / 6.0
    $rowH2 = 687.0 / 3.0

    # Row 0
    Export-CroppedCell $img2 ([int](0 * $colW2)) ([int](0 * $rowH2)) ([int]$colW2) ([int]$rowH2) "product_women_lotus_batik_saree_close.jpg"
    Export-CroppedCell $img2 ([int](1 * $colW2)) ([int](0 * $rowH2)) ([int]$colW2) ([int]$rowH2) "product_women_lotus_kandyan_saree_full.jpg"
    Export-CroppedCell $img2 ([int](2 * $colW2)) ([int](0 * $rowH2)) ([int]$colW2) ([int]$rowH2) "lookbook_lotus_saree_portrait.jpg"
    Export-CroppedCell $img2 ([int](3 * $colW2)) ([int](0 * $rowH2)) ([int]$colW2) ([int]$rowH2) "product_women_embroidered_black_tunic_full.jpg"
    Export-CroppedCell $img2 ([int](4 * $colW2)) ([int](0 * $rowH2)) ([int]$colW2) ([int]$rowH2) "product_women_embroidered_black_shirt.jpg"
    Export-CroppedCell $img2 ([int](5 * $colW2)) ([int](0 * $rowH2)) ([int]$colW2) ([int]$rowH2) "lookbook_black_embroidered_dress.jpg"

    # Row 1
    Export-CroppedCell $img2 ([int](0 * $colW2)) ([int](1 * $rowH2)) ([int]$colW2) ([int]$rowH2) "product_women_crimson_black_batik_dress.jpg"
    Export-CroppedCell $img2 ([int](1 * $colW2)) ([int](1 * $rowH2)) ([int]$colW2) ([int]$rowH2) "banner_jaydaar_script_logo.jpg"
    Export-CroppedCell $img2 ([int](2 * $colW2)) ([int](1 * $rowH2)) ([int]$colW2) ([int]$rowH2) "lookbook_crimson_dress_indoor.jpg"
    Export-CroppedCell $img2 ([int](3 * $colW2)) ([int](1 * $rowH2)) ([int]$colW2) ([int]$rowH2) "product_women_crimson_draped_skirt.jpg"
    Export-CroppedCell $img2 ([int](4 * $colW2)) ([int](1 * $rowH2)) ([int]$colW2) ([int]$rowH2) "detail_flame_batik_fabric.jpg"
    Export-CroppedCell $img2 ([int](5 * $colW2)) ([int](1 * $rowH2)) ([int]$colW2) ([int]$rowH2) "lookbook_outdoor_greenery_marble.jpg"

    # Row 2
    Export-CroppedCell $img2 ([int](3 * $colW2)) ([int](2 * $rowH2)) ([int]$colW2) ([int]$rowH2) "product_couple_black_crimson_seated.jpg"
    Export-CroppedCell $img2 ([int](4 * $colW2)) ([int](2 * $rowH2)) ([int]$colW2) ([int]$rowH2) "product_women_balcony_red_sarong.jpg"
    Export-CroppedCell $img2 ([int](5 * $colW2)) ([int](2 * $rowH2)) ([int]$colW2) ([int]$rowH2) "lookbook_couple_intimate_black_white.jpg"

    $img2.Dispose()
}

# 3. Grid 3: media_1790181023309.png (1024 x 463) - 2 rows x 6 cols Studio Product Catalog
$grid3Path = Join-Path $brainDir "media_1790181023309.png"
if (Test-Path $grid3Path) {
    $img3 = [System.Drawing.Bitmap]::FromFile($grid3Path)
    $colW3 = 1024.0 / 6.0
    $rowH3 = 463.0 / 2.0

    # Row 0
    Export-CroppedCell $img3 ([int](0 * $colW3)) ([int](0 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_sage_co_ord_full.jpg"
    Export-CroppedCell $img3 ([int](1 * $colW3)) ([int](0 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_sage_co_ord_detail.jpg"
    Export-CroppedCell $img3 ([int](2 * $colW3)) ([int](0 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_sage_co_ord_pose.jpg"
    Export-CroppedCell $img3 ([int](3 * $colW3)) ([int](0 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_crimson_floral_saree_01.jpg"
    Export-CroppedCell $img3 ([int](4 * $colW3)) ([int](0 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_crimson_floral_saree_02.jpg"
    Export-CroppedCell $img3 ([int](5 * $colW3)) ([int](0 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_crimson_floral_saree_03.jpg"

    # Row 1
    Export-CroppedCell $img3 ([int](0 * $colW3)) ([int](1 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_amber_flare_dress_01.jpg"
    Export-CroppedCell $img3 ([int](1 * $colW3)) ([int](1 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_amber_flare_dress_02.jpg"
    Export-CroppedCell $img3 ([int](2 * $colW3)) ([int](1 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_amber_flare_dress_03.jpg"
    Export-CroppedCell $img3 ([int](3 * $colW3)) ([int](1 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_emerald_tunic_palazzo_back.jpg"
    Export-CroppedCell $img3 ([int](4 * $colW3)) ([int](1 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_emerald_tunic_palazzo_front.jpg"
    Export-CroppedCell $img3 ([int](5 * $colW3)) ([int](1 * $rowH3)) ([int]$colW3) ([int]$rowH3) "product_studio_emerald_tunic_palazzo_side.jpg"

    $img3.Dispose()
}

Write-Host "All assets cropped and saved successfully!"
