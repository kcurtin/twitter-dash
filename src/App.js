import React, { Component } from 'react';
import './App.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  render() {
    return (
      <div className="App">
        <TweetContainer />
        <TweetContainer />
      </div>
    );
  }
}

class TweetContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      tweets: []
    };

    this.searchTweets = this.searchTweets.bind(this);
  }

  searchTweets(event) {
    this.fetchTweets(event.target.value);
  }

  fetchTweets(query) {
    var that = this;

    fetch("https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/tweets/" + query)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      var tweets = response["statuses"].map(function(tweetData) {
        var tweet = {}
        tweet.id = tweetData["id"]
        tweet.text = tweetData["text"]
        tweet.screen_name = tweetData["user"]["screen_name"]
        return tweet;
      });

      that.setState({
        tweets: tweets,
        query: query
      });
    });
  }

  render() {
    return (
      <div className="App-tweet-container">
        <SearchInput query={this.state.query} onBlur={this.searchTweets}/>
        <TweetList tweets={this.state.tweets}/>
      </div>
    );
  }
}

class SearchInput extends React.Component {
  render() {
    return (
      <input
        style={{
          height: "40px",
          width: "400px",
          fontSize: "24px"
        }}
        placeholder={"Michael Phelps"}
        value={this.props.query}
        onBlur={this.props.onBlur} />
    );
  }
}

class TweetList extends React.Component {
  render() {
    let content;

    if (this.props.tweets.length > 1) {
      content = (
        <ul className="App-tweet-list">
          {this.props.tweets.map(function(tweet) {
            return <Tweet key={tweet.id} tweet={tweet} />
          })}
        </ul>
      )
    } else {
      content = (
        <h2>
          Enter a search term
        </h2>
      )
    }

    return (
      content
    );
  }
}

const Tweet = ({ tweet }) =>
  <li className="App-tweet">
    <p>{tweet.user} - {tweet.text}</p>
  </li>;

export default App;
