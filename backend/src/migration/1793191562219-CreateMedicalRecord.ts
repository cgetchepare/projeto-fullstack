import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMedicalRecord1793191562219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "medical-records",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "examRequestId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "medicalAssessmentId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "doctorId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "patientId",
                        type: "varchar",
                        length: "36",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["examRequestId"],
                        referencedTableName: "exam-requesties",
                        referencedColumnNames: ["id"],
                    }),
                    new TableForeignKey({
                        columnNames: ["medicalAssessmentId"],
                        referencedTableName: "medical-assessments",
                        referencedColumnNames: ["id"],
                    }),
                    new TableForeignKey({
                        columnNames: ["doctorId"],
                        referencedTableName: "doctors",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }),
                    new TableForeignKey({
                        columnNames: ["patientId"],
                        referencedTableName: "patients",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }),
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("medical-records");
    }

}
