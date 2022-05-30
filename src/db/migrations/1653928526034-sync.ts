import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1653928526034 implements MigrationInterface {
    name = 'sync1653928526034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
    }

}
