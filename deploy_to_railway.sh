#!/bin/bash

echo "🚀 Deploying Complete Cashifygcmart Frontend to Railway..."

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found"
    exit 1
fi

cd frontend

echo "📦 Installing dependencies..."
yarn install

echo "🔧 Building production version..."
yarn build

echo "✅ Frontend build complete!"
echo "📤 Ready for Railway deployment"

# Create a simple deployment verification
echo "🔍 Verifying build files..."
if [ -d "build" ]; then
    echo "✅ Build directory created successfully"
    echo "📁 Build contents:"
    ls -la build/
else
    echo "❌ Build directory not found - build may have failed"
    exit 1
fi

echo ""
echo "🎯 Next steps:"
echo "1. Push this code to your GitHub repository"
echo "2. Railway will auto-deploy from GitHub"
echo "3. Your complete frontend will be live!"
echo ""
echo "🌐 Expected result: Full Cashifygcmart website with all sections and features"