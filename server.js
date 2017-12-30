import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL and Relay modern are cool!!');
});

class Friend {
   constructor(id, {firstName, lastName, gender, language, email}) {
     this.id = id;
     this.firstName = firstName;
     this.lastName = lastName;
     this.gender = gender;
     this.language = language;
     this.email = email;
   }
}

const friendDatabase = {};

const global = {
  getFriend: ({id}) => {
    return new Friend(id, friendDatabase[id]);
  },
  createFriend: ({input}) => {
    let id = require('crypto').randomBytes(10).toString('hex');
    friendDatabase[id] = input;
    return new Friend(id, input);
  },
  updateFriend: ({id, input}) => {
    friendDatabase[id] = input;
    return new Friend(id, input);
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true, //gui
}));

app.listen(8080, () => console.log('Running server on localhost:8080/graphql'));

//
// mutation {
//   createFriend(input: {
//     firstName: "Roman",
//       lastName: "Brito",
//       gender: "Male",
//       language: "english",
//       email: "romanbrito1@gmail.com"
//   }){
//     id
//   }
// }
//
// query {
//   getFriend(id: "c590bafb1d4ea130901a"){
//     firstName
//     lastName
//     gender
//   }
// }
//
// mutation {
//   updateFriend(id: "c590bafb1d4ea130901a", input: {
//     firstName: "Manuel"
//     lastName: "Perez"
//     gender: "male"
//     language: "spanish"
//     email: "dasf@gmail.com"
//   }){
//     firstName
//     language
//   }
// }
