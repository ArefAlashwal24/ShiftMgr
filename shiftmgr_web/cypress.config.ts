import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1366,
    viewportHeight: 768,
    setupNodeEvents() { /* no plugins needed */ }
  },
  env: {
    API: "http://localhost:3000"
  }
});
