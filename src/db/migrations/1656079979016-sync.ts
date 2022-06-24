import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1656079979016 implements MigrationInterface {
    name = 'sync1656079979016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "email" TYPE VARCHAR(255);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "user"
        ALTER COLUMN "email" TYPE TEXT;
        `);
    }

}
