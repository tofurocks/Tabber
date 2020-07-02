FROM node:12

WORKDIR /app

COPY package*.json /app/

RUN npm install
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip

RUN pip3 install tensorflow
RUN pip3 install crepe

COPY . /app/

RUN ls
CMD [ "node", "bin/www" ]

EXPOSE 3000
