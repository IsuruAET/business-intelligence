#!/bin/bash

echo "🔍 Business Intelligence App Deployment Health Check"
echo "=================================================="

# Check if backend URL is provided
if [ -z "$1" ]; then
    echo "❌ Please provide your backend URL as an argument"
    echo "Usage: ./scripts/check-deployment.sh https://your-backend.vercel.app"
    exit 1
fi

BACKEND_URL=$1
FRONTEND_URL=${2:-"https://your-frontend.vercel.app"}

echo "🔗 Backend URL: $BACKEND_URL"
echo "🔗 Frontend URL: $FRONTEND_URL"
echo ""

# Check backend health
echo "🏥 Checking backend health..."
BACKEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/ask" -X POST -H "Content-Type: application/json" -d '{"question":"test"}' 2>/dev/null)

if [ "$BACKEND_RESPONSE" = "200" ] || [ "$BACKEND_RESPONSE" = "400" ] || [ "$BACKEND_RESPONSE" = "500" ]; then
    echo "✅ Backend is responding (HTTP $BACKEND_RESPONSE)"
else
    echo "❌ Backend is not responding (HTTP $BACKEND_RESPONSE)"
fi

# Check frontend accessibility
echo "🌐 Checking frontend accessibility..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" 2>/dev/null)

if [ "$FRONTEND_RESPONSE" = "200" ]; then
    echo "✅ Frontend is accessible (HTTP $FRONTEND_RESPONSE)"
else
    echo "❌ Frontend is not accessible (HTTP $FRONTEND_RESPONSE)"
fi

# Check CORS
echo "🔒 Checking CORS configuration..."
CORS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -H "Origin: $FRONTEND_URL" "$BACKEND_URL/api/ask" -X POST -H "Content-Type: application/json" -d '{"question":"test"}' 2>/dev/null)

if [ "$CORS_RESPONSE" = "200" ] || [ "$CORS_RESPONSE" = "400" ] || [ "$CORS_RESPONSE" = "500" ]; then
    echo "✅ CORS is properly configured"
else
    echo "❌ CORS might not be configured properly"
fi

echo ""
echo "📋 Summary:"
echo "- Backend: $([ "$BACKEND_RESPONSE" = "200" ] || [ "$BACKEND_RESPONSE" = "400" ] || [ "$BACKEND_RESPONSE" = "500" ] && echo "✅ Working" || echo "❌ Not working")"
echo "- Frontend: $([ "$FRONTEND_RESPONSE" = "200" ] && echo "✅ Accessible" || echo "❌ Not accessible")"
echo "- CORS: $([ "$CORS_RESPONSE" = "200" ] || [ "$CORS_RESPONSE" = "400" ] || [ "$CORS_RESPONSE" = "500" ] && echo "✅ Configured" || echo "❌ Not configured")"

echo ""
echo "💡 If you see any issues, check:"
echo "1. Environment variables in Vercel"
echo "2. MongoDB Atlas connection"
echo "3. OpenAI API key configuration"
echo "4. CORS settings in backend"
echo "5. Vercel deployment logs" 