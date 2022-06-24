import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1655737723651 implements MigrationInterface {
    name = 'sync1655737723651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN "dob"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" add "dob" date
        `);
    }

}