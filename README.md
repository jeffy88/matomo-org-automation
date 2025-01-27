## Matomo E2E - Testing ###

### Basic Architecture ###
![architecture](https://github.com/user-attachments/assets/e5f13576-07c0-4418-97af-caf17666b93b)




### How to Run the Tests ###

To execute the automation tests, use the following command:

```
npx cucumber-js test
```
### Features / Tech Stacks Included ###

This automation framework includes the following technologies and features:

 - Playwright - For browser automation and end-to-end testing.
 - Cucumber JS - For Behavior-Driven Development (BDD) with Gherkin syntax.
 - GitHub Actions Workflow - Automated test execution triggered when pull requests (PRs) are made.

### Future Enhancements ###

Planned improvements and new features for the automation framework include:

 - Usage of Cucumber World
   To maintain test context and share state across steps.

 - Environment Variables Handling
   Support for different environments such as production, development, and localhost.

 - Page Object Model (POM)
   A structured approach for storing selectors and page routes for better maintainability.

 - Runtime Test Data Storage
   Implement mechanisms to store and retrieve test data dynamically during test execution.

 - Workflow Enhancements
   - Scheduled test runs at defined intervals.
   - Trigger test execution when code changes are made in the development repository (apart from the automation repository).

 - Code Quality and Compliance Checks
   - Commit linting to enforce commit message standards.
   - Super linters for code formatting, indentation, and validation.
