# A Simple Nodejs API

[slack-badge]: https://img.shields.io/badge/Slack-Hookdeck%20Developers-blue?logo=slack

[![slack-badge]](https://join.slack.com/t/hookdeckdevelopers/shared_invite/zt-yw7hlyzp-EQuO3QvdiBlH9Tz2KZg5MQ)

## Running the Application

1. **Clone the Repository:**

Open your terminal and run:

```bash
git clone https://github.com/hookdeck/nodejs-webhook-server-example.git
```

2. **Install Dependencies:**

Change into the cloned directory and install the dependencies

```bash
cd nodejs-webhook-server-example
npm install
```
3. **Setup Environment Variables:**

Create a `.env` file and add your [Hookdeck secret](https://dashboard.hookdeck.com/settings/project/secrets) for signature verification

```makefile
HOOKDECK_SIGNING_SECRET=<your_secret_here>
```

4. **Start the Server:**

Start the server by executing

```bash
npm run dev
```

>🟢 The node.js server starts up on `http://localhost:1337`.
---
>See the list of endpoints in the `routes.js` file.
Use the endpoint in the format `/<platform>-webhooks-endpoint.`
