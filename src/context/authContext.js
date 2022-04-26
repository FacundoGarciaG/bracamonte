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
      .then(() => {
        navigate("/user");
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

  const getRol = async (uid) => {
    const docuRef = doc(db, `admins/${uid}`);
    const docu = await getDoc(docuRef);
    const rol = docu.data().rol;
    return rol;
  };

  const setUserLogWithFirebaseAndRol = async (currentUser) => {
    await getRol(currentUser.uid).then((rol) => {
      setUserLog({ ...currentUser, rol });
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
      }}
    >
      {children}
    </authContext.Provider>
  );
};
