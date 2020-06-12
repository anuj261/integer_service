
# integer_service



How to run application.


Step:1  Create new user in mongodb: 

db.createUser(
{	
    
    user: "admin",
	pwd: "test1234",

	roles:[{role: "userAdmin" , db:"demo"}]})


Step:2 Run application
npm i
node index.js



API collection Description

POSTMAN collection
https://www.getpostman.com/collections/ac78f1d44347829ab1f1   



1. Signup new user
POST /user/signup

2. Get details of user
POST /user/login

3.  Reset number
POST http://localhost:9999/v1/current
payload: {"current":200}

4. Get Current Number
POST http://localhost:9999/v1/current
 
5. Get Next Number
GET http://localhost:9999/v1/next