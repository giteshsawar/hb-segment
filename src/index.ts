import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import logger from 'pino';import redis from 'redis';

import { envVariables } from './config/env';
import corsConfig from './config/cors';
import redisEventsInit from './services/redis';
// import segmentServices from './services/segment';

const { port } = envVariables;
const subscriber = redis.createClient();

redisEventsInit(subscriber);

const app = express();
app.use(cors(corsConfig));
// @ts-ignore
app.use(express.urlencoded({ extended: false }));
// @ts-ignore
app.use(express.json());

// server health check route
app.use('/healthz', function (req, res) {
  res.send({ status: 'Server is running' });
});

const server = createServer(app);

server.listen(port, () => {
    logger().info(`server is listening on ${port}`);
});
