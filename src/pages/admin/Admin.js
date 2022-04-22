import React, { useEffect, useState } from "react";
import Form from "../../components/admin/Form";
import "../../assets/styles/admin.css";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { app } from "../../firebase";

import Table from "../../components/admin/Table";

const Admin = () => {
  const [hamburguers, setHamburguers] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

  const getLinks = async () => {
    try {
      db.collection("hamburguers").onSnapshot((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((i) => products.push({ ...i.data(), id: i.id }));
        setHamburguers(products);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const add = async (productObjet) => {
    try {
      await db
        .collection("hamburguers")
        .doc()
        .set({ ...productObjet, img: fileUrl });

      toast("Nueva hamburguesa agregada", { type: "success", autoClose: 1000 });
    } catch (error) {
      console.log(error);
    }
  };

  const addImg = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const filePath = storageRef.child(file.name);

    try {
      await filePath.put(file);
      const url = await filePath.getDownloadURL();
      setFileUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      if (window.confirm("Estas seguro que desea eliminar esta hamburguesa?")) {
        await db.collection("hamburguers").doc(id).delete();
        toast("Hamburguesa eliminada", { type: "success", autoClose: 1000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Administrador</h2>
      <Form {...{ add, setHamburguers, addImg }} />
      <Table hamburguers={hamburguers} onDelete={onDelete} />
    </div>
  );
};

export default Admin;
