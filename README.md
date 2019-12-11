## Electric Vehicles application
This repository contains two main folders where you can find Electric Vehicles application back-end and front-end. 
### Download or clone the project
### Back-end folder
#### Back-end  is created using following :
- JDK 11
- Spring 
- MySQL 8.0.13
- IDE - IntelliJ IDEA    
- Maven
### How to start server
The application  back-end is created as a Maven project so you can find all used dependencies in [pom.xml file](https://github.com/PDraganovP/electric-vehicles/blob/master/back-end/pom.xml). Next important thing you have to do is to change username and password with yours MySQL credentials in application.properties file that you can find [here](https://github.com/PDraganovP/electric-vehicles/blob/master/back-end/src/main/resources/application.properties). This is necessary to connect MySQL database. When everything is ready you can start your MySQL server and right after that you can start application back-end as you run the file SpringBootElectricVehiclesApplication.java that is located here back-end/src/main/java/app/.
Now back-end listen on http://localhost:8080

### Front-end folder
Front-end  is created using following :
- ReactJS
- Node.js
- NPM
- VS code 

### How to start react application
 Now we have working server that is ready for requests. Let's start the react application. Go to 
[electric-vehicles/front-end/electric vehicles/](https://github.com/PDraganovP/electric-vehicles/tree/master/front-end/electric%20vehicles) folder in your editor terminal or cmd and use this command

npm install

This action use package.json file to install all dependencies that react application needs.
After installation we are ready to start our Electric Vehicles react app. We can use this 

npm start

Now Electric Vehicles react application is started and listen on http://localhost:3000 

### Electric Vehicles functionality documentation
Electric Vehicles  represent  application that has public  and private part.

-  Public part is accessed from every visitor  and includes places where visitor can login if has account or register if want to use the application. 
-  Private part is accessed from three types of users:
   - user
   - moderator
   - administrator

They have different access levels. The first registered user is administrator and he/she has access to all Electric Vehicles functionalities. Every visitor registered after the administrator is user.
### Access levels
- user - has access to basic functionalities as :
  - can see all electric cars that are recorded in application
  - can see all electric trucks that are recorded in application
  - can compare electric cars or electric truck by their nominal range
  - has access to his/her profile
  - can edit his/her profile
- moderator - has access to above functionalities plus:
  - can add new electric cars and/or electric trucks records
  - can edit electric cars and/or electric trucks records
  - can delete electric cars and/or electric trucks records
- administrator - has access to all mentioned above functionalities plus:
  - can change access level to other users
  - can delete users