## **Calendar**

This is a simple meeting planning calendar for a meeting room in your office.

### **How to run the app**

Run **npm install** in your terminal.

Then run **npm run start** or **npm start** in your terminal and the starting page of the project will be available at: http://localhost:8000/calendar.html

Or you can access it on GitHub Pages using next link: https://anastasiia-lehenka.github.io/calendar-app/dist/calendar.html

###### Note

1. To make the app work correctly on Github pages you need to allow insecure content in the site settings in your browser (by default it blocks requests to http://).
2. You can create event with multiple participants by clicking Ctrl when selecting participants.

###### Task 1

Authorization is implemented using Session Storage. So to logout you need to close the tab with application in your browser or press _Logout_ button in the top right corner of the page.

###### Task 3

Singleton pattern is used for interaction with backend (Service class). Factory Method is used for creating instances of User and Admin classes (UserFactory class). Decorator pattern is used for instance of Server class to show notifications which indicate the status of the server request (error/success) (NotificationsDecorator class).

###### Task 4

The app uses Webpack 5 which comes with the latest terser-webpack-plugin out of the box. That's why I didn't add any additional plugins to minify my javascript code. I just set optimization.minimize to true in webpack.config file to tell webpack to minimize the bundle using the TerserPlugin.
