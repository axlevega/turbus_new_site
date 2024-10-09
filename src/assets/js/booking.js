document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('modalBook')) {
        // Обработчик табов в модалке
        document.querySelectorAll('#modalBook .modal__tabs_nav_item').forEach(function (tabItem) {
            tabItem.addEventListener('click', function () {
                var index = Array.from(document.querySelectorAll('#modalBook .modal__tabs_nav_item')).indexOf(this);

                // Проверка валидации перед переходом к следующей вкладке
                if (!validateTab(index)) {
                    return;
                }

                document.querySelectorAll('#modalBook .modal__tabs_nav_item').forEach(function (tab, i) {
                    tab.classList.remove('is-active');
                    if (i <= index) {
                        tab.classList.add('modal__tabs_nav_item-filled');
                    } else {
                        tab.classList.remove('modal__tabs_nav_item-filled');
                    }
                });
                this.classList.add('is-active');
            });
        });

        // Обновление состояния кнопок переключения табов
        updateTabButtonsState();

        // Проверка состояния чекбоксов в последнем табе для разблокировки кнопки отправки
        document.querySelectorAll('.modal__checkbox_wrapper input[type="checkbox"]').forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                checkSubmitButtonState();
            });
        });
    }

    // Проверка валидации вкладки
    function validateTab(index) {
        var isValid = true;
        var tabContent = document.querySelectorAll('.modal__tabs_item')[index];
        if (!tabContent) {
            return false;
        }
        var inputs = tabContent.querySelectorAll('input[required], select[required]');
        inputs.forEach(function (input) {
            input.addEventListener('input', updateTabButtonsState);
        });

        inputs.forEach(function (input) {
            if (!input.value.trim()) { // Используем trim() для удаления пробелов
                isValid = false;
            }
        });
        return isValid;
    }

    // Обновление состояния кнопок переключения табов
    function updateTabButtonsState() {
        const tabs = document.querySelectorAll('#modalBook .modal__tabs_nav_item');
        let allPreviousValid = true;

        tabs.forEach(function (tabItem, index) {
            if (allPreviousValid) {
                tabItem.classList.remove('disabled');
                allPreviousValid = validateTab(index);
            } else {
                tabItem.classList.add('disabled');
            }
        });
    }

    // Обработчик изменения значения поля "Количество человек"
    var fldCount = document.getElementById('fld_count');
    if (fldCount) {
        fldCount.addEventListener('input', function () {
            updateParticipantFields(parseInt(fldCount.value, 10));
        });
    }

    function updateParticipantFields(count) {
        // Контейнер для дополнительных полей участников
        var participantContainer = document.getElementById('participant_container');

        if (!participantContainer) {
            return;
        }

        // Очистить существующие поля
        participantContainer.innerHTML = '';

        // Добавить новые поля для каждого участника, начиная со второго (текущий пользователь - 1)
        for (var i = 1; i < count; i++) {
            var participantIndex = i + 1;

            // Создаем div для участника
            var participantDiv = document.createElement('div');
            participantDiv.classList.add('modal__participant');
            participantDiv.innerHTML = `
                <h4 class="modal__participant_title">Участник №${participantIndex}</h4>
                <div class="field__wrap">
                    <label for="fld_participant_name_${i}" class="field__label">
                        <span class="field__title">ФИО участника</span>
                        <input type="text" id="fld_participant_name_${i}" value="" placeholder="Укажите ФИО участника" required>
                    </label>
                </div>
                <div class="field__wrap">
                    <label for="fld_participant_birthdate_${i}" class="field__label">
                        <span class="field__title">Дата рождения участника</span>
                        <input type="date" id="fld_participant_birthdate_${i}" value="" required>
                    </label>
                </div>
                <div class="field__wrap">
                    <label for="fld_participant_phone_${i}" class="field__label">
                        <span class="field__title">Телефон участника</span>
                        <input type="text" id="fld_participant_phone_${i}" value="" placeholder="" required>
                    </label>
                </div>
            `;

            // Добавляем div участника в контейнер
            participantContainer.appendChild(participantDiv);
        }
        updateTabButtonsState();
    }

    // Функция заполнения формы демо-данными
    function fillFormWithDemoData() {
        document.getElementById('fld_name').value = 'Иван Иванов';
        document.getElementById('fld_birthdate').value = '1990-05-15';
        document.getElementById('fld_phone').value = '+79991112233';
        document.getElementById('fld_email').value = 'ivan.ivanov@example.com';
        document.getElementById('field_tour').value = 'Вариант 1';
        document.getElementById('field_hotel').value = 'Вариант 3';
        document.getElementById('fld_count').value = 3;
        updateParticipantFields(3);
        document.querySelector('input[name="payment"][value="Переводом"]').checked = true;
        document.getElementById('field_comment').value = 'Хотелось бы номер с видом на озеро';

        // Заполнение данных участников
        document.getElementById('fld_participant_name_1').value = 'Петр Петров';
        document.getElementById('fld_participant_birthdate_1').value = '1992-08-20';
        document.getElementById('fld_participant_phone_1').value = '+79991114455';

        document.getElementById('fld_participant_name_2').value = 'Мария Смирнова';
        document.getElementById('fld_participant_birthdate_2').value = '1995-12-30';
        document.getElementById('fld_participant_phone_2').value = '+79992223344';
        updateTabButtonsState();
    }

    // Заполнение формы демо-данными при загрузке страницы
    // fillFormWithDemoData();

    // Проверка состояния чекбоксов для разблокировки кнопки отправки
    function checkSubmitButtonState() {
        var checkboxes = document.querySelectorAll('#modal_book_tab_4 .modal__checkbox_wrapper input[type="checkbox"]');
        var allChecked = true;

        checkboxes.forEach(function (checkbox) {
            if (!checkbox.checked) {
                allChecked = false;
            }
        });

        var bookButton = document.getElementById('modalSendOrder');
        if (bookButton) {
            if (allChecked) {
                bookButton.classList.remove('disabled');
            } else {
                bookButton.classList.add('disabled');
            }
        }
    }

    // Изначально блокируем кнопку отправки
    checkSubmitButtonState();

    // Обработчик нажатия на кнопку "Бронирование"
    var bookButton = document.getElementById('modalSendOrder');
    if (bookButton) {
        bookButton.addEventListener('click', function () {
            // Сбор данных формы в JSON
            var bookingData = {
                full_name: document.getElementById('fld_name').value,
                birth_date: document.getElementById('fld_birthdate').value,
                phone: document.getElementById('fld_phone').value,
                email: document.getElementById('fld_email').value,
                // tour: document.getElementById('field_tour').value,
                // hotel_info: document.getElementById('field_hotel').value,
                tour: document.getElementById('field_tour').selectedOptions[0]?.text || '', // тащим в заявку текст, а не значение option
                hotel_info: document.getElementById('field_hotel').selectedOptions[0]?.text || '', // тащим в заявку текст, а не значение option
                total_people: parseInt(document.getElementById('fld_count').value, 10),
                payment_method: document.querySelector('input[name="payment"]:checked').value,
                comment: document.getElementById('field_comment').value,
                participants: [],
                source_page: window.location.href
            };

            // Сбор данных участников
            for (var i = 1; i < bookingData.total_people; i++) {
                var participant = {
                    full_name: document.getElementById(`fld_participant_name_${i}`).value,
                    birth_date: document.getElementById(`fld_participant_birthdate_${i}`).value,
                    phone: document.getElementById(`fld_participant_phone_${i}`).value
                };
                bookingData.participants.push(participant);
            }

            // Отправка данных на сервер
            fetch('https://dev.turbusgesh.ru/booking/api/tour_booking.php?action=create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        resetFormAndShowSuccess();
                    } else {
                        alert('Ошибка при создании бронирования: ' + (data.error || 'Неизвестная ошибка'));
                    }
                })
                .catch(error => {
                    console.error('Ошибка при отправке данных:', error);
                    alert('Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте снова позже.');
                });
        });
    }

    // Функция для очистки всех полей формы и отображения сообщения об успешном бронировании
    function resetFormAndShowSuccess() {
        // Очистка всех полей формы
        document.querySelectorAll('#modalBook input, #modalBook select, #modalBook textarea').forEach(function (input) {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });

        // Очистка дополнительных полей участников
        updateParticipantFields(1);

        // Закрытие модального окна бронирования
        var modalBook = document.getElementById('modalBook');
        if (modalBook) {
            modalBook.classList.remove('is-active');
        }

        // Открытие окна с успешным бронированием
        var modalSuccess = document.getElementById('modalSuccess');
        if (modalSuccess) {
            modalSuccess.classList.add('is-active');
        }
    }

    // Получаем данные направления, туров и гостиниц через AJAX
    let directionsData = [];

    fetch('https://dev.turbusgesh.ru/booking/api/get_select_data.php')
        .then(response => response.json())
        .then(data => {
            directionsData = data;
            const fieldDirection = document.getElementById('field_direction');
            const fieldTour = document.getElementById('field_tour');
            const fieldHotel = document.getElementById('field_hotel');

            // Заполняем список направлений
            directionsData.forEach(direction => {
                const option = document.createElement('option');
                option.value = direction.id;
                option.textContent = direction.title;
                fieldDirection.appendChild(option);
            });

            // Обработка выбора направления
            fieldDirection.addEventListener('change', function () {
                const selectedDirectionId = parseInt(this.value);
                const selectedDirection = directionsData.find(direction => direction.id === selectedDirectionId);

                // Очищаем список туров и гостиниц
                fieldTour.innerHTML = '<option selected disabled value="">Выберите тур</option>';
                fieldHotel.innerHTML = '<option selected disabled value="">Выберите гостиницу</option>';

                if (selectedDirection) {
                    // Заполняем список туров в зависимости от выбранного направления с использованием optgroup
                    Object.keys(selectedDirection.tours).forEach(month => {
                        const optgroup = document.createElement('optgroup');
                        optgroup.label = month;

                        selectedDirection.tours[month].forEach(tour => {
                            const option = document.createElement('option');
                            option.value = tour.id;
                            option.textContent = tour.title;
                            optgroup.appendChild(option);
                        });

                        fieldTour.appendChild(optgroup);
                    });
                }
            });

            // Обработка выбора тура
            fieldTour.addEventListener('change', function () {
                const selectedTourId = parseInt(this.value);
                const selectedDirectionId = parseInt(fieldDirection.value);
                const selectedDirection = directionsData.find(direction => direction.id === selectedDirectionId);

                // Очищаем список гостиниц
                fieldHotel.innerHTML = '<option value="">Выберите гостиницу</option>';

                if (selectedDirection) {
                    // Находим выбранный тур
                    let selectedTour;
                    Object.keys(selectedDirection.tours).forEach(month => {
                        selectedDirection.tours[month].forEach(tour => {
                            if (tour.id === selectedTourId) {
                                selectedTour = tour;
                            }
                        });
                    });

                    // Заполняем список гостиниц в зависимости от выбранного тура
                    if (selectedTour) {
                        selectedTour.hotels.forEach(hotel => {
                            const option = document.createElement('option');
                            option.value = hotel.id;
                            option.textContent = hotel.title;
                            fieldHotel.appendChild(option);
                        });
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching directions data:', error);
        });
});