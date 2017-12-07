const {fetchTweets} = require('./getTweets.js');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
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
            type: GraphQLString
        },
        user: {
            type: GraphQLString,
            resolve: (tweet) => tweet.user.name
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            tweet: {
                type: new GraphQLList(TweetType),
                args: {
                    topic: { type: GraphQLString }
                },
                resolve: (root, args) => {
                    return fetchTopic(args.topic).then((tweets) => {
                        return tweets.statuses;
                    }).catch(() => {})
                }
            }
        })
    })
})
