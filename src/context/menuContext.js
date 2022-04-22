/* import { createContext, useContext, useEffect, useState } from "react";
import getActiveProducts from "../functions/shopping/getActiveProducts";

const menuContext = createContext();

export const useMenu = () => {
  const context = useContext(menuContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const MenuProvider = ({ children }) => {
  const [hamburguers, setHamburguers] = useState("");

  const getProducts = async () => {
    const products = await getActiveProducts();
    setHamburguers(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <menuContext.Provider value={{ hamburguers }}>
      {children}
    </menuContext.Provider>
  );
};
 */
