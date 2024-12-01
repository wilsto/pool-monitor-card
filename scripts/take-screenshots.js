import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration des sélecteurs DOM
const selectors = {
  card: 'pool-monitor-card',
  loginForm: {
    username: '[name="username"]',
    password: '[name="password"]',
    submit: 'button.mdc-button.mdc-button--raised'
  }
};

async function takeScreenshot(page, screenshotConfig) {
  console.log(`Navigation vers ${screenshotConfig.url}...`);
  // Ajouter ?kiosk à l'URL pour masquer la sidebar
  const url = `${config.url}${screenshotConfig.url}?kiosk`;
  await page.goto(url);
  
  // Attendre que la carte soit chargée
  await page.waitForSelector(selectors.card);
  console.log('Attente du chargement complet de la carte...');
  await page.waitForTimeout(2000);
  
  // Prendre la capture d'écran
  const screenshotPath = path.join(__dirname, '../example');
  console.log(`Capture d'écran en cours... ${screenshotConfig.name}`);
  await page.screenshot({
    path: path.join(screenshotPath, screenshotConfig.name),
    fullPage: true
  });
  console.log(`Capture d'écran ${screenshotConfig.name} réussie !`);
}

async function takeScreenshots() {
  // Lancer le navigateur
  const browser = await chromium.launch({
    headless: true // Mettre à true pour cacher le navigateur
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('Connexion à Home Assistant...');
    await page.goto(config.url);
    
    // Attendre que le formulaire de connexion soit chargé
    await page.waitForSelector(selectors.loginForm.username);
    console.log('Remplissage du formulaire...');
    
    // Remplir le formulaire
    await page.fill(selectors.loginForm.username, config.credentials.username);
    await page.fill(selectors.loginForm.password, config.credentials.password);
    
    // Attendre et cliquer sur le bouton
    console.log('Attente du bouton de connexion...');
    await page.waitForSelector(selectors.loginForm.submit);
    console.log('Clic sur le bouton de connexion...');
    await page.click(selectors.loginForm.submit);
    
    // Attendre que la page soit chargée
    await page.waitForLoadState('networkidle');
    console.log('Connecté avec succès');
    
    // Attendre un peu pour s'assurer que tout est bien chargé
    await page.waitForTimeout(2000);
    
    // Prendre toutes les captures d'écran configurées
    for (const screenshot of config.paths.screenshots) {
      await takeScreenshot(page, screenshot);
      // Attendre un peu entre chaque capture
      await page.waitForTimeout(1000);
    }
    
    console.log('Toutes les captures d\'écran ont été réalisées avec succès !');
  } catch (error) {
    console.error('Erreur lors de la capture d\'écran:', error);
    // Afficher plus de détails sur l'erreur
    if (error.message) {
      console.error('Message d\'erreur:', error.message);
    }
    // Prendre une capture d'écran en cas d'erreur
    try {
      const errorScreenshotPath = path.join(__dirname, '../example/error-screenshot.png');
      await page.screenshot({
        path: errorScreenshotPath,
        fullPage: true
      });
      console.error('Capture d\'écran de l\'erreur sauvegardée dans:', errorScreenshotPath);
    } catch (screenshotError) {
      console.error('Impossible de prendre une capture d\'écran de l\'erreur:', screenshotError);
    }
  } finally {
    await browser.close();
  }
}

takeScreenshots();
