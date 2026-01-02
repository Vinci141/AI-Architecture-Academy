
import React, { useState } from 'react';

export const RuleSimulator: React.FC = () => {
  const [amount, setAmount] = useState(600);
  const [isPremium, setIsPremium] = useState(true);

  const getResult = () => {
    if (isPremium) {
      return amount > 500 ? "20% Discount Applied" : "10% Discount Applied";
    }
    return amount > 1000 ? "5% Discount Applied" : "No Discount";
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold mb-4 text-emerald-400">Interactive Rule Lab</h3>
      <p className="text-zinc-400 text-sm mb-6">Modify the inputs to see the deterministic flow in action.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Order Amount: ${amount}</label>
          <input 
            type="range" 
            min="0" 
            max="2000" 
            step="50" 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
            className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900"
          />
          <label className="text-sm font-medium text-zinc-300">Premium Member?</label>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="flex flex-col items-center">
            <div className="bg-zinc-800 p-4 rounded-lg w-full text-center border border-zinc-700 mb-4 transition-all duration-300">
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Input Received</span>
              <span className="text-lg font-mono">${amount} | {isPremium ? 'Premium' : 'Standard'}</span>
            </div>
            
            <div className="w-0.5 h-8 bg-emerald-500/30 animate-pulse"></div>

            <div className="bg-emerald-500/10 border border-emerald-500/50 p-4 rounded-lg w-full text-center mt-4">
              <span className="text-xs text-emerald-500 uppercase tracking-widest block mb-1">Architecture Output</span>
              <span className="text-xl font-bold text-white">{getResult()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
