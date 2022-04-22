import React, { Suspense } from "react";
import { useAuth } from "../../context/authContext";
import logout from "../../assets/statics/icons/logout-24.png";
import user from "../../assets/statics/icons/guest-48.png";

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

        <button onClick={handleLogOut} className="logOutButton">
          <img className="logoutImage" src={logout} alt="salir" />
        </button>
      </div>
    </div>
  );
};

export default User;
