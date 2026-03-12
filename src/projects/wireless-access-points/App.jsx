import React, { useState } from 'react';
import { Wifi, TrendingUp, DollarSign, Zap, Home, BookOpen, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import ComparisonTable from './components/ComparisonTable';
import GlossaryTerm from './components/GlossaryTerm';
import { accessPoints, tierInfo, coverageGuide, keyFindings } from './data/accessPointData';
import { sources } from './data/sources';
import { glossaryTerms } from './data/glossaryTerms';

export default function WirelessAccessPointsApp() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'comparison', label: 'Comparison', icon: TrendingUp },
    { id: 'analysis', label: 'Analysis', icon: Zap },
    { id: 'guide', label: 'Setup Guide', icon: BookOpen },
    { id: 'sources', label: 'Sources', icon: ExternalLink }
  ];

  const pricePerformanceData = accessPoints.map(ap => ({
    name: `${ap.brand} ${ap.model}`,
    price: ap.price,
    speed: ap.maxSpeed,
    rating: ap.rating,
    tier: ap.tier
  }));

  const coverageData = accessPoints.map(ap => ({
    name: `${ap.brand.substring(0, 3)} ${ap.model}`,
    coverage: ap.coverage,
    price: ap.price
  })).sort((a, b) => b.coverage - a.coverage);

  const powerData = accessPoints.map(ap => ({
    name: `${ap.brand.substring(0, 3)} ${ap.model}`,
    watts: ap.poeWatts,
    tier: ap.tier
  })).sort((a, b) => a.watts - b.watts);

  const radarData = accessPoints.slice(0, 5).map(ap => ({
    model: `${ap.brand} ${ap.model}`,
    Performance: (ap.maxSpeed / 220) * 10,
    Value: ((300 - ap.price) / 300) * 10,
    Coverage: (ap.coverage / 300) * 10,
    Efficiency: ((30 - ap.poeWatts) / 30) * 10,
    Rating: ap.rating
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Wifi className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Wireless Access Points for Home Networks</h1>
              <p className="text-gray-400 mt-1">12 Models Compared • Extend Your Existing Network</p>
            </div>
          </div>
          
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
            <p className="text-gray-300 leading-relaxed">
              Comprehensive comparison of <GlossaryTerm {...glossaryTerms.find(t => t.term === 'Access Point (AP)')} /> options for extending your home network. 
              Covers <GlossaryTerm {...glossaryTerms.find(t => t.term === 'WiFi 6 (802.11ax)')} />, <GlossaryTerm {...glossaryTerms.find(t => t.term === 'WiFi 7 (802.11be)')} />, 
              and <GlossaryTerm {...glossaryTerms.find(t => t.term === 'PoE (Power over Ethernet)')} /> requirements across budget, mid-range, and premium tiers.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-700">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Findings */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Key Findings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyFindings.map((finding, idx) => (
                  <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-cyan-400 mb-2">{finding.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{finding.insight}</p>
                    <p className="text-gray-400 text-xs italic">💡 {finding.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Tiers */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Market Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(tierInfo).map(([tier, info]) => (
                  <div key={tier} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{tier}</h3>
                      <span className="text-cyan-400 font-bold">{info.range}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{info.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {info.brands.slice(0, 3).map((brand, idx) => (
                        <span key={idx} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price vs Performance */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Price vs Performance</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      type="number" 
                      dataKey="price" 
                      name="Price" 
                      unit="$"
                      stroke="#9CA3AF"
                      label={{ value: 'Price ($)', position: 'bottom', offset: 40, fill: '#9CA3AF' }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="speed" 
                      name="Max Speed" 
                      unit=" Mbps"
                      stroke="#9CA3AF"
                      label={{ value: 'Max Speed (Mbps)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Scatter 
                      name="Budget" 
                      data={pricePerformanceData.filter(d => d.tier === 'Budget')} 
                      fill="#10B981" 
                    />
                    <Scatter 
                      name="Mid-Range" 
                      data={pricePerformanceData.filter(d => d.tier === 'Mid-Range')} 
                      fill="#3B82F6" 
                    />
                    <Scatter 
                      name="Premium" 
                      data={pricePerformanceData.filter(d => d.tier === 'Premium')} 
                      fill="#A855F7" 
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <ComparisonTable accessPoints={accessPoints} />
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-8">
            {/* Coverage Comparison */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Coverage Area Comparison</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={coverageData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis stroke="#9CA3AF" label={{ value: 'Coverage (sq ft)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                    />
                    <Bar dataKey="coverage" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Power Consumption */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">PoE Power Requirements</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={powerData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis stroke="#9CA3AF" label={{ value: 'Power (Watts)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                    />
                    <Bar dataKey="watts" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-gray-400 text-sm mt-4">
                  💡 Most APs use 802.3af (12-15W) or 802.3at (16-30W). WiFi 7 models may require PoE++ (30W+).
                </p>
              </div>
            </div>

            {/* Top 5 Radar */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Top 5 Models - Multi-Factor Analysis</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <ResponsiveContainer width="100%" height={500}>
                  <RadarChart data={radarData[0] ? Object.keys(radarData[0]).filter(k => k !== 'model').map(key => ({
                    metric: key,
                    ...radarData.reduce((acc, item) => ({ ...acc, [item.model]: item[key] }), {})
                  })) : []}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
                    <PolarRadiusAxis stroke="#9CA3AF" />
                    {radarData.map((item, idx) => (
                      <Radar
                        key={idx}
                        name={item.model}
                        dataKey={item.model}
                        stroke={['#06B6D4', '#3B82F6', '#A855F7', '#10B981', '#F59E0B'][idx]}
                        fill={['#06B6D4', '#3B82F6', '#A855F7', '#10B981', '#F59E0B'][idx]}
                        fillOpacity={0.2}
                      />
                    ))}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Coverage Guide */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How Many APs Do You Need?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coverageGuide.map((guide, idx) => (
                  <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{guide.homeSize}</h3>
                      <span className="text-cyan-400 font-bold">{guide.recommended}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Recommended models:</p>
                    <div className="flex flex-wrap gap-1">
                      {guide.models.map((model, midx) => (
                        <span key={midx} className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Setup Guide: Adding an AP to Your Network</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">Step 1: Choose Your Power Method</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    <GlossaryTerm {...glossaryTerms.find(t => t.term === 'PoE (Power over Ethernet)')} /> is recommended for flexibility:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                    <li><strong>PoE Injector:</strong> $20-50, plug between router and AP</li>
                    <li><strong>PoE Switch:</strong> $100-200, powers multiple APs</li>
                    <li><strong>Power Adapter:</strong> Some APs include, limits placement</li>
                  </ul>
                </div>

                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">Step 2: Physical Installation</h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                    <li>Mount AP centrally on ceiling or high on wall</li>
                    <li>Run ethernet cable from router/switch to AP location</li>
                    <li>Connect PoE injector if using one</li>
                    <li>Power on and wait for LED indicator</li>
                  </ul>
                </div>

                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">Step 3: Configuration</h3>
                  <p className="text-gray-300 text-sm mb-2">Configuration varies by brand:</p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                    <li><strong>Ubiquiti:</strong> Install UniFi Network app, adopt AP, configure SSIDs</li>
                    <li><strong>TP-Link Omada:</strong> Web UI or Omada app, standalone or controller</li>
                    <li><strong>Aruba Instant On:</strong> Mobile app, cloud-based, very easy</li>
                    <li><strong>Netgear:</strong> Web UI or Insight app (subscription for cloud)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">Step 4: Network Settings</h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                    <li>Use same SSID and password as existing network for seamless roaming</li>
                    <li>Enable <GlossaryTerm {...glossaryTerms.find(t => t.term === 'Fast Roaming (802.11k/v/r)')} /> if available</li>
                    <li>Set AP to different channel than router (1, 6, or 11 on 2.4GHz)</li>
                    <li>Disable DHCP on AP (router handles IP assignment)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">Step 5: Optimization</h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                    <li>Test coverage with WiFi analyzer app</li>
                    <li>Adjust transmit power if APs overlap too much</li>
                    <li>Enable band steering to push devices to 5GHz</li>
                    <li>Monitor connected devices and adjust as needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-gray-300 text-sm">
                <strong>Pro Tip:</strong> Start with one AP in the area with worst coverage. Test thoroughly before adding more. 
                Multiple budget APs often outperform one premium AP for whole-home coverage.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Research Sources</h2>
              <p className="text-gray-300 mb-6">
                This analysis is based on {sources.length} sources including product testing, expert reviews, and community feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {sources.map(source => (
                <div key={source.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20">
                          {source.type}
                        </span>
                        <span className="text-xs text-gray-400">{source.date}</span>
                      </div>
                      <h3 className="font-semibold text-white mb-1">{source.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{source.author}</p>
                      <p className="text-sm text-gray-300">{source.description}</p>
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
