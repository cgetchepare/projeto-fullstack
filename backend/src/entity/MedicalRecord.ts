import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { MedicalAssessment } from "./MedicalAssessment";
import { ExamRequest } from "./ExamRequest";

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

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
