CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE karma (
    karma_id uuid DEFAULT uuid_generate_v4 (),
    from_user_id uuid,
    to_user_id uuid,
    message character(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(karma_id)
);

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4 (),
    email varchar(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id)
);

CREATE OR REPLACE PROCEDURE add_user(varchar)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (email) VALUES ($1);
END;
$$;

CREATE OR REPLACE PROCEDURE add_karma(uuid, uuid, character)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO karma (from_user_id, to_user_id, message) VALUES ($1, $2, $3);
END;
$$;


CREATE OR REPLACE FUNCTION get_user(uuid) RETURNS SETOF users AS $$
    SELECT * FROM users WHERE user_id = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_user_karma(uuid) RETURNS SETOF karma AS $$
    SELECT * FROM karma WHERE to_user_id = $1;
$$ LANGUAGE SQL;
