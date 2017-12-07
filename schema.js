var FetchTweets = require('fetch-tweets'); // Include the module 
var keys = require('./apiKeys.js');
 
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
module.exports = fetchTopic;

