SELECT p.post_id, p.author_id, p.title, p.price, p.condition, s.gpu, s.processor, s.storage_prime, s.storage_2nd, s.screen_size, p.url, s.systeminfo FROM posts p
JOIN specs s ON s.spec_id = p.spec_id
WHERE author_id = $1