import React, { useEffect, useState } from "react";
import Header from "./Components/Layout/Header";
import InfoBox from "./Components/Layout/InfoBox";
import Menu from "./Components/Meals/Menu";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";
// import axios from "axios";

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <InfoBox />
      <Menu />
    </CartProvider>
  );
};

export default App;
