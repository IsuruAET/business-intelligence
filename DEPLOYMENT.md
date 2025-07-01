# Business Intelligence App Deployment Guide

This guide provides step-by-step instructions for deploying the Business Intelligence MERN stack application using Vercel.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for database)
- Vercel account
- GitHub account
- Git
- OpenAI API key

## Vercel Project Setup

### Backend Project Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Node.js
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Frontend Project Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Environment Variables Setup in Vercel

### Backend Environment Variables

1. Go to your backend project in Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add the following variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   DB_NAME=business_intelligence
   FRONTEND_URL=https://your-frontend-vercel-url.vercel.app
   ```

### Frontend Environment Variables

1. Go to your frontend project in Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add the following variable:
   ```
   VITE_BASE_API_URL=your_backend_vercel_url/api
   ```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Set up database access (username/password)
3. Configure network access (allow all IPs: 0.0.0.0/0)
4. Get your connection string
5. Replace `your_mongodb_atlas_connection_string` in Vercel environment variables

## OpenAI API Setup

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to Vercel backend environment variables as `OPENAI_API_KEY`

## GitHub Repository Setup

1. Create a new repository on GitHub
2. Initialize your local repository:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

## Vercel Token Setup in GitHub

1. Go to Vercel Dashboard → Settings → Tokens
2. Create a new token
3. Go to GitHub repository → Settings → Secrets and Variables → Actions
4. Add new secret:
   - Name: `VERCEL_TOKEN`
   - Value: Your Vercel token

## Deployment Process

### Backend Changes Only

1. Make changes to backend code
2. Commit and push to main branch
3. GitHub Actions will automatically:
   - Detect backend changes
   - Build and deploy only the backend
   - Skip frontend deployment

### Frontend Changes Only

1. Make changes to frontend code
2. Commit and push to main branch
3. GitHub Actions will automatically:
   - Detect frontend changes
   - Build and deploy only the frontend
   - Skip backend deployment

## Post-Deployment Checklist

1. Verify backend API endpoints are working
2. Test RAG (Retrieval-Augmented Generation) functionality
3. Check database connections
4. Test OpenAI API integration
5. Verify CORS settings
6. Test all API endpoints
7. Check error handling
8. Verify environment variables are loaded correctly

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure CORS is properly configured in the backend
   - Check if the frontend URL is whitelisted in Vercel

2. **Database Connection Issues**

   - Verify MongoDB connection string in Vercel environment variables
   - Check network access settings in MongoDB Atlas

3. **OpenAI API Issues**

   - Verify OpenAI API key is correctly set in Vercel environment variables
   - Check API key permissions and usage limits

4. **Environment Variables**

   - Ensure all required variables are set in Vercel
   - Check for typos in variable names

5. **Build Failures**
   - Check TypeScript compilation errors
   - Verify all dependencies are properly installed

## API Endpoints

After deployment, your backend will have these endpoints:

- `POST /api/ask` - RAG question handling

## Security Considerations

1. Use HTTPS for all connections (automatically handled by Vercel)
2. Implement rate limiting for API endpoints
3. Regular security updates
4. Input validation
5. Proper error handling
6. Secure storage of sensitive data in Vercel environment variables
7. Monitor OpenAI API usage and costs

## Maintenance

1. Regular backups of the database
2. Monitor application logs in Vercel
3. Keep dependencies updated
4. Regular security audits
5. Performance monitoring
6. Monitor OpenAI API usage and costs

## Support

For additional support or questions, please refer to the project documentation or contact the development team.
