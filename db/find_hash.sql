SELECT u.user_id, u.username as name, u.profile_pic, hash FROM users u
JOIN users_login ul ON u.user_id = ul.user_id
WHERE username = $1