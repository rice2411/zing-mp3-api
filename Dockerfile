FROM node:16

# Create app directory
WORKDIR /app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install


COPY . .

EXPOSE 3002
CMD ["npm","run","dev"]