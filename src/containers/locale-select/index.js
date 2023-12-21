import { memo } from "react";
import Select from "../../components/select";
import useTranslate from "../../hooks/use-translate";

function LocaleSelect() {
  const { lang, setLang, availableLanguages } = useTranslate();

  const onSelectChange = (selectedLang) => {
    setLang(selectedLang);
  };

  return (
    <Select
      onChange={onSelectChange}
      value={lang}
      options={availableLanguages}
    />
  );
}

export default memo(LocaleSelect);
