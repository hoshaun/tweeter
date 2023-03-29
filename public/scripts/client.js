/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const $submitButton = $('.tweet-button');

  $submitButton.on('click', function(e) {
    e.preventDefault();
    const data = $('form').serialize();
    $.ajax('/tweets', { method: 'POST', data: data });
  });

  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <div class="tweet-header">
          <h3 class="profile">
            <div><img src=${tweet.user.avatars} /></div>
            <div class="profile-name">${tweet.user.name}</div>
          </h3>
          <h3 class="profile-id">${tweet.user.handle}</h3>
        </div>
        <p id="tweet-post">${tweet.content.text}</p>
        <footer class="tweet-history-footer">
          <div>${timeago.format(Date.now() - tweet.created_at)}</div>
          <div class="tweet-footer-icons">
            <div><i class="fa-solid fa-flag"></i></div>
            <div><i class="fa fa-retweet"></i></div>
            <div><i class="fa-sharp fa-solid fa-heart"></i></div>
          </div>
        </footer>
      </article>
      <br>
    `);
    
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-history').append($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();
});