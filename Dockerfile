FROM ubuntu:25.04

# 1) Don’t prompt for a timezone
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

# 2) Install tzdata, Node.js, npm
RUN apt-get update \
 && apt-get install -y tzdata nodejs npm \
 && rm -rf /var/lib/apt/lists/*

# 3) Switch to /app
WORKDIR /app

# 4) Copy package.json first (for layer caching), then install deps
COPY package*.json ./
RUN npm install

# 5) Copy the rest (including startMockoon.sh)
COPY . .

# 6) Ensure Unix‐style line endings and make the script executable
#    If your local file has CRLF, you may still need to run `dos2unix startMockoon.sh`
#    before building. This chmod will at least mark it executable.
RUN chmod +x ./startMockoon.sh

# 7) Expose the port Mockoon will serve on (adjust if needed)
EXPOSE 3000

# 8) Invoke via "sh" so Docker doesn’t search $PATH
CMD ["sh", "startMockoon.sh"]
