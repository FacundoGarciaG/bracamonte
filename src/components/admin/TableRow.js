import React, { useRef, useState } from "react";
import remove from "../../assets/statics/icons/delete-24.png";
import loadingSpin from "../../assets/statics/gif/loading.gif";

const TableRow = ({ data, onDelete, updateActive, updatePrice }) => {
  const { name, description, vegan, price, active, img, id } = data;
  const [dataActive, setDataActive] = useState(active);
  const [dataPrice, setDataPrice] = useState(price);
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  const urls = [img + Math.random()];

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= urls.length) {
      setLoading(false);
    }
  };

  const handleInputChangeActive = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setDataActive(value);
  };

  const handleSubmitActive = async (e) => {
    e.preventDefault();
    updateActive(dataActive, id, name, active);
  };

  const handleInputChangePrice = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setDataPrice(value);
  };

  const handleSubmitPrice = async (e) => {
    e.preventDefault();
    updatePrice(dataPrice, id, name);
  };

  return (
    <tr>
      <td>{name}</td>

      <td>{description}</td>

      <td>{vegan === "true" ? "SI" : "NO"}</td>
      <td>
        <form onSubmit={handleSubmitPrice}>
          <input
            type="number"
            defaultValue={price}
            onChange={handleInputChangePrice}
            className="inputPrice"
          />

          <button className="activeButton">OK</button>
        </form>
      </td>
      <td>
        <div style={{ display: loading ? "block" : "none" }}>
          <img className="imageHamburguer" src={loadingSpin} alt="Loading..." />
        </div>
        <div style={{ display: loading ? "none" : "block" }}>
          <img
            className="imageHamburguer"
            src={img}
            alt={name}
            onLoad={imageLoaded}
          />
        </div>
      </td>
      <td>
        <form onSubmit={handleSubmitActive}>
          <select
            defaultValue={dataActive}
            name="active"
            onChange={handleInputChangeActive}
            className="activeSelect"
          >
            <option value="false">No</option>
            <option value="true">Si</option>
          </select>

          <button className="activeButton">OK</button>
        </form>
      </td>

      <td>
        <button className="deleteButton" onClick={() => onDelete(data.id, img)}>
          <img src={remove} alt="borrar" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
