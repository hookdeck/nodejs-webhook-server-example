const express = require('express');
const todos = require("./todos");
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", function(req, res) {
  res.send("Welcome to the Webhooks API");
});

router.post("/okta-webhooks-endpoint", function(req, res) {
  console.log(req.body);
  res.send("Okta Event hook Successfully received");
});

router.post("/stripe-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Stripe Successfully received Webhook request");
});

router.post("/shopify-webhooks-endpoint", function(req, res) {
  console.log(req.body);
  res.send("Shopify Successfully received Webhook request");
});

router.get("/todos", function(req, res) {
  res.json(todos);
});

module.exports = router;
