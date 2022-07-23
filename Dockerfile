FROM node:16.15-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY doc ./
#COPY tsconfig*.json ./

# Install app dependencies
RUN npm install

COPY . .

#RUN npm run build
#RUN npm prune --production

#FROM node:16.15-alpine
#
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package*.json ./
#COPY --from=builder /app/dist ./dist
#COPY --from=builder /app/doc ./doc
#COPY --from=builder /app/tsconfig*.json ./
#COPY .env .env

EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev" ]
