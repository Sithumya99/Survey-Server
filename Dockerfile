FROM node:23
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY environment/survey-system-bcs-firebase-adminsdk-fbsvc-80f4e52191.json ./environment/survey-system-bcs-firebase-adminsdk-fbsvc-80f4e52191.json
EXPOSE 3000
CMD ["node", "index.js"]