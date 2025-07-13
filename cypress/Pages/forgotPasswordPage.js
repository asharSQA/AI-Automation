import commands from '../support/Commands/list';
export class ForgotPassword {
  navigate() {
    cy[commands.navigate.forgotPassword.call](1400, 1080);
  }
  actions() {
    cy.wrap(null).then(() => {
      const email = Cypress.env('emailAddress');
      cy.log(`Using Email: ${email}`);
      cy.get('#login-form_usernameOrEmail').type(email);
      cy.get('.ant-btn').click();
      cy.get('.ant-alert-message', { timeout: 100000 })
        .should('be.visible')
        .and('contain', 'Password reset link has been sent to your email.');
    });
  }
  clickResetLink() {
    cy.wrap(null).then(() => {
      const emailAddress = Cypress.env('emailAddress');
      const baseHost = Cypress.env('host');
      cy.task('waitForEmail', {
        email: emailAddress,
        subject: 'Password Reset',
      }).then(email => {
        expect(email).to.exist;
        const hrefMatch = email.html.body.match(/href="[^"]*(\/reset-password\/[^"]*)"/i);
        if (!hrefMatch || !hrefMatch[1]) {
          throw new Error('Valid reset password link not found in email body');
        }
        const resetPath = hrefMatch[1].replace(/^\/+/, '');
        const fullResetUrl = new URL(resetPath, baseHost).href;
        cy.log(`Visiting reset URL: ${fullResetUrl}`);
        cy.visit(fullResetUrl, {
          timeout: 60000,
          failOnStatusCode: false,
        });
        cy.get('#login-form', { timeout: 100000 }).should('be.visible').and('contain', 'Reset Password');
      });
    });
  }
  resetPasswordEmptyFields() {
    cy.get('.ant-btn').click();
    cy.get('#login-form_password_help > .ant-form-item-explain-error').should('contain', 'Password is required!');
    cy.get('#login-form_confirmPassword_help > .ant-form-item-explain-error').should(
      'contain',
      'Confirm password is required!'
    );
  }
  resetPasswordWithMismatchedPasswords() {
    cy.fixture('forgotPassword.json').then(data => {
      cy.get('#login-form_password').clear().type(data.mismatchPassword.password);
      cy.get('#login-form_confirmPassword').clear().type(data.mismatchPassword.confirmPassword);
      cy.get('.ant-alert-message').should('contain', 'Passwords do not match');
      cy.get('.ant-btn').should('be.disabled');
    });
  }
  resetPasswordWithSamePasswords() {
    cy.fixture('forgotPassword.json').then(data => {
      cy.get('#login-form_password').clear().type(data.validPassword.password);
      cy.get('#login-form_confirmPassword').clear().type(data.validPassword.confirmPassword);
      cy.get('.ant-btn').click();
      this.validateSuccessfulReset();
    });
  }
  validateSuccessfulReset() {
    cy.get('.ant-notification-notice-message', { timeout: 10000 }).should('contain', 'Password reset successfully');
    cy.url().should('include', '/login');
  }
  verifyLoginAfterReset() {
    cy.fixture('forgotPassword.json').then(data => {
      const username = Cypress.env('randomName');
      const password = data.validPassword.password;
      cy[commands.actions.login.call](username, password);
    });
  }

  resetPassword() {
    this.clickResetLink();
    this.resetPasswordEmptyFields();
    this.resetPasswordWithMismatchedPasswords();
    this.resetPasswordWithSamePasswords();
  }
}
