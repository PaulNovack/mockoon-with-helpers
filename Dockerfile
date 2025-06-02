FROM ubuntu:25.04
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC
RUN apt-get update \
 && apt-get install -y tzdata nodejs npm lsof inotify-tools \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["sh", "startMockoon.sh"]
