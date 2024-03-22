require("dotenv").config();

PORT = process.env.PORT;
PSQL_PASSWORD = process.env.PSQL_PASSWORD;
POSTGRES_PORT = process.env.POSTGRES_PORT;
LOCATION_API_URL = process.env.LOCATION_API_URL;
LOCATION_API_TOKEN = process.env.LOCATION_API_TOKEN;
SECRET = process.env.SECRET;

module.exports = {
  PORT,
  POSTGRES_PORT,
  PSQL_PASSWORD,
  LOCATION_API_URL,
  LOCATION_API_TOKEN,
  SECRET
};
