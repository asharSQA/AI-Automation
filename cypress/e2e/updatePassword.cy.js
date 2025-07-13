import commmands from '../support/Commands/list';
import { Interaction } from '../Pages/interaction/interaction';
import { updatePassword } from '../Pages/updatePasswordPage';
import { Login } from '../Pages/LoginPage';

describe('Verify that a user is able to update password from Account -> Password', () => {
  const updatePasswordPage = new updatePassword();
  const interaction = new Interaction();
  const login = new Login();

  afterEach(() => {
    Cypress.session.clearCurrentSessionData();
  });
  const [validUser] = Cypress.env('Credentials').filter(user => user.Role === 'Valid Credentials');

  it(`Login with ${validUser.Role}`, () => {
    cy[commmands.navigate.login.call](1400, 1080);
    cy[commmands.actions.login.call](validUser.username, validUser.Password);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(10000);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(5000);
    interaction.button.accountMenu.click();
    interaction.button.accountPassword.click();
    updatePasswordPage.invalidCurrentPassword();
    updatePasswordPage.mismatchedNewPassword();
    updatePasswordPage.updatePasswordSuccessfully();
  });
});
