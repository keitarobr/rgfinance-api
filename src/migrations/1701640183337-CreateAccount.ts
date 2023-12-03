import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateAccount1701640183337 implements MigrationInterface {
    name = 'CreateAccount1701640183337';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_414d4052f22837655ff312168cb" UNIQUE ("name"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "account"`);
    }
}
