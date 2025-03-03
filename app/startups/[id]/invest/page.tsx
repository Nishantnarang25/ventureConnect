"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, collection, getDoc, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const InvestPage = () => {
  const { id } = useParams(); // Get startup ID from URL
  const { data: session } = useSession();
  const [fundingGoal, setFundingGoal] = useState(0); // Funding goal from startups table
  const [amountRaised, setAmountRaised] = useState(0); // Total amount raised
  const [amountLeft, setAmountLeft] = useState(0); // Remaining amount to reach goal
  const [investmentAmount, setInvestmentAmount] = useState(""); // User's input amount

  if (!session?.user?.email) {
    return <p>Please log in to invest.</p>;
  }

  // Fetch startup details (funding_goal and amount_raised)
  useEffect(() => {
    const fetchStartup = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "startups", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFundingGoal(data.funding_goal || 0);
          setAmountRaised(data.amount_raised || 0);
          setAmountLeft((data.funding_goal || 0) - (data.amount_raised || 0)); // Remaining funds needed
        } else {
          console.log("No such startup found!");
        }
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [id]);

  const handleInvest = async () => {
    const amount = parseFloat(investmentAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid investment amount.");
      return;
    }

    if (amount > amountLeft) {
      alert(`You can invest only up to $${amountLeft}.`);
      return;
    }

    try {
      const investmentData = {
        amount, // Amount being invested
        amount_left: amountLeft - amount, // New remaining amount after investment
        amount_raised: amountRaised + amount, // Total raised after investment
        investment_date: Timestamp.now(), // Firestore timestamp
        investor_email: session.user?.email, // Investor's email
        startup_id: id, // Startup ID
      };

      await addDoc(collection(db, "investments"), investmentData);

      alert(`Successfully invested $${amount} in startup ID: ${id}`);
      setInvestmentAmount(""); // Reset input after success

      // Update state values after successful investment
      setAmountRaised((prev) => prev + amount);
      setAmountLeft((prev) => prev - amount);
    } catch (error) {
      console.error("Error investing:", error);
      alert("Investment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Invest in Startup
        </h1>
        <p className="text-gray-600 text-center mt-2">
          You're investing in startup ID: <span className="font-semibold">{id}</span>
        </p>
        <p className="text-gray-700 text-center mt-1">
          Funding Goal: <span className="font-semibold">${fundingGoal}</span>
        </p>
        <p className="text-gray-700 text-center mt-1">
          Amount Raised: <span className="font-semibold">${amountRaised}</span>
        </p>
        <p className="text-gray-700 text-center mt-1">
          Amount Left: <span className="font-semibold">${amountLeft}</span>
        </p>

        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            Investment Amount ($)
          </label>
          <input
            type="number"
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter amount"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
          />
        </div>

        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
          onClick={handleInvest} // ✅ Fixed onClick
        >
          Confirm Investment
        </button>
      </div>
    </div>
  );
};

export default InvestPage;
