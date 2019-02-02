$('#login-form').on('submit', function(e){
    e.preventDefault();
    $('.error').empty();
    var _token = $("input[name='_token']").val();
    var login_email = $('#login_email').val();
    var password = $('#login_password').val();
    var data = {
        _token: _token,
        email: login_email,
        password: password
    };
    $.ajax({
        url: '/login',
        type: 'POST',
        data: data,
        dataType: 'JSON',
        success: function (data) {
            if(data.auth){
                var loc = window.location;
                window.location = loc.protocol+"//"+loc.host+data.redirectPath;
            }else {
                $('.error_login').append(data.error);
            }
        }
    });

});

$('#btn_reset_password').on('click', function(e){
    e.preventDefault();
    $('.error').empty();
    var _token = $("input[name='_token']").val();
    var email_reset_password = $('#email_reset_password').val();
    var data = {
        _token: _token,
        email_reset_passwordl: email_reset_password
    };
    $.ajax({
        url: 'front/resetPassword',
        type: 'POST',
        data: data,
        dataType: 'JSON',
        success: function (data) {
            if(data.success){
                var loc = window.location;
                window.location = loc.protocol+"//"+loc.host+data.redirectPath;
            }else {
                $('.error_email_reset_password').append(data.error);
            }
        }
    });

});

$('#auth, #register').on('click', function (e) {
    e.preventDefault();
    $('.error').empty();
});

$("#button_regist").on('click', function(e) {
    e.preventDefault();
    $('.error').empty();
    var _token = $("input[name='_token']").val();
    var company = $('#company').val();
    var category = $('#country').val();
    var email = $('#register_email').val();
    var password = $('#register_password').val();
    var upemail = $('#register_upemail').val();

    var data = {
        _token: _token,
        company: company,
        category: category,
        email: email,
        password: password,
        upemail: upemail
    };

    $.ajax({
        url: '/register',
        type:'POST',
        data: data,
        dataType: 'JSON',
        success: function(data) {
            if(data.auth){
                var loc = window.location;
                window.location = loc.protocol+"//"+loc.host+data.redirectPath;
            }else{
                printErrorMsg(data.error);
            }
        }
    });

    function printErrorMsg (msg) {
        $.each( msg, function( key, value ) {
            switch (key){
                case 'company' :
                    $('.error_company').append(value[0]);
                    break;
                case 'category' :
                    $('.error_category').append(value[0]);
                    break;
                case 'email' :
                    $('.error_email').append(value[0]);
                    break;
                case 'password' :
                    $('.error_password').append(value[0]);
                    break;
                case 'upemail' :
                    $('.error_upemail').append(value[0]);
                    break;
            }
        });
    }
});
//В списке городов снимаем галочку с "выбрать все"
$('.checkbox_city').on('click', function () {
    if ($('#city_all').prop("checked")) {
        $('#city_all').removeAttr("checked").val('0');
        //$('#city_all').attr("checked", false).val('0');
    }
});
//Обработка выбора городов
$('#form_cities').submit(function (e) {
    e.preventDefault();
    var cities = [];
    $('#form_cities input:checkbox:checked').each(function(){
        cities.push($(this).val());
    });
    abrCities(cities);
    var data = {
        cities: cities.length == 0 ? null : cities,
        client_id: $('#client_id').val(),
        product_id: $('#product_id').val(),
        technology_id: $('#technology_id').val(),
        material_id: $('#material_id').val()
    };
    $.ajax({
        url: '/front/filter',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (data) {
            addImgMini(data);
            addImg(data);
            addFirm(data);
        }
    });
    $('#popup-сountry').removeClass('popup_active');
    $('#overlay').removeClass('popup-overlay_active');
    $('body').removeClass('hidden');
});
//Указавает сколько выбрано городов
function abrCities(cities) {
    switch (cities.length) {
        case 0:
            $('.geolocation__link').text('Выберите город');
            break;
        case 1:
            var name_city = $('#form_cities input:checkbox:checked').siblings('.form-auth__label-content').text();
            $('.geolocation__link').text(name_city);
            break;
        default:
            if ($("#city_all").is(":checked")){
                $('.geolocation__link').text('Выберите город');
                break;
            }
            $('.geolocation__link').text('Города');
            break;
    }
}

//Фильтр по Заказчик, Продукции, Технологиям, Материалам
$('.client_id').on('click', function (e) {
    var value = $(e.currentTarget).val();
    $('#client_id').val(value);
});
$('.product_id').on('click', function (e) {
    var value = $(e.currentTarget).val();
    $('#product_id').val(value);
});
$('.technology_id').on('click', function (e) {
    var value = $(e.currentTarget).val();
    $('#technology_id').val(value);
});
$('.material_id').on('click', function (e) {
    var value = $(e.currentTarget).val();
    $('#material_id').val(value);
});
//Обработка нажатия кнопки "Показать" после выбора фильтра
$('#slide-button').on('click', function (e) {
    e.preventDefault();
    var cities = [];
    $('#form_cities input:checkbox:checked').each(function(){
        cities.push($(this).val());
    });
    var data = {
        cities: cities.length == 0 ? null : cities,
        client_id: $('#client_id').val(),
        product_id: $('#product_id').val(),
        technology_id: $('#technology_id').val(),
        material_id: $('#material_id').val()
    };
    $.ajax({
        url: '/front/filter',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (data) {
            addImgMini(data);
            addImg(data);
            addFirm(data);
        }
    });
});
//Отрисовка обрезанных фото для галереи на главной странице
function addImgMini(data) {
    $('#adv').empty();

    $.each(data.photo, function (index, value) {
        var txtHtml =  '<li class="adv__item">'+
            '<a href="'+value.reclamas_id+'" class="adv__link">'+
            '<img src="'+ data.pathPhotoMini + value.reclamas_file +'" alt="adv1" class="adv__img">'+
            '<div class="atr_path" id="'+value.reclamas_id+'" hidden></div>'+
            '</a>'+
            '</li>';
        $('#adv').append(txtHtml);
    });

    var max_count = 18;
    var count_photo = data.photo.length;
    var add_fake = max_count - count_photo;

    for (var i=0; i < add_fake; i++){
        var txtHtml =  '<li class="adv__item">'+
            '<a class="adv__link adv__link_fake"></a>'+
            '</li>';
        $('#adv').append(txtHtml);
    }
}
//Отрисовка бльших фото в голереи для крупного плана
function addImg(data) {
    $('#slider-list').empty();
    $.each(data.photo, function (index, value) {
        var date_at = value.reclamas_updated_at;
        var date_update = date_at.substr(0, 10);
        var time_update = date_at.substr(11, 5);
        var clients_short_name = (value.clients_name == null) ? '' : '<li class="tags__item">'+value.clients_short_name+'</li>';
        var productions_short_name = (value.productions_name == null) ? '' : '<li class="tags__item">'+value.productions_short_name+'</li>';
        var technologies_short_name = (value.technologies_name == null) ? '' : '<li class="tags__item">'+value.technologies_short_name+'</li>';
        var materials_short_name = (value.materials_name == null) ? '' : '<li class="tags__item">'+value.materials_short_name+'</li>';
        var txtHtml =
            '<li class="popup-slider__item" id="'+value.reclamas_id+'">'+
                '<div class="popup__info">'+
                    '<div class="popup__date">'+
                        '<span class="popup__time">'+time_update+'</span>'+date_update+
                    '</div>'+
                    '<div class="popup__description">'+
                        '<a href="'+value.redirect_firm+'" class="popup__link">'+value.profiles_company+'</a>'+
                        '<p class="popup__text">'+value.reclamas_comment+'</p>'+
                        '<div class="tags">'+
                            '<ul class="tags__list">'+
                                clients_short_name+
                                productions_short_name+
                                technologies_short_name+
                                materials_short_name+
                            '</ul>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="popup-slider__link">'+
                    '<img src="'+ data.pathPhoto + value.reclamas_file +'" alt="" class="popup-slider__img">'+
                '</div>'+
            '</li>';
        $('#slider-list').append(txtHtml);
    });
}
//Создание списка компаний
function addFirm(data) {
    $('#slider-firms__list').empty();
    $.each(data.firm, function (index, value) {
        var txtHtml = '<li class="firms__item">'+
                        '<a href="/firm/firm/'+value.id+'" class="firms__link">'+
                        '<span class="firms__text">'+value.company+'</span>'+
                    '</a>'+
                    '</li>';
       $('#slider-firms__list').append(txtHtml);
    });
}
//Очищаем скрытый input если в нем ни чнего не выбрано
$('.accordeon-category__trigger').on('click', function (e) {
    var elemActiv = $(e.currentTarget).closest('.accordeon-category__item');
    if(elemActiv.hasClass('accordeon-category__item_active')){
        elemActiv.find('.filter').val('');
    }
});
//Обработка нажатия на кнопку "Нравиться"
$('.button_like').on('click', function (e) {
    var id = $(e.currentTarget).closest('.popup-slider__item').attr('id');
    var data = {
        id: id
    };
    $.ajax({
        url: '/front/addLike',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (data) {
            $(e.currentTarget).find('span').text(data.like_photo);
        }
    });
});
//Обработка нажатия на картинку для подсчета просмотров
$('.adv__link').on('click', function (e) {
    var id = $(e.currentTarget).find('.atr_path').attr('id');
    var data = {
        id: id
    };

    $.ajax({
        url: '/front/addDiscus',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (data) {
            $('.popup-slider__list').find('#'+id).find('.button_discus').find('span').text(data.discus_photo);
        }
    });
});