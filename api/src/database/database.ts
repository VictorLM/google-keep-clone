import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_SCHEMA || "",
  process.env.POSTGRES_USER || "",
  process.env.POSTGRES_PASSWORD || "",
  {
    host: process.env.POSTGRES_HOST || "",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    dialect: "postgres",
  }
);

export default sequelize;
