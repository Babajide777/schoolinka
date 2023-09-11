import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize-typescript";
import User from "../models/userModel";
import Post from "../models/postModel";

const {
  host,
  username,
  password,
  database,
  NODE_ENV,
  liveHost,
  liveUserName,
  livePassword,
  dbPort,
} = process.env;

let isProduction = NODE_ENV && NODE_ENV === "production";

const connection = new Sequelize({
  dialect: "postgres",
  host: isProduction ? liveHost : host,
  // username: isProduction ? liveUserName : username,
  username: "postgres",
  password: isProduction ? livePassword : password,
  database,
  logging: false,
  port: 5432,
});

connection.addModels([User, Post]);

export default connection;
