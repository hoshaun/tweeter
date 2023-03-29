/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const $submitButton = $('.tweet-button');
  $submitButton.on('click', function(e) {
    e.preventDefault();
    const data = $('form').serialize();
    console.log(data);
    $.ajax('/tweets', { data: data, method: 'POST' })
    .then(function (data) {
      console.log(data);
    });
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
          <div>${tweet.created_at} days ago</div>
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

  renderTweets(data);

});