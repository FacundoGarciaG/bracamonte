import CartItem from "../components/cart/CartItem";
import "../assets/styles/cart.css";
import clear from "../assets/statics/icons/delete-24.png";
import checkout from "../assets/statics/icons/checkout-24.png";
import { Link } from "react-router-dom";
import { useShopping } from "../context/shoppingContext";

const Cart = () => {
  const { dispatch, shoppingCart, totalPrice } = useShopping();

  return (
    <main className="mainCart">
      {shoppingCart[0] ? (
        <div className="cartContainer">
          {shoppingCart.map((item, index) => (
            <CartItem key={index} data={item} dispatch={dispatch} />
          ))}
          <h5 className="total">
            TOTAL: <span className="price"> ${totalPrice}.00</span>
          </h5>

          <div className="buttonsCart">
            <button
              className="clearCart"
              onClick={() => dispatch({ type: "EMPTY" })}
            >
              <img src={clear} alt="Borrar carrito" />
            </button>
            <Link to="/pay">
              <button className="payCart">
                <img src={checkout} alt="pagar" />
              </button>
            </Link>
            {/* <Link to="/paymp">
              <button className="payCart">
                <p>Mercado Pago</p>
              </button>
            </Link> */}
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
