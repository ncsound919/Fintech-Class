import {
  Wallet,
  Building2,
  Code2,
  ShieldCheck,
  CreditCard,
  Cpu,
  Network,
  LineChart,
  Landmark,
  Globe,
  Zap,
  BookOpen
} from 'lucide-react';

export type LessonType = 'video' | 'text' | 'quiz' | 'game' | 'visual' | 'interactive';
export type CourseLevel = 'beginner' | 'intermediate' | 'expert';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface VisualStep {
  step: number;
  title: string;
  description: string;
  emoji: string;
  detail: string;
}

export interface LessonContent {
  id: string;
  title: string;
  type: LessonType;
  content?: string;
  videoId?: string;
  quiz?: QuizQuestion[];
  gameType?: 'trading' | 'matching' | 'coinbase' | 'alpaca' | 'defi' | 'payments';
  visualSteps?: VisualStep[];
  infographic?: {
    title: string;
    nodes: { label: string; description: string; color: string; emoji: string }[];
  };
}

export interface Module {
  id: string;
  level: CourseLevel;
  title: string;
  description: string;
  icon: any;
  color: string;
  lessons: LessonContent[];
  xpReward?: number;
  estimatedMinutes?: number;
}

export const courseModules: Module[] = [
  // ─────────────────────────────────────────
  // BEGINNER LEVEL
  // ─────────────────────────────────────────
  {
    id: 'onboarding',
    level: 'beginner',
    title: 'Welcome to Fintech — Start Here 🚀',
    description: 'A zero-jargon, visual walkthrough of what Fintech actually is and how it touches your daily life.',
    icon: BookOpen,
    color: 'bg-gradient-to-r from-violet-500 to-indigo-500',
    xpReward: 50,
    estimatedMinutes: 10,
    lessons: [
      {
        id: 'onboarding-1',
        title: 'What Even Is Fintech?',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '📱',
            title: 'You Already Use Fintech',
            description: 'Fintech = Financial Technology',
            detail: 'Every time you tap your phone to pay at Starbucks, split a bill on Venmo, or check your Cash App balance — that\'s fintech. It\'s just software that moves, manages, or grows money faster and cheaper than the old-school bank model.'
          },
          {
            step: 2,
            emoji: '🏦',
            title: 'The Old Way',
            description: 'Banks, paper, and slow wires',
            detail: 'Before fintech, you physically drove to a bank branch. You filled out paper forms. International wire transfers took 3–5 business days and cost $35+ in fees. Banks had monopoly control over your money.'
          },
          {
            step: 3,
            emoji: '⚡',
            title: 'The New Way',
            description: 'APIs, apps, and instant settlement',
            detail: 'Fintech companies built software APIs (think: digital plumbing) on top of the old banking infrastructure. Now you can send $1 globally in seconds, invest spare change automatically, or borrow money in minutes — all from your phone.'
          },
          {
            step: 4,
            emoji: '🗺️',
            title: 'The Fintech Map',
            description: 'There are 8 major branches of Fintech',
            detail: 'Payments (Stripe, Venmo), Banking (Chime, N26), Investing (Robinhood, Alpaca), Crypto (Coinbase, Uniswap), Insurance (Lemonade), Lending (SoFi), RegTech (compliance software), and Infrastructure (Plaid, Dwolla). Each module in this course covers one of these branches.'
          },
          {
            step: 5,
            emoji: '🎯',
            title: 'Your Learning Path',
            description: 'Beginner → Intermediate → Expert',
            detail: 'We start with the concepts you already feel (paying, investing). Then we go under the hood (APIs, algorithms). Then we go deep into the frontier (DeFi, HFT, AI). No prior coding or finance knowledge required — just curiosity.'
          }
        ]
      },
      {
        id: 'onboarding-quiz',
        title: 'Quick Check: Do You Get It?',
        type: 'quiz',
        quiz: [
          {
            question: 'Which of these is NOT an example of fintech?',
            options: ['Sending money via Venmo', 'Buying stocks on Robinhood', 'Withdrawing cash from an ATM', 'Getting a loan approved in 3 minutes via an app'],
            correctAnswer: 2,
            explanation: 'ATMs are technically banking hardware, not fintech software. Fintech refers to software-driven financial services that disrupt or improve on traditional banking.'
          },
          {
            question: 'What does an API do in fintech?',
            options: [
              'It prints money',
              'It acts as digital plumbing — letting apps talk to banks, payment networks, and data sources',
              'It replaces your credit card',
              'It mines Bitcoin'
            ],
            correctAnswer: 1,
            explanation: 'APIs (Application Programming Interfaces) are how fintech companies connect software systems. Stripe uses APIs to connect merchants to card networks. Plaid uses APIs to connect apps to your bank account.'
          }
        ]
      }
    ]
  },
  {
    id: 'crypto-coinbase',
    level: 'beginner',
    title: 'Digital Currency & Coinbase',
    description: 'Understanding the blockchain, CEXs, and Layer 2 scaling with Base.',
    icon: Wallet,
    color: 'bg-blue-600',
    xpReward: 100,
    estimatedMinutes: 20,
    lessons: [
      {
        id: 'crypto-visual-1',
        title: 'How a Blockchain Actually Works (Visual)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '🐛',
            title: 'The Double-Spend Problem',
            description: 'Digital money could be copied like a file',
            detail: 'Imagine a digital dollar bill as a JPG image. Nothing stops you from copying and pasting it a thousand times. Before Bitcoin, this was an unsolved problem — digital cash required a trusted middleman (a bank) to keep score of who owned what.'
          },
          {
            step: 2,
            emoji: '📋',
            title: 'The Shared Ledger',
            description: 'A Google Doc that 10 million people can read but nobody can secretly edit',
            detail: 'A blockchain is a shared record book. Every transaction ("Alice sent 1 BTC to Bob") is written publicly. The twist: the record is stored on millions of computers worldwide. There\'s no single server to hack or bribe.'
          },
          {
            step: 3,
            emoji: '🔗',
            title: 'Why It\'s Called a CHAIN',
            description: 'Each block contains the fingerprint of the block before it',
            detail: 'Each "block" of transactions includes a cryptographic hash — a digital fingerprint — of the previous block. Change one old transaction and every block after it breaks like a chain of dominoes. This makes the history tamper-proof.'
          },
          {
            step: 4,
            emoji: '🏦',
            title: 'Enter Coinbase',
            description: 'A user-friendly door into the blockchain world',
            detail: 'Managing cryptographic keys yourself is risky — lose your key, lose your money forever. Coinbase is a Centralized Exchange (CEX) that holds your keys, provides an easy UI, complies with US regulations, and insures your holdings. Think of it as a bank account for crypto — with training wheels.'
          },
          {
            step: 5,
            emoji: '⚡',
            title: 'Base L2: Ethereum, But Fast',
            description: 'Coinbase built a highway on top of Ethereum',
            detail: 'Ethereum is secure but slow and expensive (gas fees can hit $50+). Base is a Layer 2 (L2) network Coinbase built on top of Ethereum. It bundles thousands of transactions together and submits them as one receipt to Ethereum. The result: $0.01 fees and near-instant confirmation — with Ethereum\'s full security backing it.'
          }
        ]
      },
      {
        id: 'crypto-1',
        title: 'The Public Ledger & CEXs — Deep Dive',
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
    xpReward: 100,
    estimatedMinutes: 15,
    lessons: [
      {
        id: 'schwab-visual',
        title: 'What Happens When You Tap Buy? (Visual)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '👆',
            title: 'You Tap "Buy AAPL"',
            description: 'The journey begins on your phone',
            detail: 'You open Robinhood, search for Apple stock, type in 1 share, and tap Buy. What happens next is invisible to you but involves 5+ organizations communicating in milliseconds.'
          },
          {
            step: 2,
            emoji: '📡',
            title: 'Robinhood Receives Your Order',
            description: 'Your order hits Robinhood\'s servers',
            detail: 'Robinhood\'s servers validate your order — do you have enough funds? Is the market open? Is AAPL a real ticker? If yes, your order moves to the next step. If not, you get an error message.'
          },
          {
            step: 3,
            emoji: '🔀',
            title: 'Payment for Order Flow (PFOF)',
            description: 'Robinhood sells your order to a Market Maker',
            detail: 'Instead of sending your order to the NYSE directly, Robinhood routes it to a Market Maker like Citadel Securities. Citadel pays Robinhood a tiny fee per order. This is how Robinhood makes money with "free" trades — a controversial but legal practice called Payment for Order Flow.'
          },
          {
            step: 4,
            emoji: '⚡',
            title: 'Citadel Fills Your Order',
            description: 'The Market Maker executes your trade',
            detail: 'Citadel has massive pools of Apple shares and can fill your order instantly from their own inventory. They make a fraction of a cent on the "spread" (the gap between buy price and sell price). Your trade is done in under a second.'
          },
          {
            step: 5,
            emoji: '✅',
            title: 'Settlement: T+1',
            description: 'You see the share, but money moves tomorrow',
            detail: 'You instantly see AAPL appear in your portfolio. But the actual cash settlement — where money physically moves between banks — happens the next business day (T+1, where T = trade date). The US moved from T+2 to T+1 in 2024, and crypto is working toward T+0 (instant).'
          }
        ]
      },
      {
        id: 'schwab-1',
        title: 'The Evolution of Brokerages — Deep Dive',
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
      },
      {
        id: 'schwab-quiz',
        title: 'Brokerage Quiz',
        type: 'quiz',
        quiz: [
          {
            question: 'How does Robinhood make money if it charges $0 in commissions?',
            options: [
              'It charges a monthly subscription fee',
              'It sells your order flow to Market Makers who pay for the right to execute your trades',
              'It charges withdrawal fees',
              'It doesn\'t make money — it\'s a nonprofit'
            ],
            correctAnswer: 1,
            explanation: 'Payment for Order Flow (PFOF) is Robinhood\'s primary revenue source. Market Makers like Citadel pay for the right to fill retail orders, profiting on the spread while Robinhood earns routing fees.'
          }
        ]
      }
    ]
  },
  {
    id: 'neobanks',
    level: 'beginner',
    title: 'Neobanks: Banking Without a Building',
    description: 'How Chime, Cash App & friends replaced the branch with an app.',
    icon: Landmark,
    color: 'bg-teal-600',
    xpReward: 80,
    estimatedMinutes: 12,
    lessons: [
      {
        id: 'neobank-visual',
        title: 'Neobank vs Traditional Bank (Visual Flow)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '🏢',
            title: 'Traditional Banks Have Huge Overhead',
            description: 'Branches, tellers, ATM fleets, legacy systems',
            detail: 'Wells Fargo operates 4,900+ branches nationwide. Every branch has rent, staff, electricity, and IT costs. These costs get passed to you as monthly fees, minimum balance requirements, and low savings rates.'
          },
          {
            step: 2,
            emoji: '📱',
            title: 'Neobanks Are 100% App-Based',
            description: 'No branches. No fees. No minimum balance.',
            detail: 'Chime, SoFi, and Revolut operate purely through mobile apps. No branches means near-zero overhead, which means: no monthly fees, early direct deposit, higher savings APY, and real-time spending notifications.'
          },
          {
            step: 3,
            emoji: '🔑',
            title: 'They\'re Not Actually Banks (Usually)',
            description: 'Neobanks partner with FDIC-insured banks behind the scenes',
            detail: 'Chime is not a bank — it\'s a fintech company. Your money is actually held at Stride Bank or Bancorp Bank (FDIC-insured). Chime is just a beautifully designed interface layered on top. This is called a "Banking-as-a-Service" (BaaS) model.'
          },
          {
            step: 4,
            emoji: '💸',
            title: 'How They Make Money',
            description: 'Interchange fees — a cut every time you swipe',
            detail: 'Every time you use your Chime debit card, the merchant\'s bank pays a small fee (interchange) to the card network (Visa), which shares a portion with Chime. The more you spend, the more Chime earns — no need to charge you fees.'
          },
          {
            step: 5,
            emoji: '⚠️',
            title: 'The Catch: Customer Service',
            description: 'No branch = no human when things go wrong',
            detail: 'Neobank customers frequently report frozen accounts and slow dispute resolution. Without a branch to walk into, you\'re stuck with chatbots or email. For most everyday banking, neobanks are superior — but for complex issues, traditional banks still have an edge.'
          }
        ]
      },
      {
        id: 'neobank-quiz',
        title: 'Neobank Knowledge Check',
        type: 'quiz',
        quiz: [
          {
            question: 'Chime has no monthly fees. How does it primarily make revenue?',
            options: [
              'Monthly subscriptions',
              'Interchange fees every time a user swipes their debit card',
              'Charging interest on checking accounts',
              'Selling user data'
            ],
            correctAnswer: 1,
            explanation: 'Neobanks like Chime make money primarily through interchange fees — a small percentage paid by merchants each time you use your debit card. The more you spend, the more they earn.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────
  // INTERMEDIATE LEVEL
  // ─────────────────────────────────────────
  {
    id: 'algo-alpaca',
    level: 'intermediate',
    title: 'Algorithmic Trading & Alpaca',
    description: 'Using code to execute trades automatically via APIs.',
    icon: Code2,
    color: 'bg-emerald-600',
    xpReward: 150,
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'alpaca-visual',
        title: 'How an Algo Trading Bot Works (Visual)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '📊',
            title: 'Data Feed: The Eyes of Your Bot',
            description: 'Real-time prices stream into your code via WebSocket',
            detail: 'Your trading bot needs a live feed of prices. Alpaca streams real-time market data via WebSocket — a persistent connection that pushes price updates to your code the millisecond they happen. Think of it like a radio station your code is always tuned into.'
          },
          {
            step: 2,
            emoji: '🧠',
            title: 'Strategy: The Brain of Your Bot',
            description: 'Your code decides when to buy and sell',
            detail: 'This is where your edge lives. Common beginner strategies: Moving Average Crossover (buy when short-term average crosses above long-term), RSI Oversold (buy when a stock has been falling too fast), or Momentum (buy what\'s already rising).'
          },
          {
            step: 3,
            emoji: '📡',
            title: 'Order Execution: The Arms of Your Bot',
            description: 'A REST API call sends your order to the broker',
            detail: 'When your strategy says "BUY," your code sends an HTTP POST request to Alpaca\'s REST API with the ticker, quantity, and order type (market vs limit). Alpaca routes it to the exchange. Confirmation arrives in the response object — all in under 100ms.'
          },
          {
            step: 4,
            emoji: '🛡️',
            title: 'Risk Management: The Safety Net',
            description: 'Stop-losses prevent your bot from blowing up your account',
            detail: 'Every serious trading bot has guardrails. A Stop-Loss automatically sells a position if it drops X%. A Position Limit prevents your bot from putting more than Y% of your portfolio in one stock. Without these, a buggy strategy can wipe an account overnight.'
          },
          {
            step: 5,
            emoji: '📋',
            title: 'Paper Trading: Test Without Risk',
            description: 'Alpaca offers a free paper trading mode',
            detail: 'Before risking real money, run your bot in paper trading mode — Alpaca simulates real market conditions but uses fake money. Professional quant traders backtest for months before going live. Never skip this step.'
          }
        ]
      },
      {
        id: 'alpaca-1',
        title: 'Trading with Code — Deep Dive',
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
    xpReward: 120,
    estimatedMinutes: 20,
    lessons: [
      {
        id: 'stripe-visual',
        title: 'Anatomy of a Credit Card Transaction (Visual)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '🛒',
            title: 'You Check Out',
            description: 'You enter your Visa card on a merchant\'s website',
            detail: 'The merchant\'s website uses Stripe\'s JavaScript library (Stripe.js) to securely collect your card number. Your card data never touches the merchant\'s server — it goes directly to Stripe. This is PCI compliance in action.'
          },
          {
            step: 2,
            emoji: '🏗️',
            title: 'Stripe Creates a PaymentIntent',
            description: 'A PaymentIntent tracks the full lifecycle of your checkout',
            detail: 'Stripe creates a PaymentIntent object on their servers — a digital record of this transaction attempt. It starts with status: "requires_payment_method" and moves through states until it reaches "succeeded" or "failed."'
          },
          {
            step: 3,
            emoji: '🌐',
            title: 'The Card Network (Visa/Mastercard)',
            description: 'Visa acts as the communication highway between banks',
            detail: 'Stripe forwards the transaction to Visa\'s network. Visa routes it to your bank (the "Issuing Bank" — e.g., Chase). Chase checks: Do you have funds? Is this suspicious? Chase replies: Approved or Declined. All of this takes about 1–2 seconds.'
          },
          {
            step: 4,
            emoji: '✅',
            title: 'Approval & Capture',
            description: 'Authorization holds the funds; capture moves them',
            detail: 'Visa first authorizes (freezes) the funds in your account. Then Stripe captures (actually moves) the money. Some businesses — like hotels — authorize on check-in and capture on check-out. This two-step process gives merchants flexibility.'
          },
          {
            step: 5,
            emoji: '💸',
            title: 'Who Gets Paid (The Fee Split)',
            description: 'Multiple parties take a cut of every transaction',
            detail: 'On a $100 purchase, roughly: Stripe keeps $0.30 + 2.9% = ~$3.20. Of that, ~$1.80 goes to the Issuing Bank (Chase), ~$0.20 to Visa\'s network, and ~$1.20 stays with Stripe as their margin. The merchant receives ~$96.80.'
          }
        ]
      },
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
\`\`\``
      }
    ]
  },
  {
    id: 'open-banking',
    level: 'intermediate',
    title: 'Open Banking & Plaid',
    description: 'How apps connect to your bank account — and why that changed everything.',
    icon: Globe,
    color: 'bg-cyan-600',
    xpReward: 120,
    estimatedMinutes: 18,
    lessons: [
      {
        id: 'plaid-visual',
        title: 'How Plaid Connects Your Bank to Any App (Visual)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '🔌',
            title: 'The Problem: Banks Don\'t Speak the Same Language',
            description: 'Every bank has different systems and APIs',
            detail: 'Chase, Wells Fargo, and Bank of America all store your account data differently. If Venmo wanted to verify your bank account, they\'d have to build integrations with every single bank. That\'s 10,000+ US banks and credit unions.'
          },
          {
            step: 2,
            emoji: '🗝️',
            title: 'Plaid Is the Universal Bank Connector',
            description: 'One API, every US bank',
            detail: 'Plaid has already built integrations with 12,000+ financial institutions. When you tap "Connect Bank Account" in any app (Venmo, Betterment, Robinhood), you\'re almost certainly seeing Plaid\'s interface under the hood.'
          },
          {
            step: 3,
            emoji: '🔐',
            title: 'OAuth: Connecting Without Your Password',
            description: 'Modern banks use token-based access, not password sharing',
            detail: 'In the early days, Plaid literally logged into your bank website with your username/password (screen scraping — yikes!). Modern banks now use OAuth tokens: you log in directly with your bank, and the bank issues a limited-access token to Plaid. Your password never leaves the bank.'
          },
          {
            step: 4,
            emoji: '📊',
            title: 'What Plaid Can Access',
            description: 'Balance, transactions, income verification, identity',
            detail: 'Apps can use Plaid to: verify you own the account (for ACH transfers), check your balance (to prevent overdrafts), analyze your spending patterns (for budgeting apps), or verify your income (for loan applications). Each use case requires different permissions.'
          },
          {
            step: 5,
            emoji: '🌍',
            title: 'Open Banking Goes Global',
            description: 'Europe mandated it; the US is catching up',
            detail: 'The EU passed PSD2 (Payment Services Directive 2) in 2018, legally requiring banks to share customer data via APIs. The US has no equivalent law yet, but the CFPB (Consumer Financial Protection Bureau) issued a rule in 2024 establishing open banking standards. This will commoditize bank data and accelerate fintech innovation.'
          }
        ]
      },
      {
        id: 'plaid-quiz',
        title: 'Open Banking Quiz',
        type: 'quiz',
        quiz: [
          {
            question: 'What is the primary advantage of OAuth over the old "screen scraping" approach for bank connectivity?',
            options: [
              'OAuth is faster',
              'OAuth lets apps access bank data via secure tokens without ever seeing your actual password',
              'OAuth requires no internet connection',
              'OAuth is only used in Europe'
            ],
            correctAnswer: 1,
            explanation: 'OAuth tokens grant limited, revocable access to specific bank data without exposing your password. Screen scraping required apps to literally log in as you — a major security risk.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────
  // EXPERT LEVEL
  // ─────────────────────────────────────────
  {
    id: 'defi-smart-contracts',
    level: 'expert',
    title: 'DeFi & Smart Contracts',
    description: 'Building financial systems without middlemen.',
    icon: Cpu,
    color: 'bg-purple-600',
    xpReward: 200,
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'defi-visual',
        title: 'How a DeFi Protocol Actually Works (Visual)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '🏊',
            title: 'Liquidity Pools: The Foundation of DeFi',
            description: 'Users deposit token pairs; the pool becomes the exchange',
            detail: 'On Uniswap, there\'s no order book. Instead, users called "Liquidity Providers" deposit equal dollar values of two tokens (e.g., $1,000 ETH + $1,000 USDC) into a smart contract pool. The pool now has two assets it can trade between.'
          },
          {
            step: 2,
            emoji: '📐',
            title: 'The x * y = k Formula',
            description: 'Price is determined by a math equation, not humans',
            detail: 'The constant product formula x * y = k determines price automatically. If the pool has 10 ETH (x) and 20,000 USDC (y), then k = 200,000. If you want to buy 1 ETH, you must add USDC until the formula still equals 200,000. The more ETH you buy, the higher the price per ETH.'
          },
          {
            step: 3,
            emoji: '💰',
            title: 'How LPs Make Money',
            description: 'Liquidity Providers earn 0.3% of every swap',
            detail: 'Every trade in a Uniswap pool pays a 0.3% fee. This fee goes directly into the pool, increasing the value of each LP\'s share. If a pool does $10M in daily volume, LPs earn $30,000/day split proportionally to their share of the pool.'
          },
          {
            step: 4,
            emoji: '⚠️',
            title: 'Impermanent Loss: The Hidden Risk',
            description: 'Price divergence can leave you worse off than just holding',
            detail: 'If ETH doubles in price, arbitrage traders drain the ETH from the pool. You get back fewer ETH than you deposited. This "impermanent loss" (it\'s only realized if you withdraw) is the primary risk of being an LP. In volatile markets, trading fees may not compensate for it.'
          },
          {
            step: 5,
            emoji: '🔍',
            title: 'Smart Contract Audits: Why They Matter',
            description: 'All DeFi code is public — including the bugs',
            detail: 'Smart contracts hold billions of dollars and are open-source. A single logical flaw in the Solidity code can be exploited to drain the entire pool. The Ronin Bridge hack ($625M in 2022) and the Poly Network hack ($611M in 2021) both exploited unaudited contracts. Audits from firms like Certik or Trail of Bits are now mandatory for serious protocols.'
          }
        ]
      },
      {
        id: 'defi-1',
        title: 'Automated Market Makers (AMMs) — Deep Dive',
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
    xpReward: 200,
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'hft-visual',
        title: 'Inside an HFT Operation (Visual)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '⚡',
            title: 'Speed Is the Product',
            description: 'HFT firms profit by being microseconds faster than everyone else',
            detail: 'HFT (High-Frequency Trading) firms run algorithms that execute thousands of orders per second. They don\'t have better financial models than hedge funds — they win by being physically closer to the exchange and using faster hardware. The strategy is arbitrage: finding tiny price differences before anyone else can.'
          },
          {
            step: 2,
            emoji: '🏢',
            title: 'Colocation: Pay to Be Close',
            description: 'HFT firms pay millions to put servers inside exchange data centers',
            detail: 'Light travels through fiber at 200,000 km/s. If your server is 500 miles from the NYSE, your data takes ~4 milliseconds round-trip. HFT firms pay $500K–$1M/year to colocate their servers in the same rack room as the exchange\'s matching engine, cutting latency to microseconds.'
          },
          {
            step: 3,
            emoji: '🔧',
            title: 'FPGAs: Hardware-Level Trading',
            description: 'The algorithm is literally wired into the chip',
            detail: 'A regular CPU runs Linux, which adds overhead (context switching, system calls). HFT firms use FPGAs (Field-Programmable Gate Arrays) — custom chips where the trading logic is compiled directly into hardware. There\'s no operating system. The chip processes market data and fires orders in ~50 nanoseconds.'
          },
          {
            step: 4,
            emoji: '📡',
            title: 'Microwave Towers: Faster Than Fiber',
            description: 'Microwaves travel through air faster than light travels through glass',
            detail: 'Light travels through fiber optic cable at ~67% the speed of light in a vacuum (glass slows it down). Microwave signals travel through open air at ~99% the speed of light. Firms like Jump Trading built microwave relay towers from Chicago to New York, shaving 3–4 milliseconds off fiber routes. This advantage was worth hundreds of millions.'
          },
          {
            step: 5,
            emoji: '🤔',
            title: 'Is HFT Good or Bad?',
            description: 'The debate has two legitimate sides',
            detail: 'Proponents: HFT firms add liquidity, tighten spreads (saving retail investors billions), and make markets more efficient. Critics (Michael Lewis, "Flash Boys"): HFT firms use speed advantages to front-run retail orders, profiting at the expense of slower participants. The SEC has ongoing debates about market structure reform.'
          }
        ]
      },
      {
        id: 'hft-1',
        title: 'Optimizing Physics — Deep Dive',
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
  },
  {
    id: 'ai-fintech',
    level: 'expert',
    title: 'AI & Machine Learning in Finance',
    description: 'From fraud detection to robo-advisors: how AI is reshaping every layer of finance.',
    icon: Zap,
    color: 'bg-amber-500',
    xpReward: 250,
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'ai-visual',
        title: 'Where AI Lives in Fintech (Visual)',
        type: 'visual',
        visualSteps: [
          {
            step: 1,
            emoji: '🕵️',
            title: 'Fraud Detection: AI\'s Biggest Win',
            description: 'Neural networks catch fraud patterns humans can\'t see',
            detail: 'Visa\'s fraud detection system analyzes 65,000 transaction messages per second. It uses a neural network trained on billions of historical transactions to score each one for fraud risk in under 1 millisecond. It looks at 500+ variables: location, device fingerprint, spending velocity, merchant category. If something is off, it flags or declines the transaction.'
          },
          {
            step: 2,
            emoji: '🤖',
            title: 'Robo-Advisors: Automated Wealth Management',
            description: 'Betterment and Wealthfront manage billions with algorithms',
            detail: 'A robo-advisor takes your age, risk tolerance, and goals as inputs. Its algorithm builds a diversified portfolio of low-cost ETFs and automatically rebalances it. When one asset class drifts from its target allocation, the bot sells overperformers and buys underperformers. Tax-loss harvesting (selling losers to offset gains) is done automatically.'
          },
          {
            step: 3,
            emoji: '📰',
            title: 'Sentiment Analysis: Trading the News',
            description: 'NLP models read earnings calls and tweets in milliseconds',
            detail: 'Hedge funds use Natural Language Processing (NLP) models to read SEC filings, earnings call transcripts, and even Twitter/X in real-time. If a CEO uses hesitant language on an earnings call ("challenging environment," "headwinds"), the model flags it as bearish and triggers a sell order before human analysts even finish listening.'
          },
          {
            step: 4,
            emoji: '💳',
            title: 'Alternative Credit Scoring',
            description: 'AI lenders look beyond the FICO score',
            detail: 'Traditional lenders use the FICO credit score — based solely on credit history. AI lenders like Upstart use machine learning to analyze 1,600+ variables: education, employment history, cash flow patterns, even how you fill out a loan application. They approve borrowers the traditional model would reject, at lower default rates.'
          },
          {
            step: 5,
            emoji: '⚠️',
            title: 'The Risks: Bias & Black Boxes',
            description: 'When AI makes financial decisions, fairness becomes critical',
            detail: 'AI models trained on historical data inherit historical biases. A model trained on decades of lending data may learn to discriminate by ZIP code (a proxy for race). The CFPB requires lenders to explain adverse action — but you can\'t explain a neural network\'s reasoning. "Explainable AI" (XAI) is now a regulatory frontier in fintech.'
          }
        ]
      },
      {
        id: 'ai-quiz',
        title: 'AI in Finance Quiz',
        type: 'quiz',
        quiz: [
          {
            question: 'What is the primary risk of using AI for credit scoring decisions?',
            options: [
              'AI is too slow for real-time decisions',
              'AI models may inherit historical biases and produce discriminatory outcomes that are hard to explain',
              'AI cannot process large datasets',
              'AI requires too much human supervision'
            ],
            correctAnswer: 1,
            explanation: 'AI credit models trained on biased historical data can perpetuate discrimination (e.g., by ZIP code or demographic proxies). Explainability is also a legal requirement — lenders must tell borrowers WHY they were denied, which is hard with black-box models.'
          }
        ]
      }
    ]
  }
];
