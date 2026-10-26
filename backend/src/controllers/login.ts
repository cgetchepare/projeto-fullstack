import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";

const router = express.Router();

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    })
    .catch((error) => {
        console.log("Erro na conexão com o banco de dados:", error);
    });

router.get("/", (req: Request, res: Response) => {
    res.send("Olá mundo!");
});

export default router;
