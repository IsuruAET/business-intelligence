#!/bin/bash

echo "🚀 Business Intelligence App Deployment Setup"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Please run:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git branch -M main"
    echo "   git remote add origin YOUR_GITHUB_REPO_URL"
    echo "   git push -u origin main"
    exit 1
fi

# Check if .env files exist
echo "📋 Checking environment files..."

if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found. Please create it with:"
    echo "   PORT=5000"
    echo "   OPENAI_API_KEY=your_openai_api_key_here"
    echo "   MONGODB_URI=your_mongodb_connection_string"
    echo "   DB_NAME=business_intelligence"
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  frontend/.env not found. Please create it with:"
    echo "   VITE_BASE_API_URL=http://localhost:5000/api"
fi

# Check dependencies
echo "📦 Checking dependencies..."

if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Test builds
echo "🔨 Testing builds..."

echo "Building backend..."
cd backend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Backend build successful"
else
    echo "❌ Backend build failed"
    exit 1
fi
cd ..

echo "Building frontend..."
cd frontend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Create a GitHub repository and push your code"
echo "2. Set up MongoDB Atlas database"
echo "3. Get your OpenAI API key"
echo "4. Create Vercel projects (backend and frontend)"
echo "5. Configure environment variables in Vercel"
echo "6. Set up GitHub Actions secrets"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 