import * as StellarSdk from "@stellar/stellar-sdk";
import { getConfig } from "./config";

function getServer() {
  const cfg = getConfig();
  return new StellarSdk.SorobanRpc.Server(cfg.rpcUrl);
}

function getNetworkPassphrase() {
  const cfg = getConfig();
  return cfg.network === "TESTNET"
    ? StellarSdk.Networks.TESTNET
    : StellarSdk.Networks.PUBLIC;
}

/**
 * Get balance for a user from the contract
 */
export async function getBalance(publicKey: string): Promise<string> {
  try {
    const { contractId } = getConfig();
    const contract = new StellarSdk.Contract(contractId);
    const server = getServer();
    
    // Build the transaction to call get_balance
    const account = await server.getAccount(publicKey);
    
    const builtTransaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        contract.call(
          "get_balance",
          StellarSdk.nativeToScVal(publicKey, { type: "address" })
        )
      )
      .setTimeout(30)
      .build();

    // Simulate the transaction
    const simulation = await server.simulateTransaction(builtTransaction);

    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulation)) {
      const result = simulation.result?.retval;
      if (result) {
        // Convert ScVal to number (balance is in stroops)
        const balanceStroops = StellarSdk.scValToNative(result);
        return (balanceStroops / 10_000_000).toFixed(7);
      }
    }

    return "0";
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "0";
  }
}

/**
 * Deposit funds to the contract
 */
export async function deposit(publicKey: string, amount: string): Promise<void> {
  try {
    const { contractId } = getConfig();
    const contract = new StellarSdk.Contract(contractId);
    const server = getServer();
    const amountStroops = BigInt(Math.floor(parseFloat(amount) * 10_000_000));

    // Get account
    const account = await server.getAccount(publicKey);

    // Build transaction
    let transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        contract.call(
          "deposit",
          StellarSdk.nativeToScVal(publicKey, { type: "address" }),
          StellarSdk.nativeToScVal(amountStroops, { type: "i128" })
        )
      )
      .setTimeout(30)
      .build();

    // Simulate to prepare transaction
    const simulation = await server.simulateTransaction(transaction);

    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulation)) {
      transaction = StellarSdk.SorobanRpc.assembleTransaction(
        transaction,
        simulation
      ).build();
    } else {
      throw new Error("Simulation failed");
    }

    // Sign with Freighter
    const { signedTxXdr } = await (window as any).freighter.signTransaction(
      transaction.toXDR(),
      {
        network: getConfig().network,
        networkPassphrase: getNetworkPassphrase(),
      }
    );

    // Submit transaction
    const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
      signedTxXdr,
      getNetworkPassphrase()
    );
    const response = await getServer().sendTransaction(signedTransaction);

    // Wait for confirmation
    let status = await server.getTransaction(response.hash);
    while (status.status === "NOT_FOUND") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      status = await server.getTransaction(response.hash);
    }

    if (status.status === "SUCCESS") {
      console.log("Deposit successful!");
    } else {
      throw new Error("Transaction failed");
    }
  } catch (error) {
    console.error("Deposit error:", error);
    throw error;
  }
}

/**
 * Withdraw funds from the contract
 */
export async function withdraw(
  publicKey: string,
  amount: string
): Promise<void> {
  try {
    const { contractId } = getConfig();
    const contract = new StellarSdk.Contract(contractId);
    const server = getServer();
    const amountStroops = BigInt(Math.floor(parseFloat(amount) * 10_000_000));

    // Get account
    const account = await server.getAccount(publicKey);

    // Build transaction
    let transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: getNetworkPassphrase(),
    })
      .addOperation(
        contract.call(
          "withdraw",
          StellarSdk.nativeToScVal(publicKey, { type: "address" }),
          StellarSdk.nativeToScVal(amountStroops, { type: "i128" })
        )
      )
      .setTimeout(30)
      .build();

    // Simulate to prepare transaction
    const simulation = await server.simulateTransaction(transaction);

    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulation)) {
      transaction = StellarSdk.SorobanRpc.assembleTransaction(
        transaction,
        simulation
      ).build();
    } else {
      throw new Error("Simulation failed");
    }

    // Sign with Freighter
    const { signedTxXdr } = await (window as any).freighter.signTransaction(
      transaction.toXDR(),
      {
        network: getConfig().network,
        networkPassphrase: getNetworkPassphrase(),
      }
    );

    // Submit transaction
    const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
      signedTxXdr,
      getNetworkPassphrase()
    );
    const response = await getServer().sendTransaction(signedTransaction);

    // Wait for confirmation
    let status = await server.getTransaction(response.hash);
    while (status.status === "NOT_FOUND") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      status = await server.getTransaction(response.hash);
    }

    if (status.status === "SUCCESS") {
      console.log("Withdrawal successful!");
    } else {
      throw new Error("Transaction failed");
    }
  } catch (error) {
    console.error("Withdraw error:", error);
    throw error;
  }
}
