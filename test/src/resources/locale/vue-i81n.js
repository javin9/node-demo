//Dependencies
import Vue from "vue"
import VueI18n from "vue-i18n"
//Assets
import {test} from "./test"
Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      ...test.en
    },
    fr: {
      ...test.fr
    }
  }
});