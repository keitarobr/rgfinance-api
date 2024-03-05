import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1709679530353 implements MigrationInterface {
    name = 'Migrations1709679530353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monetary_transaction" ADD "accountId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monetary_transaction" ADD CONSTRAINT "FK_88f14dcf24981628fd3d22c4b83" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monetary_transaction" DROP CONSTRAINT "FK_88f14dcf24981628fd3d22c4b83"`);
        await queryRunner.query(`ALTER TABLE "monetary_transaction" DROP COLUMN "accountId"`);
    }

}
