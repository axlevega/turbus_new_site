import $ from "jquery";

$("[data-open]").on("click", function () {
  if ($(this).hasClass("self-active")) {
    $(this).toggleClass("is-active");
  }
  if ($(this).hasClass("header_burger")) {
    $(".header").toggleClass("is-active");
  }
  if ($(this).hasClass("with-backdrop")) {
    $("#backdrop").toggleClass("is-active");
  }
  $("#" + $(this).data("open")).toggleClass("is-active");
  if ($(this).data("fill")) {
    $(`#${$(this).data("open")} #${$(this).data("fill")}`).val($(this).data("value"));
  }
});

// Закрытие модалок
$("[data-close]").on("click", function () {
  if ($(this).data("close")) {
    $(`#${$(this).data("close")}`).removeClass("is-active");
  } else {
    $(this).closest(".modal").removeClass("is-active");
    $("#backdrop").removeClass("is-active");
  }
});

$('[data-close-closest]').on('click', function() {
  $(this).closest('.is-active').removeClass('is-active');
});

$("#backdrop").on("click", function () {
  $(this).removeClass("is-active");
  $(".modal.is-active").removeClass("is-active");
});

// Links
$("a[data-anchor]").on("click", function (e) {
  e.preventDefault();
  if ($("#" + $(this).data("anchor")).length) {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#" + $(this).data("anchor")).offset().top - 150,
      },
      1000
    );
    $("#sidebar").removeClass("is-active");
  } else {
    location.href = $(this).attr("href");
  }
});

// Go to top
$(window).on("scroll", function () {
  if (window.scrollY > 200) {
    $(".go_to_top").show();
  } else {
    $(".go_to_top").hide();
  }
});
$(".go_to_top").on("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Auto height
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

$(document).ready(function () {
  let heightsArray = [];
  $("[similar-height]").each(function () {
    heightsArray.push($(this).attr("similar-height"));
  });

  heightsArray = unique(heightsArray);

  for (let heightName in heightsArray) {
    let maxHeight = 0;
    $("[similar-height=" + heightsArray[heightName] + "]").each(function () {
      if ($(this).height() > maxHeight) {
        maxHeight = $(this).height();
      }
    });
    $("[similar-height=" + heightsArray[heightName] + "]").each(function () {
      $(this).height(maxHeight);
    });
  }

  $(window).on("resize", function () {
    for (let heightName in heightsArray) {
      let maxHeight = 0;
      $("[similar-height=" + heightsArray[heightName] + "]").each(function () {
        $(this).height("auto");
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).height();
        }
      });
      $("[similar-height=" + heightsArray[heightName] + "]").each(function () {
        $(this).height(maxHeight);
      });
    }
  });
});

////////////////////////////////////
/////// Табы ///////////////////////

document.addEventListener('click', function(event) {
  // Проверяем, что клик был по элементу с атрибутом data-tab-target
  var tabTrigger = event.target.closest('[data-tab-target]');
  if (tabTrigger) {
      // Получаем родительский контейнер табов
      var tabContainer = tabTrigger.closest('[data-tab-container]');
      if (!tabContainer) return;

      // Получаем ID контента таба
      var tabId = tabTrigger.getAttribute('data-tab-target');

      // Деактивируем все табы и контент внутри текущего контейнера (только на текущем уровне)
      deactivateTabs(tabContainer, tabTrigger);

      // Активируем кликнутый таб и соответствующий контент
      activateTab(tabContainer, tabId);
  }
});

function deactivateTabs(container, currentTabTrigger) {
  // Удаляем класс is-active у всех элементов на текущем уровне контейнера
  container.querySelectorAll('[data-tab-target]').forEach(function(tab) {
      // Деактивируем только табы, которые находятся на том же уровне, что и текущий триггер
      if (tab.closest('[data-tab-container]') === container) {
          tab.classList.remove('is-active');
      }
  });

  container.querySelectorAll('[data-tab-content]').forEach(function(content) {
      // Деактивируем только контент, который находится на том же уровне, что и текущий триггер
      if (content.closest('[data-tab-container]') === container) {
          content.classList.remove('is-active');
      }
  });
}

function activateTab(container, tabId) {
  // Активируем кликнутый таб
  var tabTrigger = container.querySelector('[data-tab-target="' + tabId + '"]');
  if (tabTrigger) tabTrigger.classList.add('is-active');

  // Активируем соответствующий контент
  var tabContent = container.querySelector('[data-tab-content][id="' + tabId + '"]');
  if (tabContent) tabContent.classList.add('is-active');

  setTimeout(window.updateGapWidth, 0);
}

// Инициализация: скрыть все контенты, кроме активных по умолчанию
document.querySelectorAll('[data-tab-container]').forEach(function(container) {
  var activeTab = container.querySelector('[data-tab-target].is-active');
  if (activeTab) {
      var tabId = activeTab.getAttribute('data-tab-target');
      activateTab(container, tabId);
  } else {
      // Если нет активных табов, скрываем все контенты
      deactivateTabs(container);
  }
});




////////////////////////////////////
////////////////////////////////////


////////////////////////////////////
/////// Аккордеоны /////////////////

$('[data-accordion_item]').on('click', function(){
  let accordionWrapper = $(this).parents('[data-accordion]').data('accordion');
  let accordionItem = $(this).data('accordion_item');
  closeAllAccordions(accordionWrapper,accordionItem);
  showAccordionItem(accordionItem);
})

// Закрытие всех вкладок
function closeAllAccordions(wrapperElem,excludeElem) {
  $('[data-accordion='+wrapperElem+'] [data-accordion_item]').each(function() {
    if ($(this).data('accordion_item') != excludeElem) {
      $(this).removeClass('is-active');
    }      
  })
}

// Открытие одной вкладки
function showAccordionItem(elem) {
  let accordionElement = $('[data-accordion_item='+elem+']');
  $(accordionElement).toggleClass('is-active');
}

////////////////////////////////////
////////////////////////////////////


////////////////////////////////////
// Динамическая ширина разделителей между событиями в программе тура

document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll('.tour_program__day_nav');
  
  // Определяем функцию в глобальной области
  window.updateGapWidth = function() {
    containers.forEach(container => {
      const items = container.querySelectorAll('.tour_program__day_nav_item');
      if (items.length > 1) {
        // Вычисляем расстояние между первым и вторым элементами
        const gapWidth = items[1].offsetLeft - (items[0].offsetLeft + items[0].offsetWidth) - 28;
        container.style.setProperty('--tour-event-gap-width', `${gapWidth}px`);
      }
    });
  };

  if (containers.length > 0) {
    // Первоначальный расчёт для всех контейнеров
    window.updateGapWidth();

    // Обновление при изменении размера окна
    window.addEventListener('resize', window.updateGapWidth);
  }
});

////////////////////////////////////
////////////////////////////////////