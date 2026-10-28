import express from "express";
import { AppDataSource } from "../data-source";
import { MedicalAssessment } from "../entity/MedicalAssessment";

const router = express.Router();

router.get("/medical-assessments", async (req, res) => {
    try {
        const medicalAssessmentRepository = AppDataSource.getRepository(MedicalAssessment);
        const medicalAssessments = await medicalAssessmentRepository.find();

        res.status(200).json(medicalAssessments);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar as avaliações!",
        });
        return;
    }
});

router.get("/medical-assessments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const medicalAssessmentRepository = AppDataSource.getRepository(MedicalAssessment);
        const medicalAssessment = await medicalAssessmentRepository.findOneBy({ id });

        if (!medicalAssessment) {
            res.status(404).json({
                message: "Avaliação não encontrada!",
            });
            return;
        }

        res.status(200).json(medicalAssessment);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar a avaliação!",
        });
        return;
    }
});

router.post("/medical-assessments", async (req, res) => {
    try {
        const data = req.body;
        const medicalAssessmentRepository = AppDataSource.getRepository(MedicalAssessment);
        const newMedicalAssessment = medicalAssessmentRepository.create(data);

        await medicalAssessmentRepository.save(newMedicalAssessment);

        res.status(201).json({
            message: "Avaliação cadastrada com sucesso!",
            medicalAssessment: newMedicalAssessment,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar avaliação!",
        });
        return;
    }
});

router.put("/medical-assessments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const medicalAssessmentRepository = AppDataSource.getRepository(MedicalAssessment);
        const medicalAssessment = await medicalAssessmentRepository.findOneBy({ id });

        if (!medicalAssessment) {
            res.status(404).json({
                message: "Avaliação não encontrada!",
            });
            return;
        }

        medicalAssessmentRepository.merge(medicalAssessment, data);

        const updatedMedicalAssessment = await medicalAssessmentRepository.save(medicalAssessment);

        res.status(200).json({
            message: "Avaliação editada com sucesso!",
            medicalAssessment: updatedMedicalAssessment,
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro ao editar avaliação!",
        });
        return;
    }
});

router.delete("/medical-assessments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const medicalAssessmentRepository = AppDataSource.getRepository(MedicalAssessment);
        const medicalAssessment = await medicalAssessmentRepository.findOneBy({ id });

        if (!medicalAssessment) {
            res.status(404).json({
                message: "Avaliação não encontrada!",
            });
            return;
        }

        await medicalAssessmentRepository.remove(medicalAssessment);

        res.status(200).json({
            message: "Avaliação apagada com sucesso!",
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao apagar avaliação!",
        });
        return;
    }
});

export default router;