import commmands from '../support/Commands/list';
import { Login } from '../Pages/LoginPage';

describe('Verify the login persistence session', () => {
  const loginPage = new Login();

  afterEach(() => {
    Cypress.session.clearCurrentSessionData();
  });

  // Extract only the user with Role "Valid Credentials"
  const [validUser] = Cypress.env('Credentials').filter(user => user.Role === 'Valid Credentials');

  it(`Login with ${validUser.Role}`, () => {
    cy[commmands.navigate.login.call](1400, 1080);
    cy[commmands.actions.login.call](validUser.username, validUser.Password);
    loginPage.sessionPersistence();
  });
});
