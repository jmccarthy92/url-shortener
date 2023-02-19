FROM mcr.microsoft.com/devcontainers/typescript-node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
