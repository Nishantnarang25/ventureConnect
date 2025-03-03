"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Homepage from "./components/homepage";
import WorkFlow from "./components/workflow.tsx"


interface FirestoreData {
  id: string; 
  name: string; 
}

export default function Home() {
  const [data, setData] = useState<FirestoreData[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const items: FirestoreData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }) as FirestoreData);
        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!session) return <Homepage />;

  return (
    <div className="flex flex-col justify-center items-start min-h-[400px] bg-white">
      <Homepage />
      <WorkFlow/>
    </div>
  );
}
