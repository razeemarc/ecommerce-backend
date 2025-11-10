# 1. Base image
FROM node:20-alpine

# 2. Working directory
WORKDIR /app

# 3. Copy only dependency files
COPY package*.json pnpm-lock.yaml* ./

# 4. Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install

# 5. Copy rest of the source code
COPY . .

# 6. Generate Prisma client (important before build)
RUN npx prisma generate

# 7. Build TypeScript into dist/
RUN pnpm build

# 8. Expose your app port
EXPOSE 5000

# Optional: clean permissions
RUN chmod -R 755 /app/node_modules

# 9. Start app using built files
CMD ["pnpm", "start"]
