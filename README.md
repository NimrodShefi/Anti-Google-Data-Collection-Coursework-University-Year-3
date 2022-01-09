# About the app

This app provides users with incresed privacy by reducing teh effectiveness of Google's targeted ads.

## Using the app
---

### **Running app**
To run the app, please ensure that you have Node JS & MySQL installed on the computer and one of the users for MySQL is with these details:
- username: root
- password: comsc
After you've ensured this, the enxt thing you need to do it go to the front end directory, and run the script:
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
    1) http://expressjs.com/
    2) https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/#:~:text=%20Tools%20You%20Will%20Need%20%201%20Step,to%20use%20it%20to%20interact%20with...%20More%20
    3) https://stackfame.com/nodejs-with-cors


### **Runtime Environment used:**
#### _Node JS_
    1) https://nodejs.org/en/docs/
    2) https://stackfame.com/nodejs-with-cors
    3) https://stackoverflow.com/questions/57601777/check-if-email-exists-in-mysql-database-using-nodejs
    4) https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
    5) https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
    6) https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/#:~:text=%20Tools%20You%20Will%20Need%20%201%20Step,to%20use%20it%20to%20interact%20with...%20More%20
        same as Express JS No. 2

### **Libraries used:**
#### _React JS_
    1) https://reactjs.org/docs/getting-started.html
    2) https://reactjs.org/docs/react-component.html#componentdidupdate
    3) https://stackoverflow.com/questions/46140764/polling-api-every-x-seconds-with-react/63134447#63134447
    4) https://www.code-sample.com/2019/12/react-encryption-decryption-data-text.htmls
    5) https://www.youtube.com/watch?v=xMNhDf5-hvk&ab_channel=ConorBailey
    6) https://stackoverflow.com/questions/69832748/error-a-route-is-only-ever-to-be-used-as-the-child-of-routes-element

#### _crypto-js_
    1) https://www.code-sample.com/2019/12/react-encryption-decryption-data-text.htmls
        same link as React JS No. 4

#### _universal-cookie_
    1) https://www.npmjs.com/package/universal-cookie?activeTab=readme

#### _cors_
    1) https://www.npmjs.com/package/cors
    2) https://stackfame.com/nodejs-with-cors

#### MySQL
    1) https://www.npmjs.com/package/mysql
    2) https://stackoverflow.com/questions/57601777/check-if-email-exists-in-mysql-database-using-nodejs
        same link as Node JS No. 3
    
#### _Axios_
    1) https://axios-http.com/docs/intro
    2) https://www.npmjs.com/package/axios
    3) https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
        same link as Node JS No. 4
    4) https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
        same link as Node JS No. 5

#### _Cron JS_
    1) https://github.com/ncb000gt/node-cron
    2) https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples

### **Tools used:**
#### _nodemon_
    1) https://www.npmjs.com/package/nodemon

### **APIs Used:**
#### _Google Sign-In_
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