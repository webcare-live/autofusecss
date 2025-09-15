import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    cwd: '.',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  testDir: './tests',
  use: { headless: true, baseURL: 'http://localhost:3000' },
});

