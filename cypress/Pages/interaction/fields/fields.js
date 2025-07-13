export class fields {
  enterOldPassword(password) {
    cy.get('#overview-form_oldPassword').clear().type(password);
  }

  enterNewPassword(newPassword) {
    cy.get('#overview-form_newPassword').clear().type(newPassword);
  }

  confirmPassword(confirmPassword) {
    cy.get('#overview-form_confirmPassword').clear().type(confirmPassword);
  }

  get typeBlockGreeting() {
    return cy.get('#system_phrase');
  }

  get addWebsite() {
    return cy.get('.ant-input');
  }

  get typeBlockSpeakingStyle() {
    return cy.get('#ai_prompt');
  }

  get typeBlockKnowledgeBase() {
    return cy.get('.ant-input');
  }

  get typeBlockCommonQuestions() {
    return cy.get('textarea[placeholder="Please enter your Q&A"]');
  }

  get transcriptAssistantMessage() {
    return cy.get('div.flex.justify-start');
  }

  get callWorkFlowDescription() {
    return cy.get('input.ant-input.ant-input-outlined[type="text"]');
  }

  get knowledgeBaseaddtextedit() {
    return cy.get('.anticon.anticon-edit');
  }

  get commonQuestionText() {
    return cy.get('#overview-form_sampleQA');
  }

  addTextScenario() {
    return cy.get('[data-testid="textingworkflow-scenario-desc-input"]');
  }

  addTextMessage() {
    return cy.get('[data-testid="textingworkflow-text-message-input"]');
  }

  aiTextNextStep() {
    return cy.get('[data-testid="textingworkflow-text-post-execution-input"]');
  }

  get intakeFormScenario() {
    return cy.get('#overview-form_scenarios_0_customScenario');
  }

  intakeFormQuestion(index) {
    return cy.get(`#overview-form_scenarios_0_questions_${index}_question`);
  }
  aiIntakeFormNextStep() {
    return cy.get('[data-testid="final-phrase-post-execution-input"]');
  }

  get callLogDetailTranscript() {
    return cy.get('.ant-modal-content');
  }

  get phoneNumber() {
    return cy.get('td.ant-table-cell span');
  }

  addemailfield(index = 0) {
    return cy.get('.ant-form-item-control-input-content').eq(index);
  }

  getaddPhonefield(index = 0) {
    return cy.get('.form-control.font-medium').eq(index);
  }

  checkQuestionsVisible(...questions) {
    questions.forEach(question => {
      cy.get('.ant-list-item-meta-description').contains(question).should('be.visible');
    });
  }
  languageFieldReceptionist() {
    return cy
      .get('.ant-select-selector')
      .click()
      .then(() => {
        return cy.get('.ant-select-selection-overflow');
      });
  }

  DropdownItem(itemText) {
    cy.get('.ant-dropdown-menu-title-content').contains(itemText).click();
  }

  get textSendAssertion() {
    return cy.get('.px-1 > .justify-center > .inline-flex');
  }

  notificationCustomScenarioField() {
    return cy.get('#overview-form_scenarios_0_scenario');
  }

  notificationCustomScenarioEmailField() {
    return cy.get('div[class*="control"] input[type="text"][role="combobox"]');
  }
}
