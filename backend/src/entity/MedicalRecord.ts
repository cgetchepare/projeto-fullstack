import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { MedicalAssessment } from "./MedicalAssessment";
import { ExamRequest } from "./ExamRequest";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

@Entity("medical-records")
export class MedicalRecord {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToOne(() => ExamRequest, (examRequest) => examRequest.medicalRecord)
    @JoinColumn({ name: "examRequestId" })
    examRequest!: ExamRequest;

    @ManyToOne(() => MedicalAssessment, (medicalAssessment) => medicalAssessment.medicalRecord)
    @JoinColumn({ name: "medicalAssessmentId" })
    medicalAssessment!: MedicalAssessment;

    @ManyToOne(() => Doctor, (doctor) => doctor.medicalRecords, { onDelete: "CASCADE" })
    doctor!: Doctor;

    @OneToOne(() => Patient, (patient) => patient.medicalRecord, { onDelete: "CASCADE" })
    @JoinColumn()
    patient!: Patient;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
