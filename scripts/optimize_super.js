const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videosDir = path.join(__dirname, '..', 'assets', 'videos');
const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));

console.log('=== ULTRA OPTIMIZATION: VIDEOS ===');
let beforeTotal = 0;
let afterTotal = 0;

for (const file of videoFiles) {
  const input = path.join(videosDir, file);
  const tempOut = path.join(videosDir, `_opt_${file}`);
  const sBefore = fs.statSync(input).size;
  beforeTotal += sBefore;

  // Tailored durations for seamless luxury web loops
  let maxDuration = 22;
  if (file.includes('preloader')) {
    maxDuration = 8; // Preloader is 2.5s, 8s loop is plenty
  } else if (file.includes('heritage') || file.includes('quiet_luxury')) {
    maxDuration = 26; // Hero background loop
  } else if (file.includes('bride') || file.includes('kandyan')) {
    maxDuration = 22;
  } else if (file.includes('campaign_1')) {
    maxDuration = 20;
  }

  console.log(`Optimizing ${file} (${(sBefore / 1024 / 1024).toFixed(2)} MB, max ${maxDuration}s)...`);

  try {
    // 540p scale (crystal clear on mobile/desktop cards), CRF 29, maxrate 750k, faststart, no audio
    const cmd = `ffmpeg -y -ss 0 -i "${input}" -t ${maxDuration} -c:v libx264 -crf 29 -preset medium -vf "scale='min(540,iw)':-2" -maxrate 750k -bufsize 1100k -an -movflags +faststart "${tempOut}"`;
    execSync(cmd, { stdio: 'pipe' });

    const sAfter = fs.statSync(tempOut).size;
    afterTotal += sAfter;
    console.log(`  -> ${(sAfter / 1024 / 1024).toFixed(2)} MB (${((1 - sAfter / sBefore) * 100).toFixed(1)}% saved)`);

    fs.unlinkSync(input);
    fs.renameSync(tempOut, input);
  } catch (e) {
    console.error(`  Error on ${file}:`, e.message);
    if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
    afterTotal += sBefore;
  }
}

console.log(`\nVideos Total: ${(beforeTotal / 1024 / 1024).toFixed(2)} MB -> ${(afterTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Saved: ${((beforeTotal - afterTotal) / 1024 / 1024).toFixed(2)} MB (${((1 - afterTotal / beforeTotal) * 100).toFixed(1)}% reduction)\n`);
