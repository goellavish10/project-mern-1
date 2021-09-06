import React, { Fragment } from "react";
import meals from "../../Assets/meals.jpg";
import CartButton from "./CartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className="header">
        <h1>Meals</h1>
        <CartButton onShowCart={props.onShowCart} />
      </header>
      <div className="image">
        <img src={meals} alt="MealsImage" />
      </div>
    </Fragment>
  );
};

export default Header;
