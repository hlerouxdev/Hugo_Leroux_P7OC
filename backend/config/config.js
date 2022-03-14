require('dotenv').config({path: '../.env'});

module.exports =
config = {
     "development": {
       "username": process.env.sequelizeUser,
       "password": process.env.sequelizePassword,
       "database": process.env.sequelizeDb,
       "host": 'localhost',
       "port": '3306',
       "dialect": "mysql"
     },
     "test": {
       "username": "root",
       "password": null,
       "database": "database_test",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "production": {
       "username": "root",
       "password": null,
       "database": "database_production",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }