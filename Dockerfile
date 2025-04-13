# Base image
FROM node:23-alpine

WORKDIR /app

# Copy project metadata and configs first (for caching)
COPY package*.json ./
COPY tsconfig*.json ./
COPY next.config.* ./
COPY postcss.config.* ./
COPY middleware.ts ./

# Copy prisma before install so postinstall script works
COPY prisma ./prisma

# Install dependencies (now prisma/schema.prisma is present)
RUN npm install

# Copy the rest of the app
COPY public ./public
COPY lib ./lib
COPY store ./store
COPY components ./components
COPY app ./app

# Build and generate prisma client again (optional but safe)
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]