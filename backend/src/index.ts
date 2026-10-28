import express from "express";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

import AuthController from "./controllers/AuthController"
import MedicalAssessmentController from "./controllers/MedicalAssessmentController";
import ExamRequestController from "./controllers/ExamRequestController";

app.use('/', AuthController);
app.use('/', MedicalAssessmentController);
app.use('/', ExamRequestController);


AppDataSource.initialize()
    .then(async () => {
        console.log("Banco de dados conectado com sucesso!");
    })
    .catch((error) => console.log("Erro ao conectar no banco:", error));


    app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}:  http://localhost:${process.env.PORT}`);
});
