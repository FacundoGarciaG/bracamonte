import React, { useState } from "react";
import { toast } from "react-toastify";
import save from "../../assets/statics/icons/check-mark-3-24.png";

const Form = ({ add, addImg }) => {
  const [imgName, setImgName] = useState("");
  const initialStateData = {
    name: "",
    description: "",
    vegan: false,
    price: 0,
    active: false,
  };
  const [data, setData] = useState(initialStateData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const fileHandleInputChange = async (e) => {
    e.preventDefault();
    addImg(e);
    const img = e.target.files[0];
    const imageName = img.name;
    setImgName(imageName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.name === "") {
      toast("Es necesario darle un nombre a la hamburguesa", {
        type: "warning",
        autoClose: 2000,
      });
    } else if (data.description === "") {
      toast("Es necesario darle una descripcion a la hamburguesa", {
        type: "warning",
        autoClose: 2000,
      });
    } else if (data.price === 0) {
      toast("Es necesario ponerle un precio a la hamburguesa", {
        type: "warning",
        autoClose: 2000,
      });
    } else if (imgName === "") {
      toast("Es necesario cargarle una imagen a su hamburguesa", {
        type: "warning",
        autoClose: 2000,
      });
    } else if (data.active === false) {
      toast("Su hamburguesa se añadió pero no será publicada", {
        type: "warning",
        autoClose: 2000,
      });

      add(data);
    } else {
      add(data);
    }

    setData({ ...initialStateData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formContainer">
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={handleInputChange}
          value={data.name}
        />
        <textarea
          rows="10"
          placeholder="Descripción"
          name="description"
          onChange={handleInputChange}
          value={data.description}
        />
        <label>
          Vegana
          <select name="vegan" onChange={handleInputChange} value={data.vegan}>
            <option value={false}>No</option>
            <option value={true}>Si</option>
          </select>
        </label>
        <label>
          Precio: $
          <input
            type="number"
            name="price"
            onChange={handleInputChange}
            value={data.price}
          />
        </label>

        <label className="img">
          Imagen
          <input
            type="file"
            name="img"
            onChange={fileHandleInputChange}
            value={data.img}
          />
        </label>
        <label className="active">
          Activo
          <select
            name="active"
            onChange={handleInputChange}
            value={data.active}
          >
            <option value={false}>No</option>
            <option value={true}>Si</option>
          </select>
        </label>
        <button className="save">
          <img src={save} alt="guardar" />
        </button>
      </div>
    </form>
  );
};

export default Form;
