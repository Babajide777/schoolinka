import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get("/", (req: Request, res: Response): void => {
  res.send("Medical departure server running");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
