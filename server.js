const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();

const schema = require('./schema');
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
schema('hello', function(res){
    console.log(JSON.stringify(res))
})
app.listen(4001);
console.log('Listening on 4001');
