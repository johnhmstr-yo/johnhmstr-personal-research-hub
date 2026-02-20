import { lazy } from 'react';

export const projectRegistry = [
  {
    slug: 'canister-filter-comparison',
    title: 'Aquarium Canister Filter Comparison',
    subtitle: '14 Models for 50-150 Gallon Freshwater Tanks',
    query: 'comparative analysis of aquarium canister filters for freshwater aquariums between 50 and 150 gallons',
    lens: 'product',
    icon: 'Filter',
    accentColor: 'cyan',
    visibility: 'public',
    createdAt: '2026-02-20T20:48:00Z'
  }
];

export const projectComponents = {
  'canister-filter-comparison': lazy(() => import('./canister-filter-comparison/App'))
};
