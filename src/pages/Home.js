import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../assets/styles/home.css";
import image from "../assets/statics/images/Imagen-Placa.jpg";
import slide1 from "../assets/statics/images/Slide Boceto.jpg";
import slide2 from "../assets/statics/images/Slide Sin Comprar.jpg";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [style, setStyle] = useState("image");
  const [styleHome, setStyleHome] = useState("homeInitial");

  function click() {
    setStyle("image none");
    setStyleHome("home");
  }
  window.addEventListener("click", click);

  const handleClickItem = () => {
    navigate("/menu");
    console.log("click");
  };

  return (
    <div className={styleHome}>
      <img src={image} alt="bracamonte" className={style} />
      <Carousel
        className="carouselMain"
        autoPlay
        showArrows={false}
        emulateTouch
        infiniteLoop
        showStatus={false}
        showThumbs={false}
      >
        <div>
          <img src={slide1} alt="bracamonte" />
          <p className="slideButton" onClick={handleClickItem}>
            COMPRAR
          </p>
        </div>
        <div>
          <img src={slide2} alt="bracamonte" />
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
