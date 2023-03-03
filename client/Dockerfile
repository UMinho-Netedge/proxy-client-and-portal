# pull official base image
FROM node:18.14.2-alpine3.16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install react-cookie

# add app
COPY . ./

# start app
CMD ["npm", "start"]

