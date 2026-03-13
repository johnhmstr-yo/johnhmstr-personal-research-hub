export const chipsetComparison = [
  {
    manufacturer: 'Qualcomm',
    models: ['U6 Pro', 'AP22', 'EAP660 HD', 'EAP783', 'U7 Pro XGS', 'Zyxel WBE660S'],
    avgRealWorldSpeed: 2100,
    avgEfficiency: 8.3,
    avgPrice: 195,
    pros: ['Best performance', 'Lower latency', 'Better MU-MIMO', 'Industry standard'],
    cons: ['Higher cost', 'More power consumption'],
    marketShare: 65
  },
  {
    manufacturer: 'MediaTek',
    models: ['U6 Lite'],
    avgRealWorldSpeed: 550,
    avgEfficiency: 9.2,
    avgPrice: 99,
    pros: ['Very efficient', 'Lower cost', 'Good for budget'],
    cons: ['Lower performance', 'Older 2.4GHz radio', 'Limited features'],
    marketShare: 20
  },
  {
    manufacturer: 'Broadcom',
    models: ['ASUS ZenWiFi BD5'],
    avgRealWorldSpeed: 2250,
    avgEfficiency: 7.8,
    avgPrice: 299,
    pros: ['Excellent performance', 'Advanced features', 'Good outdoor'],
    cons: ['Expensive', 'Less common', 'Higher power'],
    marketShare: 15
  }
];

export const performanceByUseCase = [
  {
    useCase: 'Single User, Light Use',
    description: 'Browsing, email, streaming 1080p',
    recommended: ['U6 Lite', 'EAP225', 'AP11', 'WAX210'],
    minSpeed: 500,
    minClients: 50,
    reasoning: 'Budget APs provide plenty of bandwidth. Focus on coverage over speed.'
  },
  {
    useCase: 'Family, Moderate Use',
    description: '3-5 users, 4K streaming, video calls, gaming',
    recommended: ['U6 Pro', 'AP22', 'EAP660 HD'],
    minSpeed: 1500,
    minClients: 150,
    reasoning: 'Mid-range with 4x4 or good 2x2 handles concurrent usage well.'
  },
  {
    useCase: 'Smart Home Heavy',
    description: '50+ IoT devices, cameras, automation',
    recommended: ['U6 Pro', 'EAP660 HD', 'WAX610'],
    minSpeed: 1000,
    minClients: 200,
    reasoning: 'High client capacity critical. True WiFi 6 on 2.4GHz for IoT.'
  },
  {
    useCase: 'Work From Home',
    description: 'Video conferencing, VPN, file transfers',
    recommended: ['U6 Pro', 'AP22', 'EAP660 HD'],
    minSpeed: 1500,
    minClients: 100,
    reasoning: 'Low latency and stable connection more important than raw speed.'
  },
  {
    useCase: 'Content Creator',
    description: 'Large file uploads, 4K editing, NAS access',
    recommended: ['U7 Pro XGS', 'EAP783', 'Zyxel WBE660S'],
    minSpeed: 3500,
    minClients: 150,
    reasoning: 'Need 2.5GbE+ uplink and high throughput for large transfers.'
  },
  {
    useCase: 'Gaming Household',
    description: 'Multiple consoles, PC gaming, low latency',
    recommended: ['U6 Pro', 'EAP660 HD', 'U7 Pro XGS'],
    minSpeed: 1800,
    minClients: 150,
    reasoning: 'Qualcomm chipsets offer best latency. MU-MIMO prevents lag spikes.'
  }
];

export const realWorldSpeedAnalysis = {
  speedRetention: [
    { tier: 'Budget', avgRetention: 68, range: '60-75%' },
    { tier: 'Mid-Range', avgRetention: 75, range: '70-80%' },
    { tier: 'Premium', avgRetention: 80, range: '75-85%' }
  ],
  factorsAffecting: [
    { factor: 'Distance', impact: 'High', description: 'Speed drops 30-50% at 30+ feet' },
    { factor: 'Walls/Obstacles', impact: 'High', description: 'Each wall reduces signal 10-30%' },
    { factor: 'Client Device', impact: 'High', description: 'Older devices cap at WiFi 5 speeds' },
    { factor: 'Channel Congestion', impact: 'Medium', description: 'Neighbors on same channel reduce 10-20%' },
    { factor: 'Number of Clients', impact: 'Medium', description: 'Performance degrades above 80% capacity' },
    { factor: 'Time of Day', impact: 'Low', description: 'Evening congestion in dense areas' }
  ],
  testingMethodology: 'Real-world speeds measured at 15 feet, no obstacles, using WiFi 6 client (Intel AX200), iperf3 testing over 5 minutes'
};

export const costAnalysis = {
  totalCostOfOwnership: [
    {
      model: 'U6 Lite',
      apCost: 99,
      poeCost: 25,
      controllerCost: 0,
      subscriptionYearly: 0,
      year5Total: 124,
      costPerSqFt: 0.069
    },
    {
      model: 'U6 Pro',
      apCost: 149,
      poeCost: 35,
      controllerCost: 0,
      subscriptionYearly: 0,
      year5Total: 184,
      costPerSqFt: 0.084
    },
    {
      model: 'EAP660 HD',
      apCost: 150,
      poeCost: 35,
      controllerCost: 0,
      subscriptionYearly: 0,
      year5Total: 185,
      costPerSqFt: 0.093
    },
    {
      model: 'AP22',
      apCost: 179,
      poeCost: 25,
      controllerCost: 0,
      subscriptionYearly: 0,
      year5Total: 204,
      costPerSqFt: 0.102
    },
    {
      model: 'WAX610',
      apCost: 180,
      poeCost: 35,
      controllerCost: 0,
      subscriptionYearly: 120,
      year5Total: 815,
      costPerSqFt: 0.388
    },
    {
      model: 'U7 Pro XGS',
      apCost: 299,
      poeCost: 50,
      controllerCost: 0,
      subscriptionYearly: 0,
      year5Total: 349,
      costPerSqFt: 0.140
    }
  ],
  hiddenCosts: [
    'PoE injector or switch ($25-200)',
    'Ethernet cable runs ($50-500 if professional)',
    'Controller hardware if not using cloud (Ubiquiti: $199, TP-Link: $89)',
    'Cloud subscriptions (Netgear Insight: $120/year)',
    'Mounting hardware ($10-30)',
    'Professional installation ($100-300 per AP)'
  ]
};

export const reliabilityMetrics = [
  {
    metric: 'MTBF (Mean Time Between Failures)',
    description: 'Average hours before hardware failure',
    budget: '150,000-180,000 hours (17-20 years)',
    midRange: '200,000-250,000 hours (23-28 years)',
    premium: '250,000-300,000 hours (28-34 years)',
    importance: 'High - indicates build quality and longevity'
  },
  {
    metric: 'Warranty Period',
    description: 'Manufacturer confidence in product',
    budget: '1 year (Ubiquiti, Aruba, Netgear)',
    midRange: '1-5 years (TP-Link: 5yr)',
    premium: '2-5 years (ASUS: 2yr, TP-Link: 5yr, Zyxel: 3yr)',
    importance: 'Medium - longer warranty = better support'
  },
  {
    metric: 'Firmware Update Frequency',
    description: 'Security patches and feature updates',
    budget: 'Quarterly to yearly',
    midRange: 'Monthly to quarterly',
    premium: 'Monthly with beta channels',
    importance: 'High - critical for security and performance'
  },
  {
    metric: 'Community Support',
    description: 'User forums and documentation',
    budget: 'Moderate (TP-Link, Netgear)',
    midRange: 'Good (Aruba, TP-Link)',
    premium: 'Excellent (Ubiquiti has largest community)',
    importance: 'Medium - helpful for troubleshooting'
  }
];

export const upgradePathAnalysis = [
  {
    currentSetup: 'Single Router',
    upgradeOption: '1x Budget AP',
    cost: '$60-110',
    benefit: 'Extend coverage to dead zones',
    difficulty: 'Easy',
    recommendation: 'Start here for simple extension'
  },
  {
    currentSetup: 'Single Router',
    upgradeOption: '1x Mid-Range AP',
    cost: '$150-200',
    benefit: 'Better performance + coverage',
    difficulty: 'Easy',
    recommendation: 'Best single-AP upgrade'
  },
  {
    currentSetup: '1x Budget AP',
    upgradeOption: 'Add 2nd Budget AP',
    cost: '$60-110',
    benefit: 'Double coverage area',
    difficulty: 'Moderate',
    recommendation: 'More coverage than upgrading to premium'
  },
  {
    currentSetup: '1x Mid-Range AP',
    upgradeOption: 'Add 2nd Mid-Range AP',
    cost: '$150-200',
    benefit: 'Whole-home seamless roaming',
    difficulty: 'Moderate',
    recommendation: 'Ideal for 3000+ sq ft homes'
  },
  {
    currentSetup: '2x Budget APs',
    upgradeOption: 'Replace with 2x Mid-Range',
    cost: '$300-400',
    benefit: '2-3x performance improvement',
    difficulty: 'Easy',
    recommendation: 'If speed is bottleneck, not coverage'
  },
  {
    currentSetup: 'Mesh System',
    upgradeOption: 'Replace with Wired APs',
    cost: '$200-600',
    benefit: 'Eliminate wireless backhaul lag',
    difficulty: 'Hard (requires ethernet)',
    recommendation: 'Massive improvement if you can run cables'
  }
];
