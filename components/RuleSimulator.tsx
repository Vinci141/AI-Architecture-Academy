
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const RuleSimulator: React.FC = () => {
  const [amount, setAmount] = useState(600);
  const [isPremium, setIsPremium] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const getDiscountPercent = (val: number, premium: boolean) => {
    if (premium) {
      return val > 500 ? 20 : 10;
    }
    return val > 1000 ? 5 : 0;
  };

  const getResult = () => {
    const percent = getDiscountPercent(amount, isPremium);
    return percent > 0 ? `${percent}% Discount Applied` : "No Discount";
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 2000]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 25]).range([height, 0]);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat((d) => `$${d}`))
      .attr("color", "#52525b") // zinc-500
      .selectAll("text")
      .attr("font-size", "10px");

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}%`))
      .attr("color", "#52525b") // zinc-500
      .selectAll("text")
      .attr("font-size", "10px");

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => ""));

    // Logic Data Generation (Step functions)
    const generateSteps = (premium: boolean) => {
      const steps = [];
      for (let i = 0; i <= 2000; i += 10) {
        steps.push({ x: i, y: getDiscountPercent(i, premium) });
      }
      return steps;
    };

    const line = d3.line<any>()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveStepAfter);

    // Render logic lines
    // Standard Line (Faded)
    g.append("path")
      .datum(generateSteps(false))
      .attr("fill", "none")
      .attr("stroke", isPremium ? "#27272a" : "#71717a") // zinc-800 or zinc-500
      .attr("stroke-width", isPremium ? 2 : 3)
      .attr("d", line);

    // Premium Line (Faded)
    g.append("path")
      .datum(generateSteps(true))
      .attr("fill", "none")
      .attr("stroke", isPremium ? "#10b981" : "#064e3b") // emerald-500 or emerald-900
      .attr("stroke-width", isPremium ? 3 : 2)
      .attr("opacity", isPremium ? 1 : 0.4)
      .attr("d", line);

    // Current Marker
    const currentY = getDiscountPercent(amount, isPremium);
    g.append("circle")
      .attr("cx", x(amount))
      .attr("cy", y(currentY))
      .attr("r", 6)
      .attr("fill", "#10b981")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("class", "animate-pulse");

    // Vertical indicator line
    g.append("line")
      .attr("x1", x(amount))
      .attr("y1", height)
      .attr("x2", x(amount))
      .attr("y2", y(currentY))
      .attr("stroke", "#10b981")
      .attr("stroke-dasharray", "4")
      .attr("opacity", 0.5);

  }, [amount, isPremium]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold mb-4 text-emerald-400">Interactive Rule Lab</h3>
      <p className="text-zinc-400 text-sm mb-6">Modify the inputs to see the deterministic flow in action.</p>
      
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <svg 
            ref={svgRef} 
            width="100%" 
            height="200" 
            viewBox="0 0 400 200" 
            className="max-w-full overflow-visible"
          ></svg>
        </div>

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
            id="premiumToggle"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
            className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900"
          />
          <label htmlFor="premiumToggle" className="text-sm font-medium text-zinc-300 cursor-pointer">Premium Member?</label>
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
