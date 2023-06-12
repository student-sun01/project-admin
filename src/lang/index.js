import Vue from "vue";
import VueI18n from "vue-i18n";
import Element from "element-ui";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import myZh from './zh'
import myEn from './en'

Vue.use(VueI18n);

//2. 准备语言环境
const messages = {
  //中文
  zh: {
    ...myZh,
    ...zhLocale, // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  //英文
  en: {
    ...myEn,
    ...enLocale, // 或者用 Object.assign({ message: '你好' }, zhLocale)
  },
};

// 准备翻译的语言环境信息
const i18n = new VueI18n({
  locale: "zh", // 初始化中文
  messages,
});
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
});

export default i18n;
