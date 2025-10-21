export type AppConfig = {
  network: "TESTNET" | "PUBLIC";
  rpcUrl: string;
  contractId: string;
};

const envConfig: AppConfig = {
  network: (process.env.NEXT_PUBLIC_NETWORK as "TESTNET" | "PUBLIC") || "TESTNET",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://soroban-testnet.stellar.org",
  contractId:
    process.env.NEXT_PUBLIC_CONTRACT_ID ||
    "CCJZ5DGASBWQXR5MPFH2F5BXQGWXLTJ5ZQMQXICXWO4PKLPCHBVDBWAE",
};

export function getConfig(): AppConfig {
  if (typeof window === "undefined") return envConfig;
  try {
    const raw = window.localStorage.getItem("microwallet:config");
    if (!raw) return envConfig;
    const overrides = JSON.parse(raw);
    return { ...envConfig, ...overrides } as AppConfig;
  } catch {
    return envConfig;
  }
}

export function setConfigPartial(partial: Partial<AppConfig>) {
  if (typeof window === "undefined") return;
  const current = getConfig();
  window.localStorage.setItem(
    "microwallet:config",
    JSON.stringify({ ...current, ...partial })
  );
}
