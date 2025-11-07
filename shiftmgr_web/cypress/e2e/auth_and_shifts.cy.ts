/// <reference types="cypress" />

function dtPlus(hours: number) {
  const d = new Date(Date.now() + hours * 3_600_000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

describe('Shifts E2E', () => {
  before(() => cy.seedApp());

  it('logs in and creates a shift', () => {
    cy.loginUi();

    const start = dtPlus(24);
    const end = dtPlus(28);

    // location select (first option)
    cy.get('select').first().select(0);

    // datetime-local inputs: start then end
    cy.get('input[type="datetime-local"]').eq(0).clear().type(start);
    cy.get('input[type="datetime-local"]').eq(1).clear().type(end);

    cy.get('input[placeholder="Notes"]').clear().type('E2E demo shift');
    cy.contains('button', 'Add').click();

    cy.contains('E2E demo shift').should('be.visible');
  });
});
