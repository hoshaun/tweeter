$(document).ready(function() {
  const $scrollTopButton = $('#scroll-top-button');
  const $composeTextArea = $('#tweet-text');

  // handle scroll to top button visibility
  window.onscroll = function() {
    showScrollTopButton();
  };
  
  // event handler for scroll to top button
  $scrollTopButton.on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
    $composeTextArea.focus();
  });

  // handles scroll to top button visibility behaviour
  const showScrollTopButton = function() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      $scrollTopButton.show();
    } else {
      $scrollTopButton.hide();
    }
  };
});