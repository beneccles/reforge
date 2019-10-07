UPDATE posts
SET price = $1, title = $2, condition = $3, url = $4
WHERE post_id = $5
RETURNING spec_id;