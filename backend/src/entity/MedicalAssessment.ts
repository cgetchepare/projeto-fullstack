import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MedicalRecord } from "./MedicalRecord"; 

@Entity("medical-assessments")
export class MedicalAssessment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string; 

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.medicalAssessment)
    medicalRecord!: MedicalRecord[];
}
