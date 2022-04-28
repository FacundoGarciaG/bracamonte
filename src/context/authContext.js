import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
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
        navigate("/");
        toast("Usuario registrado con éxito", {
          type: "success",
          autoClose: 1000,
        });
        return user;
      })
      .catch((error) => {
        let message = error.message;
        if (message === "Firebase: Error (auth/email-already-in-use).") {
          toast("Email ya registrado", {
            type: "warning",
            autoClose: 2000,
          });
        } else if (
          message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          toast("La contraseña debe contener al menos 6 caracteres", {
            type: "warning",
            autoClose: 2000,
          });
        } else if (message === "Firebase: Error (auth/invalid-email).") {
          toast("Email inválido", {
            type: "warning",
            autoClose: 2000,
          });
        }
      });

    const docuRef = doc(db, `admins/${userInfo.user.uid}`);
    setDoc(docuRef, { email: email, rol: rol });
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/user");
      })
      .catch((error) => {
        console.log(error.message);
        let message = error.message;
        if (message === "Firebase: Error (auth/wrong-password).") {
          toast("Contraseña incorrecta", {
            type: "warning",
            autoClose: 2000,
          });
        } else if (message === "Firebase: Error (auth/user-not-found).") {
          toast("Usuario no registrado", {
            type: "warning",
            autoClose: 2000,
          });
        } else if (message === "Firebase: Error (auth/invalid-email).") {
          toast("Email inválido", {
            type: "warning",
            autoClose: 2000,
          });
        }
      });
  };

  const logOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const logInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        if (user.rol === null) {
          const rol = "user";
          const docuRef = doc(db, `admins/${user.uid}`);
          setDoc(docuRef, { email: user.email, rol: rol });
          navigate("/user");
        } else {
          navigate("/user");
        }
      })
      .catch((error) => {
        console.log(error);
        toast("Hubo un problema al intentar iniciar sesión", {
          type: "warning",
          autoClose: 2000,
        });
      });
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Te enviamos un correo", {
          type: "success",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        let message = error.message;
        if (message === "Firebase: Error (auth/user-not-found).") {
          toast("Usuario no registrado", {
            type: "warning",
            autoClose: 2000,
          });
        } else if (message === "Firebase: Error (auth/invalid-email).") {
          toast("Email inválido", {
            type: "warning",
            autoClose: 2000,
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

  const editProfile = async (userDataEdit) => {
    try {
      const { displayName, email, phoneNumber, direction } = userDataEdit;
      const docuRef = doc(db, `admins/${auth.currentUser.uid}`);

      setDoc(docuRef, {
        displayName,
        email,
        phoneNumber,
        direction,
        rol: "user",
      });
      toast("Perfil actualizado con exito", {
        type: "success",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("Hubo un problema al actualizar el perfil", {
        type: "warning",
        autoClose: 2000,
      });
    }
  };

  const setUserLogWithFirebaseAndRol = async (currentUser) => {
    await getData(currentUser.uid).then((data) => {
      const { displayName, email, phoneNumber, direction, rol } = data;
      setUserLog({
        ...currentUser,
        displayName,
        email,
        phoneNumber,
        direction,
        rol,
      });
    });
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
