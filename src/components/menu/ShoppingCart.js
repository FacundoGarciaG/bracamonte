import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/shoppingActions";
import ProductItem from "./ProductItem";
import "../../assets/styles/menu.css";
import getActiveProducts from "../../functions/shopping/getActiveProducts";
import { useEffect, useState } from "react";
import Loader from "../Loader";

const ShoppingCart = () => {
  const [hamburguers, setHamburguers] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const products = await getActiveProducts();
    setHamburguers(products);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  //const state = useSelector((state) => state);
  const dispatch = useDispatch();

  //const { products } = state.shopping;

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="shopping">
        <div className="products">
          {hamburguers
            ? hamburguers.map((product, index) => (
                <div className="product" key={index}>
                  <ProductItem
                    data={product}
                    addToCart={() => dispatch(addToCart(product.id))}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
};

export default ShoppingCart;
