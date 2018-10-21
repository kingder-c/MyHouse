FROM node

MAINTAINER kingder <zj809667533@live.com>


WORKDIR /project/node

RUN npm install

EXPOSE 7001

# CMD ["npm","i"]
# CMD ["npm","run","dev"]
CMD ["npm","start"]