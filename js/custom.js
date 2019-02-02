'use strict';

var $j = jQuery.noConflict();

$j(function () {
  var menuItemOrder = document.querySelector('#item-order');
  var overlay = document.querySelector('#overlay');
  var popup = overlay.querySelector('#popup-order');
  var close = popup.querySelector('.popup__close');
  var form = popup.querySelector('#form-order');

  menuItemOrder.addEventListener('click', function (event) {
    event.preventDefault();
    overlay.classList.add('popup-overlay_active');
    popup.classList.add('popup_active');
  });

  close.addEventListener('click', function (event) {
    overlay.classList.remove('popup-overlay_active');
    popup.classList.remove('popup_active');
    form.reset();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      overlay.classList.remove('popup-overlay_active');
      popup.classList.remove('popup_active');
      form.reset();
    }
  });


  $j('select').styler({
  //  selectVisibleOptions: 8
  });

});
