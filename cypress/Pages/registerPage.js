import commands from '../support/Commands/list';
import RandomNameGenerator from './interaction/randomName/randomNames';

export class Register {
  constructor() {
    this.randomName = new RandomNameGenerator().generate();
  }

  actions() {
    cy[commands.actions.register.call]();
  }

  registerForm() {
    cy.task('createInbox').then(({ emailAddress }) => {
      Cypress.env('emailAddress', emailAddress);
      Cypress.env('randomName', this.randomName);

      cy.get('#username').type(this.randomName);
      cy.get('#email').type(emailAddress);
      cy.get('#password').type('Test@123');
      cy.get('.ant-btn').click();
    });
  }

  registrationSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'Registration Successful', { timeout: 200000 }).should(
      'be.visible'
    );
  }

  testReceptionistAssertion() {
    cy.get('.test-receptionist-left', { timeout: 100000 }).should('be.visible');
  }
}
