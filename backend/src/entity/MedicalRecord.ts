import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Avaliation } from "./Avaliation";
import { ExamRequest } from "./ExamRequest";

@Entity("medical-records")
export class MedicalRecord {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToOne(() => ExamRequest, (examRequest) => examRequest.medicalRecord)
    @JoinColumn({ name: "examRequestId" })
    examRequest!: ExamRequest;

    @ManyToOne(() => Avaliation, (avaliation) => avaliation.medicalRecord)
    @JoinColumn({ name: "avaliationId" })
    avaliation!: Avaliation;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
