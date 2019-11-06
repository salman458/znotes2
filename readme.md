Before starting deployment prosedure you should authenticate to your google account
through Google Cloud CLI. You can refer to the following link for better instructions

`https://cloud.google.com/pubsub/docs/quickstart-cli`
 
To be able to deploy the application to Google cloud you should execute the following command:

``meteor-google-cloud --settings deploy/settings.json --app deploy/app.yml --docker deploy/Dockerfile``

In the `./deploy` directory you will find `app.yml` and `settings.json`
which are responsible for deployment configurations.

The only variables in `app.yml` which can be subject to change in the future
are `ROOT_URL` - root url for the application, `MONGO_URL` - url for outer mongo connection
and `MAIL_URL` - which is the smtp URL to the company email which is needed to perform account registration process. The only configurable field in 
`settings.json` is the project name which is going to be used in the cloud.

To be able to follow the logs of the application backend run the following command:

`gcloud app logs tail -s default`