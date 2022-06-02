import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1654158784175 implements MigrationInterface {
    name = 'sync1654158784175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "genreId" SERIAL NOT NULL,
                "name" text NOT NULL,
                CONSTRAINT "PK_041e5e8bf2ed5cd029c2f8c74a1" PRIMARY KEY ("genreId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "bookId" SERIAL NOT NULL,
                "title" text NOT NULL,
                "author" text NOT NULL,
                "price" integer,
                "dateOfIssue" TIMESTAMP NOT NULL,
                "quantity" integer,
                CONSTRAINT "PK_dc3b1731d65c319e954cb621c1b" PRIMARY KEY ("bookId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genres_genre" (
                "bookBookId" integer NOT NULL,
                "genreGenreId" integer NOT NULL,
                CONSTRAINT "PK_2e682fdaca2b2dcb9a6639cc5ee" PRIMARY KEY ("bookBookId", "genreGenreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4c668b693b31f87e3995434261" ON "book_genres_genre" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_44dbbd935cdd96c17dcd9986c4" ON "book_genres_genre" ("genreGenreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_4c668b693b31f87e39954342612" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_44dbbd935cdd96c17dcd9986c48" FOREIGN KEY ("genreGenreId") REFERENCES "genre"("genreId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_44dbbd935cdd96c17dcd9986c48"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_4c668b693b31f87e39954342612"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_44dbbd935cdd96c17dcd9986c4"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4c668b693b31f87e3995434261"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }

}
