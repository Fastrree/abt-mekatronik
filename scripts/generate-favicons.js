/**
 * Favicon Generator Script
 * Generates PNG favicons in multiple sizes from SVG
 * 
 * Usage: node scripts/generate-favicons.js
 */

const fs = require('fs');
const path = require('path');

// SVG template for ABT favicon
const generateSVG = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <!-- Kırmızı arka plan -->
  <rect width="100" height="100" fill="#DC2626" rx="${size < 32 ? 4 : 8}"/>
  
  <!-- Beyaz ABT yazısı -->
  <text 
    x="50" 
    y="50" 
    font-family="Arial, sans-serif" 
    font-size="${size < 32 ? 28 : 32}" 
    font-weight="900" 
    fill="#FFFFFF" 
    text-anchor="middle" 
    dominant-baseline="central"
    letter-spacing="-1">ABT</text>
</svg>
`;

// Sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

const publicDir = path.join(__dirname, '../client/public');

console.log('🎨 Favicon Generator');
console.log('===================\n');

// Generate SVG files for each size
sizes.forEach(({ name, size }) => {
  const svgContent = generateSVG(size);
  const svgPath = path.join(publicDir, name.replace('.png', '.svg'));
  
  fs.writeFileSync(svgPath, svgContent.trim());
  console.log(`✅ Generated: ${name.replace('.png', '.svg')} (${size}x${size})`);
});

console.log('\n📝 Manual Steps Required:');
console.log('=========================');
console.log('1. Install sharp: npm install sharp');
console.log('2. Run: node scripts/convert-svg-to-png.js');
console.log('3. Or use online tool: https://realfavicongenerator.net/');
console.log('\nAlternatively, you can use the SVG files directly in modern browsers.');
console.log('PNG files are only needed for older browsers and specific platforms.\n');
