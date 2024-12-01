import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// Simuler la variable globale avec vi.stubGlobal
vi.stubGlobal('__BUILD_TIMESTAMP__', 'dev');

describe('Constants', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('__BUILD_TIMESTAMP__', 'dev');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  // Test des valeurs statiques
  test('CARD_INFO contient les bonnes informations', async () => {
    const { CARD_INFO } = await import('../../src/constants');
    expect(CARD_INFO).toMatchObject({
      cardType: 'pool-monitor-card',
      cardName: 'Pool Monitor Card',
      cardDescription: expect.stringContaining('plugin that provides information'),
    });
  });

  // Test des styles de console
  test('CONSOLE_STYLE contient les bonnes propriétés CSS', async () => {
    const { CONSOLE_STYLE } = await import('../../src/constants');
    expect(CONSOLE_STYLE).toMatchObject({
      title: expect.stringContaining('color: white'),
      title: expect.stringContaining('background: green'),
      version: expect.stringContaining('color: green'),
      version: expect.stringContaining('background: white'),
    });
  });

  // Test des interpolations dynamiques avec mock de __BUILD_TIMESTAMP__
  describe('CARD_VERSION', () => {
    test('CARD_VERSION est généré correctement avec timestamp de dev', async () => {
      vi.stubGlobal('__BUILD_TIMESTAMP__', undefined);
      const { CARD_VERSION } = await import('../../src/constants');
      expect(CARD_VERSION).toBe('2.1.0 (dev)');
    });

    test('CARD_VERSION est généré correctement avec un timestamp spécifique', async () => {
      vi.stubGlobal('__BUILD_TIMESTAMP__', '2024-12-01');
      const { CARD_VERSION } = await import('../../src/constants');
      expect(CARD_VERSION).toBe('2.1.0 (2024-12-01)');
    });
  });
});
