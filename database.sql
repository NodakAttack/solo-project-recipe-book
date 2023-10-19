
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
  "email" varchar,
  "dateCreated" date,
  "picture" varchar
);

CREATE TABLE "recipes" (
  "recipeID" SERIAL PRIMARY KEY,
  "userID" int,
  "name" varchar,
  "course" varchar,
  "notes" text,
  "rating" int,
  "picture" varchar,
  "isFavorite" bool,
  "isShared" bool
);

CREATE TABLE "ingredients" (
  "ingredientID" SERIAL PRIMARY KEY,
  "recipeID" int,
  "name" varchar,
  "quantity" decimal,
  "unit" varchar
);

CREATE TABLE "steps" (
  "stepID" SERIAL PRIMARY KEY,
  "recipeID" int,
  "description" text,
  "order" int
);

CREATE TABLE "notes" (
  "noteID" SERIAL PRIMARY KEY,
  "recipeID" int,
  "description" text
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("userID") REFERENCES "user" ("id");

ALTER TABLE "ingredients" ADD FOREIGN KEY ("recipeID") REFERENCES "recipes" ("recipeID");

ALTER TABLE "steps" ADD FOREIGN KEY ("recipeID") REFERENCES "recipes" ("recipeID");

ALTER TABLE "notes" ADD FOREIGN KEY ("recipeID") REFERENCES "recipes" ("recipeID");
