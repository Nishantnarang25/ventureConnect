"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";

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

const Startups = () => {
  const [startups, setStartups] = useState<FirestoreData[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "startups"));
        const items: FirestoreData[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            created_at: data.created_at?.toDate() || new Date(),
            ...data,
          } as FirestoreData;
        });

        setStartups(items);
      } catch (error) {
        console.error("Error fetching startups:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (startupId: string) => {
    if (!session?.user?.email) {
      alert("You need to be logged in to save this startup.");
      return;
    }

    try {
      await addDoc(collection(db, "saved"), {
        created_at: serverTimestamp(),
        email: session.user.email,
        startup_id: startupId,
      });

      alert("Startup saved successfully!");
    } catch (error) {
      console.error("Error saving startup:", error);
      alert("Failed to save the startup.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-900">Explore Startups & Investment Opportunities</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Discover emerging startups, connect with like-minded investors, and grow your network in the startup ecosystem.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto mb-10">
        <input
          type="text"
          placeholder="Search startups, industries, investors..."
          className="w-full py-3 px-5 rounded-lg bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black">
          <i className="fas fa-search text-xl"></i>
        </button>
      </div>

      {/* Startup Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <div
            key={startup.id}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
          >
            {/* Startup Heading */}
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              <Link href={`/startups/${startup.id}`} passHref>
                {startup.name}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">{startup.industry}</p>
            <p className="text-gray-700 mt-2 line-clamp-3">{startup.description}</p>

            {/* Funding Info */}
            <div className="mt-4 flex justify-between items-center">
              <div className="bg-gray-100 flex flex-row gap-2 items-center justify-center px-4 py-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Funding Needed</p>
                <p className="text-lg font-medium text-green-600">${startup.funding_goal}</p>
              </div>

              <Link href={`/startups/${startup.id}/invest`} passHref>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all">
                  More Info
                </button>
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between items-center text-sm text-gray-600">
              <div>
                <p>{startup.email}</p>
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {startup.website}
                </a>
              </div>

              {session?.user && (
                <button
                  onClick={() => handleSave(startup.id)}
                  className="bg-yellow-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-all"
                >
                  Save Startup
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Startups;
