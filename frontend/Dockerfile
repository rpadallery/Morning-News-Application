FROM node:16.20.2-buster
WORKDIR /app
COPY . . 
USER root
RUN npm install && \
    npm install next && \ 
    npm run build 
EXPOSE 3000
CMD ["npm", "start"]
