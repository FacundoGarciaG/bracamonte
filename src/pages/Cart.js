import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, delFromCart } from "../actions/shoppingActions";
import CartItem from "../components/cart/CartItem";
import "../assets/styles/cart.css";
import clear from "../assets/statics/icons/delete-24.png";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { cart } = state.shopping;

  const totalProduct = cart.map((i) => i.quantity * i.price);

  let total = 0;

  for (let i = 0; i < totalProduct.length; i++) {
    total += totalProduct[i];
  }

  return (
    <main className="mainCart">
      {cart[0] ? (
        <div className="cartContainer">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              data={item}
              addToCart={() => dispatch(addToCart(item.id))}
              delOneFromCart={() => dispatch(delFromCart(item.id))}
              delAllFromCart={() => dispatch(delFromCart(item.id, true))}
            />
          ))}
          <h5 className="total">
            TOTAL: <span className="price"> ${total}.00</span>
          </h5>

          <div className="buttonsCart">
            <button className="clearCart" onClick={() => dispatch(clearCart())}>
              <img src={clear} alt="Borrar carrito" />
            </button>
            <Link to="/pay">
              <button className="payCart">
                <p> Efectivo</p>
              </button>
            </Link>
            <Link to="#">
              <button className="payCart">
                <p>Mercado Pago</p>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cartItemContainer">
          <h3 className="emptyCart">Carrito vacío</h3>
        </div>
      )}
    </main>
  );
};

export default Cart;
