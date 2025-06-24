# BGP.mom

BGP.mom is a community-driven platform that lists VPS providers offering BGP support. The platform helps network engineers and system administrators find and compare VPS providers that support BGP (Border Gateway Protocol) configurations.

## Features

- 🌐 Comprehensive list of VPS providers with BGP support
- 🔍 Filter by location, features, and pricing
- 📊 RPKI validation status display
- 🔄 Prefix update status monitoring
- 💰 Clear pricing and BGP setup fee information
- 🌍 Multiple currency support
- 🎨 Dark mode by default

## Tech Stack

- [Astro](https://astro.build/) - Static Site Generator
- [daisyUI](https://daisyui.com/) - Component Library

## Getting Started

### Prerequisites

- Node.js 22 or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/BitB0y/bgp.mom.git
cd bgp.mom

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Adding a VPS Provider

Create a new JSON file in `src/content/vps/` with the following structure:

```json
{
  "title": "Provider Name",
  "asn": "AS12345",
  "tableType": "full",
  "rpkiStatus": "valid",
  "prefixUpdateStatus": "positive",
  "locations": ["NL", "US", "HK"],
  "services": ["VPS"],
  "features": [
    "BGP Community Passthrough",
    "Downstream Support"
  ],
  "bgpFee": "10",
  "pricing": "4",
  "currency": "USD",
  "url": "https://provider-website.com"
}
```

## Development

The project uses Astro's content collections for data management. Provider data is stored in JSON format and validated through TypeScript schemas.

### Key Files

- `src/content/vps/*.json` - VPS provider data
- `src/content.config.ts` - Content schema definitions
- `src/components/Card.astro` - Provider card component
- `src/pages/index.astro` - Main listing page
- `src/layouts/Layout.astro` - Base layout with navigation

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Add/update provider information
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Contribution Guidelines

- Ensure provider information is accurate and up-to-date
- Follow the JSON schema for provider data
- Use standard country codes for locations
- Keep pricing information current
- Verify ASN information

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, questions, or suggestions:
- Open an [issue](https://github.com/Bitti09/bgp.mom/issues)
- Join our [Discord community](#) (coming soon)
- Follow updates on [Twitter](#) (coming soon)

## Acknowledgments

- Thanks to all VPS providers for their BGP support
- Special thanks to our contributors
- Built with ♥ by the BGP community