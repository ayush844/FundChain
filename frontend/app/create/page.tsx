"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import factoryAbi from "@/contracts/CrowdfundingFactory.json";

export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_CAMPAIGN_FACTORY;

export default function CreateCampaignPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: txLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Redirect after success
  if (isSuccess && successMsg === "") {
    setSuccessMsg("Campaign created successfully!");
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!name || !description || !goal || !duration) {
      setError("All fields are required.");
      return;
    }

    try {
      writeContract({
        address: FACTORY_ADDRESS,
        abi: factoryAbi.abi,
        functionName: "createCampaign",
        args: [
          name,
          description,
          BigInt(Math.floor(Number(goal) * 1e18)), // convert ETH → wei
          Number(duration),
        ],
      });
    } catch (err: any) {
      console.log(err);
      setError(err?.message || "Contract call failed.");
    }
  };

  return (
    <section className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8 relative">
      {/* Background Rings */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-72 h-72 border-2 border-primary/30 rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 border-2 border-secondary/30 rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mt-6 mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Launch a New Campaign
          </h1>
          <p className="mt-2 text-sm text-foreground/70 max-w-lg mx-auto">
            Share your idea with the world and raise funds transparently on Ethereum.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          {error && (
            <p className="mb-4 text-red-600 font-medium bg-red-100 border border-red-300 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          {successMsg && (
            <p className="mb-4 text-green-600 font-medium bg-green-100 border border-green-300 px-3 py-2 rounded-md">
              {successMsg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-primary/30 rounded-md 
                           bg-white text-foreground focus:border-primary focus:ring-primary outline-none"
                placeholder="e.g., Solar-powered Scooter Project"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-primary/30 rounded-md 
                           bg-white text-foreground focus:border-primary focus:ring-primary outline-none h-28"
                placeholder="Describe what your campaign is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Goal Amount (ETH)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-primary/30 rounded-md 
                           bg-white text-foreground focus:border-primary focus:ring-primary outline-none"
                placeholder="1.5"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Duration (days)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-primary/30 rounded-md 
                           bg-white text-foreground focus:border-primary focus:ring-primary outline-none"
                placeholder="7"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || txLoading}
              className="w-full py-3 bg-primary text-white font-bold rounded-md 
                         border-2 border-primary hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {isPending || txLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Creating...
                </>
              ) : (
                "Create Campaign"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
