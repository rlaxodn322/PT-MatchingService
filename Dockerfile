# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build


# 3001 포트 열기(main.ts 에 지정된 포트 번호를 입력한다. 원래 기본은 3000)
#EXPOSE 3001

# node 는 Node 환경에서 파일을 실행 시 사용되는 키워드이다.
# dist/main.js 는 node 키워드로 실행하고자 하는 파일의 경로이다.
# 즉, 도커 컨테이너가 실행될 때 dist/mian.js 를 같이 실행(node) 한다.
CMD [ "node","dist/main.js" ]


# Command to run the application
