import $ from 'jquery'; // Jquery
import './utils.js'; // Дополнительная логика (Модалки, якорные ссылки)
import { Fancybox } from '@fancyapps/ui';

import './swiper_items.js';
import './ya_maps.js';
import './booking.js';

window.jQuery = $;
window.$ = $;

Fancybox.bind('[data-fancybox]');