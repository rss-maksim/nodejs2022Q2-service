import { MigrationInterface, QueryRunner } from 'typeorm';

export class firstInstall1658584178339 implements MigrationInterface {
  name = 'firstInstall1658584178339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    /**
     * Users
     * */
    await queryRunner.query(
      `CREATE TABLE "users"(
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "login" character varying NOT NULL,
        "password" character varying NOT NULL,
        "version" SERIAL NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT NOW(),
        "updatedAt" timestamp NOT NULL DEFAULT NOW()
      )`,
    );
    await queryRunner.query(
      `INSERT INTO "users" (login, password) VALUES ('admin', 'admin')`,
    );

    /**
     * Tracks
     * */
    await queryRunner.query(
      `CREATE TABLE "tracks"(
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "duration" smallint NOT NULL,
        "artistId" uuid /*REFERENCES artists (id)*/,
        "albumId" uuid /*REFERENCES albums (id)*/
      )`,
    );
    await queryRunner.query(
      `INSERT INTO "tracks" (name, duration) VALUES ('Track1', 180)`,
    );

    /**
     * Albums
     * */
    await queryRunner.query(
      `CREATE TABLE "albums"(
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "year" integer NOT NULL,
        "artistId" uuid /*REFERENCES artists (id)*/
      )`,
    );
    await queryRunner.query(
      `INSERT INTO "albums" (name, year) VALUES ('Album1', 2020)`,
    );

    /**
     * Artist
     * */
    await queryRunner.query(
      `CREATE TABLE "artists"(
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "grammy" boolean NOT NULL DEFAULT false
      )`,
    );
    await queryRunner.query(`INSERT INTO "artists" (name) VALUES ('Artist1')`);

    /**
     * Favorites
     * */
    await queryRunner.query(
      `CREATE TABLE "favorites"(
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "type" character varying NOT NULL
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(`DROP TABLE "users"`),
      queryRunner.query(`DROP TABLE "tracks"`),
      queryRunner.query(`DROP TABLE "albums"`),
      queryRunner.query(`DROP TABLE "artists"`),
      queryRunner.query(`DROP TABLE "favorites"`),
    ]);
  }
}
