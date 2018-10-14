FROM node

MAINTAINER Ryze <hz.bgning@gmail.com>


WORKDIR /project/node

EXPOSE 7001

CMD ["npm","run","start"]