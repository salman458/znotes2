FROM gcr.io/google_appengine/nodejs
RUN install_node v8.15.1
RUN npm install npm@6.9.0
RUN node -v
RUN npm -v
COPY . /app/
ENV METEOR_SKIP_NPM_REBUILD=1
RUN (cd programs/server && npm install --unsafe-perm)
CMD node main.js
