import { useState } from "react";
import "../assets/styles/home.css";
import Info from "../components/home/Info";
import image from "../assets/statics/images/Imagen-Placa.jpg";

const Home = () => {
  const [style, setStyle] = useState("image");
  const [styleHome, setStyleHome] = useState("homeInitial");

  function click() {
    setStyle("image none");
    setStyleHome("");
  }
  window.addEventListener("click", click);

  return (
    <main className={styleHome}>
      <img src={image} alt="bracamonte" className={style} />
      <Info />
    </main>
  );
};

export default Home;
