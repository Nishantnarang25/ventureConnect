"use client";
import React from "react";
import Link from "next/link";
import Signin from "./Signin";
import Logout from "./Logout";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession(); //used to determine whether the user is logged in or not?

  return (
    <nav className="bg-white shadow-sm py-2 px-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-2 sm:space-y-0">

      <div className="flex items-center justify-start px-2 py-2 gap-20 space-x-6">

        <div className="flex items-center justify-start gap-3">
          <img src="/ventureConnectLogo.png" alt="VentureConnect Logo" className="w-9 h-9" />


          <Link href="/">
            <h1 className="text-2xl font-roboto font-bold text-black/90">VentureConnect</h1>
          </Link>
        </div>

        <ul className="flex items-center gap-3 space-x-4 font-inter  text-md font-medium text-black/60">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/startups" className="hover:underline">
              Explore Startups
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/post-startup" className="hover:underline">
                  Post Startup
                </Link>
              </li>
              <li>
                <Link href="/success-stories">Success Stories</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/how-it-works">How it works?</Link>
              </li>
              <li>
                <Link href="/success-stories">Success Stories</Link>
              </li>
            </>
          )}
        </ul>

      </div>


      {session ? (
        <div className="flex items-center gap-4 justify-center px-4">
          <li className="list-none bg-gray-100 flex items-center justify-center rounded-full h-10 w-10">

            <Link href={`/${session?.user?.name}/dashboard`}><img className="h-5 w-4 " src="/bookmarknew.png" /></Link>
          </li>
          <Link href={`/${session?.user?.name}`}>
            <img
              src={session?.user?.image || "/profile.png"} // Fallback to default if no image
              className="h-10 w-10 rounded-full object-cover"
              alt="User Profile"
            />
            </Link>

        </div>
      ) : (
        <Signin />
      )}
    </nav>
  );
}

export default Navbar;
