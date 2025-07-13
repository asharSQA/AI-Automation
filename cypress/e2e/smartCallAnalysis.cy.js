import commmands from '../support/Commands/list';
import { Interaction } from '../Pages/interaction/interaction';
import { callLogs } from '../Pages/interaction/callLogs/callLogs';
import { loginNoviPortal } from '../Pages/loginNoviPage';
import { callUsingNovi } from '../Pages/noviCallPage';
import { smartCallAnalysisPage } from '../Pages/smartCallAnalysisPage';

describe('Smart Call Analysis', () => {
  const interaction = new Interaction();
  const loginNoviPage = new loginNoviPortal();
  const call = new callUsingNovi();
  const callLog = new callLogs();
  const smartCallAnalysisPages = new smartCallAnalysisPage();
  const [validUser] = Cypress.env('Credentials').filter(user => user.Role === 'Valid Credentials');

  beforeEach(() => {
    cy[commmands.navigate.login.call](1400, 1080);
    cy[commmands.actions.login.call](validUser.username, validUser.Password);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(30000);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
  });

  it('Verify the smart call analysis', () => {
    smartCallAnalysisPages.SmartCallAnalysissetting();
    smartCallAnalysisPages.SmartCallAnalysisSettingSuccessMessage();
    loginNoviPage.loginNovi();
    call.noviCall();
    cy.wait(10000);
    callLog.intercept();
    interaction.button.logs.click();
    interaction.button.callLogs.click();
    callLog.wait();
    cy.wait(5000);
    interaction.button.viewButton(0).click();
    smartCallAnalysisPages.SmartCallAnalysisSettingAssertion();
  });
});
