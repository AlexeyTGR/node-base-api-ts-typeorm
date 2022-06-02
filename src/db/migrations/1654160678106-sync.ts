import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1654160678106 implements MigrationInterface {
    name = 'sync1654160678106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "cover" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "cover"
        `);
    }

}
