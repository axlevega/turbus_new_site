import $ from 'jquery';

import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Grid, EffectCreative } from 'swiper/modules';

// Карусель из направлений туров на главной
const swiper_directs_carousel = new Swiper('.js-directs_carousel .swiper', {
    slidesPerView: 3.7,
    modules: [Scrollbar],
    observer: true,
    observeParents: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      300: {
        slidesPerView: 2.6,
        spaceBetween: 10
      },
      420: {
        slidesPerView: 2.7,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 3.2,
        spaceBetween: 20
      },
      760: {
        slidesPerView: 3.6,
        spaceBetween: 20
      },
      1020: {
        slidesPerView: 4.2,
      },
      1200: {
        slidesPerView: 3.7,
      }
    }
});

// Карусель из направлений туров на внутренней странице
const swiper_inner_directs_carousel = new Swiper('.js-directs_inner_carousel .swiper', {
  slidesPerView: 3,
  modules: [Scrollbar],
  observer: true,
  observeParents: true,
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    300: {
      slidesPerView: 1.6,
      spaceBetween: 10
    },
    460: {
      slidesPerView: 2.1,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 2.5,
      spaceBetween: 20
    },
    760: {
      slidesPerView: 3.1,
      spaceBetween: 20
    },
    1020: {
      slidesPerView: 3.7,
    },
    1200: {
      slidesPerView: 3,
    }
  }
});

// Карусель для галерей
const swiper_gallery_carousel = new Swiper('.gallery_wrapper .swiper', {
  slidesPerView: "auto",
  modules: [Grid],
  
  centeredSlides: true,
  centeredSlidesBounds: true,
  grid: {
    fill: 'row',
    rows: 2,
  },
  spaceBetween: 30,
});

// Карусель с отзывами
const swiper_reviews_carousel = new Swiper('.reviews_carousel .swiper', {
  slidesPerView: 1,
  modules: [Navigation, EffectCreative],
  effect: "creative",
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  creativeEffect: {
    prev: {
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  }
});

// Карусель с автобусами
const swiper_buses_carousel = new Swiper('.buses__carousel .swiper', {
  slidesPerView: 1,
  modules: [Navigation, EffectCreative],
  effect: "creative",
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  creativeEffect: {
    prev: {
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  }
});

// Карусель с отелями
const swiper_hotels_carousel = new Swiper('.hotels_block__carousel .swiper', {
  slidesPerView: 1,
  modules: [Navigation],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

// Карусель с ценностями
const swiper_values_carousel = new Swiper('.values_carousel .swiper', {
  slidesPerView: 2,
  modules: [Grid],
  spaceBetween: 30,
  grid: {
    fill: 'row',
    rows: 2,
  },
  breakpoints: {
    300: {
      slidesPerView: 1.3,
      spaceBetween: 10,
      grid: {
        rows: 1,
      },
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 30,
      grid: {
        rows: 2,
      },
    }
  }
});

if (window.outerWidth > 900) {
  const values_elems = document.querySelectorAll('.values_carousel .values_item');
  const half_values_elems = Math.ceil(values_elems.length / 2);
  
  for (let i = half_values_elems; i < values_elems.length; i++) {
    values_elems[i].querySelector('.values_item_photo').style.order = '2';
    values_elems[i].querySelector('.values_item_text').style.order = '1';
  }
}

// Карусель с командой
const swiper_team_carousel = new Swiper('.team_carousel .swiper', {
  slidesPerView: 1,
  modules: [Navigation],
  spaceBetween: 20,
  navigation: {
    nextEl: '.team_carousel .swiper-button-next',
    prevEl: '.team_carousel .swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    900: {
      slidesPerView: 3
    },
  }
});

// Карусель с карточками туров в направлении
const swiper_tours_carousel = new Swiper('.schedule__list .swiper', {
  slidesPerView: 4,
  modules: [Scrollbar],
  observer: true,
  spaceBetween: 20,
  observeParents: true,
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    300: {
      slidesPerView: 1.8,
      spaceBetween: 10
    },
    420: {
      slidesPerView: 2.1,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 2.7,
      spaceBetween: 10
    },
    760: {
      slidesPerView: 3.2,
      spaceBetween: 10
    },
    1020: {
      slidesPerView: 3.8,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

// Карусели с фотографиями в блоке с маршрутами
const swiper_path_gallery_carousel = new Swiper('.js-tour_path_gallery .swiper', {
  slidesPerView: 4,
  modules: [Navigation],
  observer: true,
  spaceBetween: 20,
  observeParents: true,
  navigation: {
    nextEl: '.js-tour_path_gallery .swiper-button-next',
    prevEl: '.js-tour_path_gallery .swiper-button-prev',
  },
  breakpoints: {
  //   300: {
  //     slidesPerView: 1.8,
  //     spaceBetween: 10
  //   },
  //   420: {
  //     slidesPerView: 2.1,
  //     spaceBetween: 10
  //   },
  //   640: {
  //     slidesPerView: 2.7,
  //     spaceBetween: 10
  //   },
  //   760: {
  //     slidesPerView: 3.2,
  //     spaceBetween: 10
  //   },
    1020: {
      slidesPerView: 6,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});