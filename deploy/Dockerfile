FROM gcr.io/google_appengine/nodejs
RUN install_node v8.15.1
RUN npm install npm@6.4.1
RUN node -v
RUN npm -v
COPY . /app/
RUN (cd programs/server && npm install --unsafe-perm)
CMD node main.js
