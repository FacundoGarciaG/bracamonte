import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";
import logo from "../assets/statics/logo/simboloEnAlfa.png";
import user from "../assets/statics/icons/guest-24.png";
import contact from "../assets/statics/icons/email-24.png";
import hamburguer from "../assets/statics/icons/hamburger-24.png";
import cartIcon from "../assets/statics/icons/cart-59-24.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { userLog } = useAuth();

  const state = useSelector((state) => state);
  const [styleHeader, setStyleHeader] = useState("header");

  const { cart } = state.shopping;

  const sumProducts = () => {
    return cart.map((i) => i.quantity);
  };

  const arrayProducts = sumProducts();

  let sum = 0;
  for (let i = 0; i < arrayProducts.length; i++) {
    sum += arrayProducts[i];
  }

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 35 ||
      document.documentElement.scrollTop > 35
    ) {
      setStyleHeader("scrollHeader");
    } else {
      setStyleHeader("header");
    }
  };

  return (
    <>
      <header id="header" className={styleHeader}>
        <nav>
          <ul className="headerList">
            <li>
              <Link to="/user">
                {userLog ? (
                  <Suspense>
                    {userLog.photoURL ? (
                      <img
                        className="userImgHeader"
                        src={userLog.photoURL}
                        alt="imagen"
                      />
                    ) : (
                      <img src={user} alt="home" className="icon" />
                    )}
                  </Suspense>
                ) : (
                  <img src={user} alt="home" className="icon" />
                )}
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <img src={contact} alt="contact" className="icon" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src={logo} alt="logo" className="logoMain" />
              </Link>
            </li>
            <li>
              <Link to="/menu">
                <img src={hamburguer} alt="menu" className="icon" />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <img src={cartIcon} alt="carrito" className="icon cart" />
                {sum ? (
                  <span
                    id="cart_menu_num"
                    data-action="cart-can"
                    className="badge rounded-circle"
                  >
                    {sum}
                  </span>
                ) : null}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
