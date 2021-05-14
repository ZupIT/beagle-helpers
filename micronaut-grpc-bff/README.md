# BFF: Spring Boot gRPC Application

## This is a BFF example using Beagle gRPC library for backend developers

### How to execute?

- Requirements:
    - Open JDK 11
  

- Now, just open your terminal at the root of the project and run ./gradlew run

That's it! The application will be up at localhost:50051, enjoy it!

### Services available:

- ScreenService
  - method: getScreen
  - request: ```{
      "name": "String",  
      "parameters": "String"  
    }```
    - Description: This method searches for one or more Screen Builders registered in the BeagleScreenService class provided by lib.   
      - **`name`** is a mandatory parameter and must contain a valid string referring to the name of a registered screen. For this application, the available names are "Home" and "Text".
      - **`parameters`** is optional and contains a string that is used in the message of the `Text` component of the home screen
    
