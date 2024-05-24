import express, { Express, Request, Response } from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();

// App
const app: Express = express();

app.use(bodyParser.json());

// Set port
const port: string | number = process.env.PORT || '1337';
app.set('port', port);

app.use('/', routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));