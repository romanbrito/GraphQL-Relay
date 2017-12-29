import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL and Relay modern are cool!!');
});

const root = {
  friend: (args) => {
    return {
      "id": 123213132,
      "firstName": "Roman",
      "lastName": "Brito",
      "gender": "Male",
      "language": "English",
      "email": "romanbrito1@gmail.com",
      "IDTyped": args.id
    }
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, //gui
}));

app.listen(8080, () => console.log('Running server on localhost:8080/graphql'));