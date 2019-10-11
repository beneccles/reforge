INSERT INTO specs (make, model, serial, processor, sku, memory, battery, disks, graphics, systeminfo)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING spec_id;