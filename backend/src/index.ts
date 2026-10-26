import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

import auth from "./controllers/auth"

app.use(express.json());

app.use('/', auth);

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}:  http://localhost:${process.env.PORT}`);
});
