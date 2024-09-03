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

$('[data-tab_target').on('click', function() {
  closeAllTabs();
  showTab($(this).data('tab_target'));
})

// Закрытие всех табов
function closeAllTabs() {
  $('[data-tab_item], [data-tab_target]').each(function() {
    $(this).removeClass('is-active');
  })
}

// Открытие одного таба
function showTab(tab_elem_id) {
  if ($('#'+tab_elem_id).length) {
    $('[data-tab_target=' + tab_elem_id).addClass('is-active');
    $('#' + tab_elem_id).addClass('is-active');
  }
}

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