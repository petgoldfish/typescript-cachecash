FROM node:alpine
RUN apk add python make g++
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PUBLISHER_ADDR=http://localhost:8043
CMD ["tools/docker-entry.sh"]
