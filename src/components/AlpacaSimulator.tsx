import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Square, Terminal, Code2, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AlpacaSimulatorProps {
  onComplete: () => void;
}

const STRATEGIES = {
  movingAverage: `// Moving Average Crossover Strategy
const Alpaca = require('@alpacahq/alpaca-trade-api');
const alpaca = new Alpaca({ paper: true });

async function run() {
  console.log("Starting MA Crossover Bot...");
  const symbol = 'AAPL';
  
  // Fetch historical data
  const bars = await alpaca.getBarsV2(symbol, {
    timeframe: '1Day',
    limit: 50
  });
  
  const shortMA = calculateMA(bars, 10);
  const longMA = calculateMA(bars, 50);
  
  if (shortMA > longMA) {
    console.log("Golden Cross detected! Buying...");
    await alpaca.createOrder({
      symbol, qty: 10, side: 'buy', type: 'market'
    });
  } else {
    console.log("Death Cross detected! Selling...");
    await alpaca.closePosition(symbol);
  }
}`,
  meanReversion: `// Mean Reversion Strategy
const Alpaca = require('@alpacahq/alpaca-trade-api');
const alpaca = new Alpaca({ paper: true });

async function run() {
  console.log("Starting Mean Reversion Bot...");
  const symbol = 'TSLA';
  
  const currentPrice = await alpaca.getLatestTrade(symbol);
  const averagePrice = await getAveragePrice(symbol, 20);
  
  const deviation = (currentPrice - averagePrice) / averagePrice;
  
  if (deviation < -0.05) {
    console.log("Price dropped 5% below average. Buying the dip!");
    await alpaca.createOrder({
      symbol, qty: 5, side: 'buy', type: 'market'
    });
  } else if (deviation > 0.05) {
    console.log("Price rose 5% above average. Taking profits!");
    await alpaca.createOrder({
      symbol, qty: 5, side: 'sell', type: 'market'
    });
  }
}`
};

export function AlpacaSimulator({ onComplete }: AlpacaSimulatorProps) {
  const [strategy, setStrategy] = useState<'movingAverage' | 'meanReversion'>('movingAverage');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>(['System initialized. Ready to deploy algorithm.']);
  const [pnlData, setPnlData] = useState<{ day: number; pnl: number }[]>([]);

  const runSimulation = () => {
    setIsRunning(true);
    setLogs(['Connecting to Alpaca Paper Trading API...', 'Authenticating...']);
    setPnlData([]);

    let step = 0;
    let currentPnl = 0;
    const maxSteps = 20;

    const interval = setInterval(() => {
      step++;
      
      // Generate mock logs
      if (step === 2) setLogs(l => [...l, 'Authentication successful.']);
      if (step === 3) setLogs(l => [...l, `Running ${strategy === 'movingAverage' ? 'MA Crossover' : 'Mean Reversion'}...`]);
      
      if (step > 3 && step < maxSteps) {
        const action = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'BUY' : 'SELL') : 'HOLD';
        if (action !== 'HOLD') {
          setLogs(l => [...l, `[${new Date().toISOString().split('T')[1].split('.')[0]}] Executed ${action} order.`]);
        }
        
        // Random walk for P&L
        currentPnl += (Math.random() - 0.45) * 50; 
        setPnlData(prev => [...prev, { day: step, pnl: currentPnl }]);
      }

      if (step >= maxSteps) {
        clearInterval(interval);
        setIsRunning(false);
        setLogs(l => [...l, 'Simulation complete.', `Final P&L: $${currentPnl.toFixed(2)}`]);
      }
    }, 400);
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden text-slate-300 font-sans">
      {/* Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center">
          <Code2 className="w-6 h-6 text-emerald-400 mr-3" />
          <h3 className="text-xl font-bold text-white">Alpaca Algo Studio</h3>
        </div>
        <div className="flex space-x-3">
          <select 
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as any)}
            disabled={isRunning}
            className="bg-slate-800 border border-slate-700 text-sm rounded-md px-3 py-1.5 outline-none focus:border-emerald-500 disabled:opacity-50"
          >
            <option value="movingAverage">Moving Average Crossover</option>
            <option value="meanReversion">Mean Reversion</option>
          </select>
          
          {isRunning ? (
            <button disabled className="bg-slate-700 text-slate-400 px-4 py-1.5 rounded-md text-sm font-bold flex items-center">
              <Square className="w-4 h-4 mr-2 fill-current" /> Running...
            </button>
          ) : (
            <button 
              onClick={runSimulation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-colors"
            >
              <Play className="w-4 h-4 mr-2 fill-current" /> Deploy Bot
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px]">
        {/* Left: Code Editor */}
        <div className="border-r border-slate-800 bg-[#1e1e1e] p-4 overflow-y-auto">
          <div className="flex items-center mb-4 text-slate-500 text-xs uppercase tracking-wider font-bold">
            <span>bot.js</span>
          </div>
          <pre className="font-mono text-sm leading-relaxed text-emerald-300">
            <code>{STRATEGIES[strategy]}</code>
          </pre>
        </div>

        {/* Right: Terminal & Chart */}
        <div className="flex flex-col bg-slate-900">
          {/* Chart Area */}
          <div className="h-1/2 border-b border-slate-800 p-4">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">Live P&L Performance</h4>
            <div className="h-full w-full pb-6">
              {pnlData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pnlData}>
                    <XAxis dataKey="day" hide />
                    <YAxis domain={['auto', 'auto']} stroke="#475569" fontSize={12} tickFormatter={(val) => `$${val}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px' }}
                      itemStyle={{ color: '#34d399' }}
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']}
                    />
                    <Line 
                      type="stepAfter" 
                      dataKey="pnl" 
                      stroke="#34d399" 
                      strokeWidth={2} 
                      dot={false} 
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-600 text-sm border border-dashed border-slate-700 rounded-lg">
                  Deploy bot to view performance chart
                </div>
              )}
            </div>
          </div>

          {/* Terminal Area */}
          <div className="h-1/2 p-4 flex flex-col">
            <div className="flex items-center mb-2 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <Terminal className="w-4 h-4 mr-2" />
              <span>Terminal Output</span>
            </div>
            <div className="flex-grow bg-black rounded-lg p-3 font-mono text-xs overflow-y-auto border border-slate-800">
              {logs.map((log, i) => (
                <div key={i} className="mb-1">
                  <span className="text-slate-500">{'> '}</span>
                  <span className={log.includes('BUY') ? 'text-emerald-400' : log.includes('SELL') ? 'text-red-400' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
              {isRunning && (
                <motion.div 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-3 bg-slate-400 ml-1"
                />
              )}
            </div>
            
            {!isRunning && logs.length > 1 && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onComplete}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-bold flex items-center transition-colors"
                >
                  Continue Course <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
