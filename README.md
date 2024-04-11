![MIMIC's Logo](https://drive.google.com/uc?export=download&id=1T-yxxqTpc6nv7nydOF5TJ1tTAgcJFfRE)
## Description
MIMIC is an open source, self-hosted session replay framework which abstracts away the intricacies of recording and replaying users' sessions on web applications. It is tailored towards user experience improvement and debugging, providing granular insights into application malfunctions in a streamlined and cost-effective manner. With its ready-made telemetry pipeline, MIMIC automates instrumentation and deployment, providing an in depth replay interface that is intuitive and easy to learn. 

![Screenshot of MIMIC's frontend interface](https://lh3.googleusercontent.com/drive-viewer/AKGpihYeL0JI4xo0swcPIaJ5nXd-F8tkpPVbcnZcdDMnMX3fkXmZbDrEAKBWD-I5vvwDkKsS668LBd5bRpmbNC9y1PVpbq0X5bUYEmI=s1600-v0)

## Installation
MIMIC's setup involves two main steps:
1. Deploy MIMIC's telemetry pipeline to a host of your choice
2. Run MIMIC's command line tool to instrument your application

### Prerequisites
- `node` installed, 20.9.0 or greater
- `python3` installed, 3.8.0 or greater
- `pip` installed, the version compatible with your `python3` version
- `PostgreSQL` installed, with a user `postgres` and password of your choice
- An API token from `https://findip.net/`
- [Redis](https://redis.io/) host, port, and password
- [AWS S3 Bucket](https://aws.amazon.com/s3/) dedicated to this project
- Clone the MIMIC repository to your machine

### Installation of MIMIC pipeline
- Navigate to `./MIMIC/backend` and create the `.env` file necessary for MIMIC to work, using the below template:
```ruby
# .env template
PORT = *** # this is the port your entire MIMIC pipeline will utilize 
PSQL_PASSWORD = *** # the password for your PostgreSQL 'postgres' user 
POSTGRES_PORT = *** # is 5432 at default 
LOCATION_API_TOKEN = *** # your personal API token from https://findip.net/
SECRET = *** # what your JWT login tokens are signed with, UUID recommended
REDIS_PASSWORD = ***
REDIS_HOST = *** # in the format of ***.cloud.redislabs.com
REDIS_PORT = ***
AWS_ACCESS_KEY_ID = ***
AWS_SECRET_ACCESS_KEY = ***
AWS_BUCKET_NAME = ***
```
- Navigate to `./models`, following the instructions at the top of the `initialize.sql` file to initialize your database
- Returning to the backend's root directory, run the following:
```terminal
npm --prefix ../frontend install
npm --prefix ../frontend run build
npm install
npm run build:ui
```
- Run MIMIC from the backend root folder with `npm start`
- You can now communicate with the MIMIC backend and access the frontend interface with the PORT specified in your `.env` file!

### Using MIMIC in your application
- Before doing this step **ensure** your MIMIC pipeline is running, otherwise you will be unable to set up MIMIC functionality in your application
- Download our [MIMIC installer python package](https://pypi.org/project/mimic-replay/)
- In the root folder of your application, run the installer with the command `python3 -m mimic_replay.install`
- **Note**: if your application is not made up of vanilla HTML files, the installer will not be able to run properly
  - To enable MIMIC in these applications, after running the installer, ensure the following two script tags are present in the deployed HTML files:
```html
<script class="mimic" defer src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb-all.min.js"></script>
<script class="mimic" defer src="THE/PATH/FROM/THE/FILE/TO/YOUR/PROJECT/ROOT/script.mimic.js"></script>
```
- **Note**: trying out MIMIC on a locally hosted application? No sweat! To get a full feel of our features, MIMIC uses the default IP address of `203.190.216.0`, which is located on the remote, tropical island of Nauru

## Customization 
- Want to change the specifics in how MIMIC records the information generated by your application? Feel free to edit the `script.mimic.js` file generated by the MIMIC installer
  - For example, on line 220, change `maskAllInputs: true,` to `maskAllInputs: false,` to mask only password information, as opposed to all user generated text input
- Interested in more customization options? Visit the [RRWeb documentation](https://github.com/rrweb-io/rrweb/blob/master/guide.md#options)

## MIMIC Team
[Louis Mascari](https://github.com/Louis-Mascari) • Software Engineer • Knoxville, TN

[Lucas Sorribes](https://github.com/devluxor) • Software Engineer • Madrid, Spain

[Veronika Todd](https://github.com/VSTodd) • Software Engineer • Hartford, CT

[Erik Wiens](https://github.com/ErikWiens) • Software Engineer • New York, NY

