INSERT INTO specs (processor, gpu, storage_prime, storage_2nd, screen_size)
VALUES ($1, $2, $3, $4, $5)
RETURNING spec_id;