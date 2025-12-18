# Use Node 20 for Next.js 15+
FROM node:20-bullseye

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (fresh, Linux binaries)
RUN npm install --include=optional

# Copy rest of the app
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Run Next.js in dev mode (for Docker)
CMD ["npm", "run", "dev"]
