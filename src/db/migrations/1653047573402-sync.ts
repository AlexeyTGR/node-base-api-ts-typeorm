import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1653047573402 implements MigrationInterface {
    name = 'sync1653047573402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "role" "public"."user_role_enum" NOT NULL DEFAULT 'user',
                "name" text,
                "email" text NOT NULL,
                "password" text NOT NULL,
                "dob" date,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
    }

}
