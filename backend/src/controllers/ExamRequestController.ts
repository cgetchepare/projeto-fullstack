import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ExamRequest } from "../entity/ExamRequest";

const router = express.Router();

router.get("/exam-requesties", async (req: Request, res: Response) => {
    try {

        const examRequestRepository = AppDataSource.getRepository(ExamRequest);

        const examRequest = await examRequestRepository.find();

        res.status(200).json(examRequest);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar as requisições de exames!",
        });
        return;
    }
});

router.get("/exam-requesties/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const examRequestRepository = AppDataSource.getRepository(ExamRequest);
        const productCategory = await examRequestRepository.findOneBy({ id: Number(id) });

        if (!ExamRequest) {
            res.status(404).json({
                message: "Requisição de exame não encontrada!",
            });
            return;
        }
        res.status(200).json(productCategory);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar a requisição de exame!",
        });
    }
});

router.post("/exam-requesties", async (req: Request, res: Response) => {

    try {
        var data = req.body;
        const examRequestRepository = AppDataSource.getRepository(ExamRequest)
        const newExamRequest = examRequestRepository.create(data);

        await examRequestRepository.save(newExamRequest);

        res.status(201).json({
            message: "Categoria cadastrada com sucesso!",
            situation: newExamRequest,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar categoria!",
        });
    }
});

router.put("/exam-requesties/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const examRequestRepository = AppDataSource.getRepository(ExamRequest);
        const examRequest = await examRequestRepository.findOneBy({ id: Number(id) });

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
            category: updatedExamRequest,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar categoria!",
        });
    }
});

router.delete("/exam-requesties/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const examRequestRepository = AppDataSource.getRepository(ExamRequest);

        const examRequest = await examRequestRepository.findOneBy({ id: Number(id) });

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
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: "Erro ao apagar a requisição de exame!",
        });
    }
});

export default router;
