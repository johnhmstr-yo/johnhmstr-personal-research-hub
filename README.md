# Personal Research Hub

A personal research dashboard built with React 18 + Vite 5, hosting interactive research projects with data visualizations and deep-dive analysis.

## 🔬 Research Projects

### Aquarium Canister Filter Comparison
**Comprehensive analysis of 14 canister filter models for 50-150 gallon freshwater aquariums**

- **14 Models Analyzed** across 7 major brands (Fluval, Eheim, OASE, Penn Plax, SunSun, Marineland, Aqueon, SICCE)
- **4 Market Tiers** from Budget ($60-$120) to Ultra-Premium ($350-$450)
- **Real-World Testing Data** including actual GPH vs rated GPH, noise levels (dB), energy consumption
- **Interactive Visualizations** with sortable tables, scatter plots, bar charts, and radar charts
- **Tank Size Fit Guide** with recommendations for 50, 75, 100, 125, and 150 gallon tanks
- **15 Research Sources** including product testing, expert reviews, and community feedback

**Key Features:**
- Head-to-head comparison tables
- Flow rate reality check (rated vs actual GPH)
- Value analysis (price vs performance)
- Noise & energy efficiency rankings
- Features matrix
- Expert recommendations by use case
- 8 glossary terms with research prompts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/johnhmstr-yo/johnhmstr-personal-research-hub.git
cd johnhmstr-personal-research-hub

# Install dependencies
npm install

# Start the development server
npm run dev
```

The Research Hub will be available at `http://localhost:5180`

### Build for Production

```bash
npm run build
npm run preview
```

## 📚 Project Structure

```
personal-research-hub/
├── src/
│   ├── projects/
│   │   ├── canister-filter-comparison/
│   │   │   ├── App.jsx                    # Main dashboard component
│   │   │   ├── components/
│   │   │   │   ├── ComparisonTable.jsx    # Sortable comparison table
│   │   │   │   └── GlossaryTerm.jsx       # Interactive glossary tooltips
│   │   │   ├── data/
│   │   │   │   ├── filterData.js          # Product specifications
│   │   │   │   ├── sources.js             # Research citations
│   │   │   │   └── glossaryTerms.js       # Technical definitions
│   │   │   └── meta.json                  # Project metadata
│   │   └── index.js                       # Project registry
│   ├── components/
│   │   ├── HubHome.jsx                    # Hub home page
│   │   ├── ProjectDetailFlyout.jsx        # Project details panel
│   │   └── CompareView.jsx                # Project comparison view
│   ├── App.jsx                            # Main app shell
│   ├── main.jsx                           # App entry point
│   └── index.css                          # Global styles
├── hub-config.json                        # Hub configuration
└── package.json
```

## 🎨 Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool and dev server
- **Recharts** - Data visualization library
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS framework

## 🔗 Public Library Integration

This hub is configured to browse the [Community Research Hub](https://github.com/mrshaun13/research-hub) public library, allowing you to explore research projects from the community while maintaining your own personal projects.

## 📊 Research Methodology

Projects in this hub follow a rigorous research pipeline:
1. **Interpret** - Parse research requirements
2. **Survey** - Scan the research landscape
3. **Discover** - Identify key dimensions and metrics
4. **Research** - Gather detailed data from multiple sources
5. **Analyze** - Identify findings and select visualizations
6. **Build** - Create interactive dashboard components
7. **Enrich** - Add glossary terms and deep-dive prompts
8. **Present** - QA and publish

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

This is a personal research hub, but feel free to fork and create your own research projects using the same structure!

## 📧 Contact

GitHub: [@johnhmstr-yo](https://github.com/johnhmstr-yo)

---

*Built with the Research Visualizer AI skill - autonomous research and dashboard creation*
