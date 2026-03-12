export const glossaryTerms = [
  {
    term: 'Access Point (AP)',
    definition: 'A networking device that allows WiFi-enabled devices to connect to a wired network. Unlike routers, APs don\'t assign IP addresses - they extend an existing network.',
    category: 'concept',
    deepDive: 'How do access points differ from mesh systems and WiFi extenders?'
  },
  {
    term: 'PoE (Power over Ethernet)',
    definition: 'Technology that delivers electrical power and data over the same ethernet cable. Eliminates need for separate power outlets for access points.',
    category: 'technical',
    deepDive: 'What are the different PoE standards (802.3af, 802.3at, PoE++) and power requirements?'
  },
  {
    term: 'Spatial Streams',
    definition: 'The number of simultaneous data streams an AP can transmit/receive. Expressed as 2x2, 4x4, etc. More streams = better multi-device performance.',
    category: 'technical',
    deepDive: 'How do spatial streams impact real-world performance with multiple connected devices?'
  },
  {
    term: 'WiFi 6 (802.11ax)',
    definition: 'The 6th generation WiFi standard offering improved efficiency, speed, and capacity. Key features: OFDMA, MU-MIMO, Target Wake Time for IoT devices.',
    category: 'standard',
    deepDive: 'What are the practical benefits of WiFi 6 over WiFi 5 in home networks?'
  },
  {
    term: 'WiFi 7 (802.11be)',
    definition: 'The latest WiFi standard with Multi-Link Operation (MLO), 320MHz channels, and 4K-QAM. Offers up to 4x faster speeds than WiFi 6.',
    category: 'standard',
    deepDive: 'Is WiFi 7 worth the premium cost for home networks in 2026?'
  },
  {
    term: 'Controller Software',
    definition: 'Centralized management platform for multiple access points. Examples: UniFi Network, Omada, Instant On Cloud. Enables unified configuration and monitoring.',
    category: 'software',
    deepDive: 'What are the pros and cons of controller-based vs standalone access point management?'
  },
  {
    term: 'Fast Roaming (802.11k/v/r)',
    definition: 'Standards that enable seamless handoff between access points. Devices switch APs without disconnecting, critical for VoIP and video calls.',
    category: 'feature',
    deepDive: 'How does fast roaming work and which devices support it?'
  },
  {
    term: 'OFDMA',
    definition: 'Orthogonal Frequency-Division Multiple Access - WiFi 6 feature that divides channels into smaller sub-carriers, serving multiple devices simultaneously.',
    category: 'technical',
    deepDive: 'How does OFDMA improve network efficiency with many IoT devices?'
  },
  {
    term: 'MU-MIMO',
    definition: 'Multi-User Multiple Input Multiple Output - allows AP to communicate with multiple devices at once instead of sequentially. WiFi 6 adds uplink MU-MIMO.',
    category: 'technical',
    deepDive: 'What\'s the difference between downlink and uplink MU-MIMO?'
  },
  {
    term: 'Beamforming',
    definition: 'Technology that focuses WiFi signal toward specific client devices rather than broadcasting equally in all directions. Improves range and reduces interference.',
    category: 'feature',
    deepDive: 'How much does beamforming actually improve WiFi performance?'
  }
];
