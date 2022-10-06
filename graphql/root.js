const Doc = require('../models/Doc');
const User = require('../models/User');

const DocType = require('./doc');
const UserType = require('./user');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt

} = require('graphql');


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        docs: {
            type: new GraphQLList(DocType),
            resolve(parent, args) {
                return Doc.find({});
            }
        },
        docsbyUserId: {
            type: new GraphQLList(DocType),
            args: { user: { type: GraphQLID } },
            resolve(parent, args) {
                return Doc.find({ user: args.user });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        }
    }
})

//mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})

