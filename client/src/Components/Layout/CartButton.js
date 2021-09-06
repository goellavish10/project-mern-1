import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const CartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((presentValue, item) => {
    return presentValue + item.amount;
  }, 0);

  const btnClasses = `cart ${isHighlighted ? "bump" : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setIsHighlighted(true);

    const timer = setTimeout(() => {
      setIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span>
        <CartIcon className="icon" />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
