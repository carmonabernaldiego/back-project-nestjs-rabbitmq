#build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app2

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


#prod stage
FROM node:18-alpine

WORKDIR /usr/src/app2

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app2/dist ./dist

COPY package*.json ./

# Copiar docker-entrypoint.sh a la raíz
COPY docker-entrypoint.sh / 
# Cambiar permisos a archivo docker-entrypoint.sh
RUN chmod 755 /docker-entrypoint.sh 

RUN npm install --only=production

RUN rm package*.json

EXPOSE 8001

ENTRYPOINT ["sh", "/docker-entrypoint.sh"]