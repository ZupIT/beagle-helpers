# BFF: Spring Boot gRPC Application

## This is a BFF example using Beagle gRPC library for backend developers

### How to execute?

- Requirements:
    - Open JDK 8+


- Now, just open your terminal at the root of the project and run ./gradlew run

Ready! Application will be standing at door 50051, enjoy it!

### Services available:

- ScreenService
    - method: getScreen
    - request: ```{
      "name": "String",  
      "parameters": "String"  
      }```
        - Description: This method searches for one or more Screen Builders registered in class BeagleScreenService provided by lib.
            - **"name"** parameter is mandatory and must contain a valid string referring the name of a registered screen.
            - **"Parameters"** is optional and contains a string that is used in Text component message on Home Screen