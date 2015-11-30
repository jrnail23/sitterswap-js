CREATE OR REPLACE FUNCTION insert_activity(
	client_key VARCHAR(50),
	sitter_key VARCHAR(50),
	date DATE,
	points INTEGER
) RETURNS INTEGER LANGUAGE SQL AS $$
INSERT INTO activity (client, sitter, date, points)
VALUES (
	(SELECT id FROM member WHERE key = client_key),
	(SELECT id FROM member WHERE key = sitter_key),
	date,
	points)
RETURNING id;
$$
