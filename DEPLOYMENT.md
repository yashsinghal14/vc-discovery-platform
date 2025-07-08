# Deployment Guide

## Quick Deployment to Netlify

### Method 1: Drag and Drop (Recommended)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Drag and drop the `.next` folder to Netlify
   - Your site will be live immediately!

### Method 2: Git Integration

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vc-discovery-platform.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Deploy!

### Method 3: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy**:
   ```bash
   netlify login
   netlify deploy --prod --dir=.next
   ```

## Environment Variables

No environment variables are required for this deployment.

## Build Configuration

The project is configured with:
- **Next.js 15** with Pages Router
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Static export** ready for Netlify

## Post-Deployment

After deployment, you'll have:
- A fully functional VC discovery platform
- Interactive search and filtering
- Responsive design for all devices
- Optimized performance and SEO

## Troubleshooting

If you encounter issues:
1. Clear your build cache: `rm -rf .next && npm run build`
2. Check Node.js version (v18+ recommended)
3. Verify all dependencies are installed: `npm install`

## Features Live

✅ Industry-based VC filtering
✅ Real-time search functionality
✅ Interactive VC cards with animations
✅ Verified email addresses
✅ Responsive design
✅ Modern UI with glass morphism effects
✅ Professional VC profiles
✅ Portfolio company information
✅ Fund size and location details

---

**Ready to deploy!** Your VC Discovery Platform is production-ready and optimized for Netlify hosting.
