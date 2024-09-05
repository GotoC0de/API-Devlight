import express, { Request, Response } from "express";
import router from "./routes";
import db_connect from "./db/db_connect";
import { config } from "dotenv";

//Para poder crear archivos de tipo .env (Ocultar información sensible en caso de subir repositorio)
config();

//Traigo los datos necesarios para armar el url del server desde el archivo .env
const PORT = Number(process.env.PORT);
const hostname = String(process.env.HOST);

const app = express();

app.use(express.json());

app.use("/api", router);

db_connect();

app.listen(PORT, hostname, () => {
  console.log(`Server is running on http://${hostname}:${PORT}`);
});
