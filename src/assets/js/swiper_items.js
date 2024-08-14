import $ from 'jquery';

import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

// Карусель из направлений туров
const swiper_directs_carousel = new Swiper('.directs_carousel .swiper', {
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