FROM ubuntu:20.04

RUN apt-get update -y && apt-get install curl -y && curl -sL https://deb.nodesource.com/setup_16.x | bash && apt-get install nodejs -y

WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .

CMD ["npm","run","start"]