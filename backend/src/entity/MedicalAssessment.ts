import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MedicalRecord } from "./MedicalRecord"; // Importa a entidade relacionada

@Entity("medical-assessments")
export class MedicalAssessment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string; // Nome da situação

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    // Relacionamento OneToMany com a tabela products
    @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.medicalAssessment)
    medicalRecord!: MedicalRecord[];
}
