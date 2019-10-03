SELECT p.post_id, p.author_id, p.title, p.price, s.gpu, s.processor, s.storage_prime, s.storage_2nd, s.screen_size FROM posts p
JOIN specs s ON s.spec_id = p.spec_id
LIMIT 10 OFFSET $1

