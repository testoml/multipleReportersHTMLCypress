pipeline {

    agent any 

    parameters{
        string(name: 'cy', defaultValue: "cypress/e2e/**/**", description: "Enter the script path that you want to excecute")
    }

    options{
        ansiColor('xterm')
    }

     stages {
     
          stage('Building') {
                  steps {
                        echo 'Building project'    
                      }
                    }
          stage('Testing') {
            steps{
                bat "npm i"
                bat "npm test"
            }
          }
          stage('Deploying') {
                  steps {
                        echo 'Deploying project'    
                      }
                    }
  }
  post{
    always{
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/reports/mochareports', reportFiles: 'report.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
    }
  }
}