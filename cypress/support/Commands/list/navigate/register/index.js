const register = {
  name: 'NAVIGATE/register',
  callback: (width, height) => {
    cy.viewport(width, height);
    cy.on('uncaught:exception', () => false);
    cy.visit(`${Cypress.env('host')}/register`.replaceAll('/undefined', ''), {
      responseTimeout: 10000,
    }); // This Line is used to navigate to registeration Page
  },
  get call() {
    return this.name;
  },
};

export default register;
