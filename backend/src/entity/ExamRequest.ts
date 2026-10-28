import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MedicalRecord } from "./MedicalRecord"; 

@Entity("exam-requesties")
export class ExamRequest {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.examRequest)
    medicalRecord!: MedicalRecord[];
}
