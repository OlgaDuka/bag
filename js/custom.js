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

var submitCheck = function (flagCommon) {
  if (flagCity && flagCommon) {
    btnSubmit.prop('disabled', false);
    btnSubmit.removeClass('button_regist--disabled');
  } else {
    btnSubmit.prop('disabled', true);
    btnSubmit.addClass('button_regist--disabled');
  }
};

var onClickBtn = function (eventObject) {
  if (!eventObject.data.flag) {
    eventObject.data.select.fadeIn();
    eventObject.data.btnDis.prop('disabled', true);
    eventObject.data.btnDis.addClass('button_regist--disabled');
    eventObject.data.flag = true;
  } else {
    eventObject.data.select.fadeOut();
    eventObject.data.btnDis.prop('disabled', false);
    eventObject.data.btnDis.removeClass('button_regist--disabled');
    eventObject.data.flag = false;
  }
  submitCheck(eventObject.data.flag);
  return eventObject.data.flag;
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

  $j('#btn-city').click( function () {
    if (!flagCity) {
      $j('#select-city-styler').fadeIn();
      flagCity = true;
    } else {
      $j('#select-city-styler').fadeOut();
      flagCity = false;
    }
    if (flagProduct || flagTechnology) {
      submitCheck(true);
    } else {
      submitCheck(false);
    }
  });

  $j('#btn-product').click( {
      flag: flagProduct,
      select: selectProduct,
      btnDis: btnTechnology
    },
    flagProduct = onClickBtn);

  $j('#btn-technology').click( {
      flag: flagTechnology,
      select: selectTechnology,
      btnDis: btnProduct
    },
    flagTechnology = onClickBtn);

  $j('.popup__close').click( function (evt) {
    closePopup();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
  });

});
