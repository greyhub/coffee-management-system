# How to run/build

### *Install packages
```ruby
$ npm install
```
### *Set up database
>Step 1: Install xampp<br>
>Step 2: Start Apache and MySQL modules<br>
>Step 3: Add new account in phpmyadmin<br>
### *Setup environment
>Create a .env file, set up like:<br>
```javascript
PORT=8080
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=test
DB_USERNAME=test
DB_PASSWORD=123456
```
### *Run
```ruby
$ npm start
```
### *Build
```ruby
$ npm run build
```

# Script
### *Drop all tables when schema change
Step 1: Copy content script/dropAllTables.sql and change name database<br>
```ruby
$ DROP PROCEDURE IF EXISTS `drop_all_tables`;
```
Step 2: Paste to SQL script in this database on remote and execute<br>

# Guide
### *Turn off authentication and authorization
```ruby
$ cd src/config
$ #Edit serverConfig.ts
$ let MODE = ENVIRONMENT_DEVELOP;
$ #Edit serverConfig.develop.ts
$ shouldAuth: false
```
### *In controller/middleware, add this block lines in begin of function
```ruby
$ if (!serverConfig.shouldAuth) {
    next();
    return;
  }
```