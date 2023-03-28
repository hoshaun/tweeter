$(document).ready(function() {
  const tweetText = document.getElementById('tweet-text');
  const tweetCharCounter = document.getElementById('tweet-char-counter');
  tweetText.addEventListener('input', function() {
    const charLimit = 140;
    const tweetLength = this.value.length;
    tweetCharCounter.value = charLimit - tweetLength;
    tweetCharCounter.style.color = tweetCharCounter.value < 0 ? 'red' : 'black';
  });
});