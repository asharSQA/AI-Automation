import commmands from '../support/Commands/list';
import { fields } from './interaction/fields/fields';
import { Button } from './interaction/button/button';
import { Login } from './LoginPage';

export class updatePassword {
  constructor() {
    this.fields = new fields();
    this.Button = new Button();
    this.Login = new Login();
  }

  updatePasswordOnly(oldPassword, newPassword) {
    this.fields.enterOldPassword(oldPassword);
    this.fields.enterNewPassword(newPassword);
    this.fields.confirmPassword(newPassword);
    this.Button.submitButton.click();
    this.verifySuccessfullPasswordUpdate();
  }

  verifyLoginWithNewPassword(username, newPassword) {
    this.Button.logout.click();
    cy[commmands.actions.login.call](username, newPassword);
    cy.wait(10000);
  }

  resetPasswordToOld(currentPassword, oldPassword) {
    this.Button.accountMenu.click();
    this.Button.accountPassword.click();
    this.fields.enterOldPassword(currentPassword);
    this.fields.enterNewPassword(oldPassword);
    this.fields.confirmPassword(oldPassword);
    this.Button.submitButton.click();
    this.verifySuccessfullPasswordUpdate();
  }

  updatePasswordSuccessfully() {
    cy.fixture('forgotPassword.json').then(forgotPassword => {
      const username = Cypress.env('Credentials').find(user => user.Role === 'Valid Credentials').username;
      const oldPassword = Cypress.env('Credentials').find(user => user.Role === 'Valid Credentials').Password;
      const newPassword = forgotPassword.validPassword.password;

      this.updatePasswordOnly(oldPassword, newPassword);
      this.verifyLoginWithNewPassword(username, newPassword);
      this.resetPasswordToOld(newPassword, oldPassword);
    });
  }

  invalidCurrentPassword() {
    cy.fixture('forgotPassword.json').then(forgotPassword => {
      const wrongPassword = 'WrongPass123!';
      const newPassword = forgotPassword.validPassword.password;

      this.fields.enterOldPassword(wrongPassword);
      this.fields.enterNewPassword(newPassword);
      this.fields.confirmPassword(newPassword);
      this.Button.submitButton.click();
      this.verifyInvalidcurrentPasswordError();
    });
  }

  mismatchedNewPassword() {
    cy.fixture('forgotPassword.json').then(forgotPassword => {
      const oldPassword = Cypress.env('Credentials').find(user => user.Role === 'Valid Credentials').Password;
      const newPassword = forgotPassword.mismatchPassword.password;
      const confirmPassword = forgotPassword.mismatchPassword.confirmPassword;

      this.fields.enterOldPassword(oldPassword);
      this.fields.enterNewPassword(newPassword);
      this.fields.confirmPassword(confirmPassword);
      this.Button.submitButton.click();
      this.verifymismatchedNewPasswordError();
    });
  }

  verifyInvalidcurrentPasswordError() {
    cy.get('.ant-form-item-explain-error').should('have.text', 'Your old password is incorrect, please try again');
  }

  verifymismatchedNewPasswordError() {
    cy.get('.ant-form-item-explain-error').should('have.text', 'The passwords you entered do not match!');
  }

  verifySuccessfullPasswordUpdate() {
    cy.get('.ant-notification-notice-message').should('have.text', 'Success');
    cy.get('.ant-notification-notice-description').should('have.text', 'Password has been updated successfully!');
  }
}
