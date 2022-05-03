import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import getActiveProducts from "../functions/shopping/getActiveProducts";
import CartReducer from "../reducers/CartReducer";

const shoppingContext = createContext();

export const useShopping = () => {
  const context = useContext(shoppingContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    shoppingCart: [],
    totalPrice: 0,
    totalQty: 0,
  });

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

  return (
    <shoppingContext.Provider
      value={{ ...state, dispatch, hamburguers, loading, setLoading }}
    >
      {children}
    </shoppingContext.Provider>
  );
};
