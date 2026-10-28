import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

import auth from "./controllers/auth"
import { AppDataSource } from "./data-source";

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    })
    .catch((error) => {
        console.log("Erro na conexão com o banco de dados:", error);
    });

app.use('/', auth);

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}:  http://localhost:${process.env.PORT}`);
});
