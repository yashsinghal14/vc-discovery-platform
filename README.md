# VC Discovery Platform

A web-based platform designed to help startups find the perfect Venture Capitalists for their fundraising needs. Users can search VCs by industry specialization and access validated contact information.

## Features

- **Industry-based Search**: Filter VCs by specific industries (Fintech, Automotive, Fashion, Healthcare, etc.)
- **Advanced Search**: Search by VC name, firm name, or specialties
- **Validated Email Addresses**: Direct access to verified VC contact information
- **Comprehensive VC Profiles**: Including fund size, location, portfolio companies, and LinkedIn profiles
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Filtering**: Instant results as you type or change filters

## Tech Stack

- **Frontend**: Next.js 15 with React 18
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React icons
- **Deployment**: Optimized for Netlify hosting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/vc-discovery-platform.git
cd vc-discovery-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
npm run export
```

2. Deploy the `out` directory to Netlify

## VC Database

The platform includes a curated database of VCs across various industries:

- **Fintech**: TechVentures Capital, Crypto Capital
- **Automotive**: Automotive Innovation Fund
- **Fashion**: Fashion Forward Ventures
- **Healthcare**: Healthcare Innovations
- **Clean Energy**: Green Energy Capital
- **AI**: AI Ventures
- **EdTech**: EdTech Innovations

Each VC profile includes:
- Name and firm information
- Validated email address
- Industry specialties
- Fund size and location
- Portfolio companies
- LinkedIn profile
- Website

## Features in Detail

### Industry Filtering
- Select from 9+ industry categories
- "All Industries" option to view all VCs
- Industry matching based on VC specialties

### Search Functionality
- Real-time search as you type
- Search across VC names, firm names, and specialties
- Case-insensitive matching

### Contact Information
- Direct mailto: links for easy email composition
- Validated email addresses for each VC
- LinkedIn profile links for professional networking

### VC Profiles
- Comprehensive information display
- Fund size and location details
- Top portfolio companies
- Specialty tags for easy identification

## Contributing

This project was built as a technical assessment for Invesho. For any questions or improvements, please create an issue or submit a pull request.

## License

MIT License - see LICENSE file for details

## Built for Invesho

This platform was created as part of the Software Intern application process for Invesho, an AI-powered platform designed to automate and accelerate startup fundraising.

---

**Live Demo**: [https://superb-tartufo-fef157.netlify.app/]
**GitHub Repository**: [https://github.com/yashsinghal14/vc-discovery-platform]
