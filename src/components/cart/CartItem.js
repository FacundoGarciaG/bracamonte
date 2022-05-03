import clear from "../../assets/statics/icons/delete-24.png";
import clearOne from "../../assets/statics/icons/minus-24.png";
import addOne from "../../assets/statics/icons/plus-2-24.png";

const CartItem = ({ data, dispatch }) => {
  let { id, img, name, price, qty, vegan, totalProductPrice } = data;

  return (
    <>
      <div className="cartItem">
        <div className="productCartTitle">
          <h4>{name}</h4>{" "}
          {vegan === "true" ? <b className="vegan">Vegana</b> : null}
        </div>
        <h5 className="productPrice">
          ${price}.00 X {qty} =
          <span className="price"> ${totalProductPrice}.00</span>
        </h5>

        <img src={img} alt={name} className="imageCart" />

        <div className="buttons">
          <button
            className="addOne"
            onClick={() => dispatch({ type: "INC", id: id, data })}
          >
            <img src={addOne} alt="agregar" />
          </button>
          <button
            className="clearOne"
            onClick={() => dispatch({ type: "DEC", id: id, data })}
          >
            <img src={clearOne} alt="borrar uno" />
          </button>
          <button
            className="clearAll"
            onClick={() => dispatch({ type: "DELETE", id: id, data })}
          >
            <img src={clear} alt="borrar todos" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
