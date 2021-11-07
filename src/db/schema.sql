DROP SCHEMA IF EXISTS data_pollutor;
CREATE SCHEMA IF NOT EXISTS data_pollutor;

USE data_pollutor;

CREATE TABLE IF NOT EXISTS urls(
	url VARCHAR(2083) NOT NULL,
    categories TEXT NOT NULL,
    freq INT NOT NULL,
    PRIMARY KEY(url)
);

