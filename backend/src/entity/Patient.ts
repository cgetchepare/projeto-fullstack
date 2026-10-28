import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("patients")
export class Patient {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    crm!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    // Relacionamento OneToMany com a tabela users
}