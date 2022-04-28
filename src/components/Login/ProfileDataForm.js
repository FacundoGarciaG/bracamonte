import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

import confirm from "../../assets/statics/icons/check-mark-3-24.png";
import cancel from "../../assets/statics/icons/cancel-24.png";

const ProfileDataForm = ({ readOnly }) => {
  const { userLog, editProfile } = useAuth();
  const [userDataEdit, setUserDataEdit] = useState(userLog);

  const handleChange = ({ target: { name, value } }) => {
    setUserDataEdit({ ...userDataEdit, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile(userDataEdit);
  };

  return (
    <div>
      <h1>Datos personales</h1>
      <form
        onSubmit={handleSubmit}
        className={
          readOnly ? "formDataUser formData" : "formDataUserBlock formData"
        }
      >
        <label>
          Nombre y apellido{" "}
          <input
            name="displayName"
            onChange={handleChange}
            readOnly={readOnly}
            type="text"
            placeholder={
              userLog.displayName ? userLog.displayName : "Nombre y apellido"
            }
          />
        </label>
        <label>
          Email
          <input
            name="email"
            onChange={handleChange}
            readOnly={readOnly}
            type="email"
            placeholder={userLog.email ? userLog.email : "email@email.com"}
          />
        </label>
        <label>
          Numero de teléfono
          <input
            name="phoneNumber"
            onChange={handleChange}
            readOnly={readOnly}
            type="tel"
            placeholder={
              userLog.phoneNumber
                ? userLog.phoneNumber
                : "(Código de área) Número"
            }
          />
        </label>
        <label>
          Dirección
          <input
            name="direction"
            onChange={handleChange}
            readOnly={readOnly}
            type="text"
            placeholder={
              userLog.direction ? userLog.direction : "A donde te la llevamos?"
            }
          />
        </label>
        <div className="buttons">
          <button>
            <img src={confirm} alt="ok" />
          </button>
          <button type="button">
            <img src={cancel} alt="cancelar" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDataForm;
