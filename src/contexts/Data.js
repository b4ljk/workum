import { useState, useEffect } from "react";
import { db } from "../utils/init-firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

export const Data = () => {
  const [orderData, setOrderData] = useState();
  const [readyData, setReadyData] = useState();
  const [reviewData, setReviewData] = useState();

  useEffect(() => {
    const q = query(collection(db, "num", "numedu", "Orders"));
    const q2 = query(collection(db, "num", "numedu", "readyClass"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
        console.log("hello fuck");
      });
      setOrderData(tmpArray);
    });

    const unsub2 = onSnapshot(q2, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setReadyData(tmpArray);
    });

    const q3 = query(collection(db, "num", "numedu", "reviews"));
    const unsub3 = onSnapshot(q3, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setReviewData(tmpArray);
    });

    return () => {
      unsub();
      unsub2();
      unsub3();
    };
  }, []);

  return { orderData, readyData, reviewData };
};
