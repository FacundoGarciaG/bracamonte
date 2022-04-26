import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import addUser from "../assets/statics/icons/add-user-2-24.png";

const Register = () => {
  const { signUp } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rol = "user";
    signUp(user.email, user.password, rol);
  };

  return (
    <main>
      <div className="login-register-container">
        <h1>Registrarse</h1>
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
              <img src={addUser} alt="aceptar" />
            </button>
          </form>
        </div>
        <Link className="login-register-link" to="/user">
          <p>Ya tenes una cuenta?</p>
        </Link>
      </div>
    </main>
  );
};

export default Register;
