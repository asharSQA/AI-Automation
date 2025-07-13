export class Logout {
  logoutAssertion() {
    cy.url().should('include', '/login');
    cy.get('#login-form', { timeout: 100000 }).should('be.visible');
  }
}
