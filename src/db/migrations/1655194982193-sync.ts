import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1655194982193 implements MigrationInterface {
    name = 'sync1655194982193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "averageRate" numeric(2, 1) DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "averageRate"
        `);
    }

}
