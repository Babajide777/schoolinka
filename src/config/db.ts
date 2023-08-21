import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize-typescript";
import User from "../models/userModel";
import Post from "../models/postModel";

const { host, username, password, database } = process.env;

const connection = new Sequelize({
  dialect: "mysql",
  host,
  username,
  password,
  database,
  logging: false,
});

connection.addModels([User, Post]);

export default connection;
