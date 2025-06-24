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

## Contributing

### Adding a VPS Provider

1. Go to the [New Provider Issue](https://github.com/BitB0y/bgp.mom/issues/new?template=add-provider.yml) page
2. Fill out the provider information form
3. Submit the issue
4. Our team will review and add the provider

### Updating Provider Information

1. Go to the [Update Provider Issue](https://github.com/BitB0y/bgp.mom/issues/new?template=update-provider.yml) page
2. Fill out the update form with the changed information
3. Provide verification sources for the changes
4. Submit the issue
5. Our team will review and apply the updates

For reference, here's the provider data structure:

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

## Developer Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Contribution Guidelines

- Follow the TypeScript schema for data validation
- Use standard country codes for locations
- Test your changes locally before submitting
- Keep code clean and well-documented
- Follow the existing code style

## Support

For support, questions, or suggestions:
- Open an [issue](https://github.com/BitB0y/bgp.mom/issues)
- Join our [Discord community](#) (coming soon)
- Follow updates on [Twitter](#) (coming soon)

## Acknowledgments

- Thanks to all VPS providers for their BGP support
- Special thanks to our contributors
- Built with ♥ by the BGP community