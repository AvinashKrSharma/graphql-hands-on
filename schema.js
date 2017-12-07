var FetchTweets = require('fetch-tweets'); // Include the module 
var keys = require('./apiKeys.js');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');
 
// Specify Twitter keys (preferably in an external .gitignore'd file) 
var apiKeys = {
    consumer_key : keys.key,
    consumer_secret : keys.secret
};
 
// Create a new object and pass in keys and optional additional options (see below) 
var fetchTweets = new FetchTweets(apiKeys, false); 

function fetchTopic(topic, callback){
    fetchTweets.byTopic(topic, callback);
}


const TweetType = new GraphQLObjectType({
    name: 'Tweet',
    description: '...',
    fields: () => ({
        text: {
            type: GraphQLString,
            resolve: (tweet) => {
                console.log(tweet);
                return tweet;
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            tweet: {
                type: TweetType,
                args: {
                    topic: { type: GraphQLString }
                },
                resolve: (root, args) => {
                    fetchTopic(args.topic, (tweets) => {
                        console.log(tweets.statuses[0])
                        return tweets.statuses[0];
                    })
                }
            }
        })
    })
})
