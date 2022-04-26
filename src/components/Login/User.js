import React, { Suspense } from "react";
import { useAuth } from "../../context/authContext";
import logout from "../../assets/statics/icons/logout-24.png";
import user from "../../assets/statics/icons/guest-48.png";
import administrator from "../../assets/statics/icons/administrator-24.png";
import { Link } from "react-router-dom";

const User = () => {
  const { logOut, userLog } = useAuth();
  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className="profileContainer">
      <div className="profile">
        <h3>Hola {userLog.displayName || userLog.email}!</h3>

        {userLog.photoURL ? (
          <Suspense>
            <img className="profileImg" src={userLog.photoURL} alt="imagen" />
          </Suspense>
        ) : (
          <img src={user} alt="home" className="profileIcon" />
        )}
        <div className="buttonsProfile">
          {userLog.rol === "admin" ? (
            <button className="adminButton">
              <Link to="/admin">
                <img src={administrator} alt="administrador" />
              </Link>
            </button>
          ) : null}

          <button onClick={handleLogOut} className="logOutButton">
            <img className="logoutImage" src={logout} alt="salir" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
