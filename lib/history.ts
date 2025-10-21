import * as StellarSdk from "@stellar/stellar-sdk";
import { getConfig } from "./config";

export type Payment = {
  id: string;
  from: string;
  to: string;
  amount: string;
  asset: string; // e.g., XLM
  createdAt: string;
};

export async function getRecentPayments(
  publicKey: string,
  limit = 10
): Promise<Payment[]> {
  const cfg = getConfig();
  const horizon =
    cfg.network === "PUBLIC"
      ? "https://horizon.stellar.org"
      : "https://horizon-testnet.stellar.org";

  const server = new StellarSdk.Horizon.Server(horizon);
  const records = await server.payments().forAccount(publicKey).limit(limit).order("desc").call();

  const payments: Payment[] = [];
  for (const r of records.records) {
    if (r.type !== "payment") continue;
    // Native XLM only for simplicity
    if ("asset_type" in r && r.asset_type !== "native") continue;
    payments.push({
      id: r.id,
      from: (r as any).from,
      to: (r as any).to,
      amount: (r as any).amount,
      asset: "XLM",
      createdAt: (r as any).created_at,
    });
  }
  return payments;
}
