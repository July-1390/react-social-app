import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TweetInput from "../../components/TweetInput";
import { logout, getUserById } from "../../modules/users";
import { createTweet, getTweetById, getAllTweets } from "../../modules/tweets";
import Tweet from "../../components/Tweet";
import Timeline from "../../components/Timeline";
import sortByDatetime from "../../utils/datetime";

const Home = ({ activeUser, tweets, createTweet }) => {
  const onSubmit = text => {
    createTweet({ userId: activeUser.id, text: text });
  };

  return (
    <React.Fragment>
      <TweetInput onSubmit={onSubmit} />
      <Timeline>
        {tweets.map(tweet => (
          <Tweet {...tweet} key={tweet.id} />
        ))}
      </Timeline>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  activeUser: getUserById(state.users, state.users.active),
  tweets: getAllTweets(state.tweets)
    .map(tweet => ({
      ...tweet,
      repliedTweet: getTweetById(state.tweets, tweet.replyToId),
      user: getUserById(state.users, tweet.userId)
    }))
    .sort(sortByDatetime)
});

const mapDispatchToProps = { logout, createTweet };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
