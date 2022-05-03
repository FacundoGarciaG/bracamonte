import React, { useEffect, useState } from "react";
import Form from "../../components/admin/Form";
import "../../assets/styles/admin.css";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { app } from "../../firebase";
import Table from "../../components/admin/Table";
import Loader from "../../components/Loader";
import { doc, updateDoc } from "firebase/firestore";

const Admin = () => {
  const [hamburguers, setHamburguers] = useState([]);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const getLinks = async () => {
    try {
      setLoading(true);
      db.collection("hamburguers").onSnapshot((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((i) => products.push({ ...i.data(), id: i.id }));
        setHamburguers(products);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const add = async (productObjet) => {
    const storageRef = app.storage().ref();
    const filePath = storageRef.child(file.name);
    try {
      setLoading(true);
      await filePath.put(file);
      const url = await filePath.getDownloadURL();
      await db
        .collection("hamburguers")
        .doc()
        .set({ ...productObjet, img: url });
      setLoading(false);
      toast("Nueva hamburguesa agregada", {
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addImg = async (e) => {
    try {
      setFile(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      setLoading(true);

      if (window.confirm("Estas seguro que desea eliminar esta hamburguesa?")) {
        await db.collection("hamburguers").doc(id).delete();
        setLoading(false);
        toast("Hamburguesa eliminada", {
          type: "success",
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateActive = async (dataActive, id, name, active) => {
    try {
      if (dataActive === "true" && active === "false") {
        const res = window.confirm(`Estas seguro que deseas mostrar ${name}?`);
        if (res) {
          const activeRef = doc(db, "hamburguers", id);
          await updateDoc(activeRef, {
            active: dataActive,
          });
          toast(`${name} EN el menu`, {
            type: "success",
          });
        } else {
          toast(`Bien, mantenemos ${name} FUERA del menu`, {
            type: "success",
          });
        }
      } else if (dataActive === "false" && active === "true") {
        const res = window.confirm(
          `Estas seguro que deseas dejar de mostrar ${name}?`
        );
        if (res) {
          const activeRef = doc(db, "hamburguers", id);
          await updateDoc(activeRef, {
            active: dataActive,
          });
          toast(`${name} FUERA del menu`, {
            type: "success",
          });
        } else {
          toast(`Bien, mantenemos ${name} EN el menu`, {
            type: "success",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePrice = async (dataPrice, id, name) => {
    try {
      const res = window.confirm(
        `Estas seguro que deseas cambiar el precio de ${name}?`
      );
      if (res) {
        const activeRef = doc(db, "hamburguers", id);
        await updateDoc(activeRef, {
          price: dataPrice,
        });

        toast(`Precio de ${name} actualizado con exito!`, {
          type: "success",
        });
      } else {
        toast(`Bien, mantendremos el precio de ${name}!`, {
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="admin">
        <h2>Administrador</h2>

        <Form {...{ add, setHamburguers, addImg }} />
        <Table
          hamburguers={hamburguers}
          onDelete={onDelete}
          {...{ updateActive, updatePrice }}
        />
      </div>
    );
  }
};

export default Admin;
