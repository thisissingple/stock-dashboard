'use client';

import { useState, useEffect } from 'react';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
}

// Simulated real-time stock data (in production, use real API)
const generateStockData = (): StockData[] => {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', basePrice: 178.50 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', basePrice: 141.80 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', basePrice: 378.90 },
    { symbol: 'TSLA', name: 'Tesla Inc.', basePrice: 248.50 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', basePrice: 495.20 },
    { symbol: 'META', name: 'Meta Platforms', basePrice: 390.10 },
    { symbol: 'AMZN', name: 'Amazon.com', basePrice: 155.30 },
    { symbol: 'AMD', name: 'AMD Inc.', basePrice: 121.40 },
  ];

  return stocks.map(stock => {
    const variance = (Math.random() - 0.5) * 10;
    const price = stock.basePrice + variance;
    const change = variance;
    const changePercent = (change / stock.basePrice) * 100;
    
    return {
      symbol: stock.symbol,
      name: stock.name,
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      high: Math.round((price + Math.random() * 5) * 100) / 100,
      low: Math.round((price - Math.random() * 5) * 100) / 100,
      volume: (Math.floor(Math.random() * 50) + 10).toFixed(1) + 'M',
    };
  });
};

const MarketIndex = ({ name, value, change, changePercent }: { 
  name: string; 
  value: string; 
  change: number;
  changePercent: number;
}) => (
  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
    <div className="text-gray-400 text-sm mb-1">{name}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className={`text-sm mt-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
    </div>
  </div>
);

const StockCard = ({ stock }: { stock: StockData }) => (
  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all cursor-pointer">
    <div className="flex justify-between items-start mb-3">
      <div>
        <div className="text-lg font-bold text-white">{stock.symbol}</div>
        <div className="text-gray-400 text-sm">{stock.name}</div>
      </div>
      <div className={`px-2 py-1 rounded-lg text-sm font-medium ${
        stock.change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
      }`}>
        {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
      </div>
    </div>
    <div className="text-2xl font-bold text-white mb-3">${stock.price.toFixed(2)}</div>
    <div className="grid grid-cols-3 gap-2 text-sm">
      <div>
        <div className="text-gray-500">High</div>
        <div className="text-gray-300">${stock.high}</div>
      </div>
      <div>
        <div className="text-gray-500">Low</div>
        <div className="text-gray-300">${stock.low}</div>
      </div>
      <div>
        <div className="text-gray-500">Vol</div>
        <div className="text-gray-300">{stock.volume}</div>
      </div>
    </div>
  </div>
);

const MiniChart = () => {
  const points = Array.from({ length: 20 }, (_, i) => ({
    x: i * 15,
    y: 50 + Math.sin(i * 0.5) * 20 + (Math.random() - 0.5) * 10
  }));
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  return (
    <svg viewBox="0 0 285 100" className="w-full h-24">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={pathD + ' L 285 100 L 0 100 Z'} fill="url(#chartGradient)" />
      <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="2" />
    </svg>
  );
};

export default function Home() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const updateStocks = () => {
      setStocks(generateStockData());
      setLastUpdate(new Date().toLocaleTimeString());
    };
    
    updateStocks();
    const interval = setInterval(updateStocks, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const totalValue = 125847.32;
  const totalChange = 1247.89;
  const totalChangePercent = 1.02;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              📈 Stock Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Real-time market overview</p>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm">Last updated</div>
            <div className="text-white font-mono">{lastUpdate}</div>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 border border-blue-500/30">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-400 mb-1">Portfolio Value</div>
              <div className="text-4xl font-bold">${totalValue.toLocaleString()}</div>
              <div className={`mt-2 text-lg ${totalChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalChange >= 0 ? '↑' : '↓'} ${Math.abs(totalChange).toLocaleString()} ({totalChangePercent >= 0 ? '+' : ''}{totalChangePercent}%) today
              </div>
            </div>
            <div className="w-72">
              <MiniChart />
            </div>
          </div>
        </div>

        {/* Market Indices */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Market Indices</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MarketIndex name="S&P 500" value="4,927.93" change={15.29} changePercent={0.31} />
            <MarketIndex name="NASDAQ" value="15,628.04" change={-42.81} changePercent={-0.27} />
            <MarketIndex name="DOW" value="38,654.42" change={125.69} changePercent={0.33} />
            <MarketIndex name="台股加權" value="18,234.56" change={87.32} changePercent={0.48} />
          </div>
        </div>

        {/* Watchlist */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-300">Watchlist</h2>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              + Add Stock
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stocks.map(stock => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>🌱 Built by 阿萌 for Orange • Data refreshes every 5 seconds</p>
          <p className="mt-1">Demo purposes only - not real trading data</p>
        </div>
      </div>
    </main>
  );
}
