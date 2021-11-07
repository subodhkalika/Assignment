Your Solution Documentation
===========================

Frontend:
The frontend is built in ReactJs. It resides on ui folder.

To run the frontend individually, run:
 - npm start

The folder structure maintains the separation of concern. A brief smmary is as follows: 
a. containers: This folder would contain the pages in our application.
b. components: This folder contains custom components that can be reused in our applicaiton.
c. config: contains configuration for axios. Further configuration can be added later on.
d. util: contains utility files with functions that can be used throughout the application.

Dependency ibraries added: 
    axios: To make API calls to the server
    font-awesome: Font awesome library for icons
    react-redux: Using react redux for implemening redux in react app
    redux: Using redux as state management tool
    styled-components: To create comonents with css in JS file.

Each containers(pages) created into the containers folder will have its own actions, constantsm, enums, reducers and selectors file. This design is used to  create a sclable solution for the applicaiton as it is easier to maintain individual modules even when the project grows to a large codebase. 

The custom components developed are: 
1. Tabs: This components is used to display the tabs design of the UI. It contains several styled components like TabHeader, Tab,   TabBody. The reason for using the styled components is that it can be tested as it provides swift integration libraries like Jest.
2. JobCard: 
This component displays the card for each job in the UI. it utilises sevel styled components which can be reused easily.
    

Backend:
Express Js is used to the build the backend. To keep the development strictly typed, typescript has been  used to write the backend.

The folder structure is as follows:
1. Config: Contains configurations for database and server
2. Controllers: Contains API for Jobs.
3. Entities: Contains Jobs, Category and Suburb entities used as model for the database.
4. handlers: Utility function, Currently only logging.
5. Routes: Contains API routes


If further time is provided, I would add the unit testing scripts for both Frontend and Backend.

