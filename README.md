# WebDevG02

This project is a web application built using React, PHP, and MySQL. To get started, follow the 
instructions below to set up the development environment, configure the database, and run the project. 
Prerequisites 
 XAMPP: A local server environment to run PHP and MySQL. 
 Node.js: Required for running the React frontend. 
 npm: Node package manager to install dependencies. 
Setup Instructions 
1. Install XAMPP 
Download and install XAMPP from https://www.apachefriends.org/index.html. Make sure Apache and 
MySQL services are running. 
2. Setup the Database 
 Open phpMyAdmin: Navigate to http://localhost/phpmyadmin in your web browser. 
 Import the Database: 
 Create a new database. 
 Go to the "Import" tab. 
 Upload the provided .sql file to create the necessary tables and data. 
3. Configure the Backend 
Add PHP Files: 
Place the provided PHP files into the htdocs directory of your XAMPP installation (usually found at 
C:\xampp\htdocs or /Applications/XAMPP/htdocs). 
4. Setup the Frontend 
 Navigate to the Frontend Directory: 
Open a terminal or command prompt. 
Change the directory to where your React frontend code is located. 
 Install Node Modules: 
Run npm install to install all necessary dependencies.
 Start the Development Server: 
Execute npm start to start the React development server. 
5. Access the Application 
Frontend: Open your web browser and navigate to http://localhost:3000 (or the port specified by 
React). 
Backend: Access PHP endpoints via http://localhost/your-php-file.php. 
Troubleshooting 
Database Connection Issues: Ensure that your database credentials in the PHP files match those of the 
database created in phpMyAdmin. 
Frontend Not Loading: Make sure that npm start is running and no other process is using the same port. 
