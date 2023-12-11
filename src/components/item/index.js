import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";
import { numberFormat } from "../../utils";
import "./style.css";

function Item(props) {
  const cn = bem("Item");
  const select = useSelector((state) => ({
    addToBasket: state.language.texts.addToBasket,
  }));

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link className={cn("title")} to={`/products/${props.item._id}`}>
        <div>{props.item.title}</div>
      </Link>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{select.addToBasket}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
