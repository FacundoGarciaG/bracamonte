import React, { useEffect, useState, useRef } from "react";
import "../assets/styles/contact.css";
import send from "../assets/statics/icons/send-file-24.png";
import getAllProducts from "../functions/shopping/getAllProducts";
import emailjs from "@emailjs/browser";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const Contact = () => {
  const { userLog } = useAuth();
  const form = useRef();
  const [hamburguers, setHamburguers] = useState([]);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!e.target.from_name.value) {
      toast("Primero dejanos tu nombre", {
        type: "warning",
      });
    } else if (!e.target.message.value) {
      toast("No te olvides tu mensaje!", {
        type: "warning",
      });
    } else {
      emailjs
        .sendForm(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          e.target,
          process.env.REACT_APP_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            toast("Tuvimos un problema al enviar el mensaje", {
              type: "error",
            });
            console.log(error.text);
          }
        );
      e.target.reset();
      toast("Mensaje enviado!", { type: "success" });
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllProducts();
      setHamburguers(products);
    };
    getProducts();
  }, []);

  return (
    <div className="contact">
      <h1>Contacto</h1>
      <form ref={form} onSubmit={sendEmail} className="contactForm">
        <label>
          Nombre:
          <input
            type="text"
            name="from_name"
            defaultValue={userLog.displayName ? userLog.displayName : ""}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="from_email"
            defaultValue={userLog.email ? userLog.email : ""}
            readOnly={userLog.email ? true : false}
          />
        </label>
        <label>
          Tenes una hamburguesa favorita? cual?
          <select name="favorite">
            <option value="ninguna">Elige una opción!</option>
            {hamburguers.map((i, index) => (
              <option key={index}>{i.name}</option>
            ))}
          </select>
        </label>
        <label className="coments">
          Algun comentario o sugerencia?
          <textarea name="message" cols="30" rows="10"></textarea>
        </label>
        <button className="sendButton">
          <img src={send} alt="enviar" />
        </button>
      </form>
    </div>
  );
};

export default Contact;
