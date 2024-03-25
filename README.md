# Reporter Cypress - HTML Report

## Introduction 
In automation, a reporter plays a crucial role in providing feedback and insights into the execution of test cases. Here are some key importance of reporters in automation:

- *Visibility*: Reporters provide visibility into the test execution process by summarizing the results of the tests. This visibility helps in understanding which tests passed, failed, or encountered errors.
- *Debugging*: When tests fail, reporters offer detailed information about the failures, including error messages, stack traces, and other diagnostic data. This aids in debugging and identifying the root cause of failures quickly.
- *Traceability*: Reporters often include timestamps and other metadata, allowing for traceability of test results over time. This traceability is essential for tracking the progress of test suites across different builds or versions of the software.
- *Customization*: Many reporting tools allow for customization of reports to suit specific requirements. This could include generating reports in different formats (HTML, XML, JSON, etc.), adding custom fields or annotations, or integrating with other tools in the development workflow.
- *Historical Analysis*: Reporters typically store historical test results, enabling historical analysis and trend identification. Analyzing historical data can help in identifying patterns, detecting regressions, and making data-driven decisions to improve the quality of the software.
- *Integration*: Reporters can integrate with other tools in the testing ecosystem, such as continuous integration (CI) servers, issue tracking systems, or test management platforms. Integration with these tools streamlines the testing process and facilitates collaboration among team members.
- *Communication*: Test reports serve as a means of communication within the development team, providing stakeholders with insights into the quality of the software. Clear and concise reports help in communicating the status of the software and facilitating informed decision-making.


## Available reporter in cypress
As of the last update in January 2022, Cypress provides several built-in reporters and also supports third-party reporters. These reporters are used to format and display the results of your test runs. Here are the available reporters:
- **Spec Reporter**:
This is the default reporter used by Cypress.
It prints test results to the terminal in a human-readable format.
It's suitable for small projects or for quick feedback during development.
- **Mocha JSON Reporter**:
This reporter outputs test results in JSON format.
It's useful for integrating Cypress test results with other tools or systems.
- **JUnit XML Reporter**:
This reporter generates XML files in JUnit format.
It's commonly used for integrating Cypress with continuous integration (CI) systems such as Jenkins or CircleCI.
- **Mochawesome Reporter**:
This is a third-party reporter that generates HTML reports with rich formatting.
It provides detailed test results including test names, durations, commands, and screenshots.
It's popular for its visually appealing and informative reports.
- **Cypress Dashboard Service**:
Cypress provides a cloud-based Dashboard Service that offers detailed test results, video recording, and parallelization capabilities.
It's a premium service offered by Cypress for teams and organizations.
- **Third-party Reporters**:
Apart from the built-in reporters, Cypress also supports various third-party reporters.
These reporters are developed and maintained by the community and offer different features and formatting options.
Some examples include cypress-xunit, cypress-junit-reporter, cypress-slack-reporter, etc.

## Installation and  Configuration 
### Preconditions:
1. Set up a new project if you don't have one.  
Follow those steps if you are new [Cypress Installation](https://www.cypress.io/install)
2. Replace the code created in your spect.cy.js or test that you created
> Note: Ignore this point if you have test cases and just want to implement an HTML report
```sh
describe('Login Test', () => {
    beforeEach(() => {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
    });
  
    it('Positive LogIn test', () => {
        cy.get('input[name="username"]').type('student');
        cy.get('input[name="password"').type('Password123');
        cy.get('#submit').click();
        cy.url().should('contain', 'practicetestautomation.com/logged-in-successfully/');
        cy.get('strong').should('have.text', 'Congratulations student. You successfully logged in!');
        cy.contains('Log out').should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/')
    });
  
    it('Negative username test', () => {  
        cy.get('input[name="username"]').type('incorrectUser');
        cy.get('input[name="password"').type('Password123');
        cy.get('#submit').click();
        cy.get('#error').should('have.text', 'Your username is invalid!');
    });
  
    it('Negative password test', ()=>{
        cy.get('input[name="username"]').type('student');
        cy.get('input[name="password"').type('Password1234');
        cy.get('#submit').click();
        cy.get('#error').should('have.text', 'Your password is invalid!');
    });
  });
```

### Steps:
We will install and configure our **HTML Report** with screenshots
#### 1. Install Dependecies
- Install Mocha
- Install cypress-multi-reporters
- Install mochawesome
- Install mochawesome-merge

One command to install all
```sh
npm install mocha cypress-multi-reporters mochawesome mochawesome-merge mochawesome-report-generator
```
You see all dependecies are installed in package.json file
```sh
 "dependencies": {
    "cypress": "^13.7.1",
    "cypress-multi-reporters": "^1.6.4",
    "mocha": "^10.3.0",
    "mochawesome": "^7.1.3",
    "mochawesome-merge": "^4.3.0",
    "mochawesome-report-generator": "^6.2.0"
  }
```

#### 2. Set configurations in the cypress.json file:
```sh
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      quiet: true,
      overwrite: false,
      html: false,
      json: true
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

```
- **reporter**: This attribute specifies which reporter(s) Cypress should use for formatting and displaying test results. In this case, "cypress-multi-reporters" indicates that multiple reporters will be used.
- **reporterOptions**: This attribute allows you to specify options for the reporter(s) defined in the reporter attribute.
- **reporterEnabled**: This attribute, nested under reporterOptions, specifies which reporter(s) should be enabled. In this example, "mochawesome" is enabled.
- **mochawesomeReporterOptions**: This attribute, also nested under reporterOptions, provides options specifically for the Mochawesome reporter.
- **reportDir**: This attribute, nested under mochawesomeReporterOptions, specifies the directory where the Mochawesome report files will be generated. In this case, the reports will be stored in the "cypress/reports/mocha" directory.
- **quiet**: This attribute, nested under mochawesomeReporterOptions, determines whether the Mochawesome reporter should run in quiet mode. When set to true, it suppresses console output during test execution.
- **overwrite**: This attribute, nested under mochawesomeReporterOptions, determines whether existing report files should be overwritten. If set to false, new reports will be appended to existing ones.
- **html**: This attribute, nested under mochawesomeReporterOptions, specifies whether HTML reports should be generated. When set to false, HTML reports will not be generated.
- **json**: This attribute, nested under mochawesomeReporterOptions, specifies whether JSON reports should be generated. When set to true, JSON reports will be generated.

#### 3. Define file that allow manage reporter folder
Create a new file named 'directoryReport.js' in the 'cypress/support' directory, which facilitates the creation and deletion of report folders.
```sh
const fs = require('fs').promises;
const path = require('path');

const dir = 'cypress/reports';

async function createFolder(dir) {
    try {
        await fs.mkdir(dir);
    } catch (err) {
        console.error(err);
    }
}

async function removeFolder() {
    try {
        await fs.rm(dir, { recursive: true });
        console.log(`${dir} is deleted!`);
    } catch (err) {
        console.error(err);
    }
}

async function main() {
    try {
        await fs.access(dir);
        await removeFolder();
    } catch (err) {
        await createFolder(dir);
        await createFolder(path.join(dir, 'mochareports'));
    } 
}

main();
```

#### 4. Add scripts in package.json file

```sh
 "scripts": {
    "clean:reports": "node cypress/support/directoryReport.js",
    "pretest": "npm run clean:reports",
    "scripts": "cypress run",
    "combine-reports": "mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/mochareports/report.json",
    "generate-report": "marge cypress/reports/mochareports/report.json -f report -o cypress/reports/mochareports -- inline",
    "posttest": "npm run combine-reports && npm run generate-report",
    "test" : "npm run scripts || npm run posttest"
  }
```

- **clean:reports**: This script executes a Node.js script (directoryReport.js) located in the cypress/support directory. This script likely cleans up or initializes the directory where the test reports will be stored.
- **pretest**: This script runs before the test execution starts. In this case, it runs the clean:reports script to ensure that the report directory is clean and ready for new reports.
- **scripts**: This script executes Cypress to run your tests. It's a command-line interface (CLI) command provided by Cypress.
- **combine-reports**: This script merges multiple Mochawesome JSON reports into a single JSON file. It uses the mochawesome-merge package to merge all JSON files in the cypress/reports/mocha directory into one file (report.json) located in the cypress/reports/mochareports directory.
- **generate-report**: This script generates an HTML report from the merged JSON report generated in the previous step. It uses the marge package to create an HTML report (report.html) from the JSON report (report.json). The HTML report is placed in the cypress/reports/mochareports directory.
- **posttest**: This script runs after the test execution completes. It executes the combine-reports script to merge the test reports and then runs the generate-report script to generate the HTML report.
- **test**: This script is likely intended to be used as a single command to run tests, merging reports, and generating the HTML report. It first runs the scripts script to execute the tests and then executes the posttest script to perform post-test actions such as merging reports and generating the HTML report.

#### 5. Run first approach
```sh
npm test
```
Report are generated and display the correct information for each scenario.
![01](https://github.com/testoml/reporterCypress/blob/main/img/01.png)

#### 6. Adding screenshots of failed tests to the Mochawesome HTML report
##### Set configurations in the cypress.json file:
```sh
  screenshotOnRunFailure:true,
  screenshotsFolder:"cypress/reports/mochareports/assets",
```
#### Add code to allow merge screenshots into mochareporters/assets 
support > e2e.js
```sh
 import addContext from "mochawesome/addContext";
Cypress.on("test:after:run", (test, runnable) => {  
    if (test.state === "failed") {    
      const screenshot =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;    
  addContext({ test }, screenshot);  
    }
  });
```

> Note: Screenshots are only saved in the event of a failure. Therefore, please add a new spec called fail.cy.js into e2e folder.

```sh
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})
```
#### 7. Run to check all implementation working as expected
```sh
 npm test
```
Reports are generated and the screenshot is displayed according to the failed test case.
![02](https://github.com/testoml/reporterCypress/blob/main/img/02.png)


### Additionals configurations
#### Add configuration to run suite in Chrome
By default the application run in electron. 

In Script add this configuration
```sh
    "cy:chrome": "npx cypress run --browser=chrome",
```
Edit test tag
```sh
   "test" : "npm run cy:chrome scripts || npm run posttest"
```
Run your project and verify that running in Chrome
```sh
  npm test
```

