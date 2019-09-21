import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import config from '../config/config';

const basename = path.basename(__filename);
const db = {};

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URL = process.env[config[NODE_ENV].use_env_variable];

const sequelize = new Sequelize(DB_URL, config[NODE_ENV]);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
