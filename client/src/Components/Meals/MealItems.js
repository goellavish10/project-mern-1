import React, { useContext } from "react";
import MealForm from "./MealForm";
import CartContext from "../../store/cart-context";

const MealItems = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount,
    });
  };
  return (
    <li className="meal-list">
      <div>
        <div className="meal-detail">
          <div className="item">
            <h3>{props.name}</h3>
            <div className="description">{props.description}</div>
            <div className="price">{price}</div>
          </div>
          <div className="form">
            <MealForm onAddToCart={addToCartHandler} />
          </div>
        </div>
        <div className="line"></div>
      </div>
    </li>
  );
};

export default MealItems;
