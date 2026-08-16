import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'aero-v-sequence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const TOTAL_FRAMES = 120;
const WIDTH = 1920;
const HEIGHT = 1080;
const BG_COLOR = '#050505';

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const progress = (i - 1) / (TOTAL_FRAMES - 1); // 0 to 1
  
  // Animation logic: 0 to 15% (still), 15 to 40% (explode), 40 to 85% (exploded), 85 to 100% (reassemble)
  let explosionFactor = 0;
  if (progress > 0.15 && progress <= 0.4) {
    explosionFactor = easeInOutQuad((progress - 0.15) / 0.25);
  } else if (progress > 0.4 && progress <= 0.85) {
    explosionFactor = 1;
  } else if (progress > 0.85) {
    explosionFactor = easeInOutQuad(1 - (progress - 0.85) / 0.15);
  }

  // Draw some placeholder lines representing bike parts
  // Center is WIDTH/2, HEIGHT/2
  const parts = [
    // Frame
    { x: 0, y: 0, w: 400, h: 20, color: '#333' },
    // Wheels
    { x: -300, y: 150, r: 150, color: '#222' },
    { x: 300, y: 150, r: 150, color: '#222' },
    // Handlebars
    { x: 300, y: -150, w: 100, h: 20, color: '#444' },
    // Seat
    { x: -150, y: -150, w: 80, h: 20, color: '#444' },
    // Drivetrain
    { x: 0, y: 150, r: 50, color: '#0050FF' }, // Accent color for drivetrain
  ];

  let svgContent = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${BG_COLOR}" />
  <g transform="translate(${WIDTH/2}, ${HEIGHT/2})">
    <text x="0" y="-300" fill="rgba(255,255,255,0.2)" font-family="sans-serif" font-size="24" text-anchor="middle">Frame ${i.toString().padStart(4, '0')} / ${TOTAL_FRAMES}</text>
`;

  parts.forEach((part, index) => {
    // calculate drift based on index and explosion factor
    const driftX = (index % 2 === 0 ? 1 : -1) * 200 * explosionFactor;
    const driftY = (index % 3 === 0 ? -1 : 1) * 150 * explosionFactor;
    
    const finalX = part.x + driftX;
    const finalY = part.y + driftY;

    if (part.r) {
      svgContent += `    <circle cx="${finalX}" cy="${finalY}" r="${part.r}" fill="none" stroke="${part.color}" stroke-width="10" />\n`;
    } else {
      svgContent += `    <rect x="${finalX - part.w/2}" y="${finalY - part.h/2}" width="${part.w}" height="${part.h}" fill="${part.color}" />\n`;
    }
  });

  svgContent += `  </g>\n</svg>`;

  const fileName = `frame_${i.toString().padStart(4, '0')}.svg`;
  fs.writeFileSync(path.join(outDir, fileName), svgContent);
}

console.log(`Successfully generated ${TOTAL_FRAMES} SVG frames in public/aero-v-sequence/`);
