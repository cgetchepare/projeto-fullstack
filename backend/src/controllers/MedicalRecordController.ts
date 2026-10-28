import express from "express";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/Doctor";
import { ExamRequest } from "../entity/ExamRequest";
import { MedicalAssessment } from "../entity/MedicalAssessment";
import { MedicalRecord } from "../entity/MedicalRecord";
import { Patient } from "../entity/Patient";

const router = express.Router();
const repository = AppDataSource.getRepository(MedicalRecord);

router.get("/medical-records", async (req, res) => {
    try {
        res.json(await repository.find());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao listar prontuários." });
    }
});

router.get("/medical-records/:id", async (req, res) => {
    try {
        const record = await repository.findOneBy({ id: req.params.id as string });
        if (!record) return res.status(404).json({ message: "Prontuário não encontrado." });
        res.json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao consultar prontuário." });
    }
});

router.post("/medical-records", async (req, res) => {
    try {
        const record = repository.create({
            name: req.body.name,
            description: req.body.description,
            doctor: AppDataSource.getRepository(Doctor).create({ id: req.body.doctorId }),
            patient: AppDataSource.getRepository(Patient).create({ id: req.body.patientId }),
            medicalAssessment: AppDataSource.getRepository(MedicalAssessment)
                .create({ id: req.body.medicalAssessmentId }),
            examRequest: AppDataSource.getRepository(ExamRequest)
                .create({ id: req.body.examRequestId }),
        });

        await repository.save(record);
        res.status(201).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar prontuário." });
    }
});

router.put("/medical-records/:id", async (req, res) => {
    try {
        const record = await repository.findOneBy({ id: req.params.id as string });
        if (!record) return res.status(404).json({ message: "Prontuário não encontrado." });

        const updatedRecord = repository.create({
            id: record.id,
            name: req.body.name,
            description: req.body.description,
            doctor: AppDataSource.getRepository(Doctor).create({ id: req.body.doctorId }),
            patient: AppDataSource.getRepository(Patient).create({ id: req.body.patientId }),
            medicalAssessment: AppDataSource.getRepository(MedicalAssessment)
                .create({ id: req.body.medicalAssessmentId }),
            examRequest: AppDataSource.getRepository(ExamRequest)
                .create({ id: req.body.examRequestId }),
        });

        await repository.save(updatedRecord);
        res.json(updatedRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar prontuário." });
    }
});

router.delete("/medical-records/:id", async (req, res) => {
    try {
        const result = await repository.delete(req.params.id as string);
        if (!result.affected) return res.status(404).json({ message: "Prontuário não encontrado." });
        res.json({ message: "Prontuário excluído com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir prontuário." });
    }
});

export default router;
