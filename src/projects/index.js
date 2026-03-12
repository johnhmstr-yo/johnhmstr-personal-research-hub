import { lazy } from 'react';

export const projectRegistry = [
  {
    slug: 'canister-filter-comparison',
    title: 'Aquarium Canister Filter Comparison',
    subtitle: '17 Models for 50-150 Gallon Freshwater Tanks',
    query: 'comparative analysis of aquarium canister filters for freshwater aquariums between 50 and 150 gallons',
    lens: 'product',
    icon: 'Filter',
    accentColor: 'cyan',
    visibility: 'public',
    createdAt: '2026-02-20T20:48:00Z'
  },
  {
    slug: 'wireless-access-points',
    title: 'Wireless Access Points for Home Networks',
    subtitle: '12 Models to Extend Your Existing Network',
    query: 'wireless access point for home use that connects to an already existing home network',
    lens: 'product',
    icon: 'Wifi',
    accentColor: 'cyan',
    visibility: 'local',
    createdAt: '2026-03-12T23:47:00Z'
  }
];

export const projectComponents = {
  'canister-filter-comparison': lazy(() => import('./canister-filter-comparison/App')),
  'wireless-access-points': lazy(() => import('./wireless-access-points/App'))
};
