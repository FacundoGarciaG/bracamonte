import React from "react";
import { Navigate } from "react-router-dom";
import { useShopping } from "../../context/shoppingContext";

const ProtectedRouteBuyForm = ({ children }) => {
  const { shoppingCart } = useShopping();
  if (shoppingCart == false) return <Navigate to="/menu" />;
  return <>{children}</>;
};

export default ProtectedRouteBuyForm;
