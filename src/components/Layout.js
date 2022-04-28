import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <WhatsApp />
      <Footer />
    </>
  );
};

export default Layout;
