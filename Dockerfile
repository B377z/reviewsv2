# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Accept backend URL argument
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

COPY package*.json ./
RUN npm install

COPY . .

# Build the frontend with Vite
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

