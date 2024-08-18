import $ from 'jquery'; // Jquery
import './utils.js'; // Дополнительная логика (Модалки, якорные ссылки)
import { Fancybox } from '@fancyapps/ui';

import './swiper_items.js';

window.jQuery = $;
window.$ = $;

Fancybox.bind('[data-fancybox]');