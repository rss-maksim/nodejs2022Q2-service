import { MigrationInterface, QueryRunner } from 'typeorm';

export class firstInstall1658584178339 implements MigrationInterface {
  name = 'firstInstall1658584178339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users
    await queryRunner.query(
      `CREATE TABLE "user"(
"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
"login" character varying NOT NULL,
"password" character varying NOT NULL,
"version" SERIAL NOT NULL,
"createdAt" timestamp NOT NULL DEFAULT NOW(),
"updatedAt" timestamp NOT NULL DEFAULT NOW()
)`,
    );
    await queryRunner.query(
      `INSERT INTO "user" (login, password) VALUES ('admin', 'admin')`,
    );

    // Tracks
    await queryRunner.query(
      `CREATE TABLE "track"(
"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
"name" character varying NOT NULL,
"duration" bigint NOT NULL,
"artistId" uuid REFERENCES artists (id),
"albumId" uuid REFERENCES albums (id)
)`,
    );
    await queryRunner.query(
      `INSERT INTO "track" (name, duration) VALUES ('Track1', 180)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(`DROP TABLE "user"`),
      queryRunner.query(`DROP TABLE "track"`),
    ]);
  }
}
