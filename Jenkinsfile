pipeline {

    agent any 

    parameters{
        string(name: 'SPEC', defaultValue: "cypress/e2e/**/**", description: "Enter the script path that you want to excecute")
        choice(name: "BROWSER", choices:['chrome', 'edge'], description: "Select a browser to run")
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
                bat "npm run cy:${BROWSER} scripts || npm run posttest"
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
        publishHTML([allowMissing: false, 
        alwaysLinkToLastBuild: true, 
        keepAll: true, 
        reportDir: 'cypress/reports/mochareports', 
        reportFiles: 'report.html', 
        reportName: 'HTML Report', 
        reportTitles: '', 
        useWrapperFileDirectly: true])
    }
  }
}