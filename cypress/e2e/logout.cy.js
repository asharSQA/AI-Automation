import commmands from '../support/Commands/list';
import { Logout } from '../Pages/logout';
import { Interaction } from '../Pages/interaction/interaction';

describe('Verify that a user is able to logout', () => {
  const logoutPage = new Logout();
  const interaction = new Interaction();
  const [validUser] = Cypress.env('Credentials').filter(user => user.Role === 'Valid Credentials');

  it(`Login with ${validUser.Role}`, () => {
    cy[commmands.navigate.login.call](1400, 1080);
    cy[commmands.actions.login.call](validUser.username, validUser.Password);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(10000);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(10000);
    interaction.button.logout.click();
    logoutPage.logoutAssertion();
  });
});
