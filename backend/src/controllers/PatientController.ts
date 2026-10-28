import express from "express";
import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";

const router = express.Router();

router.get("/patients", async (req, res) => {
    try {
        const patientRepository = AppDataSource.getRepository(Patient);
        const patients = await patientRepository.find();

        res.status(200).json(patients);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar os pacientes!",
        });
        return;
    }
});

router.get("/patients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const patientRepository = AppDataSource.getRepository(Patient);
        const patient = await patientRepository.findOneBy({ id });

        if (!patient) {
            res.status(404).json({
                message: "Paciente não encontrado!",
            });
            return;
        }

        res.status(200).json(patient);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar paciente!",
        });
        return;
    }
});

router.post("/patients", async (req, res) => {
    try {
        const data = req.body;
        const patientRepository = AppDataSource.getRepository(Patient);
        const newPatient = patientRepository.create(data);

        await patientRepository.save(newPatient);

        res.status(201).json({
            message: "Paciente cadastrado com sucesso!",
            examRequest: newPatient,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar paciente!",
        });
        return;
    }
});

router.put("/patients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const patientRepository = AppDataSource.getRepository(Patient);
        const patient = await patientRepository.findOneBy({ id });

        if (!patient) {
            res.status(404).json({
                message: "Paciente não encontrado!",
            });
            return;
        }

        patientRepository.merge(patient, data);

        const updatedPatient = await patientRepository.save(patient);

        res.status(200).json({
            message: "Dados do paciente atualizado com sucesso!",
            patient: updatedPatient,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar dados do paciente!",
        });
        return;
    }
});

router.delete("/patients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const patientRepository = AppDataSource.getRepository(Patient);
        const patient = await patientRepository.findOneBy({ id });

        if (!patient) {
            res.status(404).json({
                message: "Paciente não encontrado!",
            });
            return;
        }

        await patientRepository.remove(patient);

        res.status(200).json({
            message: "Paciente deletado com sucesso!",
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro ao deletar paciente!",
        });
        return;
    }
});

export default router;