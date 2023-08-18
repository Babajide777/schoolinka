import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import corsOptions from "./utils/corsOptions";
import connection from "./config/db";
import swaggerDocs from "./utils/swagger";

dotenv.config();
const app: Application = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get("/", (req: Request, res: Response): void => {
  res.send("Medical departure server running");
});
swaggerDocs(app, PORT);

connection
  .sync({ force: false })
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database: ", error);
  });