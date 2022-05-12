import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import logout from "../../assets/statics/icons/logout-24.png";
import user from "../../assets/statics/icons/guest-48.png";
import administrator from "../../assets/statics/icons/administrator-24.png";
import edit from "../../assets/statics/icons/edit-2-24.png";
import { Link } from "react-router-dom";
import ProfileDataForm from "./ProfileDataForm";

const User = () => {
  const { logOut, userLog } = useAuth();
  const [readOnly, setReadOnly] = useState(true);

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className="profileContainer">
      <div className="profile">
        <h3>Hola {userLog.displayName || userLog.email}!</h3>

        {userLog.photoURL ? (
          <img
            className="profileImg"
            src={userLog.photoURL}
            alt="imagen"
            referrerPolicy="no-referrer"
          />
        ) : (
          <img src={user} alt="home" className="profileIcon" />
        )}
        <div className="buttonsProfile">
          {userLog.rol === "admin" ? (
            <button className="adminButton">
              <Link to="/admin">
                <img
                  src={administrator}
                  alt="administrador"
                  className="adminButtonImage"
                />
              </Link>
            </button>
          ) : null}

          <button
            onClick={() => setReadOnly(!readOnly)}
            className={readOnly ? "editButtonActive" : "editButton"}
          >
            <img src={edit} alt="editar" className="editImage" />
          </button>

          <button onClick={handleLogOut} className="logOutButton">
            <img className="logoutImage" src={logout} alt="salir" />
          </button>
        </div>
      </div>
      <ProfileDataForm readOnly={readOnly} setReadOnly={setReadOnly} />
    </div>
  );
};

export default User;
