# Intro to Mongoose Lab - CRM Terminal App

A simple Customer Relationship Management (CRM) terminal app built with Node.js and MongoDB.

## Description
This lab demonstrates basic CRUD operations using MongoDB and mongoose. Users can create, read, update and delete customer records through terminal commands.

## Dependencies
- prompt-sync
- mongoose
- dotenv 

## Setup
1. Clone this repo
2. Run `npm install` to install dependencies
3. Create `.env` file and add your MongoDB URI

    PASSWORD=your_mongodb_password
    MONGODB_URI=your_mongodb_connection_string

    Example:
    ```
    PASSWORD=mySecurePass123
    MONGODB_URI=mongodb+srv://johndoe:<db_password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority

4. Run `node app.js` to start the app

## Features
- Create new customers
- View all customers 
- Update existing customers
- Delete customers
- Terminal-based interface

## Author
[Christian Vieux](https://github.com/christianvieux)

## Note
This is a practice lab for learning MongoDB database operations. The focus is on functionality rather than visual design.