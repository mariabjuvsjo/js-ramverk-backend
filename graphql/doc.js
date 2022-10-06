const Doc = require('../models/Doc');
const User = require('../models/User');

const UserType = require('./user');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLEnumType,
} = require('graphql');




const DocType = new GraphQLObjectType({
    name: 'Doc',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.user);
            },
        },
        allowed_users: { type: new GraphQLList(GraphQLString) }
    })

});

module.exports = DocType