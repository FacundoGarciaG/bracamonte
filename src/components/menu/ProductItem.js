import { useRef, useState } from "react";
import add from "../../assets/statics/icons/cart-43-24.png";
import loadingSpin from "../../assets/statics/gif/loading.gif";
import { useShopping } from "../../context/shoppingContext";

const ProductItem = ({ data }) => {
  const { dispatch } = useShopping();
  const [loading, setLoading] = useState(true);
  let { id, name, description, vegan, price, img } = data;
  const counter = useRef(0);

  const urls = [img + Math.random()];

  const imageLoaded = () => {
    counter.current += 1;

    if (counter.current >= urls.length) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="productTitle">
        <h4>{name}</h4>{" "}
        {vegan === "true" ? <b className="vegan">Vegana</b> : null}
      </div>
      <div className="description">
        <p>{description}</p>
        <p className="detail">Hamburguesa + Papas horneadas (Envio gratis)</p>
      </div>

      <div
        style={{ display: loading ? "flex" : "none" }}
        className="hamburguerContainer"
      >
        <img src={loadingSpin} alt="Loading..." />
      </div>

      <div style={{ display: loading ? "none" : "flex" }}>
        <img
          className="hamburguer"
          src={img}
          alt="Hamburguesa"
          onLoad={imageLoaded}
        />
      </div>
      <h5 className="price">${price}.00</h5>
      <button
        className="add"
        onClick={() => dispatch({ type: "ADD_TO_CART", id: id, data })}
      >
        <img src={add} alt="agregar" />
      </button>
    </div>
  );
};

export default ProductItem;
