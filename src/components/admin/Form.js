import React, { useState } from "react";
import { toast } from "react-toastify";
import save from "../../assets/statics/icons/check-mark-3-24.png";

const Form = ({ add, addImg }) => {
  const [imgName, setImgName] = useState("");
  const initialStateData = {
    name: "",
    description: "",
    vegan: "false",
    price: undefined,
    active: "false",
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
    try {
      if (data.name === "") {
        toast("Es necesario darle un nombre a la hamburguesa", {
          type: "warning",
        });
      } else if (data.description === "") {
        toast("Es necesario darle una descripcion a la hamburguesa", {
          type: "warning",
        });
      } else if (data.price === undefined) {
        toast("Es necesario ponerle un precio a la hamburguesa", {
          type: "warning",
        });
      } else if (imgName === "") {
        toast("Es necesario cargarle una imagen a su hamburguesa", {
          type: "warning",
        });
      } else if (data.active === "false") {
        toast("Su hamburguesa se añadió pero no será publicada", {
          type: "warning",
        });

        add(data);
        setData({ ...initialStateData });
      } else {
        add(data);
        setData({ ...initialStateData });
      }
    } catch (error) {
      console.log(error);
      toast("Hubo un problema al intentar añadir una hamburguesa", {
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formContainer">
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={handleInputChange}
          // value={data.name}
          className="input"
        />
        <textarea
          rows="10"
          placeholder="Descripción"
          name="description"
          onChange={handleInputChange}
          //value={data.description}
          className="input"
        />
        <div className="options">
          <label>Vegana</label>
          <select
            name="vegan"
            onChange={handleInputChange}
            defaultValue="false"
          >
            <option value="false">No</option>
            <option value="true">Si</option>
          </select>
          <label>Precio: </label>
          <input
            type="number"
            name="price"
            onChange={handleInputChange}
            //value={data.price}
            className="input"
          />

          <label>Imagen</label>
          <input
            type="file"
            name="img"
            onChange={fileHandleInputChange}
            //value={data.img}
            className="inputImage"
          />
          <label className="active">Activo</label>
          <select
            name="active"
            onChange={handleInputChange}
            defaultValue="false"
            //value={data.active}
          >
            <option value="false">No</option>
            <option value="true">Si</option>
          </select>
        </div>
        <button className="save">
          <img src={save} alt="guardar" />
        </button>
      </div>
    </form>
  );
};

export default Form;
