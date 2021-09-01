const express = require("express");
const routes = require("./routes");
const bodyParser = require('body-parser');
const { startDatabase } = require("./database");

// App
const app = express();


app.use(bodyParser.json());

//HMAC Middleware
/* var signature = req.get('X-PDF-Signature', 'sha1=')

var bodyCrypted = require('crypto')
.createHmac('sha1', '12345')
.update(JSON.stringify(req.body))
.digest('hex')

if (bodyCrypted !== signature) {
res.status(401).send()
return
}

console.log('PDF webhook received', JSON.stringify(req.body)) */

// Set port
const port = process.env.PORT || "1337";
app.set("port", port);

//Database Setup
const dbSetup = async (req, res, next) => {
    if (!req.db) {
        const db = await startDatabase();
        req.db = db;
    }

    next();
};

app.use(dbSetup);

app.use('/', routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
