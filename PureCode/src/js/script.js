$(document).ready(function() {
  // For burger menu
  $('.hamburger').on('click', function() {
    $(this).toggleClass('is-active');
    $('.header-block__nav-bar').slideToggle('0.3s');
  })
});
