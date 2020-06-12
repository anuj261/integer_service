//@ts-check
"use strict"

module.exports = () => {
  const express = require('express');
  const router = express.Router();

  const register = require('../controller/register');
  const login = require('../controller/login');
  const sequence = require('../controller/sequence');
  const middleware = require('../lib/middleware.js');

 
  
  router.get("/v1/next",middleware.authentication,
  sequence.nextNumber
  );
 
  router.put("/v1/current",middleware.authentication,
  sequence.resetNumber
  );

  router.get("/v1/current",middleware.authentication,
  sequence.numberById
  );

  router.post("/user/signup",
    register.validateBody,
    register.signup
  );

  router.post("/user/login",
    login.validateBody,
    login.signin
  );

  router.all("*", (req, res) => {
    res.status(401).json({ error: "Unauthorised access", code: 401 });
  });

  return router;
}
