import commmands from '../support/Commands/list';
import { ConfiguresettingPages } from '../Pages/configureSettingPage';
import { Interaction } from '../Pages/interaction/interaction';
import { loginNoviPortal } from '../Pages/loginNoviPage';
import { callUsingNovi } from '../Pages/noviCallPage';
import { callLogs } from '../Pages/interaction/callLogs/callLogs';

describe('During Call Workflows', () => {
  const configureSetting = new ConfiguresettingPages();
  const interaction = new Interaction();
  const loginNoviPage = new loginNoviPortal();
  const call = new callUsingNovi();
  const callLog = new callLogs();
  const [validUser] = Cypress.env('Credentials').filter(user => user.Role === 'Valid Credentials');
  const [anotherUSer] = Cypress.env('otherSMBCredentials').filter(user => user.Role === 'Other Credentials');

  let testData;

  before(() => {
    cy.fixture('interactionTexts.json').then(data => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy[commmands.navigate.login.call](1400, 1080);
    cy[commmands.actions.login.call](validUser.username, validUser.Password);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(30000);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
  });

  it('Transfer Call', () => {
    configureSetting.duringCallWorkFlowsCallTransfer();
    loginNoviPage.loginNovi();
    call.noviCall();
    cy.wait(10000);
    callLog.intercept();
    interaction.button.logs.click();
    interaction.button.callLogs.click();
    callLog.wait();
    cy.wait(5000);
    interaction.button.transcriptButton(0).click();
    interaction.fields.transcriptAssistantMessage
      .last()
      .should('contain.text', 'Please hold while I transfer your call');
    interaction.button.modalCloseCross.click();
    interaction.button.logout.click();
    cy[commmands.navigate.login.call](1400, 1080);
    cy[commmands.actions.login.call](anotherUSer.username, anotherUSer.Password);
    cy.wait(10000);
    interaction.button.logs.click();
    interaction.button.callLogs.click();
    interaction.fields.phoneNumber.should('contain.text', '+18285200731');
    interaction.button.logout.click();
    cy[commmands.navigate.login.call](1400, 1080);
    cy[commmands.actions.login.call](validUser.username, validUser.Password);
    cy.wait(10000);
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(7).click();
    interaction.button.collapseHeader(8).click();
    interaction.button.deleteButton(0).click();
    configureSetting.duringCallWorkFlowdeleteSuccessMessage();
  });

  it('Intake Form', () => {
    configureSetting.collectInformationIntakeForm();
    loginNoviPage.loginNovi();
    call.noviCall();
    cy.wait(10000);
    callLog.intercept();
    interaction.button.logs.click();
    interaction.button.callLogs.click();
    callLog.wait();
    cy.wait(10000);
    interaction.button.morebutton.eq(0).click();
    interaction.button.moreContentViewIntakeResponse.click({ force: true });
    interaction.fields.checkQuestionsVisible(testData.intakeFormQuestion1, testData.intakeFormQuestion2);
    interaction.button.closeWindow.click();
    cy.wait(5000);
    cy.reload();
    cy.wait(10000);
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(7).click();
    interaction.button.collapseHeader(10).click();
    interaction.button.deleteButton(0).click();
    configureSetting.duringCallWorkFlowdeleteSuccessMessage();
  });
});
