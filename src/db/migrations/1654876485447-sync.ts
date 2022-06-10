import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1654876485447 implements MigrationInterface {
    name = 'sync1654876485447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "rating_id" SERIAL NOT NULL,
                "book_id" integer NOT NULL,
                "rating" smallint NOT NULL DEFAULT '0',
                "userId" integer,
                CONSTRAINT "PK_1ba02007f1315301d9553a6839a" PRIMARY KEY ("rating_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
    }

}
