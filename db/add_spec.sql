INSERT INTO specs (processor, gpu, storage_prime, storage_2nd, screen_size, systeminfo)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING spec_id;