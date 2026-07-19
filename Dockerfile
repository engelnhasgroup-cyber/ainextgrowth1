FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install
RUN bunx prisma generate
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]
