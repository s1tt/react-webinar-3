import * as translations from "./translations";

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.defaultLang = "ru"; // язык по умолчанию
    this.listeners = [];

    this.t = this.t.bind(this);
  }

  /**
   * Получение текущего языка
   * @returns {string}
   */
  get lang() {
    return this.defaultLang;
  }

  /**
   * Установка текущего языка
   * @param lang {string} Код языка
   */
  set lang(lang) {
    console.log(lang);
    this.defaultLang = lang;
    console.log(this.defaultLang);
    this.services.api.setHeader("Accept-Language", lang);
    for (const listener of this.listeners) listener(this.lang);
  }

  /**
   * Перевод текста
   * @param text {string} Текст для перевода
   * @param plural {number} Число для плюрализации
   * @returns {string} Переведенный текст
   */
  t(text, plural) {
    console.log(this);
    const lang = this.defaultLang;
    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }
}

export default I18nService;
