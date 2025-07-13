export class Login {
  navigate() {
    cy.on('uncaught:exception', () => false);
    cy.visit(Cypress.env('host'));
  }

  loginAssertions() {
    cy.wait('@loginRequest', { timeout: 10000 }).then(interception => {
      const response = interception.response;
      if (response.statusCode === 200) {
        // Assertions for successful login
        cy.get('.sider-containerapp-dashboard__menu-icon', { timeout: 100000 }).should('be.visible');
      } else if (response.statusCode === 401) {
        // Assertions for invalid password
        cy.get('.ant-alert-message').should('contain', 'Your password is incorrect, please check and try again');
        cy.url().should('include', '/login');
      } else if (response.statusCode === 400) {
        // Assertions for invalid username
        cy.get('.ant-alert-message').should('contain', 'User with this username does not exist!');
        cy.url().should('include', '/login');
      }
    });
  }
  sessionPersistence() {
    cy.get('.sider-containerapp-dashboard__menu-icon', { timeout: 100000 }).should('be.visible');
    cy.reload();
    cy.get('.sider-containerapp-dashboard__menu-icon', { timeout: 100000 }).should('be.visible');
    cy.log('Session persisted successfully');
  }
}
