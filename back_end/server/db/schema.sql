DROP SCHEMA IF EXISTS dataProtector;
CREATE SCHEMA IF NOT EXISTS dataProtector;
USE dataProtector;

CREATE TABLE IF NOT EXISTS USER(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
	CONSTRAINT email_unique UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS WEBSITES(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	search VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
	CONSTRAINT website_unique UNIQUE (search)
);

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (1, 'London', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (2, 'Paris', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (3, 'Athens', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (4, 'Amsterdam', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (5, 'Addis Ababa', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (6, 'Adelaide', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (7, 'Auckland', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (8, 'Austin', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (9, 'Bangkok', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (10, 'Barcelona', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (11, 'Beijing', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (12, 'Berlin', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (13, 'Bogota', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (14, 'Bordeaux', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (15, 'Boston', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (16, 'Brisbane', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (17, 'Brussels', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (18, 'Budapest', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (19, 'Buenos Aires', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (20, 'Jerusalem', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (21, 'Cairns', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (22, 'Cairo', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (23, 'Canberra', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (24, 'Cancún', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (25, 'Cape Town', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (26, 'Caracas', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (27, 'Cardiff', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (28, 'Casablanca', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (29, 'Chiang Mai', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (30, 'Chicago', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (31, 'Copenhagen', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (32, 'Dubai', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (33, 'Dublin', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (34, 'Dubrovnik', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (35, 'Edinburgh', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (36, 'Frankfurt', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (37, 'Galway', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (38, 'Guatemala City', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (39, 'Halifax', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (40, 'Hanoi', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (41, 'Hong Kong', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (42, 'Honolulu', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (43, 'Istanbul', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (44, 'Jakarta', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (45, 'Johannesburg', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (46, 'Killarney', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (47, 'Kingston', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (48, 'Kolkata', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (49, 'Kraków', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (50, 'Kuala Lumpur', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (51, 'Las Vegas', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (52, 'Lima', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (53, 'Lisbon', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (54, 'Ljubljana', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (55, 'Los Angeles', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (56, 'Madrid', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (57, 'Manila', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (58, 'Marrakech', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (59, 'Melbourne', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (60, 'Mexico City', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (61, 'Milan', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (62, 'Montevideo', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (63, 'Montreal', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (64, 'Moscow', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (65, 'Quebec', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (66, 'Mostar', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (67, 'Munich', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (68, 'Nashville', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (69, 'Nassau', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (70, 'New Dehli', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (71, 'New York City', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (72, 'Orlando', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (73, 'Ottawa', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (74, 'Perth', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (75, 'Prague', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (76, 'Reykjavik', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (77, 'Riga', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (78, 'Rio De Janeiro', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (79, 'Rome', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (80, 'San Francisco', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (81, 'Santiago', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (82, 'Sao Paulo', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (83, 'Seattle', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (84, 'Seoul', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (85, 'Shanghai', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (86, 'Siem Reap', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (87, 'Singapore', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (88, 'St. Petersburg', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (89, 'Stockholm', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (90, 'Sydney', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (91, 'Taipei', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (92, 'Tallinn', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (93, 'Tokyo', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (94, 'Toronto', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (95, 'Valletta', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (96, 'Vancouver', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (97, 'Vienna', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (98, 'Washington D.C', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (99, 'Wellington', 'cities');

INSERT INTO WEBSITES(`id`, `search`, `category`)
VALUES (100, 'Tel Aviv', 'cities');