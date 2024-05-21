const express = require('express');
const todos = require("./todos");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const qs = require('querystring');

const SECRET = "4qixlk6wwx0ai6x2uwd7i2qtoigemz8phlzhh6vrp9aqj6uljh"; // Replace this with your actual secret

const router = express.Router();

// Middleware to verify Hookdeck signature
const verifyHookdeckSignature = (req, res, next) => {
  // Extract x-hookdeck-signature and x-hookdeck-signature-2 headers
  const hmacHeader = req.get('x-hookdeck-signature');
  const hmacHeader2 = req.get('x-hookdeck-signature-2');

  // Create a hash based on the raw request body
  const hash = crypto
    .createHmac('sha256', SECRET)
    .update(req.rawBody)
    .digest('base64');

  // Compare the created hash with the x-hookdeck-signature headers
  if (hash === hmacHeader || hash === hmacHeader2) {
    // console.log('Webhook is originating from Hookdeck');
    next(); // Proceed to the next middleware/route handler
  } else {
    console.log('Signature is invalid, rejected');
    res.sendStatus(403); // Forbidden
  }
};

router.get("/", function(req, res) {
  res.send("Welcome to the Webhooks API");
});

// TEST
router.post("/testing", verifyHookdeckSignature, function(req, res) {
  console.log(req.headers);
  res.send("Tested");
});

// PAYMENTS

router.post("/stripe-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Stripe Successfully received Webhook request");
});

router.post("/paypal-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
	console.log(req.body);
	res.send("Paypal Successfully received Webhook request");
});

router.post("/paddle-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
	console.log(qs.parse(decodeURIComponent(req.body)));
	res.send("Paddle Successfully received Webhook request");
});

router.post("/checkout-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Checkout Successfully received Webhook request");
});

// CI/CD

router.post("/github-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("GitHub Successfully received Webhook request");
});

router.post("/gitlab-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Gitlab Successfully received Webhook request");
});

router.post("/bitbucket-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Bitbucket Successfully received Webhook request");
});

router.post("/docker-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Docker Successfully received Webhook request");
});

// E-COMM

router.post("/shopify-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Shopify Successfully received Webhook request");
});

router.post("/bigcommerce-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("BigCommerce Successfully received Webhook request");
});

router.post("/woocommerce-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("WooCommerce Successfully received Webhook request");
});

router.post("/commercelayer-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Commerce Layer Successfully received Webhook request");
});

// CRM

router.post("/hubspot-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("HubSpot Successfully received Webhook request");
});

router.post("/pipedrive-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Pipedrive Successfully received Webhook request");
});

// EXTRAS

router.post("/okta-webhooks-endpoint", verifyHookdeckSignature, function(req, res) {
  console.log(req.body);
  res.send("Okta Event hook Successfully received");
});

router.get("/todos", function(req, res) {
  res.json(todos);
});

module.exports = router;