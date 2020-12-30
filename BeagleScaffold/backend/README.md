# How to execute

## Requirements

- JDK 11+
- Maven (latest version) or Intellij IDEA

## Run locally

- **Using Only Maven:**
  - Just navigate to the backend directory starting from the project root (./BeagleScaffold/backend) and run the command `mvn clean spring-boot:run`
  - Ready! Your application will be up in a few seconds and available at http://localhost:8080/
  
- **Using Intellij:**
  - Open the backend directory inside ./BeagleScaffold/ using intellij as a maven project and it will automatically download the dependencies.
  - Then, go to the main function, located at src/main/kotlin/br/com/zup/bff/BffApplication.kt and click on the green play button in the left corner of the line where the main function is located
  - Ready! The application will start and be up and running in a few seconds and can be accessed at http://localhost:8080/
   
## Deploy to AWS
 
- You need to create a release on github following a specific tag pattern, eg: `v*.*.*-backend`, where what is in * can be replaced by the version number to be released.

- This will trigger an action that will make the entire deployment process for that release on the selected branch automatically
