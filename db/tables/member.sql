-- Table: member

-- DROP TABLE member;

CREATE TABLE member
(
  id serial NOT NULL,
  key character varying(50) NOT NULL,
  last_name character varying(25) NOT NULL,
  first_name character varying(24) NOT NULL,
  email_address character varying(50) NOT NULL,
  CONSTRAINT member_email_address_key UNIQUE (email_address),
  CONSTRAINT member_id_key UNIQUE (id),
  CONSTRAINT member_key_key UNIQUE (key)
)
WITH (
  OIDS=FALSE
);
