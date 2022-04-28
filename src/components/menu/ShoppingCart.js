import ProductItem from "./ProductItem";
import "../../assets/styles/menu.css";
import Loader from "../Loader";
import { useShopping } from "../../context/shoppingContext";

const ShoppingCart = () => {
  const { hamburguers, loading } = useShopping();

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="shopping">
        <div className="products">
          {hamburguers
            ? hamburguers.map((product, index) => (
                <div className="product" key={index}>
                  <ProductItem data={product} />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
};

export default ShoppingCart;
