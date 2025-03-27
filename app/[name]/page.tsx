"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession, signOut,} from "next-auth/react";
import Signin from "../components/Signin";

const page = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[550px] bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h1>

        {user ? (
          <>
            <img
              src={user.image || "/profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto border"
            />
            <p className="text-lg text-gray-700 mt-3"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>

            <button
              onClick={() => signOut()}
              className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
           <p className="text-gray-500 mb-4">Your are currently logged out...</p>
           <Signin />
           </>
        
        )}
      </div>
    </div>
  );
};

export default page;
