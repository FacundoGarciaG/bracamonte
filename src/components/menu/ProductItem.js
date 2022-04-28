import add from "../../assets/statics/icons/cart-43-24.png";
import { useShopping } from "../../context/shoppingContext";

const ProductItem = ({ data }) => {
  const { dispatch } = useShopping();
  let { id, name, description, vegan, price, img } = data;

  return (
    <div>
      <div className="productTitle">
        <h4>{name}</h4> {vegan ? <b className="vegan">Vegana</b> : null}
      </div>
      <div className="description">
        <p>{description}</p>
        <p className="detail">Hamburguesa + Papas horneadas (Envio gratis)</p>
      </div>
      <img className="hamburguesa" src={img} alt="Hamburguesa" />
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
