import commmands from '../support/Commands/list';
import { Login } from '../Pages/LoginPage';

describe('Verify that users are able to login', () => {
  const loginPage = new Login();

  afterEach(() => {
    Cypress.session.clearCurrentSessionData();
  });
  const Credentials = Cypress.env('Credentials');
  Credentials.forEach(User => {
    it(`Login with ${User.Role}`, () => {
      cy[commmands.navigate.login.call](1400, 1080);
      cy[commmands.actions.login.call](User.username, User.Password);
      loginPage.loginAssertions();
    });
  });
});
