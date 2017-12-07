const fetch = require('request-promise');

function fetchTweets(apiKeys, topic) {
    const url = 'https://api.twitter.com/1.1/search/tweets.json?' + 'q=' + topic + '&count=100';
    return makeRequest(url, apiKeys);
}

function makeRequest(url, credentials) {
    const oauth = {
        callback: '/',
        consumer_key: credentials.consumer_key,
        consumer_secret: credentials.consumer_secret
    };
    return fetch({
        url: url,
        json: true,
        oauth: oauth
    });
}

module.exports = {
    fetchTweets: fetchTweets
};
