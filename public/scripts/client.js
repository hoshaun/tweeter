/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const $composeTextArea = $('#tweet-text');
  const $tweetCharCounter = $('#tweet-char-counter');
  const $submitButton = $('.tweet-button');
  const $validationError = $('#validation-error');
  const charLimit = 140;
  
  // focus text area input on page load
  $composeTextArea.focus();

  // event handler for tweet submit button
  $submitButton.on('click', function(e) {
    e.preventDefault();
    const data = $('form').serialize();
    const tweet = data.slice(5).replaceAll('%20', ' ');
    const tweetSpaceCount = tweet.split(' ').length - 1;

    if (!data || tweet.length <= 0 || tweet.length === tweetSpaceCount) {
      const msg = 'Tweet cannot be empty.';
      showValidationError($validationError, msg);
      return;
    }

    if (tweet.length > charLimit) {
      const msg = `Tweet cannot exceed ${charLimit} characters.`;
      showValidationError($validationError, msg);
      return;
    }

    hideValidationError($validationError);
    $composeTextArea.val('');
    $tweetCharCounter.val(charLimit);

    $.ajax('/tweets', { method: 'POST', data: data })
      .then(function() {
        loadTweets();
      })
      .catch(function() {
        alert('Failed to submit tweet.')
      });
  });

  // create new tweet HTML element
  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article class="tweet">
        <div class="tweet-header">
          <h3 class="profile">
            <div><img src=${tweet.user.avatars} /></div>
            <div class="profile-name">${escape(tweet.user.name)}</div>
          </h3>
          <h3 class="profile-id">${escape(tweet.user.handle)}</h3>
        </div>
        <p id="tweet-post">${escape(tweet.content.text)}</p>
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

  // add all submitted tweets to HTML
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-history').prepend($tweet);
    }
  };

  // load all submitted tweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(data) {
        renderTweets(data);
      });
  };

  // show tweet submission validation error
  const showValidationError = function(err, msg) {
    hideValidationError(err);
    err.slideDown("fast", function() {
      err.append(msg);
      err.css('display', 'flex');
    });
  };

  // hide tweet submission validation error
  const hideValidationError = function(err) {
    err.slideUp("fast", function() {
      err.text('');
    });
  };

  // DOM escape function for preventing XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
});