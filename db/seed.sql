DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR NOT NULL UNIQUE,
	password_digest VARCHAR NOT NULL
);