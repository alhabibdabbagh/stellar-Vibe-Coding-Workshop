"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FundPage() {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fundAccount = async () => {
    if (!publicKey || publicKey.length !== 56) {
      setMessage("❌ Please enter a valid Stellar public key (56 characters, starts with G)");
      return;
    }

    setLoading(true);
    setMessage("🔄 Requesting test XLM from Friendbot...");

    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${publicKey}`
      );

      if (response.ok) {
        setMessage("✅ Success! Your account has been funded with 10,000 test XLM!");
        setTimeout(() => router.push("/"), 3000);
      } else {
        const error = await response.text();
        setMessage(`❌ Error: ${error}`);
      }
    } catch (error: any) {
      setMessage(`❌ Failed to connect to Friendbot: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getPublicKeyFromFreighter = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).freighter) {
        const key = await (window as any).freighter.getPublicKey();
        setPublicKey(key);
        setMessage("✅ Public key copied from Freighter!");
      } else {
        setMessage("❌ Freighter wallet not detected. Please install it first.");
      }
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          Fund Your Account
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Get 10,000 test XLM from Friendbot
        </p>

        <div className="space-y-4">
          <button
            onClick={getPublicKeyFromFreighter}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            📋 Get Key from Freighter
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Or paste your public key:
            </label>
            <input
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
              disabled={loading}
            />
          </div>

          <button
            onClick={fundAccount}
            disabled={loading || !publicKey}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Funding Account..." : "💰 Fund with Friendbot"}
          </button>

          {message && (
            <div
              className={`p-4 rounded-lg text-sm ${
                message.includes("✅")
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : message.includes("🔄")
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <button
            onClick={() => router.push("/")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
