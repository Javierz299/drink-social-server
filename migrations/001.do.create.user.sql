CREATE TABLE "user"(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR,
    "email" VARCHAR UNIQUE NOT NULL,
);