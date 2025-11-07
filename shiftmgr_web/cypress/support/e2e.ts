/// <reference types="cypress" />

// Seed baseline data so the UI has something to show.
Cypress.Commands.add('seedApp', () => {
  const API = Cypress.env('API') as string;
  cy.request('POST', `${API}/auth/login`, { email: 'admin@example.com', password: 'password' })
    .then((r) => {
      const token = r.body.token as string;
      return cy.request({
        method: 'POST',
        url: `${API}/locations`,
        headers: { Authorization: `Bearer ${token}` },
        body: { location: { name: 'Main Store' } },
        failOnStatusCode: false
      });
    });
});

// Log in via the UI so your Zustand store is populated.
Cypress.Commands.add('loginUi', () => {
  cy.visit('/login');
  cy.get('input[placeholder="email"]').clear().type('admin@example.com');
  cy.get('input[placeholder="password"]').clear().type('password');
  cy.contains('button', 'Login').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

// Type augmentation for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      seedApp(): Chainable<void>;
      loginUi(): Chainable<void>;
    }
  }
}
export {};
