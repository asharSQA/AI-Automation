import commands from '../support/Commands/list';
import { Register } from '../Pages/registerPage';
import { Interaction } from '../Pages/interaction/interaction';

describe('Verify that users are able to register', () => {
  const registerPage = new Register();
  const interaction = new Interaction();
  it('Register', () => {
    // Navigate to the registration page
    cy[commands.navigate.register.call](1400, 1080);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(10000);
    // Perform registration actions
    registerPage.actions();
    registerPage.registerForm();
    registerPage.registrationSuccessMessage();
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    interaction.loaderShouldDisappear();
    registerPage.testReceptionistAssertion();
  });
});
