import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize-typescript";

const { host, username, password, database, dbURL, dbPort } = process.env;

const connection = new Sequelize({
  dialect: "mysql",
  host,
  username,
  password,
  database,
  logging: false,
});

export default connection;
