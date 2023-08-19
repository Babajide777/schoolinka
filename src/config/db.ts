import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize-typescript";

const { host, username, password, database } = process.env;

const connection = new Sequelize({
  dialect: "mysql",
  host,
  username,
  password,
  database,
  logging: false,
  models: [__dirname + "/models/**/*Model.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});

export default connection;
