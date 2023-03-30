$(document).ready(function() {
  const $composeButton = $('#compose-button');
  const $composeTextArea = $('#tweet-text');

  // scroll to top and focus text area on click
  $composeButton.on('click', function() {
    $('html, body').animate({
      scrollTop: $(".container").offset().top - 50
    }, 'slow');
    $composeTextArea.focus();
  });
});