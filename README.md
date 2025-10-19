# 🌟 MicroWallet - Stellar Soroban DApp

A decentralized wallet application built on the **Stellar blockchain** using **Soroban smart contracts**. This project demonstrates how to create a full-stack Web3 application with deposit and withdrawal functionality.

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Stellar](https://img.shields.io/badge/Stellar-Soroban-7D00FF?style=flat-square&logo=stellar)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Smart Contract](#-smart-contract)
- [Usage Guide](#-usage-guide)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**MicroWallet** is a Web3 decentralized application (DApp) that allows users to:
- Connect their **Freighter Wallet** to the Stellar Testnet
- **Deposit** XLM tokens into a Soroban smart contract
- **Withdraw** XLM tokens from the contract
- View real-time balance from the blockchain
- Fund test accounts with free Testnet XLM via Friendbot

This project is ideal for learning:
- Stellar blockchain development
- Soroban smart contract integration
- Next.js 15 App Router with React 18
- TypeScript and modern Web3 patterns
- Freighter wallet integration

---

## ✨ Features

### Core Functionality
- ✅ **Wallet Connection** - Seamless Freighter wallet integration
- ✅ **Deposit System** - Transfer XLM to smart contract
- ✅ **Withdrawal System** - Retrieve XLM from smart contract
- ✅ **Balance Tracking** - Real-time contract balance display
- ✅ **Friendbot Integration** - Get free Testnet XLM instantly
- ✅ **Network Detection** - Automatic Testnet/Mainnet detection
- ✅ **Transaction Signing** - Secure transaction signing with Freighter
- ✅ **Error Handling** - User-friendly error messages

### UI/UX Features
- 🎨 **Modern Design** - Beautiful gradient UI with Tailwind CSS
- 🌓 **Dark Mode Support** - Automatic dark/light theme detection
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔔 **Status Indicators** - Visual feedback for all operations
- 🐛 **Debug Tools** - Built-in Freighter detection debugging

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.5.5](https://nextjs.org/)** - React framework with App Router
- **[React 18.3.1](https://react.dev/)** - UI library
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework

### Blockchain
- **[Stellar SDK 12.3.0](https://stellar.github.io/js-stellar-sdk/)** - JavaScript SDK for Stellar
- **[Soroban](https://soroban.stellar.org/)** - Smart contract platform
- **[Freighter Wallet](https://www.freighter.app/)** - Browser extension wallet

### Development Tools
- **[Node.js 20+](https://nodejs.org/)** - JavaScript runtime
- **[npm 10+](https://www.npmjs.com/)** - Package manager
- **[Git](https://git-scm.com/)** - Version control

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
```bash
# Node.js (version 20 or higher)
node --version  # Should output v20.x.x or higher

# npm (version 10 or higher)
npm --version   # Should output 10.x.x or higher

# Git
git --version
```

### Required Browser Extension
- **[Freighter Wallet](https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk)** - Chrome/Edge/Brave extension for Stellar

### Optional (For Contract Development)
- **[Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools)** - For deploying contracts
- **[Rust](https://www.rust-lang.org/)** - For compiling Soroban contracts

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/alhabibdabbagh/stellar-Vibe-Coding-Workshop.git
cd stellar-Vibe-Coding-Workshop
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- Next.js and React
- Stellar SDK
- Tailwind CSS
- TypeScript and type definitions
- All other dependencies

### 3. Verify Installation
```bash
# Check if all packages are installed
npm list --depth=0
```

---

## ⚙️ Configuration

### Environment Variables

Create or verify the `.env` file in the root directory:

```env
# Stellar Network Configuration
NEXT_PUBLIC_NETWORK=TESTNET
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_CONTRACT_ID=CCJZ5DGASBWQXR5MPFH2F5BXQGWXLTJ5ZQMQXICXWO4PKLPCHBVDBWAE
```

### Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_NETWORK` | Network type (`TESTNET` or `PUBLIC`) | `TESTNET` |
| `NEXT_PUBLIC_RPC_URL` | Soroban RPC endpoint | Testnet URL |
| `NEXT_PUBLIC_CONTRACT_ID` | Deployed contract address | Your contract ID |

### Deploying Your Own Contract

If you want to deploy your own Soroban contract:

```bash
# Navigate to contract directory
cd contract

# Build the contract
stellar contract build

# Deploy to testnet
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/microwallet.wasm \
  --network testnet

# Copy the contract ID to .env
# NEXT_PUBLIC_CONTRACT_ID=<your-contract-id>
```

---

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.x.x:3000 (your local IP)

### Production Build

Build and run in production mode:

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Background Process (Windows)

To run as a background job in PowerShell:

```powershell
Start-Job -ScriptBlock { 
  Set-Location "path\to\MicroWallet"; 
  npm run dev 
} -Name "MicroWallet"

# Check status
Get-Job -Name "MicroWallet"

# Stop server
Stop-Job -Name "MicroWallet"
Remove-Job -Name "MicroWallet"
```

---

## 📁 Project Structure

```
MicroWallet/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page (wallet connection)
│   ├── globals.css              # Global styles
│   ├── main/
│   │   └── page.tsx            # Main wallet UI (deposit/withdraw)
│   └── fund/
│       └── page.tsx            # Friendbot funding page
│
├── lib/
│   └── stellar.ts              # Stellar SDK integration
│
├── types/
│   └── freighter.d.ts          # TypeScript definitions for Freighter
│
├── contract/                    # Soroban smart contract (Rust)
│   ├── src/
│   │   └── lib.rs              # Contract source code
│   ├── Cargo.toml              # Rust dependencies
│   └── target/                 # Compiled WASM files
│
├── public/                      # Static assets
│
├── .env                         # Environment variables (not in repo)
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

### Key Files Explained

#### `app/page.tsx` - Home Page
- Freighter wallet detection
- Connection button
- Network information display
- Debug tools

#### `app/main/page.tsx` - Main Wallet Interface
- Display contract balance
- Deposit form
- Withdraw form
- Transaction handling

#### `app/fund/page.tsx` - Friendbot Page
- Get public key from Freighter
- Request test XLM from Friendbot
- Account funding interface

#### `lib/stellar.ts` - Stellar Integration
- `getBalance()` - Fetch user balance from contract
- `deposit()` - Deposit XLM to contract
- `withdraw()` - Withdraw XLM from contract
- Transaction building and signing

---

## 🔗 Smart Contract

The Soroban smart contract provides the following functions:

### Contract Interface

```rust
// Get user's balance in the contract
pub fn get_balance(env: Env, user: Address) -> i128

// Deposit XLM to the contract
pub fn deposit(env: Env, user: Address, amount: i128) -> Result<(), Error>

// Withdraw XLM from the contract
pub fn withdraw(env: Env, user: Address, amount: i128) -> Result<(), Error>
```

### Deployed Contract

- **Network**: Stellar Testnet
- **Contract ID**: `CCJZ5DGASBWQXR5MPFH2F5BXQGWXLTJ5ZQMQXICXWO4PKLPCHBVDBWAE`
- **RPC Endpoint**: `https://soroban-testnet.stellar.org`

---

## 📖 Usage Guide

### Step 1: Install Freighter Wallet

1. Install [Freighter](https://www.freighter.app/) browser extension
2. Create a new wallet or import existing one
3. Switch to **Testnet** in Freighter settings:
   - Click Freighter icon → Settings → Network → Test Net

### Step 2: Fund Your Account

**Option A: Use Built-in Friendbot Page**
1. Open http://localhost:3000/fund
2. Click "📋 Get Key from Freighter"
3. Click "💰 Fund with Friendbot"
4. Wait for confirmation (10,000 XLM)

**Option B: Use Stellar Laboratory**
1. Copy your public key from Freighter
2. Visit [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)
3. Paste public key and click "Get test network lumens"

### Step 3: Connect Wallet

1. Open http://localhost:3000
2. Wait for "✅ Freighter wallet detected!" message
3. Click "Connect Freighter Wallet"
4. Approve connection in Freighter popup

### Step 4: Deposit XLM

1. You'll be redirected to `/main` page
2. Enter amount (e.g., `10`)
3. Click "Deposit" button
4. Sign transaction in Freighter popup
5. Wait for confirmation
6. Balance will update automatically

### Step 5: Withdraw XLM

1. Enter amount to withdraw
2. Click "Withdraw" button
3. Sign transaction in Freighter
4. Wait for confirmation
5. Check updated balance

---

## 🐛 Troubleshooting

### Common Issues

#### ❌ "Freighter wallet extension not detected"

**Solutions:**
1. Install Freighter from [Chrome Web Store](https://www.freighter.app/)
2. Refresh the page after installation
3. Make sure extension is enabled
4. Click "🔍 Debug Freighter Detection" button
5. Check browser console (F12) for details

#### ❌ "ERR_CONNECTION_REFUSED" on localhost:3000

**Solutions:**
```bash
# Kill existing processes
taskkill /F /IM node.exe

# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Restart server
npm run dev
```

#### ❌ "account already funded to starting balance"

**This is actually SUCCESS!** Your account already has XLM. Check Freighter balance.

#### ❌ Hydration Error in Console

Already fixed with `suppressHydrationWarning`. If you see it:
1. Clear browser cache
2. Refresh page (Ctrl+F5)

#### ❌ Transaction Failed

**Possible causes:**
1. Insufficient XLM balance
2. Wrong network (check Testnet vs Mainnet)
3. Contract ID mismatch
4. Network connection issues

**Solutions:**
```bash
# Check your balance in Freighter
# Verify .env configuration
# Check contract ID is correct
# Try with smaller amount
```

### Debug Mode

Enable debug logging:

```typescript
// In lib/stellar.ts, add:
console.log("Transaction XDR:", transaction.toXDR());
console.log("Simulation result:", simulation);
```

### Network Issues

If Soroban RPC is unreachable:

```bash
# Test RPC connection
curl https://soroban-testnet.stellar.org

# Alternative RPC endpoints
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org:443
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### 1. Fork the Repository

Click the "Fork" button on GitHub.

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes

- Follow existing code style
- Add comments for complex logic
- Update README if needed

### 4. Commit Changes

```bash
git add .
git commit -m "feat: Add amazing feature"
```

### 5. Push to GitHub

```bash
git push origin feature/amazing-feature
```

### 6. Open a Pull Request

Go to GitHub and create a PR with description of changes.

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use async/await for promises
- Add error handling
- Write descriptive commit messages

---

## 📚 Resources

### Stellar & Soroban
- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Stellar SDK Docs](https://stellar.github.io/js-stellar-sdk/)
- [Soroban Examples](https://github.com/stellar/soroban-examples)

### Next.js & React
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools
- [Freighter Wallet](https://www.freighter.app/)
- [Stellar Laboratory](https://laboratory.stellar.org/)
- [Stellar Expert](https://stellar.expert/explorer/testnet)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Al Habib Dabbagh**

- GitHub: [@alhabibdabbagh](https://github.com/alhabibdabbagh)
- Repository: [stellar-Vibe-Coding-Workshop](https://github.com/alhabibdabbagh/stellar-Vibe-Coding-Workshop)

---

## 🌟 Acknowledgments

- [Stellar Development Foundation](https://stellar.org/) for the amazing blockchain platform
- [Freighter Team](https://www.freighter.app/) for the wallet extension
- [Vercel](https://vercel.com/) for Next.js framework
- All contributors to this project

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an [Issue](https://github.com/alhabibdabbagh/stellar-Vibe-Coding-Workshop/issues)
3. Join [Stellar Discord](https://discord.gg/stellardev)

---

## 🎉 Happy Coding!

If you find this project helpful, please give it a ⭐ on GitHub!

```bash
# Quick start reminder
npm install
npm run dev
# Open http://localhost:3000
```

Made with ❤️ and ☕ using Stellar Soroban