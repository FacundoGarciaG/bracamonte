import { useAuth } from "../context/authContext";
import { useShopping } from "../context/shoppingContext";
import "../assets/styles/buyForm.css";
import cancel from "../assets/statics/icons/cancel-24.png";
import ok from "../assets/statics/icons/check-mark-3-24.png";
import { useNavigate } from "react-router-dom";
import BurguerToBuy from "../components/buyForm/BurguerToBuy";

const BuyForm = () => {
  const { userLog } = useAuth();
  const { shoppingCart, totalQty, totalPrice } = useShopping();

  const navigate = useNavigate();

  const burguer = [];

  shoppingCart.forEach((element) => {
    burguer.push(
      `${element.qty} ${element.name} ${
        element.vegan === "true" ? "vegana" : ""
      }`
    );
  });

  const handleClick = () => {
    navigate("/menu");
  };

  return (
    <main>
      <h1>Confirmemos los datos para la entrega</h1>
      <div className="buyFormContainer">
        <form
          className="buyForm"
          method="POST"
          action="https://docs.google.com/forms/d/e/1FAIpQLSchi6oHIoJBsHlOxehap1vmEwW-2F2hyma4Cg_T8xgAF-OG3g/formResponse"
        >
          <label>
            Nombre y apellido
            <input
              required={true}
              readOnly={userLog.displayName ? true : false}
              type="text"
              name="entry.1387036520"
              defaultValue={userLog.displayName ? userLog.displayName : null}
            />
          </label>
          <label>
            Telefono
            <input
              required
              readOnly={userLog.phoneNumber ? true : false}
              type="tel"
              name="entry.828623377"
              defaultValue={userLog.phoneNumber ? userLog.phoneNumber : null}
            />
          </label>
          <label>
            Direccion de entrega/Piso/Depto.
            <input
              required
              type="text"
              name="entry.1161125677"
              defaultValue={userLog.direction ? userLog.direction : null}
            />
          </label>
          <label>
            Metodo de pago (Mercado pago o efectivo)
            <select required name="entry.2001519594">
              <option value="Efectivo">Efectivo</option>
              <option value="Mercado Pago">Mercado Pago</option>
            </select>
            {/*      <input required type="text" name="entry.2001519594" /> */}
          </label>
          <label>
            Necesitas cambio? Con cuanto vas a pagar?
            <input type="text" name="entry.315643629" />
          </label>
          <label className="observations">
            Observaciones
            <textarea name="entry.249426018" cols="30" rows="10"></textarea>
          </label>
          <textarea
            readOnly={true}
            defaultValue={burguer}
            className="burguers"
            name="entry.422487750"
            cols="30"
            rows="10"
          ></textarea>
          <input
            readOnly={true}
            defaultValue={`${totalPrice}`}
            className="burguers"
            name="entry.174680728"
          />
          <h4>TOTAL DE BRACAMONTES: {totalQty}</h4>
          <h4>TOTAL A PAGAR: ${totalPrice}</h4>
          <div className="buttons">
            <button
              type="button"
              className="cancelButton"
              onClick={handleClick}
            >
              <img src={cancel} alt="cancelar" />
            </button>
            <button className="buttonBuyForm" type="submit">
              <img src={ok} alt="ok" />
            </button>
            <p className="alert">
              Si queres cambiar alguno de tus datos personales es mejor que
              vayas a tu perfil de usuario!
            </p>
          </div>
        </form>
        <div className="dataBurguers">
          <h3>Detalle:</h3>
          {shoppingCart.map((burguer, index) => (
            <BurguerToBuy key={index} data={burguer} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BuyForm;
