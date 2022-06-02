import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1654184103307 implements MigrationInterface {
    name = 'sync1654184103307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "quantity"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "inStock" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "genre" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "genre"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "genre"
            ADD CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "title" character varying NOT NULL DEFAULT 'anonimous'
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "author"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "author" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "price"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "price" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "author"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "author" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "title" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "genre" DROP CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c"
        `);
        await queryRunner.query(`
            ALTER TABLE "genre" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "genre"
            ADD "name" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "inStock"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "quantity" integer
        `);
    }

}
