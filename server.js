const express = require("express");
const routes = require("./routes");
const bodyParser = require('body-parser');
const { startDatabase } = require("./database");
const crypto = require('crypto');

// App
const app = express();



app.use(bodyParser.json(
    {
        verify: (req, res, buf, encoding) => {
            if (buf && buf.length) {
                req.rawBody = buf.toString(encoding || 'utf8');
            }
        },
    }
));


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

//Perform HMAC verification

app.use('/', routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
