const Doc = require('../models/Doc');
const User = require('../models/User');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        username: { type: GraphQLString }
    })

});

module.exports = UserType;