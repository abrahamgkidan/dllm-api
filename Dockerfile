# Download the slim version of node
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

RUN npm clean-install

# 
COPY . .

EXPOSE 4000

CMD ["npm", "start"]
