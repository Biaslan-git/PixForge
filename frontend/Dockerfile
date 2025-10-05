FROM node:20-alpine AS base

# Install dependencies only when needed
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else npm ci; \
  fi

# Copy the rest of the application
COPY . .

# Build the application
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Install only production dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile --production; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile --production; \
  else npm ci --only=production; \
  fi

# Copy built application
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/public ./public

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]