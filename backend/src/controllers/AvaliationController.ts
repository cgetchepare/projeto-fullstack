import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Avaliation } from "../entity/Avaliation";

const router = express.Router();

router.get("/avaliations", async (req: Request, res: Response) => {
    try {
        const avaliationRepository = AppDataSource.getRepository(Avaliation);
        const avaliation = await avaliationRepository.find();
        res.status(200).json(avaliation);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar as avaliações!",
        });
        return;
    }
});

router.get("/avaliations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const avaliationRepository = AppDataSource.getRepository(Avaliation);
        const avaliation = await avaliationRepository.findOneBy({ id: Number(id) });

        if (!avaliation) {
            res.status(404).json({
                message: "Avaliação não encontrada!",
            });
            return;
        }
        res.status(200).json(avaliation);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar a avaliação!",
        });
    }
});

router.post("/avaliations", async (req: Request, res: Response) => {

    try {
        var data = req.body;
        const avaliationRepository = AppDataSource.getRepository(Avaliation)
        const newAvaliation = avaliationRepository.create(data);
        await avaliationRepository.save(newAvaliation);

        res.status(201).json({
            message: "Avaliação cadastrada com sucesso!",
            situation: newAvaliation,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar avaliação!",
        });
    }
});

router.put("/avaliations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const avaliationRepository = AppDataSource.getRepository(Avaliation);
        const avaliation = await avaliationRepository.findOneBy({ id: Number(id) });

        if (!avaliation) {
            res.status(404).json({
                message: "Avaliação não encontrada!",
            });
            return;
        }
        avaliationRepository.merge(avaliation, data);

        const updatedAvaliation = await avaliationRepository.save(avaliation);

        res.status(200).json({
            message: "Avaliação editada com sucesso!",
            situation: updatedAvaliation,
        });
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: "Erro ao editar avaliação!",
        });
    }
});

router.delete("/avaliations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const avaliationRepository = AppDataSource.getRepository(Avaliation);

        const avaliation = await avaliationRepository.findOneBy({ id: Number(id) });

        if (!avaliation) {
            res.status(404).json({
                message: "Avaliação não encontrada!",
            });
            return;
        }

        await avaliationRepository.remove(avaliation);

        res.status(200).json({
            message: "Avaliação apagada com sucesso!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao apagar avaliação!",
        });
    }
});

export default router;