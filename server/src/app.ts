import path from 'path';
import express from 'express';
import apolloServer from './graphql/server';
import config from './config';

const PATH_GRAPHQL_API = '/api/graphql';

const app = express();

apolloServer.applyMiddleware({
    app,
    path: PATH_GRAPHQL_API,
});

const staticDir = config.get('staticDir');

if (staticDir) {
    app.use(express.static(path.join(__dirname, staticDir)));
}

export default app;
