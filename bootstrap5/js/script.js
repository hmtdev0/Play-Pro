document.addEventListener('DOMContentLoaded', () => {



    // search box
    const search_modal = document.getElementById('search-bar-modal');
    const search_modal_open = document.getElementById('search-modal-open');
    const search_modal_close = document.getElementById('search-modal-close');


    // open
    search_modal_open.addEventListener('click', function () {
        search_modal.classList.add('active');
    });

    // close
    search_modal_close.addEventListener('click', function () {
        search_modal.classList.remove('active');
    });




    // auth login modal
    const loging_modal = document.getElementById('auth-login-modal');
    const login_open_btn = document.getElementById('login-open-modal');
    const login_modal_close = document.getElementById('login-modal-close');

    // open
    login_open_btn.addEventListener("click", function () {
        loging_modal.classList.add('active');
    });

    // close
    login_modal_close.addEventListener('click', function () {
        loging_modal.classList.remove('active');
    });
});