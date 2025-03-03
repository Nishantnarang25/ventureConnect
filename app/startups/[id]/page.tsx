"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"; // Ensure NextAuth is set up properly

interface FirestoreData {
  id: string;
  created_at: Date;
  description: string;
  email: string;
  funding_goal: number;
  funding_receive: number;
  industry: string;
  name: string;
  website: string;
}

const StartupDetails = () => {
  const { id } = useParams(); // Get the startup ID from the URL
  const [startup, setStartup] = useState<FirestoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession(); // Get the current user session

  useEffect(() => {
    const fetchStartup = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "startups", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStartup({ id: docSnap.id, ...docSnap.data() } as FirestoreData);
        } else {
          console.error("No such startup!");
        }
      } catch (error) {
        console.error("Error fetching startup:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [id]);

  const handleSave = async () => {
    if (!session?.user?.email) {
      alert("You need to be logged in to save this startup.");
      return;
    }

    if (!startup?.id) {
      alert("Startup data is missing.");
      return;
    }

    try {
      console.log("Saving startup with ID:", startup.id);

      await addDoc(collection(db, "saved"), {
        created_at: serverTimestamp(),
        email: session.user.email,
        startup_id: startup.id,
      });

      alert("Startup saved successfully!");
    } catch (error) {
      console.error("Error saving startup:", error);
      alert("Failed to save the startup.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!startup) return <p className="text-center mt-10 text-red-500">Startup not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200 mt-10">
      <h1 className="text-2xl font-bold text-gray-900">{startup.name}</h1>
      <p className="text-sm text-gray-500 mt-1">{startup.industry}</p>
      <p className="text-gray-700 mt-3">{startup.description}</p>

      <div className="mt-5 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Funding Goal:</span>
          <span className="text-lg font-medium text-green-600">${startup.funding_goal}</span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-500">Funding Received:</span>
          <span className="text-lg font-medium text-blue-600">${startup.funding_receive}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={startup.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gradient-to-r from-yellow-400 to-green-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-all"
        >
          Visit Website
        </a>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all">
          Invest in Startup
        </button>
        <button 
          onClick={handleSave} 
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
        >
          Save for Later
        </button>
      </div>
    </div>
  );
};

export default StartupDetails;
