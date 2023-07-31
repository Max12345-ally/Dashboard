CREATE TABLE authors
(
    id uuid NOT NULL,
    salary numeric,
    "starsCount" integer,
    name varchar(255),
    "birthDate" timestamp,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    CONSTRAINT authors_pkey PRIMARY KEY (id)
)

CREATE TABLE tutorials
(
    id integer NOT NULL,
    price numeric,
    "pageCount" integer,
    title varchar(255),
    description varchar(255),
    "publishedDate" timestamp,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "authorId" uuid,
    CONSTRAINT tutorials_pkey PRIMARY KEY (id),
    CONSTRAINT "tutorials_authorId_fkey" FOREIGN KEY ("authorId")
        REFERENCES authors (id)
)

INSERT INTO authors(
	id, salary, "starsCount", name, "birthDate", "createdAt", "updatedAt")
	VALUES 
	(uuid_generate_v4(), 10000, 55, 'max6', '1990.01.01', '2023.01.08', '2023.01.08'),
	(uuid_generate_v4(), 10000, 15, 'max2', '1990.01.01', '2023.01.08', '2023.01.08'),
	(uuid_generate_v4(), 10000, 55, 'max3', '1990.01.01', '2023.01.08', '2023.01.08')

INSERT INTO tutorials(
	price, "pageCount", title, description, "publishedDate", "createdAt", "updatedAt", "authorId")
	VALUES (10, 9, 'BookDima', 'good', '2023.08.01', '2023.08.01', '2023.08.01', 'db3a1abb-fa7c-4944-b3c8-088e06e1b978'),
	(10, 9, 'Book3', 'good', '2023.08.01', '2023.08.01', '2023.08.01', '79313481-e6e4-4699-b0f5-2b8c2897652f'),
	(10, 9, 'Book4', 'good', '2023.08.01', '2023.08.01', '2023.08.01', '43e2e088-5e92-4d15-9c7b-f70506d11a09'),
	(10, 9, 'Book4', 'good', '2023.08.01', '2023.08.01', '2023.08.01', '58f60305-5704-4367-b852-6be4719be509')
	