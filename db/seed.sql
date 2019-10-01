DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_login;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS specs;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    phone VARCHAR(10),
    profile_pic text
);

CREATE TABLE users_login (
    user_login_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (user_id),
    hash TEXT
);

CREATE TABLE specs (
    spec_id SERIAL PRIMARY KEY,
    processor VARCHAR(40),
    gpu VARCHAR(40),
    storage_prime VARCHAR(40),
    storage_2nd VARCHAR(40),
    screen_size int
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    price int,
    title VARCHAR(100),
    spec_id int REFERENCES specs (spec_id)
);