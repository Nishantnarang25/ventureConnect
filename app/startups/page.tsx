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
      console.log("Saving startup with ID:", startupId);

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
    <div className="bg-gray-50 min-h-screen p-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 text-center py-10">
        <h1 className="text-4xl font-semibold text-black/90">Explore Startups & Investment Opportunities</h1>
        <p className="text-black/60 text-lg max-w-2xl mx-auto">
          Discover emerging startups, connect with like-minded investors, and grow your network in the startup ecosystem.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto w-full">
          <input
            type="text"
            placeholder="Search startups, industries, investors..."
            className="w-full py-3 px-5 rounded-lg bg-white text-black/70 placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black/60 hover:text-black">
            <i className="fas fa-search text-xl"></i>
          </button>
        </div>
      </div>

      {/* Startup Cards Container */}
      <div className="flex flex-wrap gap-6 justify-start">
        {startups.map((startup) => (
          <div
            key={startup.id}
            className="flex flex-col items-start bg-white shadow-lg rounded-2xl p-6 border border-gray-200 max-w-2xl w-full transition-all duration-300 hover:shadow-xl"
          >
            {/* Left Section: User Image & Save Button */}
            <div className="flex flex-row  items-center mr-4">
              {session?.user?.image && (
                <img onClick = {handleSave(session.user.id)}
                  src="/bookmark.png"
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            
            </div>

            {/* Right Section: Startup Info */}
            <div className="flex-1">
              {/* Startup Heading */}
              <h2 className="text-xl font-semibold text-gray-900">
                <Link href={`/startups/${startup.id}`} passHref>
                  {startup.name}
                </Link>
              </h2>
              <p className="text-sm text-gray-600 mt-1">{startup.industry}</p>
              <p className="text-gray-700 mt-2">{startup.description}</p>

              {/* Funding Info */}
              <div className="flex items-center mt-4">
                <div className="flex-1 p-4 border border-gray-300 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Funding Needed</p>
                  <p className="text-lg font-medium text-green-600">${startup.funding_goal}</p>
                </div>
                <div className="ml-4">
                  <Link href={`/startups/${startup.id}/invest`} passHref>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all">
                      More Info
                    </button>
                  </Link>
                </div>
              </div>

              {/* Gray Stroke Divider */}
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

                <Link href={`/startups/${startup.id}/invest`} passHref>
                  <button className="bg-gradient-to-r from-yellow-400 to-green-500 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-all">
                    Invest Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Startups;
