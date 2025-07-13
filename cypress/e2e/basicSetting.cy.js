import commmands from '../support/Commands/list';
import { ConfiguresettingPages } from '../Pages/configureSettingPage';
import { Interaction } from '../Pages/interaction/interaction';
import { loginNoviPortal } from '../Pages/loginNoviPage';
import { callUsingNovi } from '../Pages/noviCallPage';

describe('Basic Setting', () => {
  const configureSetting = new ConfiguresettingPages();
  const interaction = new Interaction();
  const loginNoviPage = new loginNoviPortal();
  const call = new callUsingNovi();
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

  it('Basic Greeting Setting', () => {
    configureSetting.basicGreetingSetting();
    loginNoviPage.loginNovi();
    call.noviCall();
    configureSetting.GreetingAssertion();
  });

  it('Basic Speaking Style', () => {
    configureSetting.basicSpeakingStyle();
  });

  it('Basic knowledge Base Add Text', () => {
    configureSetting.knowledgeBaseAddText();
    interaction.button.deleteKnowledgeBase(0).click();
    configureSetting.KnowledgeBaseDeleteSuccessMessage();
  });

  it('Basic knowledge Base Add URL ', () => {
    configureSetting.knowledgeBaseAddWebsiteUrl();
    interaction.button.deleteKnowledgeBase(0).click();
    configureSetting.KnowledgeBaseDeleteSuccessMessage();
  });

  it('Basic knowledge Base Upload Document', () => {
    configureSetting.knowledgeBaseUploadDocument();
    interaction.button.deleteKnowledgeBase(0).click();
    configureSetting.KnowledgeBaseDeleteSuccessMessage();
  });

  it('Basic Setting Common Question', () => {
    configureSetting.basicSettingCommonQuestion();
  });

  it('Basic Setting Common Language', () => {
    configureSetting.basicSettingLanguage();
  });
});
