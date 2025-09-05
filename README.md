# Editron

AI-powered cloud-based code editor with WebContainer integration.

## What is Editron?

Editron is a modern web-based code editor that runs entirely in your browser. It provides a VS Code-like experience with AI-powered code suggestions and the ability to run Node.js applications directly in the browser using WebContainer technology.

## Features

- **AI Code Intelligence** - Smart code completions and suggestions powered by Groq AI
- **Browser-based Development** - Full coding environment in your browser, no local setup required
- **WebContainer Integration** - Run Node.js apps directly in the browser
- **Multiple Frameworks** - Support for React, Next.js, Vue, Angular, Express, and more
- **Monaco Editor** - VS Code editor experience with syntax highlighting
- **GitHub Authentication** - Secure login with your GitHub account
- **Real-time Preview** - See your changes instantly
- **Project Management** - Create, save, and manage multiple projects

## Local Setup

### Prerequisites

- Node.js 18+ 
- MongoDB database
- GitHub OAuth App

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shrivarshapoojari/Editron.git
   cd Editron/editron
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_mongodb_connection_string"
   
   # NextAuth
   AUTH_SECRET="your_auth_secret_key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # GitHub OAuth
   AUTH_GITHUB_ID="your_github_client_id"
   AUTH_GITHUB_SECRET="your_github_client_secret"
   
   # Groq AI
   GROQ_API_KEY="your_groq_api_key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

### GitHub OAuth Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret to your `.env.local` file

### Groq AI Setup

1. Sign up at [Groq Console](https://console.groq.com/)
2. Create an API key
3. Add the API key to your `.env.local` file
- **xterm.js** - Terminal emulator in browser
- **Turbopack** - Fast bundler for development

### AI & APIs
- **Groq AI** - Fast AI inference for code completion
- **Sonner** - Beautiful toast notifications

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**
- **MongoDB Atlas account** (free tier available)
- **GitHub account** (for OAuth)
- **Groq API account** (for AI features)

### 📋 Local Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/shrivarshapoojari/Editron.git
cd Editron/editron
```

#### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

#### 3. Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
# Database Configuration
DATABASE_URL="your_mongodb_connection_string"

# Authentication Configuration
AUTH_SECRET="your_nextauth_secret_key"
AUTH_GITHUB_ID="your_github_oauth_app_id"
AUTH_GITHUB_SECRET="your_github_oauth_app_secret"

# AI Configuration
GROQ_API_KEY="your_groq_api_key"
```

#### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema (for MongoDB)
npx prisma db push

# Optional: Open Prisma Studio to view data
npx prisma studio
```

#### 5. Start Development Server

```bash
# Start the development server with Turbopack
npm run dev

# Or with specific package managers
yarn dev
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🔧 Detailed Setup Guide

### MongoDB Atlas Setup

1. **Create Account**: Sign up at [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Create Cluster**: Create a free M0 cluster
3. **Database Access**: Create a database user with read/write access
4. **Network Access**: Add your IP address (or 0.0.0.0/0 for development)
5. **Connection String**: Copy the connection string and replace `<password>` with your database password

### GitHub OAuth App Setup

1. **GitHub Settings**: Go to GitHub Settings → Developer settings → OAuth Apps
2. **New OAuth App**: Create a new OAuth application
3. **Application Details**:
   - **Application name**: Editron Local
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. **Credentials**: Copy the Client ID and Client Secret

### Groq API Setup

1. **Create Account**: Sign up at [Groq Console](https://console.groq.com/)
2. **API Key**: Generate a new API key
3. **Model Access**: Ensure you have access to the required models

### NextAuth Secret Generation

Generate a secure random string for `AUTH_SECRET`:

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 📁 Project Structure

```
editron/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication pages
│   ├── (root)/                  # Public pages
│   ├── api/                     # API routes
│   ├── dashboard/               # Dashboard pages
│   ├── playground/              # Code editor pages
│   └── coming-soon/            # Feature preview pages
├── components/                   # Reusable UI components
│   ├── ui/                     # Shadcn/UI components
│   └── providers/              # Context providers
├── modules/                      # Feature modules
│   ├── ai-chat/                # AI chat functionality
│   ├── auth/                   # Authentication logic
│   ├── dashboard/              # Dashboard components
│   ├── playground/             # Code editor logic
│   └── webcontainers/          # WebContainer integration
├── prisma/                       # Database schema and migrations
├── public/                       # Static assets
├── vibecode-starters/           # Project templates
└── lib/                         # Utility functions
```

## 🎨 Available Templates

Editron comes with a variety of pre-configured project templates:

### Frontend Frameworks
- **React** - Modern React with Vite
- **React TypeScript** - React with TypeScript
- **Next.js** - Full-stack React framework
- **Vue.js** - Progressive JavaScript framework
- **Angular** - Enterprise-scale applications
- **Svelte/SvelteKit** - Compile-time optimized framework

### Backend Frameworks
- **Express.js** - Minimal Node.js framework
- **Hono** - Ultrafast web framework
 

### Styling & Animation
- **GSAP + React** - Animation library integration
- **Bootstrap 5** - Popular CSS framework
- **Tailwind CSS** - Utility-first CSS

### Development Tools
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **JSON Server** - Mock REST API

## 🚀 Deployment

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```


 

### Environment Variables for Production

Ensure all environment variables are configured in your deployment platform:

```env
DATABASE_URL=your_production_mongodb_url
AUTH_SECRET=your_production_auth_secret
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
GROQ_API_KEY=your_groq_api_key
```

## 🧪 Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Database operations
npx prisma generate          # Generate Prisma client
npx prisma db push          # Push schema changes
 

# Code quality (currently disabled)
npm run lint
```
 

### Coming Soon 🚧
- **GitHub Repository Import** - One-click import from GitHub
- **Real-time Collaboration** - Multiple users editing simultaneously
- **Advanced AI Features** - Code refactoring and optimization
- **Custom Templates** - Create and share your own templates
- **Deployment Integration** - Deploy directly to cloud platforms
- **Mobile App** - Native mobile applications
 