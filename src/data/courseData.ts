import {
  Wallet,
  Building2,
  Code2,
  ShieldCheck,
  CreditCard,
  Cpu,
  Network,
  LineChart
} from 'lucide-react';

export type LessonType = 'video' | 'text' | 'quiz' | 'game';
export type CourseLevel = 'beginner' | 'intermediate' | 'expert';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  title: string;
  type: LessonType;
  content?: string;
  videoId?: string;
  quiz?: QuizQuestion[];
  gameType?: 'trading' | 'matching';
}

export interface Module {
  id: string;
  level: CourseLevel;
  title: string;
  description: string;
  icon: any;
  color: string;
  lessons: LessonContent[];
}

export const courseModules: Module[] = [
  // BEGINNER LEVEL
  {
    id: 'crypto-coinbase',
    level: 'beginner',
    title: 'Digital Currency & Coinbase',
    description: 'Understanding the blockchain, CEXs, and Layer 2 scaling with Base.',
    icon: Wallet,
    color: 'bg-blue-600',
    lessons: [
      {
        id: 'crypto-1',
        title: 'The Public Ledger & CEXs',
        type: 'text',
        content: `### The Double-Spending Problem
Before Bitcoin, digital money had a fatal flaw: you could just copy and paste the file. If I have a digital $10 bill, what stops me from sending it to Alice *and* Bob? This is the **double-spending problem**.

A **Blockchain** solves this by acting as a decentralized, public ledger. Every transaction is recorded on a "block." Once full, it's locked and chained to the previous block using cryptography. Millions of computers (nodes) verify this ledger, making it nearly impossible to hack or forge.

### Enter Coinbase (The CEX)
Interacting directly with a blockchain requires managing complex cryptographic keys. If you lose your key, you lose your money forever. 

**Coinbase** is a Centralized Exchange (CEX). It acts as a bridge between traditional banking (fiat) and the blockchain. When you buy Bitcoin on Coinbase, Coinbase holds the actual cryptographic keys on your behalf. They provide a user-friendly interface, regulatory compliance, and insurance against hacks, making it the standard entry point for beginners.`
      },
      {
        id: 'crypto-game',
        title: 'Coinbase Simulator',
        type: 'game',
        gameType: 'coinbase'
      },
      {
        id: 'crypto-2',
        title: 'Scaling Ethereum: Base L2',
        type: 'text',
        content: `### The Trilemma
Blockchains face a "Trilemma": they struggle to be simultaneously **Secure**, **Decentralized**, and **Scalable**. Ethereum chose security and decentralization. As a result, when the network gets busy, transaction fees (gas) can spike to $50 or more just to send money!

### Layer 2 (L2) Solutions
To fix this, developers created **Layer 2 (L2)** networks. Think of Ethereum (Layer 1) as a Supreme Court—highly secure but slow and expensive. Layer 2 is like a local traffic court—fast and cheap.

**Base** is an L2 network built by Coinbase using the "Optimistic Rollup" architecture (specifically the OP Stack). 
* **How it works:** Base processes thousands of transactions off-chain, bundles them up into a single tiny package (a rollup), and submits just the receipt to Ethereum.
* **The Result:** You get the ironclad security of Ethereum, but transactions cost pennies and settle instantly. Base is rapidly becoming the foundation for consumer crypto apps.`
      },
      {
        id: 'crypto-quiz',
        title: 'Blockchain Basics Quiz',
        type: 'quiz',
        quiz: [
          {
            question: 'What is the primary function of a Layer 2 network like Base?',
            options: ['To replace Ethereum entirely', 'To process transactions faster and cheaper while inheriting Layer 1 security', 'To store physical cash', 'To generate passwords'],
            correctAnswer: 1,
            explanation: 'Layer 2 networks like Base scale blockchains by processing transactions off-chain and settling them on the highly secure Layer 1 (Ethereum).'
          }
        ]
      }
    ]
  },
  {
    id: 'brokerage-schwab',
    level: 'beginner',
    title: 'Retail Trading: Robinhood vs Schwab',
    description: 'How modern brokerages execute trades and make money.',
    icon: Building2,
    color: 'bg-slate-700',
    lessons: [
      {
        id: 'schwab-1',
        title: 'The Evolution of Brokerages',
        type: 'text',
        content: `### Traditional Brokerages (Schwab)
Decades ago, buying a stock required calling a broker on the phone and paying a massive commission (e.g., $50 per trade). Institutions like **Charles Schwab** pioneered discount brokerage, eventually bringing trading online. They offer deep research tools, direct market access routing, and complex derivatives trading. They make money primarily through interest on uninvested cash and asset management fees.

### The Zero-Fee Revolution (Robinhood)
**Robinhood** changed the industry by introducing zero-commission trading and a highly gamified, mobile-first UI. But if trades are free, how do they make money?

**Payment for Order Flow (PFOF):**
When you tap "Buy AAPL" on Robinhood, they don't send your order directly to the New York Stock Exchange. Instead, they route it to a massive algorithmic trading firm called a **Market Maker** (like Citadel Securities). 
1. The Market Maker executes your trade instantly.
2. The Market Maker makes a tiny fraction of a cent on the "spread" (the difference between the buy and sell price).
3. The Market Maker pays Robinhood a fee for routing the order to them.

This system democratized access to the markets, but critics argue it can result in slightly worse execution prices for retail traders compared to direct routing.`
      },
      {
        id: 'schwab-game',
        title: 'Market Simulator',
        type: 'game',
        gameType: 'trading'
      }
    ]
  },

  // INTERMEDIATE LEVEL
  {
    id: 'algo-alpaca',
    level: 'intermediate',
    title: 'Algorithmic Trading & Alpaca',
    description: 'Using code to execute trades automatically via APIs.',
    icon: Code2,
    color: 'bg-emerald-600',
    lessons: [
      {
        id: 'alpaca-1',
        title: 'Trading with Code',
        type: 'text',
        content: `### The API-First Brokerage
Traditional brokerages are built for humans clicking buttons on a screen. But what if you want a computer to trade for you? 

**Alpaca** is an API-first brokerage. It provides a programmatic interface (API) that allows your code to talk directly to the stock and crypto markets. You write a Python or Node.js script, connect it to Alpaca, and your program trades 24/7 without emotion.

### REST vs WebSockets
To build a trading bot, you need two things:
1. **Market Data (WebSockets):** You need to know the price of Apple *right now*. Alpaca provides a WebSocket connection—a persistent, open pipeline that streams live price updates to your code in milliseconds.
2. **Execution (REST API):** When your algorithm decides to buy, it sends a standard HTTP POST request (REST API) to Alpaca's servers to execute the trade.

### Example: Buying Apple Stock
Here is what an algorithmic trade looks like in Node.js using the Alpaca SDK:

\`\`\`javascript
const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
  keyId: process.env.ALPACA_KEY,
  secretKey: process.env.ALPACA_SECRET,
  paper: true, // Use paper trading to test without real money!
});

// Submit a market order to buy 1 share of Apple
alpaca.createOrder({
  symbol: 'AAPL',
  qty: 1,
  side: 'buy',
  type: 'market',
  time_in_force: 'day'
}).then((order) => {
  console.log("Order executed!", order.id);
});
\`\`\``
      },
      {
        id: 'alpaca-game',
        title: 'Alpaca Algo Simulator',
        type: 'game',
        gameType: 'alpaca'
      },
      {
        id: 'alpaca-quiz',
        title: 'API Trading Quiz',
        type: 'quiz',
        quiz: [
          {
            question: 'Why do algorithmic traders prefer WebSockets over REST APIs for receiving market data?',
            options: ['WebSockets are more secure', 'WebSockets provide a persistent connection for real-time streaming data, whereas REST requires constant polling', 'WebSockets are written in Python', 'REST APIs cannot handle financial data'],
            correctAnswer: 1,
            explanation: 'WebSockets keep a connection open, allowing the server to push live price updates to the client instantly, which is critical for algorithmic trading.'
          }
        ]
      }
    ]
  },
  {
    id: 'payments-stripe',
    level: 'intermediate',
    title: 'Payment Infrastructure & Stripe',
    description: 'How money moves across the internet.',
    icon: CreditCard,
    color: 'bg-indigo-500',
    lessons: [
      {
        id: 'stripe-1',
        title: 'The Universal Translator',
        type: 'text',
        content: `### The Complexity of Internet Money
Moving money online is incredibly complex. A single credit card transaction involves:
1. The Merchant (You)
2. The Payment Gateway
3. The Payment Processor
4. The Card Network (Visa, Mastercard)
5. The Issuing Bank (The customer's bank)
6. The Acquiring Bank (Your bank)

**Stripe** abstracts this entire 6-step process into a single, elegant API. They act as the universal translator for internet money, handling fraud detection (Stripe Radar), international currency conversion, and compliance.

### The PaymentIntent API
Modern Stripe integrations use the \`PaymentIntent\` API. Instead of just "charging a card," a PaymentIntent tracks the lifecycle of a customer checkout process.

\`\`\`javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a PaymentIntent for $20.00 USD
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000, // Amounts are always in cents!
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});

// Send the client_secret to the frontend to complete the payment
res.json({ clientSecret: paymentIntent.client_secret });
\`\`\`

### Fiat-to-Crypto Onramps
Recently, Stripe has expanded into Web3. They now offer "Onramp" widgets that developers can embed in their apps, allowing users to buy crypto (like USDC on Base L2) directly with their credit cards, bridging the gap between traditional finance and DeFi.`
      }
    ]
  },

  // EXPERT LEVEL
  {
    id: 'defi-smart-contracts',
    level: 'expert',
    title: 'DeFi & Smart Contracts',
    description: 'Building financial systems without middlemen.',
    icon: Cpu,
    color: 'bg-purple-600',
    lessons: [
      {
        id: 'defi-1',
        title: 'Automated Market Makers (AMMs)',
        type: 'text',
        content: `### The Order Book vs The AMM
Traditional exchanges (like Coinbase or Schwab) use an **Order Book**. Buyers list what they are willing to pay, sellers list what they are willing to accept, and the exchange matches them.

DeFi (Decentralized Finance) operates on blockchains where updating an order book every millisecond is too slow and expensive. Enter the **Automated Market Maker (AMM)**, pioneered by Uniswap.

### Liquidity Pools
Instead of matching buyers and sellers, an AMM uses a **Liquidity Pool**—a giant pot of two tokens (e.g., ETH and USDC) locked inside a Smart Contract. 

The price of the tokens is determined by a simple mathematical formula: \`x * y = k\`.
* \`x\` is the amount of Token A in the pool.
* \`y\` is the amount of Token B in the pool.
* \`k\` is a constant number.

If you want to buy ETH from the pool, you must put USDC into the pool. Because the amount of ETH (\`x\`) goes down, the amount of USDC (\`y\`) must go up to keep \`k\` constant. This automatically increases the price of ETH!

### Smart Contract Risk
Because DeFi protocols hold billions of dollars and are completely open-source, they are massive targets for hackers. If there is a single logical flaw in the Solidity code, an attacker can drain the entire Liquidity Pool. This is why **Smart Contract Audits** are the most critical step in DeFi development.`
      },
      {
        id: 'defi-quiz',
        title: 'DeFi Architecture Quiz',
        type: 'quiz',
        quiz: [
          {
            question: 'How does an Automated Market Maker (AMM) determine the price of an asset?',
            options: ['By matching buyers and sellers in an order book', 'By using a mathematical formula (like x * y = k) based on the ratio of tokens in a liquidity pool', 'By asking a centralized oracle for the price', 'By voting among token holders'],
            correctAnswer: 1,
            explanation: 'AMMs use deterministic mathematical formulas based on the ratio of assets in a liquidity pool to set prices instantly without needing a counterparty.'
          }
        ]
      }
    ]
  },
  {
    id: 'hft-systems',
    level: 'expert',
    title: 'High-Frequency Trading Architecture',
    description: 'Microseconds matter: the infrastructure of HFT.',
    icon: Network,
    color: 'bg-red-600',
    lessons: [
      {
        id: 'hft-1',
        title: 'Optimizing Physics',
        type: 'text',
        content: `### The Speed of Light is Too Slow
In **High-Frequency Trading (HFT)**, algorithms execute thousands of trades in fractions of a second to capture tiny price discrepancies (arbitrage). At this level, you aren't competing on better financial models; you are competing against the laws of physics.

Light travels through fiber optic cables at roughly 200,000 kilometers per second. If your trading server is in Chicago and the exchange is in New York, the data takes about 13 milliseconds to make a round trip. In HFT, 13 milliseconds is an eternity.

### Colocation & FPGAs
To win, HFT firms use two primary strategies:
1. **Colocation:** They pay millions of dollars to place their servers in the exact same data center as the exchange's matching engine. This reduces the physical distance the data must travel, cutting latency from milliseconds to microseconds.
2. **FPGAs (Field-Programmable Gate Arrays):** Standard CPUs process instructions sequentially using an operating system (Linux), which adds overhead. HFT firms use FPGAs—custom hardware chips where the trading algorithm is literally wired into the silicon. This allows them to process market data and execute trades in *nanoseconds*, bypassing the operating system entirely.`
      }
    ]
  }
];
