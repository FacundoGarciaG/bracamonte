import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
import BirthDay from "./BirthDay";
import { useAuth } from "../context/authContext";

const Layout = (props) => {
  const { userLog } = useAuth();
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      {userLog.birthday ? <BirthDay /> : null}
      <WhatsApp />
      <Footer />
    </>
  );
};

export default Layout;
