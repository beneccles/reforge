DELETE FROM posts
WHERE post_id = $1
RETURNING spec_id;