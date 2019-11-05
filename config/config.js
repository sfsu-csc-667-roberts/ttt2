require('dotenv').config();

const ENTRY = {
  "use_env_variable": "DATABASE_URL",
  "dialect": "postgres"
};

module.exports = {
  "development": ENTRY,
  "test": ENTRY,
  "production": ENTRY
}
