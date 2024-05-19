FROM node:16.20.2-buster
WORKDIR /app
COPY . . 
ENV CONNECTION_STRING="mongodb+srv://lacapsule:c9DerzQwDXTypRsG@cluster0.rbxgybq.mongodb.net/morningnewspreprod"
ENV NEWS_API_KEY="94ee163d5b7f48fc97d8fb0a090187b6"
USER root
RUN npm install && \
    yarn install && \
    yarn add dotenv
EXPOSE 3001
CMD ["yarn", "start"]
