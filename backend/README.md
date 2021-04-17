# How to run/build

### Install packages
```ruby
$ npm install
```
### Set up database
```ruby
$ Install xampp
$ Start Apache and MySQL modules
$ Add new account in phpmyadmin
```
### Setup environment
```ruby
$ Create a .env file, set up like:
PORT=8080
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=test
DB_USERNAME=test
DB_PASSWORD=123456
```
### Run
```ruby
$ npm start
```
### Build
```ruby
$ npm run build
```

# Script
### Drop all tables when schema change
```ruby
$ Step 1: Copy content script/dropAllTables.sql and change name database
$ DROP PROCEDURE IF EXISTS `drop_all_tables`;
$ Step 2: Paste to SQL script in this database on remote and execute
```
# Guide
### Turn off authentication and authorization
```ruby
$ Step 1:
$ cd src/config
$ #Edit serverConfig.ts
$ let MODE = ENVIRONMENT_DEVELOP;
$ #Edit serverConfig.develop.ts
$ shouldAuth: false
```
```ruby
$ Step 2: Add this block lines in (first) controller
$ if (!serverConfig.shouldAuth) {
    next();
    return;
  }
```
### For cheat role and auth, add a new Route like (function cheateRoleMiddleware -> set ROOT role)
```ruby
$ router.all('/v1/cheat/employee/createone',
  cheatRoleMiddleware,
  uploadDisk.single("avatar"),
  employeeController.createOne
)
```