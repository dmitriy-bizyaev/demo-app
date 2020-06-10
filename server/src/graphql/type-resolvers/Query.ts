import { GQLQueryResolvers } from '../types.generated';
import { User } from '../../db';

const Query: GQLQueryResolvers = {
    user: async (_, args) => {
        const user = await User.findById(args.id);

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    },

    users: async (_, args) => {
        const [count, users] = await Promise.all([
            User.count({}),
            User.find({}, undefined, { skip: args.skip, limit: args.limit }),
        ]);

        return {
            count,
            nodes: users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
            })),
        };
    },
};

export default Query;
