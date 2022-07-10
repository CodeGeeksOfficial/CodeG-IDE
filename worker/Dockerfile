FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y && apt install python3 -y
RUN apt install g++ -y && apt install build-essential -y
RUN DEBIAN_FRONTEND=${DEBIAN_FRONTEND} apt install default-jre -y
RUN apt-get install curl -y && curl -sL https://deb.nodesource.com/setup_16.x | bash && apt-get install nodejs -y
# WORKDIR '/app'

COPY . .
RUN mkdir temp
RUN npm install

CMD ["npm","run","start"]