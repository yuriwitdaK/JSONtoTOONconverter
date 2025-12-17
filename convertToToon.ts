import fs from 'fs';
import path from 'path';

// Input and output directories
const inputDir = path.resolve('./input-json');
const outputDir = path.resolve('./output-toon');

// Dummy conversion function JSON → TOON
function convertToToon(json: any) {
  // TODO: replace with your actual TOON format logic
  return { toonData: json };
}

// Recursive function to process all files in folder and subfolders
function processDirectory(currentInputDir: string, currentOutputDir: string) {
  if (!fs.existsSync(currentOutputDir)) {
    fs.mkdirSync(currentOutputDir, { recursive: true });
  }

  const files = fs.readdirSync(currentInputDir);
  files.forEach((file: string) => {
    const inputPath = path.join(currentInputDir, file);
    const outputPath = path.join(currentOutputDir, file);

    const stats = fs.statSync(inputPath);

    if (stats.isDirectory()) {
      // Recursively process subfolder
      processDirectory(inputPath, outputPath);
    } else if (file.endsWith('.json')) {
      const jsonData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
      const toonData = convertToToon(jsonData);
      const outputFilePath = outputPath.replace(/\.json$/, '.toon.json');
      fs.writeFileSync(outputFilePath, JSON.stringify(toonData, null, 2));
      console.log(`Converted: ${inputPath} → ${outputFilePath}`);
    }
  });
}

// Start processing
processDirectory(inputDir, outputDir);
console.log('✅ All JSON files have been recursively converted to TOON !:) ');
