import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, ShoppingCart } from 'lucide-react';

export default function ComparisonTable({ accessPoints }) {
  const [sortColumn, setSortColumn] = useState('rating');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedAPs = [...accessPoints].sort((a, b) => {
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];
    
    if (sortColumn === 'model') {
      aVal = `${a.brand} ${a.model}`;
      bVal = `${b.brand} ${b.model}`;
    }
    
    if (typeof aVal === 'string') {
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return <ArrowUpDown className="w-3 h-3 text-gray-600" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3 h-3 text-cyan-400" />
      : <ArrowDown className="w-3 h-3 text-cyan-400" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Head-to-Head Comparison</h2>
        <p className="text-gray-300 leading-relaxed">
          Complete specifications for all 12 access points. Click column headers to sort. Purchase links go directly to retailers.
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-900/50 border-b border-gray-700">
              <tr>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors sticky left-0 bg-gray-900/50"
                  onClick={() => handleSort('model')}
                >
                  <div className="flex items-center gap-2">
                    Model
                    <SortIcon column="model" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('tier')}
                >
                  <div className="flex items-center gap-2">
                    Tier
                    <SortIcon column="tier" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('wifiStandard')}
                >
                  <div className="flex items-center gap-2">
                    WiFi
                    <SortIcon column="wifiStandard" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    Price
                    <SortIcon column="price" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('maxSpeed')}
                >
                  <div className="flex items-center gap-2">
                    Max Speed
                    <SortIcon column="maxSpeed" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('coverage')}
                >
                  <div className="flex items-center gap-2">
                    Coverage
                    <SortIcon column="coverage" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('poeWatts')}
                >
                  <div className="flex items-center gap-2">
                    PoE
                    <SortIcon column="poeWatts" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center gap-2">
                    Rating
                    <SortIcon column="rating" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Purchase
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAPs.map((ap, idx) => (
                <tr 
                  key={ap.id} 
                  className={`border-b border-gray-800 hover:bg-gray-700/30 transition-colors ${
                    idx % 2 === 0 ? 'bg-gray-900/20' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-white font-medium sticky left-0 bg-gray-800/90">
                    {ap.brand} {ap.model}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      ap.tier === 'Budget' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      ap.tier === 'Mid-Range' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {ap.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{ap.wifiStandard.split(' ')[0]}</td>
                  <td className="py-3 px-4 text-white font-semibold">${ap.price}</td>
                  <td className="py-3 px-4 text-cyan-400 font-semibold">{ap.maxSpeed} Mbps</td>
                  <td className="py-3 px-4 text-gray-300">{ap.coverage} sq ft</td>
                  <td className="py-3 px-4 text-gray-300">{ap.poeWatts}W</td>
                  <td className="py-3 px-4">
                    <span className="text-cyan-400 font-semibold">{ap.rating}/10</span>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={ap.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Buy
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAPs.slice(0, 6).map(ap => (
          <div key={ap.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="font-semibold text-white text-lg">{ap.brand} {ap.model}</h3>
              <p className="text-xs text-gray-400">{ap.tier} • ${ap.price}</p>
            </div>
            
            <div className="space-y-2 mb-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">WiFi:</span>
                <span className="text-white">{ap.wifiStandard.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Coverage:</span>
                <span className="text-white">{ap.coverage} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Controller:</span>
                <span className="text-white">{ap.controller}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-3 mb-3">
              <p className="text-xs text-gray-400 mb-1">Pros:</p>
              <ul className="text-xs text-green-400 space-y-0.5">
                {ap.pros.slice(0, 2).map((pro, idx) => (
                  <li key={idx}>• {pro}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-700 pt-3">
              <p className="text-xs text-gray-400 mb-1">Best For:</p>
              <p className="text-xs text-gray-300 italic">{ap.bestFor}</p>
            </div>

            <a
              href={ap.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
