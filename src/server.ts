import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import "dotenv/config";

// App
const app = express();

const setRawBody = (req: any, res: any, buf: any) => {
  req.rawBody = buf;
};

app.use(bodyParser.urlencoded({ extended: false, verify: setRawBody }));
app.use(bodyParser.json({ verify: setRawBody }));

// Set port
const port: string | number = process.env.PORT || "1337";
app.set("port", port);

app.use("/", routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
