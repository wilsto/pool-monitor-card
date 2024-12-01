import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const THRESHOLD = 0.1; // Seuil de différence toléré (0-1)
const REFERENCE_DIR = path.join(__dirname, '../example/reference');
const CURRENT_DIR = path.join(__dirname, '../example');
const DIFF_DIR = path.join(__dirname, '../example/diff');
const REPORT_PATH = path.join(__dirname, '../example/visual-test-report.html');

// Assurez-vous que les dossiers existent
[REFERENCE_DIR, DIFF_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function compareImages(image1Path, image2Path, diffPath) {
  const img1 = PNG.sync.read(fs.readFileSync(image1Path));
  const img2 = PNG.sync.read(fs.readFileSync(image2Path));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: THRESHOLD }
  );

  if (numDiffPixels > 0) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }

  return {
    totalPixels: width * height,
    diffPixels: numDiffPixels,
    diffPercentage: (numDiffPixels / (width * height)) * 100
  };
}

async function generateReport(results) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Visual Test Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .test-case { margin-bottom: 30px; border: 1px solid #ccc; padding: 15px; }
    .failed { background-color: #ffe6e6; }
    .passed { background-color: #e6ffe6; }
    .images { display: flex; gap: 20px; margin-top: 10px; }
    .image-container { text-align: center; }
    img { max-width: 400px; border: 1px solid #ccc; }
    .stats { margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Visual Test Report</h1>
  <p>Generated on: ${new Date().toLocaleString()}</p>
  ${results.map(result => `
    <div class="test-case ${result.passed ? 'passed' : 'failed'}">
      <h2>${result.name}</h2>
      <div class="stats">
        <p>Différence: ${result.diffPercentage.toFixed(2)}%</p>
        <p>Pixels différents: ${result.diffPixels} sur ${result.totalPixels}</p>
        <p>Status: ${result.passed ? 'PASSED' : 'FAILED'}</p>
      </div>
      <div class="images">
        <div class="image-container">
          <h3>Référence</h3>
          <img src="reference/${result.name}" alt="Reference">
        </div>
        <div class="image-container">
          <h3>Actuel</h3>
          <img src="${result.name}" alt="Current">
        </div>
        ${result.hasDiff ? `
        <div class="image-container">
          <h3>Différence</h3>
          <img src="diff/${result.name}" alt="Difference">
        </div>
        ` : ''}
      </div>
    </div>
  `).join('')}
</body>
</html>`;

  fs.writeFileSync(REPORT_PATH, html);
  console.log(`Rapport généré : ${REPORT_PATH}`);
}

async function runVisualTests() {
  const results = [];
  const screenshots = config.paths.screenshots;

  for (const screenshot of screenshots) {
    const currentPath = path.join(CURRENT_DIR, screenshot.name);
    const referencePath = path.join(REFERENCE_DIR, screenshot.name);
    const diffPath = path.join(DIFF_DIR, screenshot.name);

    // Si pas d'image de référence, copier l'image actuelle comme référence
    if (!fs.existsSync(referencePath) && fs.existsSync(currentPath)) {
      fs.copyFileSync(currentPath, referencePath);
      console.log(`Référence créée pour ${screenshot.name}`);
      continue;
    }

    // Si l'image actuelle n'existe pas, passer
    if (!fs.existsSync(currentPath)) {
      console.log(`Image actuelle manquante : ${screenshot.name}`);
      continue;
    }

    try {
      const comparison = await compareImages(currentPath, referencePath, diffPath);
      const passed = comparison.diffPercentage < 1; // Moins de 1% de différence

      results.push({
        name: screenshot.name,
        ...comparison,
        passed,
        hasDiff: comparison.diffPixels > 0
      });

      console.log(`Test de ${screenshot.name}: ${passed ? 'PASSED' : 'FAILED'}`);
    } catch (error) {
      console.error(`Erreur lors de la comparaison de ${screenshot.name}:`, error);
    }
  }

  await generateReport(results);
}

runVisualTests().catch(console.error);
