import path from 'path';
import convict from 'convict';

const config = convict({
    env: {
        doc: 'The application environment',
        format: ['production', 'development'],
        default: 'development',
        env: 'NODE_ENV',
    },

    db: {
        host: {
            doc: 'MongoDB host',
            format: String,
            default: 'localhost',
            env: 'DB_HOST',
        },

        port: {
            doc: 'MongoDB server port',
            format: 'port',
            default: 27017,
            env: 'DB_PORT',
        },

        name: {
            doc: 'Database name',
            format: String,
            default: 'demo',
            env: 'DB_NAME',
        }
    },

    port: {
        doc: 'HTTP server port',
        format: 'port',
        default: 3000,
        env: 'PORT',
    },

    staticDir: {
        doc: 'From where to serve static assets. Leave it empty to disable serving of static content.',
        format: String,
        default: '',
        env: 'STATIC_DIR',
    },
});

const env = config.get('env');

config.loadFile(path.join(__dirname, `configs/${env}.json`));
config.validate({ allowed: 'strict' });

export default config;
