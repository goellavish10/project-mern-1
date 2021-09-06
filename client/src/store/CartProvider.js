import { useReducer, useEffect } from "react";
import CartContext from "./cart-context";
import axios from "axios";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const ACTIONS = {
  addItem: "ADD_ITEM",
  removeItem: "REMOVE_ITEM",
};

const cartReducer = (state, actions) => {
  if (actions.type === ACTIONS.addItem) {
    const updatedTotalAmount =
      state.totalAmount + actions.item.price * actions.item.amount;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === actions.item.id
    );
    const existingCartItem = state.items[existingItemIndex];
    let updatedItemsArr;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + actions.item.amount,
      };

      updatedItemsArr = [...state.items];
      updatedItemsArr[existingItemIndex] = updatedItem;
    } else {
      updatedItemsArr = state.items.concat(actions.item);
    }

    return {
      items: updatedItemsArr,
      totalAmount: updatedTotalAmount,
    };
  }
  if (actions.type === ACTIONS.removeItem) {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === actions.id
    );
    const existingCartItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== actions.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemHandler = (item) => {
    dispatchCartAction({
      type: ACTIONS.addItem,
      item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: ACTIONS.removeItem, id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
