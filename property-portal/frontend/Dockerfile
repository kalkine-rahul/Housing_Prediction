
FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["npm", "run", "dev"]
