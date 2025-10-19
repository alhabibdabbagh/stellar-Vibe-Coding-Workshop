declare global {
  interface Window {
    freighter?: {
      getPublicKey: () => Promise<string>;
      signTransaction: (
        xdr: string,
        options: {
          network: string;
          networkPassphrase: string;
        }
      ) => Promise<{ signedTxXdr: string }>;
      isConnected: () => Promise<boolean>;
    };
  }
}

export {};
