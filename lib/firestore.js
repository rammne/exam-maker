// lib/firestore.js
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getProfessorByEmployeeID(employeeID) {
  const q = query(collection(db, "professors"), where("employeeID", "==", employeeID));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
}
