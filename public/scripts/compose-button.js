$(document).ready(function() {
  const $composeButton = $('.compose-button');
  const $composeTextArea = $('#tweet-text');

  $composeButton.on('click', function() {
    $composeTextArea.focus();
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
  });
});