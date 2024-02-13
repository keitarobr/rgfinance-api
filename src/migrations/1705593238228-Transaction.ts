import { MigrationInterface, QueryRunner } from "typeorm";

export class Transaction1705593238228 implements MigrationInterface {
    name = 'Transaction1705593238228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monetary_transaction" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "value" numeric(10,2) NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_327c8f0f59f6d9ac75b149fd589" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "monetary_transaction" ADD CONSTRAINT "FK_bf92ba855258ae6997c4903c0a5" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monetary_transaction" DROP CONSTRAINT "FK_bf92ba855258ae6997c4903c0a5"`);
        await queryRunner.query(`DROP TABLE "monetary_transaction"`);
    }

}
