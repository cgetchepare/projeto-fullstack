import express from "express";
import { AppDataSource } from "../data-source";
import { ExamRequest } from "../entity/ExamRequest";

const router = express.Router();

router.get("/exam-requesties", async (req, res) => {
    try {
        const examRequestRepository = AppDataSource.getRepository(ExamRequest);
        const examRequests = await examRequestRepository.find();

        res.status(200).json(examRequests);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar as requisições de exames!",
        });
        return;
    }
});

router.get("/exam-requesties/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const examRequestRepository = AppDataSource.getRepository(ExamRequest);
        const examRequest = await examRequestRepository.findOneBy({ id });

        if (!examRequest) {
            res.status(404).json({
                message: "Requisição de exame não encontrada!",
            });
            return;
        }

        res.status(200).json(examRequest);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar a requisição de exame!",
        });
        return;
    }
});

router.post("/exam-requesties", async (req, res) => {
    try {
        const data = req.body;
        const examRequestRepository = AppDataSource.getRepository(ExamRequest);
        const newExamRequest = examRequestRepository.create(data);

        await examRequestRepository.save(newExamRequest);

        res.status(201).json({
            message: "Requisição de exame cadastrada com sucesso!",
            examRequest: newExamRequest,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar requisição de exame!",
        });
        return;
    }
});

router.put("/exam-requesties/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const examRequestRepository = AppDataSource.getRepository(ExamRequest);
        const examRequest = await examRequestRepository.findOneBy({ id });

        if (!examRequest) {
            res.status(404).json({
                message: "Requisição de exame não encontrada!",
            });
            return;
        }

        examRequestRepository.merge(examRequest, data);

        const updatedExamRequest = await examRequestRepository.save(examRequest);

        res.status(200).json({
            message: "Requisição de exame atualizada com sucesso!",
            examRequest: updatedExamRequest,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar requisição de exame!",
        });
        return;
    }
});

router.delete("/exam-requesties/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const examRequestRepository = AppDataSource.getRepository(ExamRequest);
        const examRequest = await examRequestRepository.findOneBy({ id });

        if (!examRequest) {
            res.status(404).json({
                message: "Requisição de exame não encontrada!",
            });
            return;
        }

        await examRequestRepository.remove(examRequest);

        res.status(200).json({
            message: "Requisição de exame apagada com sucesso!",
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro ao apagar a requisição de exame!",
        });
        return;
    }
});

export default router;