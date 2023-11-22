import i18next from 'i18next';

i18next.init({
  fallbackLng: 'ru',
  resources: {
    ru: {
      translation: {
        amount_one: '| Выделяли {{count}} раз',
        amount_few: '| Выделяли {{count}} раза',
        amount_many: '| Выделяли {{count}} раз'
      }
    }
  }
});

export default i18next;
