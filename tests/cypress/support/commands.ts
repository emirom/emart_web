// tests/cypress/support/e2e.ts
import "./commands";

// جلوگیری از fail شدن تست‌ها به خاطر خطای غیرمرتبط JS
Cypress.on("uncaught:exception", () => {
  return false;
});
