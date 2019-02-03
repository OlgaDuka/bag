'use strict';

var $j = jQuery.noConflict();

$j(function () {

  $j('select').styler();

  var btnProduct = $j('#btn-product');
  var btnTechnology = $j('#btn-technology');
  var btnSubmit = $j('#sub-order');
  var selectProduct = $j('#select-product-styler');
  var selectTechnology = $j('#select-technology-styler');
  var flagCity = false;
  var flagProduct = false;
  var flagTechnology = false;

  var submitCheck = function () {
    if (flagCity && (flagProduct || flagTechnology)) {
      btnSubmit.prop('disabled', false);
      btnSubmit.removeClass('button_regist--disabled');
    } else {
      btnSubmit.prop('disabled', true);
      btnSubmit.addClass('button_regist--disabled');
    }
  };

  var onClickBtnProduct = function () {
    if (!flagProduct) {
      selectProduct.fadeIn();
      btnTechnology.prop('disabled', true);
      btnTechnology.addClass('button_regist--disabled');
      flagProduct = true;
    } else {
      selectProduct.fadeOut();
      btnTechnology.prop('disabled', false);
      btnTechnology.removeClass('button_regist--disabled');
      flagProduct = false;
    }
    submitCheck();
  };

  var onClickBtnTechnology = function (eventObject) {
    if (!flagTechnology) {
      selectTechnology.fadeIn();
      btnProduct.prop('disabled', true);
      btnProduct.addClass('button_regist--disabled');
      flagTechnology = true;
    } else {
      selectTechnology.fadeOut();
      btnProduct.prop('disabled', false);
      btnProduct.removeClass('button_regist--disabled');
      flagTechnology = false;
    }
    submitCheck();
  };

  var onClickBtnCity = function () {
    if (!flagCity) {
      $j('#select-city-styler').fadeIn();
      flagCity = true;
    } else {
      $j('#select-city-styler').fadeOut();
      flagCity = false;
    }
    submitCheck();
  };

  var closePopup = function () {
    flagCity = false;
    flagProduct = false;
    flagTechnology = false;
    $j('#select-city-styler').fadeOut();
    $j('#select-product-styler').fadeOut();
    $j('#select-technology-styler').fadeOut();
    $j('#overlay').removeClass('popup-overlay_active');
    $j('#popup-order').removeClass('popup_active');
    $j('#form-order')[0].reset();
  };

  $j('#item-order').click( function (event) {
    event.preventDefault();
    $j('#overlay').addClass('popup-overlay_active');
    $j('#popup-order').addClass('popup_active');
  });

  $j('#btn-city').click(onClickBtnCity);
  $j('#btn-product').click(onClickBtnProduct);
  $j('#btn-technology').click(onClickBtnTechnology);


  $j('.popup__close').click( function (evt) {
    closePopup();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
  });
  
});
