import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, ArrowUpRight, ArrowDownRight, Wallet, Bitcoin } from 'lucide-react';

interface CoinbaseSimulatorProps {
  onComplete: () => void;
}

const INITIAL_USD = 5000;
const INITIAL_BTC_PRICE = 65000;

export function CoinbaseSimulator({ onComplete }: CoinbaseSimulatorProps) {
  const [usdBalance, setUsdBalance] = useState(INITIAL_USD);
  const [btcBalance, setBtcBalance] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(INITIAL_BTC_PRICE);
  const [priceHistory, setPriceHistory] = useState<{ time: string; price: number }[]>([]);
  const [tradeAmount, setTradeAmount] = useState<string>('');
  const [message, setMessage] = useState('Welcome to the Crypto Simulator. Try buying some BTC.');

  // Initialize and update price history
  useEffect(() => {
    const initialHistory = Array.from({ length: 20 }).map((_, i) => ({
      time: `-${20 - i}s`,
      price: INITIAL_BTC_PRICE + (Math.random() - 0.5) * 1000
    }));
    setPriceHistory(initialHistory);

    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const change = (Math.random() - 0.5) * 500; // Random walk
        const newPrice = prev + change;
        
        setPriceHistory((hist) => {
          const newHist = [...hist.slice(1), { time: 'Now', price: newPrice }];
          return newHist;
        });
        
        return newPrice;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = () => {
    const amount = parseFloat(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid positive amount.');
      return;
    }
    if (amount > usdBalance) {
      setMessage('Insufficient USD balance.');
      return;
    }

    const btcBought = amount / currentPrice;
    setUsdBalance(prev => prev - amount);
    setBtcBalance(prev => prev + btcBought);
    setMessage(`Successfully bought ${btcBought.toFixed(6)} BTC for $${amount.toFixed(2)}`);
    setTradeAmount('');
  };

  const handleSell = () => {
    const amountBtc = parseFloat(tradeAmount);
    if (isNaN(amountBtc) || amountBtc <= 0) {
      setMessage('Please enter a valid positive BTC amount.');
      return;
    }
    if (amountBtc > btcBalance) {
      setMessage('Insufficient BTC balance.');
      return;
    }

    const usdGained = amountBtc * currentPrice;
    setBtcBalance(prev => prev - amountBtc);
    setUsdBalance(prev => prev + usdGained);
    setMessage(`Successfully sold ${amountBtc.toFixed(6)} BTC for $${usdGained.toFixed(2)}`);
    setTradeAmount('');
  };

  const totalValue = usdBalance + (btcBalance * currentPrice);
  const isProfit = totalValue >= INITIAL_USD;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold flex items-center">
            <Bitcoin className="w-8 h-8 mr-2 text-blue-200" />
            Pro Exchange Simulator
          </h3>
          <p className="text-blue-100 mt-1 opacity-90">Practice trading with real-time simulated data</p>
        </div>
        <div className="text-right">
          <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">Total Portfolio</p>
          <p className="text-3xl font-black">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className={`text-sm font-medium flex items-center justify-end mt-1 ${isProfit ? 'text-emerald-300' : 'text-red-300'}`}>
            {isProfit ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            ${Math.abs(totalValue - INITIAL_USD).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Chart & Balances */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h4 className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-1">Bitcoin (BTC)</h4>
                <p className="text-4xl font-black text-slate-900">
                  ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    dot={false} 
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <Wallet className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">USD Balance</p>
                <p className="text-xl font-bold text-slate-900">${usdBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Bitcoin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">BTC Balance</p>
                <p className="text-xl font-bold text-slate-900">{btcBalance.toFixed(6)} BTC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Trading Panel */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col">
          <h4 className="text-lg font-bold text-slate-900 mb-4">Trade BTC</h4>
          
          <div className="mb-6 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm font-medium border border-blue-100">
            {message}
          </div>

          <div className="space-y-4 flex-grow">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.000001"
                  className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-lg"
                  aria-label="Trade amount"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button 
                onClick={handleBuy}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold transition-colors shadow-sm"
              >
                Buy (USD)
              </button>
              <button 
                onClick={handleSell}
                className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-colors shadow-sm"
              >
                Sell (BTC)
              </button>
            </div>
            
            <p className="text-xs text-slate-500 text-center mt-4">
              *Buy uses USD amount. Sell uses BTC amount.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200">
            <button
              onClick={onComplete}
              className="w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-lg font-semibold transition-colors"
            >
              Finish Simulation <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
