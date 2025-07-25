FROM node:20 AS builder

WORKDIR /app

# COPY certs.pem /usr/local/share/ca-certificates/certs.pem

# RUN update-ca-certificates

# RUN npm config set cafile /usr/local/share/ca-certificates/certs.pem

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build  /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80