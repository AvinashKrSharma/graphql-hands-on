const {fetchTweets} = require('./getTweets.js');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');
const keys = require('./apiKeys.js');

const apiKeys = {
    consumer_key : keys.key,
    consumer_secret : keys.secret
};
 
function fetchTopic(topic){
    return fetchTweets(apiKeys, topic);
}

const TweetType = new GraphQLObjectType({
    name: 'Tweet',
    description: '...',
    fields: () => ({
        text: {
            type: GraphQLString,
            resolve: (tweet) => {
                console.log(tweet);
                return tweet.text;
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
                    return fetchTopic(args.topic).then((tweets) => {
                        return tweets.statuses[0];
                    }).catch(() => {})
                }
            }
        })
    })
})
