FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port and define the default command
EXPOSE 3000
CMD ["npm", "run", "dev"]

