import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import "dotenv/config";

// App
const app = express();

app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// Set port
const port: string | number = process.env.PORT || "1337";
app.set("port", port);

app.use("/", routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
