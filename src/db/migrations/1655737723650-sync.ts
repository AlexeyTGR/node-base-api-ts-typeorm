import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1655737723650 implements MigrationInterface {
    name = 'sync1655737723650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "book_users_user" (
                "bookBookId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_de9f6a6ed831a26d77aaf5a07f0" PRIMARY KEY ("bookBookId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a0cad134f47c0c1b805e480ff4" ON "book_users_user" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_59b4f1a2b814dc3c92e2628f93" ON "book_users_user" ("userId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_users_user"
            ADD CONSTRAINT "FK_a0cad134f47c0c1b805e480ff40" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_users_user"
            ADD CONSTRAINT "FK_59b4f1a2b814dc3c92e2628f933" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_users_user" DROP CONSTRAINT "FK_59b4f1a2b814dc3c92e2628f933"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_users_user" DROP CONSTRAINT "FK_a0cad134f47c0c1b805e480ff40"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_59b4f1a2b814dc3c92e2628f93"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a0cad134f47c0c1b805e480ff4"
        `);
        await queryRunner.query(`
            DROP TABLE "book_users_user"
        `);
    }

}
