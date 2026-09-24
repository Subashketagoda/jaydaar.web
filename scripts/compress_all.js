const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== 1. COMPRESSING VIDEOS ===');
const videosDir = path.join(__dirname, '..', 'assets', 'videos');
const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));

let totalVidBefore = 0;
let totalVidAfter = 0;

for (const file of videoFiles) {
  const input = path.join(videosDir, file);
  const tempOut = path.join(videosDir, `_opt_${file}`);
  const statBefore = fs.statSync(input);
  totalVidBefore += statBefore.size;

  console.log(`Processing: ${file} (${(statBefore.size / 1024 / 1024).toFixed(2)} MB)...`);

  try {
    // Web optimization: H.264, crf 27, strip silent audio track, faststart moov atom
    const cmd = `ffmpeg -y -i "${input}" -c:v libx264 -crf 27 -preset fast -vf "scale='min(1080,iw)':-2" -an -movflags +faststart "${tempOut}"`;
    execSync(cmd, { stdio: 'pipe' });

    const statAfter = fs.statSync(tempOut);
    totalVidAfter += statAfter.size;
    console.log(`  -> Compressed: ${(statAfter.size / 1024 / 1024).toFixed(2)} MB (${((1 - statAfter.size / statBefore.size) * 100).toFixed(1)}% reduction)`);

    // Replace original
    fs.unlinkSync(input);
    fs.renameSync(tempOut, input);
  } catch (err) {
    console.error(`  Error compressing ${file}:`, err.message);
    if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
    totalVidAfter += statBefore.size;
  }
}

console.log(`\nVideo Total Before: ${(totalVidBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`Video Total After: ${(totalVidAfter / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total Saved: ${((totalVidBefore - totalVidAfter) / 1024 / 1024).toFixed(2)} MB (${((1 - totalVidAfter / totalVidBefore) * 100).toFixed(1)}%)\n`);

console.log('=== 2. COMPRESSING IMAGES ===');
const imagesDir = path.join(__dirname, '..', 'assets', 'images');
const imageFiles = fs.readdirSync(imagesDir);

for (const file of imageFiles) {
  const input = path.join(imagesDir, file);
  const statBefore = fs.statSync(input);

  if (file === 'jaydaar_favicon.png') {
    // Compress favicon to crisp 64x64 icon
    const tempFav = path.join(imagesDir, '_opt_favicon.png');
    execSync(`ffmpeg -y -i "${input}" -vf "scale=64:64" "${tempFav}"`, { stdio: 'pipe' });
    fs.unlinkSync(input);
    fs.renameSync(tempFav, input);
    const statAfter = fs.statSync(input);
    console.log(`Favicon: ${(statBefore.size / 1024).toFixed(1)} KB -> ${(statAfter.size / 1024).toFixed(1)} KB`);
  } else if (file.endsWith('.jpg')) {
    // Optimize JPG images: quality factor with chroma subsampling
    const tempJpg = path.join(imagesDir, `_opt_${file}`);
    execSync(`ffmpeg -y -i "${input}" -q:v 3 "${tempJpg}"`, { stdio: 'pipe' });
    const statAfter = fs.statSync(tempJpg);
    if (statAfter.size < statBefore.size) {
      fs.unlinkSync(input);
      fs.renameSync(tempJpg, input);
      console.log(`JPG ${file}: ${(statBefore.size / 1024).toFixed(1)} KB -> ${(statAfter.size / 1024).toFixed(1)} KB`);
    } else {
      fs.unlinkSync(tempJpg);
      console.log(`JPG ${file}: already optimal at ${(statBefore.size / 1024).toFixed(1)} KB`);
    }
  }
}

console.log('\n=== COMPRESSION COMPLETE ===');
