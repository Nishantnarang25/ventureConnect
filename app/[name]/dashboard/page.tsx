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
    <section className="w-full min-h-screen bg-gray-50 px-6 md:px-12 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-6 text-center">
          Welcome to <span className="text-gray-600">{name}'s</span> Dashboard
        </h1>

        {savedStartups.length > 0 ? (
          <ul className="space-y-6">
            {savedStartups.map((startup) => (
              <li key={startup.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-black">{startup.name}</h2>
                <p className="text-gray-600 mt-2">{startup.description}</p>

                <div className="mt-4 text-gray-700">
                  <p><strong>Industry:</strong> {startup.industry}</p>
                  <p><strong>Funding Goal:</strong> ${startup.funding_goal.toLocaleString()}</p>
                  <p><strong>Funding Received:</strong> ${startup.funding_receive.toLocaleString()}</p>
                </div>

                <a
                  href={startup.website}
                  target="_blank"
                  className="mt-4 inline-block text-blue-600 font-medium underline transition hover:text-blue-800"
                >
                  Visit Website
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-lg text-center mt-6">No saved startups yet.</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
