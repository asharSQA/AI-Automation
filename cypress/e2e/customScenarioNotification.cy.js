import commmands from '../support/Commands/list';
import { Interaction } from '../Pages/interaction/interaction';
import { emailNotificationsPage } from '../Pages/emailNotificationsPage';
import { loginNoviPortal } from '../Pages/loginNoviPage';
import { callUsingNovi } from '../Pages/noviCallPage';
import { textNotificationsPage } from '../Pages/textNotificationsPage';
import { TwilioCall } from '../Pages/twilioCallPage';

describe('Verify that a user receives notifications', () => {
  const interaction = new Interaction();
  const notificationsPage = new emailNotificationsPage();
  const textNotifications = new textNotificationsPage();
  const loginNoviPage = new loginNoviPortal();
  const call = new callUsingNovi();
  const [validUser] = Cypress.env('Credentials').filter(user => user.Role === 'Valid Credentials');
  const twilioCall = new TwilioCall();

  beforeEach(() => {
    cy[commmands.navigate.login.call](1400, 1080);
    cy[commmands.actions.login.call](validUser.username, validUser.Password);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(10000);
    cy.wait(10000);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
  });

  it(`Verify that User Receives a custom Scenario Email Notifications`, () => {
    notificationsPage.customScenarioEmailNotifications();
    twilioCall.callusingtwilio();
    cy.wait(22000);
    notificationsPage.customScenarioCallsEmailNotificationsCheck();
    cy[commmands.navigate.login.call](1400, 1080);
    cy.wait(10000);
    interaction.button.configure.click();
    interaction.button.notifications.click();
    cy.wait(5000);
    interaction.button.notificationCustomScenarioTab().click();
    interaction.button.saveandRemoveButton('Add Scenario').click();
    interaction.button.removeScenarioIcon(0).click();
    interaction.button.submitButton.click();
    cy.wait(5000);
  });
  it(`Verify that User Receives a custom Scenario Text Notifications`, () => {
    textNotifications.customScenarioTextNotifications();
    twilioCall.callusingtwilio();
    cy.wait(22000);
    textNotifications.assertCustomTextNotificationCheck();
    interaction.button.saveandRemoveButton('Add Scenario').click();
    interaction.button.removeScenarioIcon(0).click();
    interaction.button.submitButton.click();
    cy.wait(5000);
  });
});
