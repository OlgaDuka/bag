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