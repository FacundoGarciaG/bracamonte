import React, { useState } from "react";
import remove from "../../assets/statics/icons/delete-24.png";

const TableRow = ({ data, onDelete, updateActive, updatePrice }) => {
  const { name, description, vegan, price, active, img, id } = data;
  const [dataActive, setDataActive] = useState(active);
  const [dataPrice, setDataPrice] = useState(price);

  const handleInputChangeActive = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setDataActive(value);
  };

  const handleSubmitActive = async (e) => {
    e.preventDefault();
    updateActive(dataActive, id);
  };

  const handleInputChangePrice = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setDataPrice(value);
  };

  const handleSubmitPrice = async (e) => {
    e.preventDefault();
    updatePrice(dataPrice, id);
  };

  return (
    <tr>
      <td>{name}</td>

      <td>{description}</td>

      <td>{vegan ? "SI" : "NO"}</td>
      <td>
        <form onSubmit={handleSubmitPrice}>
          <input
            type="number"
            placeholder={`$${price}.00`}
            onChange={handleInputChangePrice}
          />

          <button className="activeButton">OK</button>
        </form>
      </td>
      <td>
        <img className="imageHamburguer" src={img} alt={name} />
      </td>
      <td>
        <form onSubmit={handleSubmitActive}>
          <select
            name="active"
            value={dataActive}
            onChange={handleInputChangeActive}
            className="activeSelect"
          >
            <option value={false}>No</option>
            <option value={true}>Si</option>
          </select>

          <button className="activeButton">OK</button>
        </form>
      </td>

      <td>
        <button className="deleteButton" onClick={() => onDelete(data.id)}>
          <img src={remove} alt="borrar" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
