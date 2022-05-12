import React from "react";
import "../assets/styles/birthday.css";
import "animate.css";
import { useAuth } from "../context/authContext";

const BirthDay = () => {
  const { userLog } = useAuth();

  const newDate = new Date();
  const day = `${newDate.getDate()}`;
  const month = `${newDate.getMonth() + 1}`;

  if (day < 10) {
    var newDay = `0${day}`;
  } else {
    newDay = day;
  }

  if (month < 10) {
    var newMonth = `0${month}`;
  } else {
    newMonth = month;
  }

  const date = `${newMonth}-${newDay}`;

  const birthday = userLog.birthday.slice(5);

  return (
    <>
      {userLog.birthday && birthday === date ? (
        <div className="birthday animate__rotateOutUpRight">
          <h3>Feliz cumpleaños! Te desea Bracamonte.</h3>
        </div>
      ) : null}
    </>
  );
};

export default BirthDay;
