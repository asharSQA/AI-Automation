const forgotPassword = {
  name: 'NAVIGATE/FORGOTPASSWORD',
  callback: (width, height) => {
    cy.viewport(width, height);
    cy.on('uncaught:exception', () => false);
    cy.visit(`${Cypress.env('host')}/forgot-password`.replaceAll('/undefined', ''), {
      responseTimeout: 10000,
    }); // This Line is used to navigate to Forgot Password page
  },
  get call() {
    return this.name;
  },
};

export default forgotPassword;
