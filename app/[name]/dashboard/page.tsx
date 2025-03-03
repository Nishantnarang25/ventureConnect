"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

interface Startup {
  id: string;
  name: string;
  description: string;
  industry: string;
  funding_goal: number;
  funding_receive: number;
  website: string;
}

const Dashboard = () => {
  const { name } = useParams();
  const { data: session } = useSession();
  const [savedStartups, setSavedStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const fetchSavedStartups = async () => {
      if (!session?.user?.email) return;

      try {
        // Fetch saved startups for the logged-in user
        const savedQuery = query(collection(db, "saved"), where("email", "==", session.user.email));
        const savedSnapshot = await getDocs(savedQuery);
        const startupIds = savedSnapshot.docs.map((doc) => doc.data().startup_id);

        // Fetch full details of each saved startup
        const startupPromises = startupIds.map(async (id) => {
          const startupRef = doc(db, "startups", id);
          const startupSnap = await getDoc(startupRef);
          return startupSnap.exists() ? { id: startupSnap.id, ...startupSnap.data() } as Startup : null;
        });

        const startups = (await Promise.all(startupPromises)).filter((s) => s !== null);
        setSavedStartups(startups);
      } catch (error) {
        console.error("Error fetching saved startups:", error);
      }
    };

    fetchSavedStartups();
  }, [session]);

  return (
    <div>
      <h1>Welcome to {name}'s Dashboard</h1>
      <ul>
        {savedStartups.map((startup) => (
          <li key={startup.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{startup.name}</h2>
            <p>{startup.description}</p>
            <p><strong>Industry:</strong> {startup.industry}</p>
            <p><strong>Funding Goal:</strong> ${startup.funding_goal}</p>
            <p><strong>Funding Received:</strong> ${startup.funding_receive}</p>
            <a href={startup.website} target="_blank" className="text-blue-600 underline">Visit Website</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
