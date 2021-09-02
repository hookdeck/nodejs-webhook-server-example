const express = require("express");
const routes = require("./routes");
const bodyParser = require('body-parser');
const { startDatabase } = require("./database");
const crypto = require('crypto');

// App
const app = express();

const sigHeaderName = 'X-Hub-Signature-256';
const sigHashAlg = 'sha256';
const secret = "ABCD1234";


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

//Validate payload
/* function validatePayload(req, res, next) {

    if(req.method == "POST"){
        if (!req.rawBody) {
            return next('Request body empty')
        }
    
        const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
        const hmac = crypto.createHmac(sigHashAlg, secret)
        const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8');
    
        if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
            return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
        }
    }

    return next()

}
app.use(validatePayload); */
app.use('/', routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
