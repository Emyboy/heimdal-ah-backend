require('babel-register');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DEV_DB_URL',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'TEST_DB_URL',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'PROD_DB_URL',
    dialect: 'postgres',
  },
  localDevelopment: {
    use_env_variable: 'MY_POSTICO_URL',
    dialect: 'postgres',
  },
};
