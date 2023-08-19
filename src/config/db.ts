import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize-typescript";
import User from "../models/userModel";

const { host, username, password, database } = process.env;

const connection = new Sequelize({
  dialect: "mysql",
  host,
  username,
  password,
  database,
  logging: false,
});

connection.addModels([User]);

export default connection;
