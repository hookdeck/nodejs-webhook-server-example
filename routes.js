const express = require('express');


const router = express.Router();

router.get("/", function(req, res) {
  res.send("Welcome to the Webhooks API");
});

router.post("/log-github-webhook", async function(req, res) {
  //console.log(req.body);

  const payload = req.body;

  let webhook_info = {
    repo : payload.repository.name,
    author : payload.sender.login
  }

  if(payload.head_commit){
    webhook_info.time = payload.head_commit.timestamp;
  }

  const save_webhook = await req.db
  .collection("webhooks")
  .insertOne(webhook_info);

  res.status(201).send({
    message: "Webhook Event successfully logged"
  });
});

router.get("/fetch-webhooks-logs", async function(req, res) {
  console.log(req.body);
  
  const webhooks = await req.db
  .collection("webhooks")
  .find()
  .toArray();

  res.status(200).send(webhooks);
});

module.exports = router;
