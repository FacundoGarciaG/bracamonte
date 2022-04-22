import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const getActiveProducts = async () => {
  const collectionRef = collection(db, "hamburguers");
  const filterActive = query(collectionRef, where("active", "==", "true"));
  const snaps = await getDocs(filterActive);
  const hamburguers = [];
  snaps.forEach((doc) => {
    hamburguers.push({ ...doc.data(), id: doc.id });
  });
  return hamburguers;
};

export default getActiveProducts;
