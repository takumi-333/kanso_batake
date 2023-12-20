"use server"

import { collection, getDocs, setDoc, doc, query, orderBy, where } from "firebase/firestore"
import db from "@/lib/firebase/store"
import { LabType, affiliations } from "@/constants"
import { unstable_noStore } from "next/cache";

export const setAllLabs = async () => {
  try {
    const promises = affiliations.map((affiliation) => setDoc(doc(db, `labs/${affiliation.value}`), {...affiliation, users: []}))
    await Promise.all(promises)
  } catch (error) {
    console.log(error)
    throw new Error("Failed to set labs.")
  }
}

export async function getAllLabs() {
  unstable_noStore();
  const col = query(collection(db, "labs"));

  let result: LabType[] = [];
  const allReviewsSnapshot = await getDocs(col);
  allReviewsSnapshot.forEach((doc) => {
    result.push(doc.data() as LabType);
  });
  console.log(result)
  return result;
}

//わからん。
export const get_All_Lab_names=async(lablis: LabType[])=>{
  const ret=[]
  lablis.forEach(
    (lab)=>{
      ret.push(lab);
    }
  )
  return ret;
}