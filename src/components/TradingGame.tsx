import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, DollarSign, ArrowRight, Activity } from 'lucide-react';

interface TradingGameProps {
  onComplete: () => void;
}

export function TradingGame({ onComplete }: TradingGameProps) {
  const [money, setMoney] = useState(1000);
  const [tokens, setTokens] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(100);
  const [day, setDay] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("Welcome to the Volatility Simulator. Buy low, sell high.");

  useEffect(() => {
    if (day > 7) {
      setGameOver(true);
      const totalValue = money + (tokens * tokenPrice);
      if (totalValue > 1000) {
        setMessage(`You made a profit of $${totalValue - 1000}. Well done.`);
      } else {
        setMessage(`You lost $${1000 - totalValue}. Markets are volatile.`);
      }
    }
  }, [day, money, tokens, tokenPrice]);

  const nextDay = () => {
    if (day <= 7) {
      setDay(d => d + 1);
      // High volatility: price can swing wildly between $20 and $250
      const volatility = Math.random() > 0.5 ? 1 : -1;
      const change = Math.floor(Math.random() * 50) + 10;
      let newPrice = tokenPrice + (volatility * change);
      if (newPrice < 10) newPrice = 10; // Floor price
      
      setTokenPrice(newPrice);
      setMessage(`Day ${day + 1}: Market shifted.`);
    }
  };

  const buyToken = () => {
    if (money >= tokenPrice) {
      setMoney(m => m - tokenPrice);
      setTokens(t => t + 1);
      setMessage("Executed BUY order.");
    } else {
      setMessage("Insufficient funds for BUY order.");
    }
  };

  const sellToken = () => {
    if (tokens > 0) {
      setMoney(m => m + tokenPrice);
      setTokens(t => t - 1);
      setMessage("Executed SELL order.");
    } else {
      setMessage("No assets available to sell.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
      <div className="text-center mb-8 pb-6 border-b border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center">
          <Activity className="w-6 h-6 mr-2 text-blue-600" /> Market Simulator
        </h3>
        <p className="text-slate-600 font-medium">{message}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <p className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">Cash Balance</p>
          <p className="text-3xl font-bold text-slate-900 flex items-center">
            <DollarSign className="w-6 h-6 text-emerald-600" /> {money}
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <p className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wider">Asset Balance</p>
          <p className="text-3xl font-bold text-slate-900">
            {tokens} <span className="text-lg text-blue-600 ml-1">TKN</span>
          </p>
        </div>
      </div>

      {!gameOver ? (
        <>
          <div className="bg-blue-50 rounded-xl p-8 text-center mb-8 border border-blue-100">
            <p className="text-blue-800 font-semibold text-sm uppercase tracking-wider mb-2">Current Market Price</p>
            <div className="flex items-center justify-center text-5xl font-black text-blue-700 mb-8">
              <DollarSign className="w-8 h-8 opacity-50" /> {tokenPrice}
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={buyToken}
                disabled={money < tokenPrice}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold shadow-sm transition-colors"
              >
                Buy (1 TKN)
              </button>
              <button
                onClick={sellToken}
                disabled={tokens === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold shadow-sm transition-colors"
              >
                Sell (1 TKN)
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <span className="text-slate-500 font-semibold">Trading Day {day} / 7</span>
            <button
              onClick={nextDay}
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-colors"
            >
              Advance Day
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="bg-slate-50 rounded-xl p-8 mb-8 border border-slate-200">
            <p className="text-xl font-bold text-slate-900 mb-4">Simulation Complete</p>
            <div className="flex justify-center items-baseline gap-2 mb-2">
              <span className="text-slate-600">Final Portfolio Value:</span>
              <span className="text-3xl font-black text-emerald-600">${money + (tokens * tokenPrice)}</span>
            </div>
            <p className="text-slate-500 text-sm">Initial Capital: $1000</p>
          </div>
          <button
            onClick={onComplete}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-semibold shadow-sm transition-colors flex items-center justify-center"
          >
            Continue Course <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
