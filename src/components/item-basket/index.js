import { cn as bem } from "@bem-react/classname";
import { default as PropTypes, default as propTypes } from "prop-types";
import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { numberFormat } from "../../utils";
import "./style.css";

function ItemBasket(props) {
  const store = useStore();

  const cn = bem("ItemBasket");

  const select = useSelector((state) => ({
    removeFromBasket: state.language.texts.removeFromBasket,
    pieces: state.language.texts.pieces,
  }));

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModalBasket: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      {/* <div className={cn("code")}>{props.item._id}</div> */}
      <Link
        className={cn("title")}
        to={`/products/${props.item._id}`}
        onClick={() => callbacks.closeModalBasket()}
      >
        <div>{props.item.title}</div>
      </Link>

      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {select.pieces}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>
            {select.removeFromBasket}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
