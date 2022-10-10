FROM THE FEW TESTS DONE, THIS SYSTEM DOES NOT WORK



# About the app

This app provides users with incresed privacy by reducing the effectiveness of Google's targeted ads.

## Using the app
---
*These instructions were for when it was ran on university devices. May need slight modifications to work outside*

### **Running app**

To run the app, please ensure that you have Node JS & MySQL installed on the computer and one of the users for MySQL is with these details:
- username: root
- password: comsc

After you've ensured this, the next thing you need to do it go to the front end directory, and run the script:
"npm start".
Once you've done that, do the exact same thing with "npm start" on the back end directory. Once both servers are running, go to localhost:3000, and start using the app.

### **Run build command**
To run the build command on the front end, write the command on the front end directory, "npm run-script build"

### **Run tests command**
To run tests, go to the front end directory and run the following command: "npm test"


## Technologies used in the app
---

### **Frameworks used:**
#### _Express JS_
I have used Express JS because through this framework I am able to easily create routes for my front end application to use, and because my application is a web based, it means that it will use JS anyway, which means that the usage of Express JS for my back end will just make it easier to implement and maintain, as there is no need for multiple developers who each one specialises in one technology. Here the developer working on the front end, can also work on the back end, reduing the needed manpower to maintain and develop the app.

Resources Used:

1) http://expressjs.com/
2) https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/#:~:text=%20Tools%20You%20Will%20Need%20%201%20Step,to%20use%20it%20to%20interact%20with...%20More%20
3) https://stackfame.com/nodejs-with-cors


### **Runtime Environment used:**
#### _Node JS_
To be able to use Express, Node JS is needed to be implemented as well, which means that the advantages mentioned above are the same here. In addition, Node JS has a large community, which means that there are many online resources online to offer support for nay problems I may have in my project.

Furtheremore, Node JS has 650,000 free code packages that can be used in an application. This means that I will have many resources to use, which will mean that I don't need to recreate things that have already been done somewhere else and I can use.

[Why and When to Use Node.js](https://relevant.software/blog/why-and-when-to-use-node-js/#What_is_Nodejs_used_for)

Resourcses Used:

1) https://nodejs.org/en/docs/
2) https://stackfame.com/nodejs-with-cors
3) https://stackoverflow.com/questions/57601777/check-if-email-exists-in-mysql-database-using-nodejs
4) https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
5) https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
6) https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/#:~:text=%20Tools%20You%20Will%20Need%20%201%20Step,to%20use%20it%20to%20interact%20with...%20More%20
    (same as Express JS No. 2)

### **Libraries used:**
#### _React JS_
Through the usage if React it is easier to create a dynamic web application as almost everything is being done in JS, rather than HTML, and it is easy to reuse components made in React, such as buttons. All this means it can be very easy to scale things up, as many elements of the application can be reused, saving time on writing code, and maintenance. In addition, due it's wide usage (Tesla, Airbnb, Facebook, etc.) there is a very large community for the library, which mean that there is a lot of support found online for any problem the developers might face.

[Introduction to Uses of React JS](https://www.educba.com/uses-of-react-js/)

Resources Used:

1) https://reactjs.org/docs/getting-started.html
2) https://reactjs.org/docs/react-component.html#componentdidupdate
3) https://stackoverflow.com/questions/46140764/polling-api-every-x-seconds-with-react/63134447#63134447
4) https://www.code-sample.com/2019/12/react-encryption-decryption-data-text.htmls
5) https://www.youtube.com/watch?v=xMNhDf5-hvk&ab_channel=ConorBailey
6) https://stackoverflow.com/questions/69832748/error-a-route-is-only-ever-to-be-used-as-the-child-of-routes-element

#### _crypto-js_
This app allows me to ensure privacy in the app in places the data can be viewed by someone else.

Resources Used:

1) https://www.code-sample.com/2019/12/react-encryption-decryption-data-text.htmls
    (same link as React JS No. 4)

#### _universal-cookie_
This is useful as it lets me use cookies on the web browser and store data from the back end on the browser, for example, the user id from the database

Resources Used:

1) https://www.npmjs.com/package/universal-cookie?activeTab=readme

#### _cors_
This library lets me tell the server which servers are allowed to access the back end, which is important, as the front end and back end are 2 seperate services, and therefore need to be allowed through.

Resources Used:

1) https://www.npmjs.com/package/cors
2) https://stackfame.com/nodejs-with-cors

#### MySQL
This lets me connect the back end with a MySQL database, which is how I store my information

Resources Used:

1) https://www.npmjs.com/package/mysql
2) https://stackoverflow.com/questions/57601777/check-if-email-exists-in-mysql-database-using-nodejs
    (same link as Node JS No. 3)
    
#### _Axios_
This is a library that lets me send web requests to outside servers, and handles a lot of the set up for me, which means that it easier to use than other web requests methods.

Resources Used:

1) https://axios-http.com/docs/intro
2) https://www.npmjs.com/package/axios
3) https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
    (same link as Node JS No. 4)
4) https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
    (same link as Node JS No. 5)

#### _Cron JS_
The app is built so that each subscription lasts until midnight. This means that I need someway to manage the app so that exactly at midnight every day, the app will reset the users' database, without needing to have an admin do it, which is where this library comes in, by letting me set up an automatic system that runs code at speicifc times

Resources Used:

1) https://github.com/ncb000gt/node-cron
2) https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples

### **Tools used:**
#### _nodemon_
This is useful in develoment as it means that servers restart automatically afte every change, which makes development slighly faster as there is no need to manually restart the server after making changes. Allows for faster manual testing.

Resources Used:

1) https://www.npmjs.com/package/nodemon

### **APIs Used:**
#### _Google Sign-In_
This is needed for the app to run, as without this I am unable to verify who is a real Google user or not, and need to have them complete a registration form every day, as the users' table is deleted every day to ensure user privacy.

Resources Used:

1) https://developers.google.com/identity/sign-in/web/sign-in
2) https://developers.google.com/identity/sign-in/web/backend-auth
3) https://www.youtube.com/watch?v=Y2ec4KQ7mP8
4) https://www.youtube.com/watch?v=-OgU5EAcQmo

## Business Choices made:
---
The business model of the app was that there are going to be multiple subscription options. All of them for 24 hours, with each one offering a different amount of web requests per day.

In addition, there would be no ads in the website. This is becuase the core of the app is to make targeted ads less accurate and not store client data; therefore, by adding ads, it would go against the whole point of the app in the first place.

License the back end technology to VPN companies (or others), this means that to allow them easy usage of the service, it needs to be independent of the front end, and easy to modify to fir the companies exact needs --> basically, no need to start changing a lot of the code.

## Creating Project
---
Currently appliaction is built as a web based application that can run on every browser. Allows developers to include a lot of options for what the user can inlcude in his web requests. e.g.: location, language preferences, topics he doesn't want to be searched as him, etc.

Another option, is build the app as a Chrome extension, which will remove the need for the Google Sign-In API. and use the built in tracking tools that Chrome uses to send the false information to Google. However, it will have less options avalaibel to the user to personalise his usage of the app.
