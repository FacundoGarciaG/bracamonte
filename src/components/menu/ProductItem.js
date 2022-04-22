import add from "../../assets/statics/icons/cart-43-24.png";

const ProductItem = ({ data, addToCart }) => {
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
      <button className="add" onClick={() => addToCart(id)}>
        <img src={add} alt="agregar" />
      </button>
    </div>
  );
};

export default ProductItem;
