INSERT INTO users (username, first_name, last_name, email, phone, profile_pic)
VALUES (${username}, ${first_name}, ${last_name}, ${email}, ${phone}, ${profile_pic})
RETURNING user_id