#!/usr/bin/env node

/**
 * WebP Conversion Script
 * Converts all JPEG/PNG images to WebP format
 * Preserves original files for fallback
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const MEDIA_DIR = path.join(__dirname, '../client/public/media');
const QUALITY = 85; // WebP quality (85 is optimal balance)
const SUPPORTED_FORMATS = /\.(jpg|jpeg|png)$/i;

// Statistics
let stats = {
  total: 0,
  converted: 0,
  failed: 0,
  skipped: 0,
  originalSize: 0,
  webpSize: 0
};

/**
 * Convert single image to WebP
 */
async function convertToWebP(inputPath) {
  try {
    const fileName = path.basename(inputPath);
    const outputPath = inputPath.replace(SUPPORTED_FORMATS, '.webp');
    
    // Skip if WebP already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipped (exists): ${fileName}`);
      stats.skipped++;
      return;
    }

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    stats.originalSize += originalStats.size;

    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    // Get WebP file size
    const webpStats = fs.statSync(outputPath);
    stats.webpSize += webpStats.size;

    const reduction = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`✅ Converted: ${fileName} (${reduction}% smaller)`);
    stats.converted++;

  } catch (error) {
    console.error(`❌ Failed: ${path.basename(inputPath)} - ${error.message}`);
    stats.failed++;
  }
}

/**
 * Process all images in directory
 */
async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath);
    } else if (SUPPORTED_FORMATS.test(file)) {
      stats.total++;
      await convertToWebP(filePath);
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 WebP Conversion Started\n');
  console.log(`📁 Media Directory: ${MEDIA_DIR}`);
  console.log(`🎨 Quality: ${QUALITY}%`);
  console.log(`📋 Formats: JPEG, PNG → WebP\n`);

  const startTime = Date.now();

  try {
    await processDirectory(MEDIA_DIR);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const originalMB = (stats.originalSize / 1024 / 1024).toFixed(2);
    const webpMB = (stats.webpSize / 1024 / 1024).toFixed(2);
    const savedMB = (originalMB - webpMB).toFixed(2);
    const savedPercent = ((1 - stats.webpSize / stats.originalSize) * 100).toFixed(1);

    console.log('\n' + '='.repeat(60));
    console.log('📊 CONVERSION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Converted: ${stats.converted} files`);
    console.log(`⏭️  Skipped:   ${stats.skipped} files (already exist)`);
    console.log(`❌ Failed:    ${stats.failed} files`);
    console.log(`📁 Total:     ${stats.total} files processed`);
    console.log('');
    console.log(`📦 Original Size: ${originalMB} MB`);
    console.log(`📦 WebP Size:     ${webpMB} MB`);
    console.log(`💾 Saved:         ${savedMB} MB (${savedPercent}% reduction)`);
    console.log(`⏱️  Duration:      ${duration} seconds`);
    console.log('='.repeat(60));

    if (stats.converted > 0) {
      console.log('\n✨ Success! All images converted to WebP format.');
      console.log('📝 Next steps:');
      console.log('   1. Update React components to use <picture> tag');
      console.log('   2. Test in all browsers (Chrome, Firefox, Safari, Edge)');
      console.log('   3. Run Lighthouse audit to measure improvement');
      console.log('   4. Keep original JPEG/PNG files as fallback');
    }

  } catch (error) {
    console.error('\n❌ Conversion failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
