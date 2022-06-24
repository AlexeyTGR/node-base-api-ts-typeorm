import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1656079979017 implements MigrationInterface {
    name = 'sync1656079979017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name" TYPE VARCHAR(255);
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "password" TYPE VARCHAR(255);
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar" TYPE VARCHAR(255);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "user"
        ALTER COLUMN "name" TYPE TEXT;
        `);
        await queryRunner.query(`
        ALTER TABLE "user"
        ALTER COLUMN "password" TYPE TEXT;
        `);
        await queryRunner.query(`
        ALTER TABLE "user"
        ALTER COLUMN "avatar" TYPE TEXT;
        `);
    }

}
