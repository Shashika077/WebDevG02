# WebDevG02 - Modern Web Application

Welcome to WebDevG02, a full-stack web application designed to showcase the integration of modern frontend and backend technologies. This project demonstrates how React, PHP, and MySQL can be combined to create a dynamic and responsive web application.

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Contributors](#contributors)

## Overview
WebDevG02 is a comprehensive web application that provides a platform for managing various web-based operations. Built using React for the frontend, PHP for backend development, and MySQL for database management, this project serves as an excellent foundation for developers to understand the integration of these technologies.

## Technologies Used
- **React**: For building a responsive and interactive user interface.
- **PHP**: Server-side scripting language used to handle backend logic.
- **MySQL**: Database management system for storing and managing data.
- **XAMPP**: A cross-platform web server solution stack package that includes Apache, MySQL, and PHP.
- **Node.js & npm**: JavaScript runtime and package manager for running the React frontend and managing dependencies.
## Getting Started
Before you begin, ensure you have the necessary software installed:

- **XAMPP**: [Download here](https://www.apachefriends.org/index.html)
- **Node.js & npm**: [Download here](https://nodejs.org/)

## Setup Instructions
Follow these steps to set up the development environment:

1. **Install XAMPP**
   - Download and install XAMPP from the official website.
   - Open the XAMPP Control Panel and start the Apache and MySQL services.

2. **Set Up the Database**
   - Open phpMyAdmin by navigating to http://localhost/phpmyadmin.
   - Create a new database:
     - Click on "New" in the sidebar.
     - Name your database (e.g., `webdevg02_db`).
     - Go to the "Import" tab and upload the provided .sql file to set up the tables and initial data.

3. **Configure the Backend**
   - Copy all provided PHP files into the `htdocs` directory of your XAMPP installation (e.g., `C:\xampp\htdocs` or `/Applications/XAMPP/htdocs`).
   - Update the database connection settings in your PHP files:
     ```php
     $servername = "localhost";
     $username = "root"; // Default XAMPP username
     $password = ""; // Default XAMPP password is empty
     $dbname = "webdevg02_db"; // Your database name
     ```

4. **Set Up the Frontend**
   - Open a terminal or command prompt.
   - Navigate to the directory containing your React frontend code:
     ```bash
     cd path/to/your/react-frontend
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```

## Running the Application
1. **Start Backend Services**
   - Ensure Apache and MySQL are running in the XAMPP Control Panel.

2. **Start the Frontend Server**
   - In your terminal, run:
     ```bash
     npm start
     ```
   - Open your web browser and navigate to http://localhost:3000 to view the frontend.

3. **Access Backend Endpoints**
   - Access your PHP backend via http://localhost/your-php-file.php.

## Common Issues and Solutions
- **Cannot Connect to Database**: Double-check your database credentials and ensure the MySQL service is running.
- **Frontend Not Loading**: Ensure `npm start` is running and that no other process is using the same port. If needed, change the port number in the React app’s configuration.

## Contributors
This project was developed by Group 02 for educational purposes in the Web Applications Development course.

**Team Members:**
- [Shashika](https://github.com/Shashika077)
- [Venuja](https://github.com/VenujaVP)
- [Kavisha](https://github.com/KavishaLP)
- [Prasan](https://github.com/malinthagithub)
- [Zahri](https://github.com/Zahri-Affa)
- [Lakshitha](https://github.com/Lakshitha0530)
- [Sandeepani](https://github.com/SandeepaniIshara)
- [Lakma](https://github.com/lakma1090)
