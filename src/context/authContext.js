import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userLog, setUserLog] = useState("");
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password, rol) => {
    const userInfo = await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        sendEmailVerification(user.user)
          .then(() => {
            logOut();
            navigate("/");
            toast(
              "Usuario registrado con éxito, ahora verifique su email para poder ingresar",
              {
                type: "success",
                autoClose: 5000,
              }
            );
          })
          .catch(() => {
            toast("Email no existente", {
              type: "error",
            });
          });

        return user;
      })
      .catch((error) => {
        let message = error.message;
        if (message === "Firebase: Error (auth/email-already-in-use).") {
          toast("Email ya registrado", {
            type: "warning",
          });
        } else if (
          message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          toast("La contraseña debe contener al menos 6 caracteres", {
            type: "warning",
          });
        } else if (message === "Firebase: Error (auth/invalid-email).") {
          toast("Email inválido", {
            type: "warning",
          });
        }
      });

    const docuRef = doc(db, `admins/${userInfo.user.uid}`);
    setDoc(docuRef, { email: email, rol: rol });
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        if (data.user.emailVerified === true) {
          window.localStorage.setItem(
            "loggedBracamonte",
            JSON.stringify(data.user)
          );
          navigate("/user");
          toast("Bienvenido!", {
            type: "success",
          });
        } else if (data.user.emailVerified === false) {
          logOut();
          navigate("/");
          toast("Primero debe verificar su email en su bandeja de entrada", {
            type: "error",
            autoClose: 5000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error.message);
        let message = error.message;
        if (message === "Firebase: Error (auth/wrong-password).") {
          toast("Contraseña incorrecta", {
            type: "warning",
          });
        } else if (message === "Firebase: Error (auth/user-not-found).") {
          toast("Usuario no registrado", {
            type: "warning",
          });
        } else if (message === "Firebase: Error (auth/invalid-email).") {
          toast("Email inválido", {
            type: "warning",
          });
        }
      });
  };

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        setUserLog("");
        window.localStorage.removeItem("loggedBracamonte");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider)
      .then((data) => {
        window.localStorage.setItem(
          "loggedBracamonte",
          JSON.stringify(data.user)
        );
        navigate("/user");
      })
      .catch((error) => {
        console.log(error);
        toast("Hubo un problema al intentar iniciar sesión", {
          type: "warning",
        });
      });
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Te enviamos un correo", {
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        let message = error.message;
        if (message === "Firebase: Error (auth/user-not-found).") {
          toast("Usuario no registrado", {
            type: "warning",
          });
        } else if (message === "Firebase: Error (auth/invalid-email).") {
          toast("Email inválido", {
            type: "warning",
          });
        }
      });
  };

  const getData = async (uid) => {
    const docuRef = doc(db, `admins/${uid}`);
    const docu = await getDoc(docuRef);
    const data = docu.data();
    return data;
  };

  const editProfile = async (userDataEdit, setReadOnly) => {
    const { displayName, email, phoneNumber, direction, birthday } =
      userDataEdit;

    try {
      const docuRef = doc(db, `admins/${auth.currentUser.uid}`);

      if (displayName === undefined || displayName === "") {
        toast("Es necesario llamarte por tu nombre", {
          type: "warning",
        });
      } else if (email === "" || email === undefined) {
        toast("Necesitamos tu correo electrónico", {
          type: "warning",
        });
      } else if (birthday === "" || birthday === undefined) {
        toast("Cuando naciste?", {
          type: "warning",
        });
      } else if (phoneNumber === "" || phoneNumber === undefined) {
        toast("Dejanos tu numero de teléfono", {
          type: "warning",
        });
      } else if (phoneNumber.length < 10 || phoneNumber.length > 10) {
        toast("Dejanos tu numero de teléfono valido (sin 0 y sin 15)", {
          type: "warning",
        });
      } else if (direction === "" || direction === undefined) {
        toast("Donde entregamos tu Bracamonte?", {
          type: "warning",
        });
      } else {
        setDoc(docuRef, {
          displayName,
          email,
          phoneNumber,
          direction,
          birthday,
          rol: userLog.rol,
        });
        setUserLog({
          ...userLog,
          displayName,
          email,
          phoneNumber,
          direction,
          birthday,
          rol: userLog.rol,
        });
        setReadOnly(true);
        toast("Perfil actualizado con exito", {
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);

      toast("Hubo un problema al actualizar el perfil", {
        type: "warning",
      });
    }
  };

  const setUserLogWithFirebaseAndRol = async (currentUser) => {
    const { displayName, email, phoneNumber } = currentUser;
    const docuRef = doc(db, `admins/${currentUser.uid}`);

    const docu = await getDoc(docuRef);
    const data = docu.data();

    if (data === undefined) {
      const docuRef = doc(db, `admins/${currentUser.uid}`);
      setDoc(docuRef, {
        displayName: displayName,
        email: email,
        phoneNumber: phoneNumber,
        direction: "",
        rol: "user",
      });
      await getData(currentUser.uid).then((data) => {
        const { displayName, email, phoneNumber, direction, rol, birthday } =
          data;
        setUserLog({
          ...currentUser,
          displayName,
          email,
          phoneNumber,
          direction,
          birthday,
          rol,
        });
      });
    } else {
      await getData(currentUser.uid).then((data) => {
        const { displayName, email, phoneNumber, direction, rol, birthday } =
          data;
        setUserLog({
          ...currentUser,
          displayName,
          email,
          phoneNumber,
          direction,
          birthday,
          rol,
        });
      });
    }
  };

  useEffect(() => {
    // auth provider loaded
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await setUserLogWithFirebaseAndRol(currentUser);
        setLoading(false);
      } else {
        setUserLog("");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBracamonte");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserLog(user);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        signUp,
        logIn,
        userLog,
        logOut,
        loading,
        logInWithGoogle,
        resetPassword,
        editProfile,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
