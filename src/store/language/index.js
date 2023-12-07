import { en } from "../../constants/lang/en";
import { ru } from "../../constants/lang/ru";
import StoreModule from "../module";

class Language extends StoreModule {
  initState() {
    return { lang: "ru", texts: ru };
  }

  changeLanguage() {
    console.log(this.store);
    const targetLanguage =
      this.store.state.language.lang === "ru" ? "en" : "ru";
    const texts = targetLanguage === "ru" ? ru : en;
    this.setState({
      lang: targetLanguage,
      texts,
    });
  }
}
export default Language;
