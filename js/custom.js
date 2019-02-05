'use strict';

var $j = jQuery.noConflict();

$j(function () {

  $j('select').styler();

  var btnProduct = $j('#btn-product');
  var btnTechnology = $j('#btn-technology');
  var btnSubmit = $j('#sub-order');
  var selectSity = $j('#select-city-styler');
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
      selectProduct.find('.jq-selectbox__select').css({
        display: 'none'
      });
      selectProduct.find('.jq-selectbox__dropdown').css({
        left: '0px',
        top: '0px',
        height: 'auto',
        bottom: 'auto',
        display: 'block'
      });
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
      selectTechnology.find('.jq-selectbox__select').css({
        display: 'none'
      });
      selectTechnology.find('.jq-selectbox__dropdown').css({
        left: '0px',
        top: '0px',
        height: 'auto',
        bottom: 'auto',
        display: 'block'
      });
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
      selectSity.fadeIn();
      selectSity.find('.jq-selectbox__select').css({
        display: 'none'
      });
      selectSity.find('.jq-selectbox__dropdown').css({
        left: '0px',
        top: '0px',
        height: 'auto',
        bottom: 'auto',
        display: 'block'
      });
      flagCity = true;
    } else {
      selectSity.fadeOut();
      flagCity = false;
    }
    submitCheck();
  };

  var showSelectText = function (eventObject) {
    eventObject.data.select.find('.jq-selectbox__select').css({display: 'block'});
  };

  var closePopup = function () {
    flagCity = false;
    flagProduct = false;
    flagTechnology = false;
    selectSity.fadeOut();
    selectProduct.fadeOut();
    selectTechnology.fadeOut();
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

  selectSity.click({select: selectSity}, showSelectText);
  selectProduct.click({select: selectProduct}, showSelectText);
  selectTechnology.click({select: selectTechnology}, showSelectText);

  $j('.popup__close').click( function (evt) {
    closePopup();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
  });

});
