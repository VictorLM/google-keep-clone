import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnection from "./database/database";
import routes from "./routes/routes";

dotenv.config();

// Express App
const app: Express = express();
const port = process.env.APP_PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/notes", routes);

// Database
dbConnection
  .authenticate()
  .then(() =>
    console.log("Connection wih database has been established successfully.")
  )
  .catch((error) =>
    console.error("Unable to connect to the database: ", error)
  );

// Migrate database tables
dbConnection.sync();

// Server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
