import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserMovieTable1615421792913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_movie" (
        "user_id" uuid NOT NULL,
        "movie_id" uuid NOT NULL,
        "vote" int8 NOT NULL,
        PRIMARY KEY ("user_id", "movie_id")
      );`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_movie" ADD CONSTRAINT "fk_user_movie_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id");`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_movie" ADD CONSTRAINT "fk_user_movie_movie_id" FOREIGN KEY ("movie_id") REFERENCES "movies" ("id");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_movie" DROP CONSTRAINT "fk_user_movie_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_movie" DROP CONSTRAINT "fk_user_movie_movie_id"`,
    );
    await queryRunner.query(`DROP TABLE "user_movie"`);
  }
}
