import { useRef, useState } from "react";
import clear from "../../assets/statics/icons/delete-24.jpg";
import clearOne from "../../assets/statics/icons/minus-24.jpg";
import loadingSpin from "../../assets/statics/gif/loading.gif";
import addOne from "../../assets/statics/icons/plus-2-24.jpg";

const CartItem = ({ data, dispatch }) => {
  let { id, img, name, price, qty, vegan, totalProductPrice } = data;
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  const urls = [img + Math.random()];

  const imageLoaded = () => {
    counter.current += 1;

    if (counter.current >= urls.length) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="cartItem">
        <div className="productCartTitle">
          <h4>{name}</h4>
          {vegan === "true" ? <b className="vegan">Vegana</b> : null}
        </div>
        <h5 className="productPrice">
          ${price}.00 X {qty} =
          <span className="price"> ${totalProductPrice}.00</span>
        </h5>

        <div style={{ display: loading ? "flex" : "none" }}>
          <img src={loadingSpin} alt="Loading..." />
        </div>

        <div
          style={{ display: loading ? "none" : "flex" }}
          className="imageCartContainer"
        >
          <img
            className="imageCart"
            src={img}
            alt={name}
            onLoad={imageLoaded}
          />
        </div>

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
