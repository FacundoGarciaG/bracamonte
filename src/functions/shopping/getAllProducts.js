import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const getAllProducts = async () => {
  const collectionRef = collection(db, "hamburguers");
  const snaps = await getDocs(collectionRef);
  const hamburguers = [];
  snaps.forEach((doc) => {
    hamburguers.push({ ...doc.data(), id: doc.id });
  });

  return hamburguers;
};

export default getAllProducts;
