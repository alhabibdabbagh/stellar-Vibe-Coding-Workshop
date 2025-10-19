"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBalance, deposit, withdraw } from "@/lib/stellar";

export default function MainPage() {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    checkWallet();
  }, []);

  const checkWallet = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).freighter) {
        const key = await (window as any).freighter.getPublicKey();
        setPublicKey(key);
        await loadBalance(key);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Wallet check error:", error);
      router.push("/");
    }
  };

  const loadBalance = async (key: string) => {
    try {
      const bal = await getBalance(key);
      setBalance(bal);
    } catch (error) {
      console.error("Balance fetch error:", error);
      setError("Failed to fetch balance");
    }
  };

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await deposit(publicKey, amount);
      await loadBalance(publicKey);
      setAmount("");
      alert("Deposit successful!");
    } catch (error: any) {
      console.error("Deposit error:", error);
      setError(error.message || "Deposit failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await withdraw(publicKey, amount);
      await loadBalance(publicKey);
      setAmount("");
      alert("Withdrawal successful!");
    } catch (error: any) {
      console.error("Withdraw error:", error);
      setError(error.message || "Withdrawal failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              MicroWallet
            </h1>
            <button
              onClick={handleDisconnect}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Disconnect
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Your Address
            </p>
            <p className="text-sm font-mono break-all text-gray-800 dark:text-white">
              {publicKey}
            </p>
          </div>

          <div className="mb-6 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
            <p className="text-sm mb-2">Contract Balance</p>
            <p className="text-4xl font-bold">{balance} XLM</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount (XLM)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDeposit}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Deposit"}
            </button>
            <button
              onClick={handleWithdraw}
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Withdraw"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Network: {process.env.NEXT_PUBLIC_NETWORK}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
