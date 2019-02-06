'use strict';

var $j = jQuery.noConflict();

$j(function () {

  $j('select').styler();

  var btnProduct = $j('#btn-product');
  var btnTechnology = $j('#btn-technology');
  var btnSubmit = $j('#sub-order');
  var selectCity = $j('#select-city-styler');
  var selectProduct = $j('#select-product-styler');
  var selectTechnology = $j('#select-technology-styler');
  var flags = {
    flagCity: false,
    flagProduct: false,
    flagTechnology: false
  };

  var submitCheck = function () {
    if (flags.flagCity && (flags.flagProduct || flags.flagTechnology)) {
      btnSubmit.prop('disabled', false);
      btnSubmit.removeClass('button_regist--disabled');
    } else {
      btnSubmit.prop('disabled', true);
      btnSubmit.addClass('button_regist--disabled');
    }
  };

  var onClickBtn = function (eventObject) {
    if (!flags[eventObject.data.flag]) {
      eventObject.data.select.fadeIn();
      eventObject.data.select.find('.jq-selectbox__select').css({
        display: 'none'
      });
      eventObject.data.select.find('.jq-selectbox__dropdown').css({
        left: '0px',
        top: '0px',
        height: 'auto',
        bottom: 'auto',
        display: 'block'
      });
      eventObject.data.btnDis.prop('disabled', true);
      eventObject.data.btnDis.addClass('button_regist--disabled');
      flags[eventObject.data.flag] = true;
    } else {
      eventObject.data.select.fadeOut();
      eventObject.data.btnDis.prop('disabled', false);
      eventObject.data.btnDis.removeClass('button_regist--disabled');
      flags[eventObject.data.flag] = false;
    }
    submitCheck();
  };

  var onClickBtnCity = function () {
    selectCity.fadeIn();
    selectCity.find('.jq-selectbox__select').css({
      display: 'none'
    });
    selectCity.find('.jq-selectbox__dropdown').css({
      left: '0px',
      top: '0px',
      height: 'auto',
      bottom: 'auto',
      display: 'block'
    });
    flags.flagCity = true;
    submitCheck();
  };

  var showSelectText = function (eventObject) {
    eventObject.data.select.find('.jq-selectbox__select').css({display: 'block'});
  };

  var closePopup = function () {
    flags.flagCity = false;
    flags.flagProduct = false;
    flags.flagTechnology = false;
    selectCity.fadeOut();
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
  btnProduct.click( {
    flag: flags.flagProduct,
    select: selectProduct,
    btnDis: btnTechnology
  }, onClickBtn);
  btnTechnology.click( {
    flag: flags.flagTechnology,
    select: selectTechnology,
    btnDis: btnProduct
  }, onClickBtn);

  selectCity.click({select: selectCity}, showSelectText);
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
