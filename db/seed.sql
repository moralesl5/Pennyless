DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS places CASCADE;

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR NOT NULL UNIQUE,
	username VARCHAR NOT NULL UNIQUE,
	password_digest VARCHAR NOT NULL
);

CREATE TABLE places (
	id BIGSERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id),
	lat DECIMAL(12,9),
	long DECIMAL(12,9),
	address VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	cat VARCHAR NOT NULL,
	note VARCHAR NOT NULL
);