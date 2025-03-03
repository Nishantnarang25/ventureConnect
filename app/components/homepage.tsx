import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Homepage = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex justify-between items-center px-16 py-16 bg-gray-0">
      {/* Left Section */}
      <div className="max-w-5xl gap-2">
        <h1 className="text-6xl font-semibold text-black/90 font-roboto leading-[1.2]">
          Empowering Startups, <br />
          <span className="text-black/60">Connecting Innovators</span>
        </h1>

        <p className="text-gray-500 font-roboto max-w-lg mt-3">
          Join a thriving network of entrepreneurs and investors. Launch, grow, and succeed with VentureConnect.
        </p>

        {!session ? (
          <button className="mt-6 bg-black/90 text-white flex items-center font-roboto gap-4 py-2 px-4 pr-2 rounded-lg transition hover:bg-black/80">
            Get Started <img src="/arrow.png" alt="Explore" className="w-8 h-8" />
          </button>
        ) : (
          <Link href="/startups">
            <button className="mt-6 bg-black/90 text-white flex items-center font-roboto gap-4 py-2 px-4 pr-2 rounded-lg transition hover:bg-black/80">
              Explore Startups <img src="/arrow.png" alt="Explore" className="w-8 h-8" />
            </button>
          </Link>
        )}
      </div>

      <div className="flex justify-end ">
        <img src="/mainp.png" alt="Startup illustration"  />
      </div>
    </section>
  );
};

export default Homepage;
