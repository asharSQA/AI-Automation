const login = {
  name: 'NAVIGATE/LOGIN',
  callback: (width, height) => {
    cy.viewport(width, height);
    cy.on('uncaught:exception', () => false);
    cy.visit(`${Cypress.env('host')}/login`.replaceAll('/undefined', ''), {
      responseTimeout: 10000,
    }); // This Line is used to navigate to Login Page
  },
  get call() {
    return this.name;
  },
};

export default login;
