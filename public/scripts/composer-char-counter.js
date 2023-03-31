$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  const $tweetCharCounter = $('#tweet-char-counter');
  $tweetText.on('input', function() {
    const charLimit = 140;
    const tweetLength = this.value.length;
    $tweetCharCounter.val(charLimit - tweetLength);
    if ($tweetCharCounter.val() < 0) {
      $tweetCharCounter.css('color', 'red');
    } else {
      $tweetCharCounter.css('color', 'black');
    }
  });
});