import PropTypes from "prop-types";
import { memo } from "react";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import "./style.css";

function Head({ title }) {
  const store = useStore();
  const select = useSelector((state) => ({
    changeLanguage: state.language.texts.changeLanguage,
  }));

  const handleLanguageChange = () => {
    store.actions.language.changeLanguage();
  };
  return (
    <div className="Head">
      <h1>{title}</h1>
      <button onClick={handleLanguageChange}>{select.changeLanguage}</button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
