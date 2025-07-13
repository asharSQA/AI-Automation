import commmands from '../support/Commands/list';
import { Interaction } from '../Pages/interaction/interaction';
import { callLogs } from '../Pages/interaction/callLogs/callLogs';

const interaction = new Interaction();
const callLog = new callLogs();
const [validUser] = Cypress.env('Credentials').filter(user => user.Role === 'Valid Credentials');

export class ConfiguresettingPages {
  constructor() {
    before(() => {
      cy.fixture('interactionTexts.json').then(data => {
        this.testData = data;
      });
    });
  }

  basicGreetingSetting() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(1).click();
    interaction.button.editButton.click();
    interaction.fields.typeBlockGreeting.click({ force: true }).clear();
    cy.wait(500);
    interaction.fields.typeBlockGreeting.type(this.testData.basicGreetingText, { delay: 0 });
    interaction.button.saveandRemoveButton('Update').click();
    this.basicGreetingSettingSuccessMessage();
    cy.wait(5000);
    interaction.button.editButton.click();
    interaction.fields.typeBlockGreeting.should('have.value', this.testData.basicGreetingText);
  }

  basicSpeakingStyle() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(2).click();
    interaction.button.editButton.click();
    interaction.fields.typeBlockSpeakingStyle.click({ force: true }).clear();
    interaction.fields.typeBlockSpeakingStyle.type(this.testData.basicSpeakingStyle, { delay: 0 });
    interaction.button.saveandRemoveButton('Update').click();
    this.basicSpeakingStyleSuccessMessage();
    cy.wait(5000);
    interaction.button.editButton.click();
    interaction.fields.typeBlockSpeakingStyle.should('have.value', this.testData.basicSpeakingStyle);
  }

  knowledgeBaseAddText() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(3).click();
    interaction.button.addText.click();

    cy.fixture('paragraphText.txt').then(text => {
      interaction.fields.typeBlockKnowledgeBase.click({ force: true }).clear();
      interaction.fields.typeBlockKnowledgeBase.click({ force: true }).type(text, { delay: 20 });
      interaction.button.addKnowledgebaseText('Add').click();
      this.knowledgebaseaddSuccessMessage();
      cy.wait(10000);
      this.knowledgeBaseSaveAssertion('Text');
    });
  }

  knowledgeBaseAddWebsiteUrl() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(3).click();
    interaction.button.addWebsiteUrl.click();
    interaction.fields.addWebsite.type(this.testData.websiteUrl);
    interaction.button.addKnowledgebaseText('Crawl').click();
    this.knowledgebaseaddUrlSuccessMessage();
    interaction.button.urlToggle(1).click();
    interaction.button.addKnowledgebaseText('Add Selected URLs').click();
    this.knowledgebaseaddSuccessMessage();
    cy.wait(10000);
    this.knowledgeBaseSaveAssertion('Link');
  }

  knowledgeBaseUploadDocument() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(3).click();
    interaction.button.uploadDocument('paragraphText.txt');
    interaction.button.addKnowledgebaseText('Upload').click();
    this.knowledgebaseaddSuccessMessage();
    cy.wait(10000);
    this.knowledgeBaseSaveAssertion('File');
  }

  basicSettingCommonQuestion() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(4).click();
    interaction.button.editIcon.click();
    interaction.fields.commonQuestionText.click({ force: true }).clear();
    interaction.fields.commonQuestionText.type(this.testData.commonQuestionText, { delay: 0 });
    interaction.button.submitButton.click();
    this.basicCommonQuestionAssertion();
  }

  basicSettingLanguage() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(5).click();
    interaction.button.editIcon.click();
    interaction.button.cross().click();
    interaction.fields.languageFieldReceptionist().click({ force: true });
    interaction.fields.languageFieldReceptionist().type('English');
    interaction.button.dropdownSelection(0).click();
    cy.get('.ant-modal-title').click();
    interaction.button.submitButton.click();
    this.languageSettingSuccessMessage();
    cy.wait(10000);
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(5).click();
    this.basicSettingLanguageSaveAssertion('English');
  }

  duringCallWorkFlowsCallTransfer() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(7).click();
    interaction.button.collapseHeader(8).click();
    interaction.button.addcallflow.click();
    interaction.fields.callWorkFlowDescription.eq(0).click({ force: true });
    cy.wait(500);
    interaction.fields.callWorkFlowDescription.eq(0).type(this.testData.callTransferDescription, { delay: 0 });
    interaction.button.phoneNumberField.click().clear().type('+17475887168', { delay: 0 });
    interaction.button.submitButton.click();
    this.duringCallWorkFlowsCallTransferSuccessMessage();
    interaction.button.editIcon.eq(0).click();
    interaction.fields.callWorkFlowDescription.should('have.value', this.testData.callTransferDescription);
    interaction.button.closeWindow.eq(1).click();
  }

  duringCallWorkFlowSendTextMessage() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(7).click();
    interaction.button.collapseHeader(9).click();
    interaction.button.addcallflow.click();
    interaction.fields.addTextScenario().click({ force: true });
    interaction.fields.addTextScenario().type(this.testData.textScenario, { delay: 0 });
    interaction.fields.addTextMessage().click({ force: true });
    interaction.fields.addTextMessage().type(this.testData.textMessage, { delay: 0 });
    interaction.fields.aiTextNextStep().click({ force: true });
    interaction.fields.aiTextNextStep().type(this.testData.textNextStep, { delay: 0 });
    interaction.button.submitButton.click();
    this.duringCallWorkFlowSendTextandIntakeFormSuccessMessage();
    cy.get('.ant-card-body')
      .should('contain.text', this.testData.textScenario)
      .and('contain.text', this.testData.textMessage)
      .and('contain.text', this.testData.textNextStep);
  }

  collectInformationIntakeForm() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(7).click();
    interaction.button.collapseHeader(10).click();
    interaction.button.addcallflow.click();
    interaction.button.toggleImmidiate.click();
    interaction.fields.intakeFormQuestion(0).click({ force: true });
    interaction.fields.intakeFormQuestion(0).type(this.testData.intakeFormQuestion1, { delay: 0 });
    interaction.button.addQuestion.click();
    interaction.fields.intakeFormQuestion(1).click({ force: true });
    interaction.fields.intakeFormQuestion(1).type(this.testData.intakeFormQuestion2, { delay: 0 });
    interaction.button.submitButton.click();
    this.duringCallWorkFlowSendTextandIntakeFormSuccessMessage();
  }

  basicSpeakingStyleSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'AI Prompt has been saved successfully!', {
      timeout: 100000,
    }).should('be.visible');
  }

  basicGreetingSettingSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'Greeting Phrase has been saved successfully!', {
      timeout: 100000,
    }).should('be.visible');
  }

  GreetingAssertion() {
    cy.wait(8000);
    callLog.intercept();
    interaction.button.logs.click();
    interaction.button.callLogs.click();
    callLog.wait();
    cy.wait(2000);
    interaction.button.transcriptButton(0).click();
    interaction.fields.transcriptAssistantMessage.eq(0).should('contain.text', this.testData.basicGreetingText);
  }

  knowledgebaseaddUrlSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'URL crawled successfully', {
      timeout: 100000,
    });
  }
  knowledgebaseaddSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'Knowledge base entry created successfully', {
      timeout: 100000,
    });
  }
  duringCallWorkFlowsCallTransferSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'Call Transfering workflow has been created successfully!', {
      timeout: 100000,
    }).should('be.visible');
  }

  basicCommonQuestionAssertion() {
    cy.contains('.ant-notification-notice-message', 'Q&A has been saved successfully!', {
      timeout: 100000,
    }).should('be.visible');
  }

  languageSettingSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'Voice & languages has been saved successfully!', {
      timeout: 100000,
    }).should('be.visible');
  }
  duringCallWorkFlowSendTextandIntakeFormSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'Details has been saved successfully!', {
      timeout: 100000,
    }).should('be.visible');
  }

  duringCallWorkFlowdeleteSuccessMessage() {
    cy.contains('.ant-notification-notice-message', /Scenario \d deleted successfully\./, {
      timeout: 100000,
    }).should('be.visible');
  }
  KnowledgeBaseDeleteSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'Entry deleted successfully', {
      timeout: 100000,
    });
  }

  knowledgeBaseSaveAssertion(itemText) {
    cy.get('.ant-table-cell').contains(itemText);
  }

  basicSettingLanguageSaveAssertion(itemText) {
    cy.get('.voice-and-language-info__item').contains(itemText);
  }

  duringCallWorkFlowSendTextMessageSaveAssertion(text) {
    return cy.get('.ant-card-body').contains(text);
  }
}
