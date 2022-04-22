import { useState } from "react";
import { useAuth } from "../context/authContext";
import "../assets/styles/home.css";
import Info from "../components/home/Info";
import image from "../assets/statics/images/Imagen-Placa.jpg";

const Home = () => {
  const { userLog } = useAuth();
  const [style, setStyle] = useState("image");

  function click() {
    setStyle("image opacity");
  }
  window.addEventListener("click", click);

  console.log(userLog);

  return (
    <main className="home">
      <img src={image} alt="bracamonte" className={style} />
      <Info />
    </main>
  );
};

export default Home;
