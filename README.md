# Daily Assistant - AI Chat Website

A production-ready ChatGPT-style application with a Linear-inspired design and Paddle.com-style scroll animations. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

✨ **Core Features (V1)**
- Instant AI chat with streaming responses
- Beautiful Linear-inspired dark UI
- Local conversation storage for privacy
- Sidebar with conversation history
- "New Chat" functionality
- SEO-optimized landing page

🎨 **Design & UX**
- Linear.app visual language
- Paddle.com-style scroll animations
- Inter font with variable weight
- Dark theme with mint/blue accents
- Framer Motion micro-interactions
- GSAP ScrollTrigger animations

🔒 **Privacy-First**
- Client-side conversation storage
- No data training on user conversations
- API proxy for secure key handling
- Zero tracking or analytics

## Tech Stack

- **Framework**: Next.js 14 (App Router, RSC)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Components**: Radix primitives + Lucide icons
- **Animations**: Framer Motion + GSAP
- **State**: Zustand (lightweight state management)
- **Storage**: localStorage/IndexedDB
- **API**: Edge routes with streaming (SSE)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (or other LLM provider)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd daily-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your API key to `.env.local`:
```env
MODEL_API_KEY=your_openai_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MODEL_API_KEY` | OpenAI API key for chat completions | Yes |

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/chat/          # Chat API endpoint
│   ├── app/               # Chat application page
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles and theme
├── lib/
│   ├── store.ts           # Zustand store for state management
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions (shadcn/ui)
└── components/            # Reusable UI components (future)
```

## Routes

- `/` - Landing page with animations and features
- `/app` - Main chat application
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/api/chat` - Chat completion API endpoint

## Key Features

### Landing Page Sections

1. **Hero** - Bold headline with animated background
2. **Value Cards** - Three key benefits with hover effects
3. **Demo** - Interactive chat preview with scroll animations
4. **How It Works** - 3-step process explanation
5. **Privacy & Security** - Trust-building content
6. **Coming Soon** - Future features roadmap
7. **FAQ & CTA** - Final conversion elements

### Chat Application

- **Sidebar**: Conversation list with timestamps
- **Main Chat**: Message history with streaming responses
- **Input**: Textarea with send button and shortcuts
- **Storage**: Automatic local persistence
- **Responsive**: Mobile-friendly design

## Customization

### Theme Colors

Update the CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: oklch(0.7 0.15 180);    /* Blue accent */
  --mint: oklch(0.7 0.15 150);       /* Mint accent */
  --background: oklch(0.08 0 0);     /* Deep charcoal */
  /* ... more colors */
}
```

### AI Provider

The chat API in `src/app/api/chat/route.ts` can be modified to use different providers:

- OpenAI (default)
- Anthropic Claude
- Google Gemini
- Local models via Ollama
- Custom endpoints

## Performance

- **Loading**: Sub-100ms perceived page transitions
- **Animations**: GPU-accelerated transforms only
- **Images**: Optimized with Next.js Image component
- **Fonts**: Self-hosted with next/font
- **Bundle**: Code splitting and tree shaking

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## Coming Soon Features

- Multi-LLM provider switching
- Voice conversations
- File upload support
- Team collaboration spaces
- Shareable conversation links
- Custom prompt templates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, contact us at:
- Email: support@dailyassistant.app
- Privacy: privacy@dailyassistant.app
- Legal: legal@dailyassistant.app
