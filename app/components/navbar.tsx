"use client";
import React from "react";
import Link from "next/link";
import Signin from "./Signin";
import Logout from "./Logout";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession(); //used to determine whether the user is logged in or not?

  return (
    <nav className="bg-white shadow-md py-2 px-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-2 sm:space-y-0">
      
      <div className="flex items-center justify-start px-2 py-2 gap-20 space-x-6">

        <div className="flex items-center justify-start gap-3">
        <img src="/ventureConnectLogo.png" alt="VentureConnect Logo" className="w-8 h-8" />


  <Link href="/">
    <h1 className="text-2xl font-roboto font-bold text-black/90">VentureConnect</h1>
  </Link>
  </div>

  <ul className="flex items-center gap-3 space-x-4 font-inter  text-sm font-medium text-black/60">
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
        <Link href="/messages">Messages</Link>
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
<li className="list-none bg-gray-50 flex items-center justify-center rounded-full h-8 w-8">

           <Link href={`/${session?.user?.name}/dashboard`}><img className="h-4 w-3" src="/bookmarknew.png"/></Link>
            </li>
          <img
            src= "/profile.png"
            className="h-8"
          />
           
        </div>
      ) : (
        <Signin />
      )}
    </nav>
  );
}

export default Navbar;
