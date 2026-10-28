import "reflect-metadata";
import { DataSource } from "typeorm";
import { MedicalRecord } from "./entity/MedicalRecord";
import { ExamRequest } from "./entity/ExamRequest";
import { MedicalAssessment } from "./entity/MedicalAssessment";

import dotenv from "dotenv";
import { Patient } from "./entity/Patient";
import { Doctor } from "./entity/Doctor";

dotenv.config();

const dialect = process.env.DB_DIALECT ?? "mysql";

export const AppDataSource = new DataSource({
    type: dialect as "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [MedicalRecord, MedicalAssessment, ExamRequest, Doctor, Patient],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});





