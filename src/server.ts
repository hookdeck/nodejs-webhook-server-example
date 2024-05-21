import express, { Express, Request, Response } from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

// App
const app: Express = express();

// app.use(
//   express.json({
//     // Store the rawBody buffer on the request
//     verify: (req: Request, res: Response, buf: Buffer) => {
//       (req as any).rawBody = buf;
//     },
//   }),
// );

app.use(bodyParser.json());

// Set port
const port: string | number = process.env.PORT || '1337';
app.set('port', port);

app.use('/', routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));