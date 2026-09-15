FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV DATABASE_URL="postgresql://appuser:apppass@postgres:5432/appdb"

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]