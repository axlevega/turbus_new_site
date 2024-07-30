import Cookie from "js-cookie";

const assist = {
  zoom: function (px) {
    Cookie.set("assist-size", px, { expires: 7, path: "" });
    document.querySelector("html").style.fontSize = `${px}px`;
    document.body.querySelector("main").style.marginTop = `${$("header.header").outerHeight()}px`;
  },
  changeFont: function () {
    if (Cookie.get("assist-font") == "common") {
      Cookie.set("assist-font", "not-common", { expires: 7, path: "" });
    } else {
      Cookie.set("assist-font", "common", { expires: 7, path: "" });
    }
    this.applyFont();
    document.body.querySelector("main").style.marginTop = `${$("header.header").outerHeight()}px`;
  },
  applyFont: function () {
    if (Cookie.get("assist-font") == "common") {
      document.body.style.fontFamily = "sans-serif";
    } else {
      document.body.style.fontFamily = "serif";
    }
    document.body.querySelector("main").style.marginTop = `${$("header.header").outerHeight()}px`;
  },
  changeColor: function(color) {
    Cookie.set("assist-color", color, { expires: 7, path: "" });
    document.body.classList.remove("achromatic");
    document.body.classList.remove("invert");
    document.body.classList.remove("chromatic");
    document.body.classList.add(color);
  },
  changeInterval: function (newInterval) {
    Cookie.set("assist-interval", newInterval, { expires: 7, path: "" });
    document.body.style.letterSpacing = newInterval; // normal, 1px, 2px
    document.body.querySelector("main").style.marginTop = `${$("header.header").outerHeight()}px`;
  },
  changeImg: function (status) {
    Cookie.set("assist-img", status, { expires: 7, path: "" });
    document.body.classList.remove("img-on");
    document.body.classList.remove("img-off");
    document.body.classList.toggle(`img-${status}`);
  },
  includePanel: function () {
    const container = document.createElement(`div`);
    container.classList.add("assist");
    container.innerHTML = `
    <div class = "content-wrapper assist_container">
      <div class = "assist_block assist_size">
      <p class = "assist_block_title">Размер шрифта</p>
      <button class = "assist_size_el assist_size_el-100" data-assist-size = "10" style = "font-size: 100%;">А</button>
      <button class = "assist_size_el assist_size_el-125" data-assist-size = "12.5" style = "font-size: 125%;">А</button>
      <button class = "assist_size_el assist_size_el-150" data-assist-size = "15" style = "font-size: 150%;">А</button>
      </div>
      <div class = "assist_block assist_size">
      <p class = "assist_block_title">Цвет сайта</p>
      <button class = "assist_size_el assist_color-achromatic" data-assist-color = "achromatic" title="Ахроматический">А</button>
      <button class = "assist_size_el assist_color-invert" data-assist-color = "invert" title="Инвертированный">А</button>
      <button class = "assist_size_el assist_color-chromatic" data-assist-color = "chromatic" title="Хроматический">А</button>
      </div>
      <div class = "assist_block assist_size">
      <p class = "assist_block_title">Изображения</p>
      <button class = "assist_size_el" data-assist-img = "off">Выкл</button>
      <button class = "assist_size_el" data-assist-img = "on">Вкл</button>
      </div>
      <div class = "assist_block assist_size">
      <p class = "assist_block_title">Шрифт</p>
      <button class = "assist_size_el" data-assist-font = "with">Без засечек</button>
      <button class = "assist_size_el" data-assist-font = "without">С засечками</button>
      </div>
      <div class = "assist_block assist_size">
      <p class = "assist_block_title">Итервал между буквами</p>
      <button class = "assist_size_el assist_interval-normal" data-assist-interval = "normal">Нормальный</button>
      <button class = "assist_size_el assist_interval-medium" data-assist-interval = "1px">Увеличенный</button>
      <button class = "assist_size_el assist_interval-big" data-assist-interval = "2px">Большой</button>
      </div>
    </div>
    `;
    document.body.querySelector("main").prepend(container);
    container.querySelectorAll("[data-assist-size]").forEach((item) => {
      item.addEventListener("click", () => {
        this.zoom($(item).data("assistSize"));
      });
    });
    container.querySelectorAll("[data-assist-color]").forEach((item) => {
      item.addEventListener("click", () => {
        this.changeColor($(item).data("assistColor"));
      });
    });
    container.querySelectorAll("[data-assist-img]").forEach((item) => {
      item.addEventListener("click", () => {
        this.changeImg($(item).data("assistImg"));
      });
    });
    container.querySelectorAll("[data-assist-interval]").forEach((item) => {
      item.addEventListener("click", () => {
        this.changeInterval($(item).data("assistInterval"));
      });
    });
    container.querySelectorAll("[data-assist-font]").forEach((item) => {
      item.addEventListener("click", () => {
        if($(item).data("assistFont") == "with") {
          Cookie.set("assist-font", "not-common", { expires: 7, path: "" });
          this.changeFont();
        } else {
          Cookie.set("assist-font", "common", { expires: 7, path: "" });
          this.changeFont();
        }
      });
    });

    document.body.querySelector("main").style.marginTop = `${$("header.header").outerHeight()}px`;
    // document.body.style.paddingBottom = `${$(container).outerHeight()}px`;
  },
  enableAssist: function () {
    this.enable = "1";
    Cookie.set("assist-enable", "1", { expires: 7, path: "" });
    this.zoom(Cookie.get("assist-size"));
    this.applyFont();
    this.changeInterval(Cookie.get("assist-interval"));
    this.changeImg(Cookie.get("assist-img"));
    this.changeColor(Cookie.get("assist-color"));
    this.includePanel();
  },
  disableAssist: function () {
    this.enable = "0";
    Cookie.set("assist-enable", "0", { expires: 7, path: "" });
    location.reload();
  },

  init: function () {
    if (!Cookie.get("assist-enable")) {
      Cookie.set("assist-enable", "0", { expires: 7, path: "" });
    }
    if (!Cookie.get("assist-size")) {
      Cookie.set("assist-size", 10, { expires: 7, path: "" });
    }
    if (!Cookie.get("assist-color")) {
      Cookie.set("assist-color", "achromatic", { expires: 7, path: "" });
    }
    if (!Cookie.get("assist-img")) {
      Cookie.set("assist-img", "on", { expires: 7, path: "" });
    }
    if (!Cookie.get("assist-font")) {
      Cookie.set("assist-font", "common", { expires: 7, path: "" });
    }
    if (!Cookie.get("assist-interval")) {
      Cookie.set("assist-interval", "1", { expires: 7, path: "" });
    }

    this.enable = Cookie.get("assist-enable");
    this.size = Cookie.get("assist-size");
    this.color = Cookie.get("assist-color");
    this.img = Cookie.get("assist-img");
    this.font = Cookie.get("assist-font");
    this.interval = Cookie.get("assist-interval");

    if (this.enable == "1") {
      this.enableAssist();
    }
  },
};

export default assist;
