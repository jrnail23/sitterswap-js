-- DROP TABLE activity;

CREATE TABLE activity
(
  id serial NOT NULL,
  client integer NOT NULL,
  sitter integer NOT NULL,
  date date NOT NULL,
  points integer NOT NULL,
  CONSTRAINT activity_pkey PRIMARY KEY (id),
  CONSTRAINT activity_client_fkey FOREIGN KEY (client)
      REFERENCES member (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT activity_sitter_fkey FOREIGN KEY (sitter)
      REFERENCES member (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT
)
WITH (
  OIDS=FALSE
);
