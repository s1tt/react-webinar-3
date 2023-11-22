import i18next from 'i18next';

i18next.init({
  fallbackLng: 'ru',
  resources: {
    ru: {
      translation: {
        amount_one: '{{count}} раз',
        amount_few: '{{count}} раза',
        amount_many: '{{count}} раз'
      }
    }
  }
});

export default i18next;
