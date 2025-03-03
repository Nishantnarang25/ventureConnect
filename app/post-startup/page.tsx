"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";

const PostStartup = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    funding_goal: "",
    funding_receive: "0",
    website: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.email) {
      alert("You need to be logged in to post a startup.");
      return;
    }

    try {
      await addDoc(collection(db, "startups"), {
        ...formData,
        email: session.user.email,
        funding_goal: formData.funding_goal,
        funding_receive: "0",
        created_at: serverTimestamp(),
      });
      router.push("/startups");
      
    } catch (error) {
      console.error("Error posting startup:", error);
      alert("Failed to post the startup.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl border mt-10">
      <h1 className="text-2xl font-bold mb-4">Post Your Startup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Startup Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
        <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="funding_goal" placeholder="Funding Goal" value={formData.funding_goal} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="url" name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit</button>
      </form>
    </div>
  );
};

export default PostStartup;