import React from "react";

const BurguerToBuy = ({ data }) => {
  return (
    <div className="burguerToBuy">
      <h4>{` ${data.qty} ${data.name} ${
        data.vegan === "true" ? "vegana" : ""
      } = $${data.price * data.qty}`}</h4>
      <img src={data.img} alt={data.name} className="imgBurguerToPay" />
    </div>
  );
};

export default BurguerToBuy;
