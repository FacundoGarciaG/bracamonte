import React from "react";
import remove from "../../assets/statics/icons/delete-24.png";

const TableRow = ({ data, onDelete }) => {
  const { name, description, vegan, price, active, img } = data;

  return (
    <tr>
      <td>{name}</td>

      <td>{description}</td>

      <td>{vegan ? "SI" : "NO"}</td>

      <td>${price}.00</td>

      <td>
        <img className="imageHamburguer" src={img} alt={name} />
      </td>

      <td>{active ? "SI" : "NO"}</td>

      <td>
        <button className="deleteButton" onClick={() => onDelete(data.id)}>
          <img src={remove} alt="borrar" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
