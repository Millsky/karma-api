CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE karma (
    karma_id uuid DEFAULT uuid_generate_v4 (),
    from_user_id uuid,
    to_user_id uuid,
    group_id uuid,
    message character(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(karma_id)
);

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4 (),
    email varchar(255),
    user_first_name varchar(255),
    user_last_name varchar(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id)
);

CREATE TABLE groups (
    group_id uuid DEFAULT uuid_generate_v4 (),
    group_name varchar(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(group_id)
);

CREATE TABLE user_groups (
    user_id uuid,
    group_id uuid
);


CREATE OR REPLACE FUNCTION insert_user(varchar, varchar, varchar) RETURNS uuid AS $$
    DECLARE
        gid uuid;
    BEGIN
      gid := (SELECT * FROM  uuid_generate_v4 ());
      INSERT INTO users (user_id, email, user_first_name, user_last_name) VALUES (gid, $1, $2, $3);
      RETURN gid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_karma(uuid, uuid, uuid, character) RETURNS uuid AS $$
    DECLARE
        gid uuid;
    BEGIN
        gid := (SELECT * FROM  uuid_generate_v4 ());
        INSERT INTO karma (karma_id, from_user_id, to_user_id, group_id, message) VALUES (gid, $1, $2, $3, $4);
        RETURN gid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_group(varchar) RETURNS uuid AS $$
    DECLARE
        gid uuid;
    BEGIN
        gid := (SELECT * FROM  uuid_generate_v4 ());
        INSERT INTO groups (group_id, group_name) VALUES (gid, $1);
        RETURN gid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user(uuid) RETURNS SETOF users AS $$
    SELECT * FROM users WHERE user_id = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_group(uuid) RETURNS SETOF groups AS $$
    SELECT * FROM groups WHERE group_id = $1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_user_karma(uuid) RETURNS SETOF karma AS $$
    SELECT * FROM karma WHERE to_user_id = $1;
$$ LANGUAGE SQL;
