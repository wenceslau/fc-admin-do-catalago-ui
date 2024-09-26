#!/bin/bash

# Run the Docker container with the bind mount and port mapping, and run the commands to install and start the app
docker run --rm -it \
  --mount type=bind,source=$(pwd)/,target=/app \
  -p 3000:3000 \
  node:20.15.1 bash -c \
  "cd /app && \
  npm install && \
  npm start"
