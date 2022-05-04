import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

import confirm from "../../assets/statics/icons/check-mark-3-24.png";
import cancel from "../../assets/statics/icons/cancel-24.png";

const ProfileDataForm = ({ readOnly, setReadOnly }) => {
  const { userLog, editProfile } = useAuth();
  const [userDataEdit, setUserDataEdit] = useState(userLog);

  const handleChange = ({ target: { name, value } }) => {
    setUserDataEdit({ ...userDataEdit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProfile(userDataEdit, setReadOnly);
  };

  const handleCancelEdit = () => {
    setReadOnly(true);
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
            placeholder={userLog.displayName ? userLog.displayName : ""}
          />
        </label>
        <label>
          Fecha de nacimiento:
          <input
            type="date"
            name="birthday"
            readOnly={readOnly}
            onChange={handleChange}
            defaultValue={userLog.birthday ? userLog.birthday : ""}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            onChange={handleChange}
            readOnly={readOnly}
            type="email"
            placeholder={userLog.email ? userLog.email : ""}
          />
        </label>
        <label>
          Numero de teléfono
          <input
            name="phoneNumber"
            onChange={handleChange}
            readOnly={readOnly}
            type="tel"
            placeholder={userLog.phoneNumber ? userLog.phoneNumber : ""}
          />
        </label>
        <label>
          Dirección/Piso/Depto.
          <input
            name="direction"
            onChange={handleChange}
            readOnly={readOnly}
            type="text"
            placeholder={userLog.direction ? userLog.direction : ""}
          />
        </label>
        <div className="buttons">
          <button
            type="button"
            className="buttonCancelEdit"
            onClick={handleCancelEdit}
          >
            <img src={cancel} alt="cancelar" />
          </button>
          <button className="buttonConfirmEdit">
            <img src={confirm} alt="ok" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDataForm;
