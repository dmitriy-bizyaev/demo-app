import { Server } from 'http';
import { HttpTerminator, createHttpTerminator } from 'http-terminator';
import config from './config';
import app from './app';
import * as db from './db';
import { Maybe } from './utils/misc';

let server: Maybe<Server> = null;
let terminator: Maybe<HttpTerminator> = null;
let shuttingDown = false;

async function main() {
    const dbConfig = config.get('db');
    const dbUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

    await db.connect(dbUrl);
    console.log('Connected to DB');

    const port = config.get('port');
    server = app.listen(port);
    terminator = createHttpTerminator({ server: server! });
    console.log(`Server is listening on port ${port}`);
}

async function shutdown() {
    if (shuttingDown) {
        return;
    }

    shuttingDown = true;

    try {
        await terminator?.terminate();
        server = null;
        terminator = null;
        console.log('Server stopped');
    } catch (err) {
        console.error('Error while closing http server:');
        console.error(err);
    }

    try {
        await db.disconnect();
        console.log('Disconnected from DB');
    } catch (err) {
        console.error('Error while disconnecting from DB:');
        console.error(err);
    }

    process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('uncaughtException', err => {
    console.error('Uncaught exception:');
    console.error(err);
    process.exit(1);
});

process.on('unhandledRejection', reason => {
    console.error('Unhandled rejection:');
    console.error(reason);
    process.exit(1);
});

main();
