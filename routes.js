const express = require('express');
const todos = require("./todos");

const router = express.Router();

router.get("/", function(req, res) {
  res.send("Welcome to the Webhooks API");
});

router.post("/shopify-webhooks-endpoint", function(req, res) {
  console.log(req.body);
  res.send("Successfully received Webhook request");
});

router.get("/todos", function(req, res) {
  res.json(todos);
});

module.exports = router;
