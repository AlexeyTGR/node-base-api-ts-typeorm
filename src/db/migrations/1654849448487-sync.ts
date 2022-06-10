import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1654849448487 implements MigrationInterface {
    name = 'sync1654849448487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "description" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "description"
        `);
    }

}
