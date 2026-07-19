FROM oven/bun:latest

# تثبيت مكتبة OpenSSL المطلوبة لـ Prisma
RUN apt-get update && apt-get install -y openssl libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN bun install
RUN bunx prisma generate
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
