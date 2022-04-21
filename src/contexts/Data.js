import { useState, useEffect } from "react";
import { db } from "../utils/init-firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export const Data = () => {
  const { currentUser } = useAuth();
  const [orderData, setOrderData] = useState();
  const [waitingData, setwaitingData] = useState();
  const [processingData, setprocessingData] = useState();

  useEffect(() => {
    const q = query(collection(db, "num", "numedu", "Orders"));
    const q2 = query(collection(db, "num", "Waiting", `${currentUser?.email}`));
    const q3 = query(
      collection(db, "num", "Processing", `${currentUser?.email}`)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setOrderData(tmpArray);
    });

    const unsub2 = onSnapshot(q2, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setwaitingData(tmpArray);
    });

    const unsub3 = onSnapshot(q3, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setprocessingData(tmpArray);
    });

    return () => {
      unsub();
      unsub2();
      unsub3();
    };
  }, []);

  return { orderData, waitingData, processingData };
};
