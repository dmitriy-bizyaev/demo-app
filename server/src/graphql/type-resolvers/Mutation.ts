import { GQLMutationResolvers } from '../types.generated';
import { User } from '../../db';
import { DocumentType } from '../../utils/mongoose';

const Mutation: GQLMutationResolvers = {
    createUser: async (_, args) => {
        const user = new User(args.input);

        await user.save();

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    },

    updateUser: async (_, args) => {
        const updates: Partial<Pick<DocumentType<typeof User>, 'name' | 'email'>> = {};

        if (args.input.name) {
            updates.name = args.input.name;
        }

        if (args.input.email) {
            updates.email = args.input.email;
        }

        const user = await User.findByIdAndUpdate(args.id, updates, { new: true });

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    },

    deleteUser: async (_, args) => {
        const user = await User.findOneAndDelete({ _id: args.id });

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    },
};

export default Mutation;
