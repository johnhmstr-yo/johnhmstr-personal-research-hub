import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Info, ExternalLink, Search, DollarSign, Zap, Volume2, Droplet, Award } from 'lucide-react';
import { filters, tierInfo, flowRateGuide, keyFindings } from './data/filterData';
import { sources } from './data/sources';
import { glossaryTerms } from './data/glossaryTerms';
import GlossaryTerm from './components/GlossaryTerm';
import ComparisonTable from './components/ComparisonTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const COLORS = {
  'Budget': '#f59e0b',
  'Mid-Range': '#3b82f6',
  'Premium': '#8b5cf6',
  'Ultra-Premium': '#10b981'
};

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedTankSize, setSelectedTankSize] = useState('75 gal');
  const [sortBy, setSortBy] = useState('rating');
  const [filterTier, setFilterTier] = useState('all');

  const sections = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'comparison', label: 'Head-to-Head', icon: Filter },
    { id: 'flow-rate', label: 'Flow Rate Reality', icon: Droplet },
    { id: 'value', label: 'Value Analysis', icon: DollarSign },
    { id: 'noise', label: 'Noise & Energy', icon: Volume2 },
    { id: 'features', label: 'Features Matrix', icon: Zap },
    { id: 'tank-fit', label: 'Tank Size Fit', icon: Search },
    { id: 'recommendations', label: 'Recommendations', icon: Award },
    { id: 'sources', label: 'Sources', icon: ExternalLink }
  ];

  const filteredFilters = filters.filter(f => 
    filterTier === 'all' || f.tier === filterTier
  );

  const sortedFilters = [...filteredFilters].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'gph') return b.actualGPH - a.actualGPH;
    if (sortBy === 'noise') return a.noiseLevelDB - b.noiseLevelDB;
    return 0;
  });

  const renderOverview = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Aquarium Canister Filter Comparison</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Choosing the right <GlossaryTerm term="GPH">canister filter</GlossaryTerm> for your 50-150 gallon freshwater aquarium is critical for maintaining healthy water quality. This comprehensive comparison analyzes 14 models across 7 major brands, with real-world testing data on flow rates, noise levels, and long-term reliability.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Unlike manufacturer claims, we focus on <GlossaryTerm term="Turnover Rate">actual GPH performance</GlossaryTerm> with media installed, measured <GlossaryTerm term="Decibel (dB)">noise levels</GlossaryTerm>, and total cost of ownership over 5 years.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(tierInfo).map(([tier, info]) => (
          <div key={tier} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[tier] }}></div>
              <h3 className="text-lg font-semibold text-white">{tier}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-2">{info.range}</p>
            <p className="text-sm text-gray-300 mb-3">{info.description}</p>
            <p className="text-xs text-gray-500">Brands: {info.brands.join(', ')}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-400" />
          Key Findings
        </h3>
        <div className="space-y-4">
          {keyFindings.map((finding, idx) => (
            <div key={idx} className="border-l-2 border-indigo-500 pl-4">
              <h4 className="font-semibold text-indigo-300 mb-1">{finding.title}</h4>
              <p className="text-sm text-gray-300 mb-1">{finding.insight}</p>
              <p className="text-xs text-gray-500 italic">Impact: {finding.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFlowRate = () => {
    const gphData = filters.map(f => ({
      name: `${f.brand} ${f.model}`,
      rated: f.ratedGPH,
      actual: f.actualGPH,
      gap: f.ratedGPH - f.actualGPH,
      tier: f.tier
    })).sort((a, b) => b.actual - a.actual);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Flow Rate Reality Check</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Manufacturer <GlossaryTerm term="GPH">GPH ratings</GlossaryTerm> are measured with empty canisters. Once you add <GlossaryTerm term="Media Capacity">filter media</GlossaryTerm>, actual flow drops 30-50%. This chart shows rated vs actual tested GPH for each model.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Rated vs Actual GPH</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={gphData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="name" type="category" width={150} stroke="#9ca3af" style={{ fontSize: '11px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="rated" fill="#6366f1" name="Rated GPH" />
              <Bar dataKey="actual" fill="#10b981" name="Actual GPH" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Flow Rate Guide by Tank Size</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Tank Size</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Minimum GPH</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Ideal GPH</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Maximum GPH</th>
                </tr>
              </thead>
              <tbody>
                {flowRateGuide.map((guide, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="py-2 px-3 text-white font-medium">{guide.tankSize}</td>
                    <td className="py-2 px-3 text-gray-300">{guide.minGPH} GPH</td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold">{guide.idealGPH} GPH</td>
                    <td className="py-2 px-3 text-gray-300">{guide.maxGPH} GPH</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderValue = () => {
    const valueData = filters.map(f => ({
      name: `${f.brand} ${f.model}`,
      price: f.price,
      actualGPH: f.actualGPH,
      gphPerDollar: (f.actualGPH / f.price).toFixed(2),
      tier: f.tier,
      rating: f.rating
    }));

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Value Analysis</h2>
          <p className="text-gray-300 leading-relaxed">
            Price doesn't always equal value. This analysis compares GPH per dollar, energy efficiency, and long-term cost of ownership.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Price vs Performance</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="price" name="Price" unit="$" stroke="#9ca3af" label={{ value: 'Price ($)', position: 'insideBottom', offset: -5, fill: '#9ca3af' }} />
              <YAxis dataKey="actualGPH" name="Actual GPH" stroke="#9ca3af" label={{ value: 'Actual GPH', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Scatter name="Filters" data={valueData}>
                {valueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.tier]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Best GPH per Dollar</h3>
            <div className="space-y-2">
              {valueData.sort((a, b) => b.gphPerDollar - a.gphPerDollar).slice(0, 5).map((f, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{f.name}</span>
                  <span className="text-emerald-400 font-semibold">{f.gphPerDollar} GPH/$</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Best Overall Value</h3>
            <div className="space-y-2">
              {filters.filter(f => f.rating >= 8.5 && f.price <= 250).sort((a, b) => b.rating - a.rating).slice(0, 5).map((f, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{f.brand} {f.model}</span>
                  <span className="text-indigo-400 font-semibold">{f.rating}/10</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNoise = () => {
    const noiseData = filters.map(f => ({
      name: `${f.brand} ${f.model}`,
      noise: f.noiseLevelDB,
      watts: f.watts,
      tier: f.tier
    })).sort((a, b) => a.noise - b.noise);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Noise & Energy Efficiency</h2>
          <p className="text-gray-300 leading-relaxed">
            <GlossaryTerm term="Decibel (dB)">Noise levels</GlossaryTerm> vary dramatically. Premium filters justify their cost with whisper-quiet operation, while budget models can be conversation-loud.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Noise Level Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={noiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={120} style={{ fontSize: '10px' }} />
              <YAxis stroke="#9ca3af" label={{ value: 'Decibels (dB)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              />
              <Bar dataKey="noise" name="Noise Level (dB)">
                {noiseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.noise < 50 ? '#10b981' : entry.noise < 55 ? '#3b82f6' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-500"></div>
              <span>Whisper Quiet (&lt;50dB)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span>Moderate (50-55dB)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-amber-500"></div>
              <span>Noticeable (&gt;55dB)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Quietest Filters</h3>
            <div className="space-y-2">
              {noiseData.slice(0, 5).map((f, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{f.name}</span>
                  <span className="text-emerald-400 font-semibold">{f.noise} dB</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Most Energy Efficient</h3>
            <div className="space-y-2">
              {filters.sort((a, b) => a.watts - b.watts).slice(0, 5).map((f, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{f.brand} {f.model}</span>
                  <span className="text-blue-400 font-semibold">{f.watts}W</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFeatures = () => {
    const allFeatures = [...new Set(filters.flatMap(f => f.features))];
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Features Matrix</h2>
          <p className="text-gray-300 leading-relaxed">
            Premium features like <GlossaryTerm term="Self-Priming">self-priming</GlossaryTerm>, <GlossaryTerm term="Pre-filter">pre-filters</GlossaryTerm>, and <GlossaryTerm term="Quick Disconnect">quick disconnects</GlossaryTerm> make maintenance easier but add to the cost.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-gray-400 font-medium sticky left-0 bg-gray-800/50">Model</th>
                {allFeatures.map(feature => (
                  <th key={feature} className="text-center py-2 px-3 text-gray-400 font-medium text-xs">{feature}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedFilters.map(filter => (
                <tr key={filter.id} className="border-b border-gray-800 hover:bg-gray-700/30">
                  <td className="py-2 px-3 text-white font-medium sticky left-0 bg-gray-800/50">{filter.brand} {filter.model}</td>
                  {allFeatures.map(feature => (
                    <td key={feature} className="text-center py-2 px-3">
                      {filter.features.includes(feature) ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTankFit = () => {
    const tankSizeFilters = {
      '50 gal': filters.filter(f => f.actualGPH >= 250 && f.actualGPH <= 400),
      '75 gal': filters.filter(f => f.actualGPH >= 375 && f.actualGPH <= 600),
      '100 gal': filters.filter(f => f.actualGPH >= 500 && f.actualGPH <= 800),
      '125 gal': filters.filter(f => f.actualGPH >= 625 && f.actualGPH <= 1000),
      '150 gal': filters.filter(f => f.actualGPH >= 750)
    };

    const recommended = tankSizeFilters[selectedTankSize]?.sort((a, b) => b.rating - a.rating) || [];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Tank Size Fit Guide</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Select your tank size to see recommended filters based on proper <GlossaryTerm term="Turnover Rate">turnover rates</GlossaryTerm> (4-6x per hour for freshwater).
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {Object.keys(tankSizeFilters).map(size => (
            <button
              key={size}
              onClick={() => setSelectedTankSize(size)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedTankSize === size
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map(filter => (
            <div key={filter.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white">{filter.brand} {filter.model}</h3>
                  <p className="text-xs text-gray-400">{filter.tier}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-400">${filter.price}</p>
                  <p className="text-xs text-gray-400">{filter.rating}/10</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Actual GPH:</span>
                  <span className="text-white font-medium">{filter.actualGPH}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Noise:</span>
                  <span className="text-white font-medium">{filter.noiseLevelDB} dB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Media:</span>
                  <span className="text-white font-medium">{filter.mediaCapacity}L</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">{filter.bestFor}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRecommendations = () => {
    const bestOverall = filters.reduce((prev, current) => (prev.rating > current.rating) ? prev : current);
    const bestValue = filters.filter(f => f.tier === 'Mid-Range').sort((a, b) => b.rating - a.rating)[0];
    const quietest = filters.reduce((prev, current) => (prev.noiseLevelDB < current.noiseLevelDB) ? prev : current);
    const bestBudget = filters.filter(f => f.tier === 'Budget').sort((a, b) => b.rating - a.rating)[0];
    const best5075 = filters.filter(f => f.actualGPH >= 250 && f.actualGPH <= 450).sort((a, b) => b.rating - a.rating)[0];
    const best100150 = filters.filter(f => f.actualGPH >= 500 && f.actualGPH <= 900).sort((a, b) => b.rating - a.rating)[0];

    const recommendations = [
      { title: 'Best Overall', filter: bestOverall, reason: 'Highest rating across all categories' },
      { title: 'Best Value', filter: bestValue, reason: 'Best balance of performance and price' },
      { title: 'Quietest Operation', filter: quietest, reason: 'Lowest measured noise level' },
      { title: 'Best Budget Option', filter: bestBudget, reason: 'Top-rated in budget tier' },
      { title: 'Best for 50-75 Gallon', filter: best5075, reason: 'Optimal flow rate for this range' },
      { title: 'Best for 100-150 Gallon', filter: best100150, reason: 'Ideal for larger tanks' }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Expert Recommendations</h2>
          <p className="text-gray-300 leading-relaxed">
            Based on comprehensive testing, user reviews, and long-term reliability data, here are our top picks for different use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold text-indigo-400">{rec.filter.brand} {rec.filter.model}</p>
                <p className="text-sm text-gray-400 mt-1">{rec.reason}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-gray-400">Price</p>
                  <p className="text-white font-semibold">${rec.filter.price}</p>
                </div>
                <div>
                  <p className="text-gray-400">Rating</p>
                  <p className="text-white font-semibold">{rec.filter.rating}/10</p>
                </div>
                <div>
                  <p className="text-gray-400">Actual GPH</p>
                  <p className="text-white font-semibold">{rec.filter.actualGPH}</p>
                </div>
                <div>
                  <p className="text-gray-400">Noise</p>
                  <p className="text-white font-semibold">{rec.filter.noiseLevelDB} dB</p>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-3">
                <p className="text-xs text-gray-400 mb-2">Best For:</p>
                <p className="text-sm text-gray-300">{rec.filter.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSources = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Research Sources</h2>
        <p className="text-gray-300 leading-relaxed">
          This comparison is based on {sources.length} sources including hands-on product testing, expert reviews, manufacturer specifications, and community feedback.
        </p>
      </div>

      <div className="space-y-3">
        {sources.map(source => (
          <div key={source.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-indigo-500/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{source.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{source.author} • {source.date} • {source.type}</p>
                <p className="text-sm text-gray-300">{source.description}</p>
              </div>
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex">
        <aside className="w-64 bg-gray-900/50 border-r border-gray-800 min-h-screen sticky top-0 p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Filter className="w-6 h-6 text-indigo-400" />
              Canister Filters
            </h1>
            <p className="text-xs text-gray-400">50-150 Gallon Guide</p>
          </div>
          <nav className="space-y-1">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'comparison' && <ComparisonTable filters={sortedFilters} />}
          {activeSection === 'flow-rate' && renderFlowRate()}
          {activeSection === 'value' && renderValue()}
          {activeSection === 'noise' && renderNoise()}
          {activeSection === 'features' && renderFeatures()}
          {activeSection === 'tank-fit' && renderTankFit()}
          {activeSection === 'recommendations' && renderRecommendations()}
          {activeSection === 'sources' && renderSources()}
        </main>
      </div>
    </div>
  );
}
