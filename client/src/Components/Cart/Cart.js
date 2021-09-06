import { useContext, useEffect } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import axios from "axios";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const updatedTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length <= 0;
  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <li key={item.id}>
          <div>{item.name}</div>
          <div>
            <small>${item.price}</small>
            <span>x {item.amount}</span>
          </div>
          <div className="actions">
            <button
              className="button__alt"
              onClick={removeItemHandler.bind(null, item.id)}
            >
              -
            </button>
            <button
              className="button__order"
              onClick={addItemHandler.bind(null, item)}
            >
              +
            </button>
          </div>
          <div className="line"></div>
        </li>
      ))}
    </ul>
  );

  const createNewSession = async () => {
    const response = await axios.get("http://localhost:5000/");
    const data = response.data;

    console.log(data);
  };

  useEffect(() => {
    createNewSession();
  }, []);

  const orderConfirmHandler = async () => {
    const order = await axios.post("http://localhost:5000/order", {
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount.toFixed(2),
    });

    console.log(order.data);
  };

  return (
    <Modal onClose={props.onClose}>
      <div>
        {cartItems}
        <div className="total">
          <span>Total Amount</span>
          <span>{updatedTotalAmount}</span>
        </div>
        <div className="actions">
          <button className="button__alt" onClick={props.onClose}>
            Close
          </button>
          {!hasItems && (
            <button className="button__order" onClick={orderConfirmHandler}>
              Order
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
