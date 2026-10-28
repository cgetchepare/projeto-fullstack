import express from "express";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/Doctor";

const router = express.Router();

router.get("/doctors", async (req, res) => {
    try {
        const doctorRepository = AppDataSource.getRepository(Doctor);
        const doctors = await doctorRepository.find();

        res.status(200).json(doctors);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar os médicos!",
        });
        return;
    }
});

router.get("/doctors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const doctorRepository = AppDataSource.getRepository(Doctor);
        const doctor = await doctorRepository.findOneBy({ id });

        if (!doctor) {
            res.status(404).json({
                message: "Médico não encontrado!",
            });
            return;
        }

        res.status(200).json(doctor);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar médico!",
        });
        return;
    }
});

router.post("/doctors", async (req, res) => {
    try {
        const data = req.body;
        const doctorRepository = AppDataSource.getRepository(Doctor);
        const newDoctor = doctorRepository.create(data);

        await doctorRepository.save(newDoctor);

        res.status(201).json({
            message: "Médico cadastrado com sucesso!",
            examRequest: newDoctor,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar médico!",
        });
        return;
    }
});

router.put("/doctors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const doctorRepository = AppDataSource.getRepository(Doctor);
        const doctor = await doctorRepository.findOneBy({ id });

        if (!doctor) {
            res.status(404).json({
                message: "Médico não encontrado!",
            });
            return;
        }

        doctorRepository.merge(doctor, data);

        const updatedDoctor = await doctorRepository.save(doctor);

        res.status(200).json({
            message: "Dados do médico atualizado com sucesso!",
            doctor: updatedDoctor,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar dados do médico!",
        });
        return;
    }
});

router.delete("/doctors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const doctorRepository = AppDataSource.getRepository(Doctor);
        const doctor = await doctorRepository.findOneBy({ id });

        if (!doctor) {
            res.status(404).json({
                message: "Médico não encontrado!",
            });
            return;
        }

        await doctorRepository.remove(doctor);

        res.status(200).json({
            message: "Médico deletado com sucesso!",
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro ao deletar médico!",
        });
        return;
    }
});

export default router;