const express = require('express');
const todos = require("./todos");
const bodyParser = require('body-parser');
const qs = require('querystring')

const router = express.Router();

router.get("/", function(req, res) {
  res.send("Welcome to the Webhooks API");
});

// PAYMENTS

router.post("/stripe-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Stripe Successfully received Webhook request");
});

router.post("/paypal-webhooks-endpoint", bodyParser.raw({ type: 'application/json'}), function(req, res) {
	console.log(req.body);
	res.send("Paypal Successfully received Webhook request");
});

router.post("/paddle-webhooks-endpoint", bodyParser.raw({ type: 'application/x-www-form-urlencoded'}), function(req, res) {
	console.log(qs.parse(decodeURIComponent(req.body)));
	res.send("Paddle Successfully received Webhook request");
});

router.post("/checkout-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Checkout Successfully received Webhook request");
});

// CI/CD

router.post("/github-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("GitHub Successfully received Webhook request");
});

router.post("/gitlab-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Gitlab Successfully received Webhook request");
});

router.post("/bitbucket-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Bitbucket Successfully received Webhook request");
});

router.post("/docker-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Docker Successfully received Webhook request");
});

// E-COMM

router.post("/shopify-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Shopify Successfully received Webhook request");
});

router.post("/bigcommerce-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("BigCommerce Successfully received Webhook request");
});

router.post("/woocommerce-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("WooCommerce Successfully received Webhook request");
});

router.post("/commercelayer-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Commerce Layer Successfully received Webhook request");
});

// CRM

router.post("/hubspot-webhooks-endpoint", function(req, res) {
  console.log(req.body);
  res.send("HubSpot Successfully received Webhook request");
});

router.post("/pipedrive-webhooks-endpoint", function(req, res) {
  console.log(req.body);
  res.send("Pipedrive Successfully received Webhook request");
});

// EXTRAS

router.post("/okta-webhooks-endpoint", bodyParser.raw({type: 'application/json'}), function(req, res) {
  console.log(req.body);
  res.send("Okta Event hook Successfully received");
});

router.get("/todos", function(req, res) {
  res.json(todos);
});

module.exports = router;
