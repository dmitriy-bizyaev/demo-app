declare module 'http-terminator' {
    import { Server as HttpServer } from "http";
    import { Server as HttpsServer } from 'https';

    interface HttpTerminatorParams {
        gracefulTerminationTimeout?: number,
        server: HttpServer | HttpsServer,
    }

    interface HttpTerminator {
        terminate(): Promise<void>;
    }

    function createHttpTerminator(input: HttpTerminatorParams): HttpTerminator;
}
