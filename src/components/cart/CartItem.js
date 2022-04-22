import clear from "../../assets/statics/icons/delete-24.png";
import clearOne from "../../assets/statics/icons/minus-24.png";
import addOne from "../../assets/statics/icons/plus-2-24.png";

const CartItem = ({ data, delOneFromCart, delAllFromCart, addToCart }) => {
  let { id, name, price, quantity, vegan } = data;

  return (
    <>
      <div className="cartItem">
        <div className="productCartTitle">
          <h4>{name}</h4> {vegan ? <b className="vegan">Vegana</b> : null}
        </div>
        <h5 className="productPrice">
          ${price}.00 X {quantity} ={" "}
          <span className="price"> ${price * quantity}.00</span>
        </h5>
        <div className="buttons">
          <button className="addOne" onClick={() => addToCart(id)}>
            <img src={addOne} alt="agregar" />
          </button>
          <button className="clearOne" onClick={() => delOneFromCart(id)}>
            <img src={clearOne} alt="borrar uno" />
          </button>
          <button className="clearAll" onClick={() => delAllFromCart(id, true)}>
            <img src={clear} alt="borrar todos" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
