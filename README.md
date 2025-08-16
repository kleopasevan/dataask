# DataAsk - AI-Native BI Platform

DataAsk is a modern business intelligence platform that combines conversational analytics with powerful data preparation tools. Built with Next.js 15, PostgreSQL, and a mixture-of-agents architecture.

## Features

- 🤖 **Conversational Analytics**: Ask questions in natural language
- 🔧 **Data Preparation Studio**: Visual no-code data preparation
- 🔒 **Enterprise Security**: RBAC with row/column masking
- 📊 **Smart Visualizations**: AI-powered chart recommendations
- 🚀 **High Performance**: Redis caching and query optimization
- 🔄 **Agent Architecture**: Scalable mixture-of-agents system

## Quick Start

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- pnpm (recommended)

### One-Command Setup

\`\`\`bash
# Clone and start everything
git clone <repository-url>
cd dataask
cp .env.example .env
pnpm install
pnpm run dev
\`\`\`

This will:
1. Start PostgreSQL, Redis, and Kafka containers
2. Run database migrations
3. Seed demo data
4. Start the Next.js development server

Visit http://localhost:3000 and login with:
- Email: admin@dataask.com
- Password: admin123

## Demo Script

### 1. Connect Data Sources
- Navigate to "Connect Data" from the home page
- View the pre-configured demo database connection
- Upload a CSV file to see the connector in action

### 2. Ask Natural Language Questions
- Go to "Ask Questions" 
- Try these demo queries:
  - "Total revenue last 30 days by region"
  - "Top 10 products by revenue this quarter"
  - "Month-over-month revenue vs last year"
  - "Orders by channel last 14 days"

### 3. Build Datasets (Data Prep Studio)
- Navigate to "Data Prep"
- Create a visual pipeline joining sales to customers
- Add filters and aggregations
- Preview results in real-time

### 4. Create Dashboards
- Go to "Dashboards"
- Build charts from your prepared datasets
- Export to PNG or CSV

### 5. Security & Governance
- Login as different user roles (Viewer vs Admin)
- See row-level security and column masking in action
- Check audit logs for all queries

### 6. Performance Features
- Run the same query twice to see cache hits
- View query execution plans and optimization hints

## Architecture

### Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend**: Hono API, NextAuth, Prisma ORM
- **Database**: PostgreSQL with Redis caching
- **Messaging**: Apache Kafka for agent orchestration
- **Infrastructure**: Docker, GitHub Actions CI/CD

### Project Structure
\`\`\`
dataask/
├── apps/web/                 # Next.js application
├── packages/agents/          # Agent interfaces & orchestrator
├── packages/connectors/      # Data connector SDK
├── packages/shared/          # Shared utilities
├── prisma/                   # Database schema & migrations
├── infra/                    # Docker configuration
└── scripts/                  # Seed scripts & utilities
\`\`\`

## Development

### Available Scripts
\`\`\`bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm test             # Run tests
pnpm lint             # Lint code
pnpm typecheck        # Type checking
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed demo data
\`\`\`

### Environment Variables
Copy `.env.example` to `.env` and configure:
- Database connection
- NextAuth secrets
- Redis and Kafka URLs
- Encryption keys

## Testing

\`\`\`bash
# Unit tests
pnpm test

# Integration tests (requires Docker services)
docker-compose up -d postgres redis kafka
pnpm test:integration

# E2E tests
pnpm test:e2e
\`\`\`

## Deployment

### Docker Production Build
\`\`\`bash
docker-compose -f docker-compose.prod.yml up --build
\`\`\`

### Vercel Deployment
\`\`\`bash
vercel deploy
\`\`\`

## Security

- All user inputs are validated and sanitized
- SQL queries use parameterized statements
- Row-level security enforced at the database level
- Column masking applied server-side
- Comprehensive audit logging
- Rate limiting on sensitive endpoints

## Known Limitations

1. **Demo Data**: Currently uses mock data for analytics queries
2. **CSV Connector**: Basic implementation, needs streaming for large files
3. **Agent System**: Interfaces defined but ML models not implemented
4. **Real-time Updates**: Dashboard updates are mocked with intervals
5. **OAuth Providers**: Only stub implementation included

## Next Steps

1. Implement real ML models for the agent system
2. Add more data connectors (MySQL, BigQuery, Snowflake)
3. Enhanced visualization options and dashboard builder
4. Real-time streaming analytics
5. Advanced forecasting and anomaly detection
6. Multi-tenant architecture improvements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
