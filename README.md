## **Calendar**

This is a simple meeting planning calendar for a meeting room in your office.

### **How to run the app**

Run **npm install** in your terminal.

Then run **npm run start** or **npm start** in your terminal and the starting page of the project will be available at: http://localhost:8000/calendar.html

Or you can access it on GitHub Pages using next link: https://anastasiia-lehenka.github.io/calendar-app/dist/calendar.html

###### Note

You can create event with multiple participants by clicking Ctrl when selecting participants.

###### Task 1

Authorization is implemented using Session Storage. So to logout you need to close the tab with application in your browser or press _Logout_ button in the top right corner of the page.

###### Task 3

Singleton pattern is used for interaction with backend (Service class). Factory Method is used for creating instances of User and Admin classes (UserFactory class). Decorator pattern is used for instance of Server class to show notifications which indicate the status of the server request (error/success) (NotificationsDecorator class). 