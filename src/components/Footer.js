import React from "react";
import "../assets/styles/footer.css";
import logoFooter from "../assets/statics/logo/logotipo-en-alfa.png";
import instagram from "../assets/statics/icons/instagram-24.png";

const insta = `<a
href="https://www.instagram.com/bracamonteok/?hl=es-la"
target="_blank"
>
<img className="instagramIcon" src=${instagram} alt="instagram" />
</a>`;

const Footer = () => {
  return (
    <footer>
      <img src={logoFooter} alt="logo" className="logoFooter" />
      <div
        dangerouslySetInnerHTML={{
          __html: insta.replace(/href/g, "target='_blank' href"),
        }}
      ></div>
    </footer>
  );
};

export default Footer;
