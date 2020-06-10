import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, { encoding: 'utf8' });

export default new ApolloServer({ typeDefs, resolvers });
