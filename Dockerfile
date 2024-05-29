FROM node:20.13.1

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./

# Remove node_modules and package-lock.json if they exist
RUN rm -rf node_modules package-lock.json
RUN rm -rf yarn.lock
RUN npm install

COPY . .

EXPOSE 5173