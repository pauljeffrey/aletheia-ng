# Aletheia Research Labs - Website

A futuristic, engaging website for Aletheia Research Labs, featuring AI models, data analytics, and robotics software.

## Features

- **Modern Design**: Futuristic UI with dark green, warm mustard, light beige, and blue color scheme
- **Interactive Components**: Engaging animations and moving parts
- **Model Playground**: Interactive interface for testing AI models
  - Pretrained and Finetuned Models (Tab 1)
  - Capable Models with ChatGPT-style interface (Tab 2)
- **Responsive Design**: Works on all device sizes

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Modal**: Serverless deployment for AI models

## Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aletheia-ng
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file (if needed):
```env
NEXT_PUBLIC_API_URL=your_api_url
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the production bundle:
```bash
npm run build
# or
yarn build
```

Start the production server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
aletheia-ng/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   └── models/     # Model API endpoints
│   │   ├── products/       # Product pages
│   │   │   └── sabiyarn/   # SabiYarn model page
│   │   └── ...
│   ├── components/         # React components
│   │   ├── products/       # Product-specific components
│   │   └── ui/            # UI components
│   ├── sections/          # Page sections
│   ├── assets/            # Static assets
│   └── lib/               # Utility functions
├── modal/                 # Modal deployment scripts
├── public/                # Public assets
└── ...
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables

Create a `.env.local` file for local development:

```env
# API URLs (optional, defaults to Modal endpoints)
NEXT_PUBLIC_API_URL_PRETRAINED=https://your-modal-endpoint.modal.run/predict
NEXT_PUBLIC_API_URL_CAPABLE=https://your-modal-endpoint.modal.run/predict
```

## API Routes

### Pretrained Models
- **Endpoint**: `/api/models/pretrained`
- **Method**: POST
- **Body**: 
  ```json
  {
    "model": "sabiyarn-1.0",
    "prompt": "your prompt",
    "config": {
      "maxLength": 100,
      "maxNewTokens": 80,
      "temperature": 0.99,
      ...
    }
  }
  ```

### Capable Models
- **Endpoint**: `/api/models/capable`
- **Method**: POST
- **Body**:
  ```json
  {
    "model": "sabiyarn-chat",
    "messages": [
      {"role": "user", "content": "Hello"}
    ],
    "sessionId": "session-id"
  }
  ```

## Model Deployment

See [MODAL_DEPLOYMENT.md](./MODAL_DEPLOYMENT.md) for detailed instructions on deploying models to Modal.

## Color Scheme

- **Primary Green**: `#66BB6A` (Light Green)
- **Secondary Green**: `#81C784` (Soft Green)
- **Accent Mustard**: `#FFB74D` (Light Warm Mustard)
- **Background Cream**: `#FFFBF5` (Very Light Beige/Cream)
- **Primary Blue**: `#64B5F6` (Light Blue)
- **Secondary Blue**: `#90CAF9` (Soft Blue)
- **Text Dark**: `#263238` (Dark Text)
- **Text Medium**: `#546E7A` (Medium Text)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Build Errors
1. Clear `.next` directory: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`
4. Rebuild: `npm run build`

### API Errors
1. Check Modal deployment status
2. Verify API URLs in route files
3. Check CORS settings
4. Verify API keys and credentials

## Contributing

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Copyright © 2025 Aletheia Research Labs. All rights reserved.

## Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

## Acknowledgments

- Next.js team for the amazing framework
- Modal for serverless AI deployment
- Hugging Face for model hosting
- All contributors and supporters

