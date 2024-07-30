import $ from 'jquery'; // Jquery
import './utils.js'; // Дополнительная логика (Модалки, якорные ссылки)
import 'select2'; // Select2
import 'jquery-mask-plugin'; // Маска телефонов
import 'lightbox2'; // Открытие фото и видео в модалке
import Cookie from 'js-cookie';
import assist from './modules/assist'; // Функционал для плагина "Для слабовидящих"

window.jQuery = $;
window.$ = $;

$('input[name*=phone]').mask('+7 000 000 00 00'); // Накидываем на все инпуты у которых содержиться phone в атрибуте name.
$('select[select2]').select2();
wow.init();

// Проверка инпутов на пустоту или если номер не до конца заполнен
$("input[required],textarea[required]").on("blur", function () {
  if ($(this).val().length == 0) {
    $(this).closest(".input_wrapper").addClass("error");
  } else {
    $(this).closest(".input_wrapper").removeClass("error");
  }
});
$("input[name*=phone], input[type*=tel]").on("blur", function () {
  if (!validator.isMobilePhone($(this).val(), 'ru-RU')) {
    $(this).closest(".input_wrapper").addClass("error");
  } else {
    $(this).closest(".input_wrapper").removeClass("error");
  }
});
$("input[name*=mail], input[type*=email]").on("blur", function () {
  if (!validator.isEmail($(this).val())) {
    $(this).closest(".input_wrapper").addClass("error");
  } else {
    $(this).closest(".input_wrapper").removeClass("error");
  }
});


// Инициализация плагина "Для слабовидящих"
assist.init();
$("[data-assist]").on("click", function() {
  if(Cookie.get('assist-enable') == "1") {
    assist.disableAssist();
  } else {
    assist.enableAssist();
  }
});
