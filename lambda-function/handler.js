'use strict';

var Twit = require('twit')

module.exports.hello = (event, context, callback) => {
  var T = new Twit({
    consumer_key:         "KEY",
    consumer_secret:      "SECRENT",
    access_token:         "TOKEN",
    access_token_secret:  "TOKEN SECRET"
  })

  T.get('search/tweets', { q: event.path.query, count: 5 }, function(err, data, response) {
    callback(null, data)
  })
}
