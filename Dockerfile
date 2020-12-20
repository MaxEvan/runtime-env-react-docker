# Build the react app in a first container
FROM node:alpine as builder
# Add bash for testing purposes
RUN apk update && apk add bash
# Move to /app folder before building
WORKDIR /app
# Copy all the files from the repo
COPY . .
# Build the application
RUN yarn && yarn build

# Now, start from a bare Linux image with basically just Nginx in it
FROM nginx:1.18.0-alpine
# Remove initial nginx config
RUN rm -rf /etc/nginx/conf.d
# Replace with config from the conf folder in the repo
COPY conf /etc/nginx
# Copy the built app from the builder stage up there and put the built app in the nginx html folder
COPY --from=builder /app/build /usr/share/nginx/html
# Expose port 80 from the container to the outside
EXPOSE 80
# CWD to the build folder
WORKDIR /usr/share/nginx/html
# Add node for building the runtime environment
RUN apk update && apk add nodejs
# Add the node build env build script
COPY build-env.js /usr/share/nginx/html
# Run the build env script to prepare runtime environment configuration
CMD node build-env && nginx -g "daemon off;"
