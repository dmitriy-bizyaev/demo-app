import { GraphQLScalarType, Kind } from 'graphql';
import { isEmail } from '../../utils/misc';

export default new GraphQLScalarType({
    name: 'Email',
    description: 'Email address.',

    serialize: value => {
        if (!isEmail(value)) {
            throw new TypeError(`Invalid email address: ${value}`);
        }

        return value;
    },

    parseValue: value => {
        if (!isEmail(value)) {
            throw new TypeError(`Invalid email address: ${value}`);
        }

        return value;
    },

    parseLiteral: node => {
        if (node.kind !== Kind.STRING) {
            throw new TypeError(`Invalid kind for email: ${node.kind}`);
        }

        if (!isEmail(node.value)) {
            throw new TypeError(`Invalid email address: ${node.value}`);
        }

        return node.value;
    },
});
