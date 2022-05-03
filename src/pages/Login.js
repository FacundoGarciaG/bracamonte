import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/login.css";

import login from "../assets/statics/icons/login-24.png";
import google from "../assets/statics/icons/google-48.png";
import User from "../components/Login/User";

const Login = () => {
  const { logIn, logInWithGoogle, resetPassword, userLog } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(user.email, user.password);
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    logInWithGoogle();
  };

  const handleResetPassword = () => {
    if (!user.email)
      return toast("Por favor inserte su email", {
        type: "warning",
      });
    resetPassword(user.email);
  };

  return (
    <main>
      {userLog ? (
        <User />
      ) : (
        <>
          <div className="login-register-container">
            <h1>Ingresar</h1>
            <div className="login-register">
              <form className="login-register-form" onSubmit={handleSubmit}>
                <div className="inputs">
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu email..."
                    onChange={handleChange}
                  />

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                </div>
                <button>
                  <img src={login} alt="entrar" />
                </button>
              </form>
              <button className="googleLogin" onClick={handleGoogleSignIn}>
                <img src={google} alt="entrar con google" />
              </button>
            </div>
            <div className="linksLogIn">
              <Link className="login-register-link" to="/register">
                <p>No tenes una cuenta?</p>
              </Link>
              <a href="#!" className="forgot" onClick={handleResetPassword}>
                Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Login;
