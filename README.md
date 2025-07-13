# Automation Testing Framework

A comprehensive end-to-end testing framework built with Cypress for web application automation testing.

## 🚀 Overview

This project provides a robust automation testing solution with parallel test execution, comprehensive reporting, and modular test structure. It's designed to handle complex web application testing scenarios including authentication, API testing, and user interaction workflows.

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Chrome browser (for local development)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd automation-testing
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Install Cypress globally (optional)**
   ```bash
   npm install -g cypress
   ```

## 🏗️ Project Structure

```
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   ├── basicSetting.cy.js
│   │   ├── customScenarioNotification.cy.js
│   │   ├── duringCallWorkFlows.cy.js
│   │   ├── forgotPassword.cy.js
│   │   ├── login.cy.js
│   │   ├── loginNovi.cy.js
│   │   ├── loginSessionPersistence.cy.js
│   │   ├── logout.cy.js
│   │   ├── notifications.cy.js
│   │   ├── noviCall.cy.js
│   │   ├── register.cy.js
│   │   ├── smartCallAnalysis.cy.js
│   │   ├── twilioCall.cy.js
│   │   └── updatePassword.cy.js
│   ├── fixtures/               # Test data and configurations
│   │   ├── forgotPassword.json
│   │   ├── interactionTexts.json
│   │   └── paragraphText.txt
│   ├── Pages/                  # Page Object Models
│   │   ├── interaction/        # API interaction modules
│   │   ├── configureSettingPage.js
│   │   ├── emailNotificationsPage.js
│   │   ├── forgotPasswordPage.js
│   │   ├── loginNoviPage.js
│   │   ├── LoginPage.js
│   │   ├── logout.js
│   │   ├── noviCallPage.js
│   │   ├── registerPage.js
│   │   ├── smartCallAnalysisPage.js
│   │   ├── textNotificationsPage.js
│   │   ├── twilioCallPage.js
│   │   └── updatePasswordPage.js
│   ├── support/               # Custom commands and utilities
│   │   ├── Commands/
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── downloads/            # Downloaded files
│   ├── reports/              # Test reports (generated)
│   ├── screenshots/          # Screenshots (generated)
│   └── videos/               # Test videos (generated)
├── .github/workflows/        # CI/CD workflows
├── cypress.config.js         # Cypress configuration
└── package.json              # Project dependencies
```

## 🧪 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn test` | Run all tests with report generation |
| `yarn webapp` | Run Cypress tests without reports |
| `yarn webapp:open` | Open Cypress Test Runner |
| `yarn clean:reports` | Clean generated reports |
| `yarn generate:report` | Generate HTML reports from JSON |
| `yarn merge:reports` | Merge multiple JSON reports |
| `yarn create:html` | Create HTML report from merged JSON |

## 🚀 Running Tests

### Local Development

1. **Open Cypress Test Runner**
   ```bash
   yarn webapp:open
   ```

2. **Run all tests with reporting**
   ```bash
   yarn test
   ```

3. **Run specific test file**
   ```bash
   npx cypress run --spec "cypress/e2e/login.cy.js"
   ```

### CI/CD Pipeline

The project includes GitHub Actions workflows that:
- Check for test files in pull requests
- Run tests in parallel across multiple groups
- Generate comprehensive reports
- Upload artifacts for analysis

## 📊 Test Categories

### Authentication Tests
- **Login/Logout**: User authentication workflows
- **Registration**: New user registration process
- **Password Management**: Forgot password and password update flows
- **Session Persistence**: Login session handling

### Feature Tests
- **Basic Settings**: Application configuration testing
- **Notifications**: Email and text notification workflows
- **Call Workflows**: Voice call interaction testing
- **Smart Analysis**: AI-powered call analysis features

### API Integration Tests
- **API Authentication**: Token-based authentication
- **Call Initiation**: Voice call API testing
- **Webhook Testing**: Third-party service integration

## 🔧 Configuration

### Environment Variables

Create a `cypress.env.json` file in the root directory:

```json
{
  "host": "https://your-test-environment.com",
  "Credentials": [
    {
      "Role": "Valid Credentials",
      "username": "test@example.com",
      "Password": "your-test-password"
    }
  ],
  "noviCredentials": [
    {
      "Email": "api-test@example.com",
      "Password": "api-test-password"
    }
  ],
  "TWILIO_ACCOUNT_SID": "your-twilio-sid",
  "TWILIO_AUTH_TOKEN": "your-twilio-token",
  "TWILIO_NUMBER": "+1234567890",
  "AI_RECEPTIONIST_NUMBER": "+0987654321",
  "TWIML_URL": "https://your-twiml-url.com",
  "MAILOSAUR_API_KEY": "your-mailosaur-key",
  "MAILOSAUR_SERVER_ID": "your-server-id"
}
```

### Cypress Configuration

The `cypress.config.js` includes:
- Custom task definitions for email testing
- Mochawesome reporter configuration
- Retry logic for flaky tests
- Memory management optimizations

## 📈 Reporting

### Mochawesome Reports

The framework generates comprehensive HTML reports using Mochawesome:
- Detailed test results with screenshots
- Test execution timeline
- Pass/fail statistics
- Error details and stack traces

### Artifacts

Generated artifacts include:
- **Screenshots**: Failed test screenshots
- **Videos**: Test execution recordings
- **Reports**: HTML and JSON report files

## 🏗️ Architecture

### Page Object Model (POM)

The project follows the Page Object Model pattern:
- **Pages/**: Contains page object classes
- **interaction/**: API interaction modules
- **support/Commands/**: Custom Cypress commands

### Custom Commands

Custom commands are organized by functionality:
- **Actions**: User interaction commands
- **Navigation**: Page navigation helpers
- **API**: API testing utilities

## 🔒 Security Considerations

- Environment variables are used for sensitive data
- API keys and credentials are externalized
- Test data is sanitized and generic
- No hardcoded sensitive information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

### Code Style Guidelines

- Use descriptive test names
- Follow Page Object Model pattern
- Add appropriate comments
- Maintain consistent formatting

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing in CI but passing locally**
   - Check environment variables
   - Verify network connectivity
   - Review timing configurations

2. **Screenshot/video generation issues**
   - Ensure sufficient disk space
   - Check file permissions
   - Verify Chrome installation

3. **API test failures**
   - Verify API endpoints are accessible
   - Check authentication tokens
   - Review request/response formats

### Debug Mode

Run tests with debug logging:
```bash
DEBUG=cypress:* yarn webapp
```

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For questions or issues:
1. Check existing documentation
2. Review test logs and reports
3. Create an issue with detailed information

---

**Note**: This framework is designed for testing purposes only. Always use test environments and avoid production data in automated tests. 