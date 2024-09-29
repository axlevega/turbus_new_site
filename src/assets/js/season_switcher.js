document.addEventListener('DOMContentLoaded', function() {
    var seasonSwitcher = document.getElementById('seasonSwitcher');

    // Проверяем наличие переключателя на странице
    if (seasonSwitcher) {
        // Обрабатываем клик по всему переключателю
        seasonSwitcher.addEventListener('click', function() {
            if (seasonSwitcher.classList.contains('mainscreen_toggler-summer')) {
                // Если сейчас лето, переключаем на зиму
                setSeason('winter');
            } else if (seasonSwitcher.classList.contains('mainscreen_toggler-winter')) {
                // Если сейчас зима, переключаем на лето
                setSeason('summer');
            }
        });

        // Функция для установки сезона и перезагрузки страницы
        function setSeason(season) {
            // Устанавливаем куку с выбранным сезоном на 1 год
            document.cookie = "season=" + season + ";path=/;max-age=" + (365*24*60*60);
            // Перезагружаем страницу
            location.reload();
        }
    }
});