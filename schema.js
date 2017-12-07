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

const UserType = new GraphQLObjectType({
    name: 'User',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        image: {
            type: GraphQLString,
            resolve: (user) => user.profile_image_url
        }
    })
})

const TweetType = new GraphQLObjectType({
    name: 'Tweet',
    description: '...',
    fields: () => ({
        text: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString,
            resolve: (tweet) => tweet.created_at
        },
        user: {
            type: UserType
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
