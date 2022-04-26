import React from "react";

import TableRow from "./TableRow";

const Table = ({ hamburguers, onDelete, updateActive }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>DESCRIPCION</th>
          <th>VEGANA</th>
          <th>PRECIO</th>
          <th>IMAGEN</th>
          <th>ACTIVO</th>
          <th>ELIMINAR</th>
        </tr>
      </thead>
      <tbody>
        {hamburguers.map((data, index) => (
          <TableRow
            key={index}
            data={data}
            onDelete={onDelete}
            updateActive={updateActive}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
