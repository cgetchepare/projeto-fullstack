import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { MedicalRecord } from "./MedicalRecord";
import { Doctor } from "./Doctor";

@Entity("exam-requesties")
export class ExamRequest {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.examRequest)
    medicalRecord!: MedicalRecord[];

    @ManyToOne(() => Doctor)
    @JoinColumn({ name: "doctorId" })
    doctor!: Doctor;

    @Column({ type: "uuid" })
    doctorId!: string;

    @ManyToOne(() => ExamRequest)
    @JoinColumn({ name: "examRequestId" })
    examRequest?: ExamRequest;

    @Column({ type: "uuid", nullable: true })
    examRequestId?: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
