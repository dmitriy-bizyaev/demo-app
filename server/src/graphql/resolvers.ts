import { GQLResolvers } from './types.generated';
import Email from './scalars/Email';
import Query from './type-resolvers/Query';
import Mutation from './type-resolvers/Mutation';

const resolvers: GQLResolvers = {
    Email,
    Query,
    Mutation,
};

export default resolvers;
