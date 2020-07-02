define(['jquery', 'login'], function($) {

    let username = /^[A-z]\w{5,15}$/;
    let password = /^\w{6,16}$/;
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let submit = $('#myform>input[type="submit"]')
    $('#username1').on('input', function() {
        username.test(this.value) ? this.dataset.pass = true : this.dataset.pass = false
            // console.log($('#username1'));

        check();

    })
    $('#password1').on('input', function() {
        password.test(this.value) ? this.dataset.pass = true : this.dataset.pass = false
        check();
    })
    $('#email1').on('input', function() {
        email.test(this.value) ? this.dataset.pass = true : this.dataset.pass = false
        check();

    })
    $('#pass').on('input', function() {
        this.value === password1.value ? this.dataset.pass = true : this.dataset.pass = false
        check();
    })
    $(":checkbox").prop("checked", true)

    function check() {
        let allPass = $('#myform>input[data-pass="true"]')
        if (allPass.length === 4) submit.removeAttr('disabled')
        console.log(allPass.length);

    }
});