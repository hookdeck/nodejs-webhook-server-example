const express = require("express");
const routes = require("./routes");
const bodyParser = require('body-parser');
// App
const app = express();



app.use(bodyParser.json());

// Set port
const port = process.env.PORT || "1337";
app.set("port", port);

app.use('/', routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
