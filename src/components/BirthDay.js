import React from "react";
import "../assets/styles/birthday.css";
import "animate.css";
import { useAuth } from "../context/authContext";

const BirthDay = () => {
  const { userLog } = useAuth();

  const date = new Date();
  const day = `0${date.getDate()}`;
  const month = `0${date.getMonth() + 1}`;
  const today = `${month}-${day}`;

  const birthday = userLog.birthday.slice(5);

  return (
    <>
      {userLog.birthday && birthday === today ? (
        <div className="birthday animate__rotateOutUpRight">
          <h3>Feliz cumpleaños! Te desea Bracamonte.</h3>
        </div>
      ) : null}
    </>
  );
};

export default BirthDay;
