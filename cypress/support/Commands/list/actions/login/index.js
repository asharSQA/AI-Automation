const login = {
  name: 'ACTION/LOGIN',
  callback: (username, password) => {
    cy.intercept('POST', '**/api/v2/receptionist-dashboard/login').as('loginRequest');
    cy.intercept('POST', '/api/v2/receptionist-dashboard/captcha/verify', {
      statusCode: 200,
      body: { success: true },
    }).as('verifyCaptcha');
    cy.on('uncaught:exception', () => false);
    cy.get('#login-form_username').type(username);
    cy.get('#login-form_password').type(password);
    cy.get('.ant-checkbox-input').click();
    cy.wait(3000);
    cy.get('.ant-btn').click();
    cy.wait(3000);
    cy.wait('@verifyCaptcha');
  },
  get call() {
    return this.name;
  },
};

export default login;
