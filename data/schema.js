import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  User,
  Friend,
  getFriend,
  getFriends,
  getUser,
  getViewer,
} from './database';

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    friends: {
      type: friendsConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getFriends(), args),
    },
  }),
  interface: [nodeInterface],
});

const GraphQLFriend = new GraphQLObjectType({
  name: 'Friend',
  fields: () => ({
    id: globalIdField('Friend'),
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    language: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
    },
  }),
  interface: [nodeInterface],
});
