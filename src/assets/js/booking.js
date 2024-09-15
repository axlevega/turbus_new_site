import $ from "jquery";

$(document).ready(function () {
    if ($('#modalBook').length) {

        // обработчика табов в модалке
        $('#modalBook .modal__tabs_nav_item').on('click', function () {
            $('#modalBook .modal__tabs_nav_item').removeClass('is-active');
            $(this).addClass('is-active');
            var index = $(this).index();
            $('#modalBook .modal__tabs_nav_item').each(function (i) {
                if (i <= index) {
                    $(this).addClass('modal__tabs_nav_item-filled');
                } else {
                    $(this).removeClass('modal__tabs_nav_item-filled');
                }
            });
        });
    }
});