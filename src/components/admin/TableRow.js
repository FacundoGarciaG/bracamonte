import React, { useState } from "react";
import remove from "../../assets/statics/icons/delete-24.png";

const TableRow = ({ data, onDelete, updateActive }) => {
  const { name, description, vegan, price, active, img, id } = data;
  const [dataActive, setDataActive] = useState(active);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setDataActive(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateActive(dataActive, id);
  };

  return (
    <tr>
      <td>{name}</td>

      <td>{description}</td>

      <td>{vegan ? "SI" : "NO"}</td>

      <td>${price}.00</td>

      <td>
        <img className="imageHamburguer" src={img} alt={name} />
      </td>

      <td>
        <form onSubmit={handleSubmit}>
          <select
            name="active"
            value={dataActive}
            onChange={handleInputChange}
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
