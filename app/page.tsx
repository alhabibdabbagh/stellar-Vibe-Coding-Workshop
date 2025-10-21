"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/lib/toast";

export default function Home() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [freighterDetected, setFreighterDetected] = useState<boolean | null>(null);
  const toast = useToast();

  useEffect(() => {
    // Check if Freighter is installed with retry logic
    const checkFreighter = async () => {
      let attempts = 0;
      const maxAttempts = 20;
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        if (typeof window !== "undefined" && (window as any).freighter) {
          setFreighterDetected(true);
          console.log("✅ Freighter detected!");
          return;
        }
        
        attempts++;
      }
      
      // Final check after all attempts
      const isInstalled = typeof window !== "undefined" && !!(window as any).freighter;
      setFreighterDetected(isInstalled);
      console.log("Freighter detection result:", isInstalled);
    };
    
    checkFreighter();
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Wait for Freighter to be available
      const checkFreighter = () => {
        return typeof window !== "undefined" && (window as any).freighter;
      };

      // Give extension time to load (max 3 seconds)
      let attempts = 0;
      while (!checkFreighter() && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (checkFreighter()) {
        const publicKey = await (window as any).freighter.getPublicKey();
        console.log("Connected:", publicKey);
        toast("Wallet connected!", "success");
        router.push("/main");
      } else {
        toast(
          "Freighter not detected. Install the extension and refresh.",
          "error"
        );
      }
    } catch (error: any) {
      console.error("Connection error:", error);
      toast(
        error.message?.includes("User declined")
          ? "You declined wallet access."
          : "Failed to connect wallet.",
        "error"
      );
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          MicroWallet
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Stellar Soroban DApp
        </p>
        
        <div className="space-y-4">
          {freighterDetected === false && (
            <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ Freighter wallet extension not detected. Please install it first.
            </div>
          )}
          
          {freighterDetected === true && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 rounded-lg text-sm text-green-800 dark:text-green-200">
              ✅ Freighter wallet detected!
            </div>
          )}
          
          <button
            onClick={connectWallet}
            disabled={isConnecting || freighterDetected === false}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? "Connecting..." : freighterDetected === false ? "Install Freighter First" : "Connect Freighter Wallet"}
          </button>
          
          <button
            onClick={() => {
              console.log("=== Freighter Debug Info ===");
              console.log("window.freighter exists:", !!(window as any).freighter);
              console.log("window.freighter object:", (window as any).freighter);
              console.log("All window keys containing 'freighter':", Object.keys(window).filter(k => k.toLowerCase().includes('freighter')));
              alert(`Freighter in window: ${!!(window as any).freighter ? 'YES ✅' : 'NO ❌'}\nCheck console for details (F12)`);
            }}
            className="w-full text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 py-2"
          >
            🔍 Debug Freighter Detection
          </button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <div>
              <p>Need test XLM?</p>
              <button
                onClick={() => router.push("/fund")}
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 underline font-semibold"
              >
                💰 Get Free Test XLM
              </button>
            </div>
            <div>
              <p>Don't have Freighter?</p>
              <a
                href="https://www.freighter.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                Install Freighter Wallet Extension
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Network Info
          </h2>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <span className="font-medium">Network:</span>{" "}
              {process.env.NEXT_PUBLIC_NETWORK || "TESTNET"}
            </p>
            <p className="break-all">
              <span className="font-medium">Contract:</span>{" "}
              {process.env.NEXT_PUBLIC_CONTRACT_ID?.substring(0, 20)}...
            </p>
            <p>
              <span className="font-medium">Freighter Status:</span>{" "}
              {freighterDetected === null ? "🔍 Checking..." : freighterDetected ? "✅ Detected" : "❌ Not Found"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
