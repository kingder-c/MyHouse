FROM node

MAINTAINER Ryze <hz.bgning@gmail.com>


WORKDIR /project/node

RUN npm install

EXPOSE 7001

# CMD ["npm","i"]
# CMD ["npm","run","dev"]
CMD ["npm","start"]