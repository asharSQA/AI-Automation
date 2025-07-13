import commands from '../support/Commands/list';
import { Register } from '../Pages/registerPage';
import { ForgotPassword } from '../Pages/forgotPasswordPage';
import { Interaction } from '../Pages/interaction/interaction';
import { Login } from '../Pages/LoginPage';

describe('Verify that users are able to register and reset password', () => {
  const registerPage = new Register();
  const forgotPassword = new ForgotPassword();
  const interaction = new Interaction();
  const loginPage = new Login();

  it('Register and test password reset', () => {
    cy[commands.navigate.register.call](1400, 1080);
    registerPage.actions();
    registerPage.registerForm();
    registerPage.registrationSuccessMessage();
    interaction.button.logout.click();
    forgotPassword.navigate();
    forgotPassword.actions();
    forgotPassword.resetPassword();
    forgotPassword.verifyLoginAfterReset();
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    loginPage.loginAssertions();
  });
});
