const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();

const schema = require('./schema');
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(4001);
console.log('Listening on 4001');
