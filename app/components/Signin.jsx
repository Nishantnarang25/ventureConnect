"use client"
import React from 'react'
import { signIn } from "next-auth/react";
import { db } from "@/lib/firebase"; // Import Firestore instance
import { doc, setDoc, getDoc } from "firebase/firestore";

const Signin = () => {

  const handleSignIn = async () => {
    const result = await signIn("google", { redirect: false });

    if (result?.error) {
      console.error("Sign-in failed:", result.error);
      return;
    }

    // Get user details from session
    const session = await fetch("/api/auth/session").then((res) => res.json());

    if (session?.user) {
      const userRef = doc(db, "users", session.user.email); // Use email as document ID
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If user doesn't exist, add them to Firestore
        await setDoc(userRef, {
          name: session.user.name,
          email: session.user.email,
          profile_pic: session.user.image, // Optional
          created_at: new Date(),
        });
      }
    }
  };
  
  return (
    <button
  onClick={handleSignIn}
  className="bg-black/90 text-[#F5F5F9] py-2 text-sm font-roboto px-5 rounded-xl border border-transparent"
>
  Sign Up
</button>

  )
}

export default Signin