import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";
import { numberFormat } from "../../utils";
import "./style.css";

function BasketTool({ sum, amount, onOpen, clearProductData }) {
  const cn = bem("BasketTool");

  const select = useSelector((state) => ({
    mainLink: state.language.texts.mainLink,
    inBasket: state.language.texts.inBasket,
    good: state.language.texts.good,
    openModal: state.language.texts.openModal,
    empty: state.language.texts.empty,
  }));

  return (
    <div className={cn()}>
      <Link className={cn("link")} to={"/"} onClick={() => clearProductData()}>
        {select.mainLink}
      </Link>
      <div>
        <span className={cn("label")}>{select.inBasket}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount}  ${select.good(amount)} / ${numberFormat(sum)} ₽`
            : `${select.empty}`}
        </span>
        <button onClick={onOpen}>{select.openModal}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
