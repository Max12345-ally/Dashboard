CREATE TABLE authors2
(
    id uuid NOT NULL,
    salary numeric,
    "starsCount" integer,
    name varchar(255),
    "birthDate" timestamp,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    CONSTRAINT authors2_pkey PRIMARY KEY (id)
)

CREATE TABLE Description (
    Department varchar(255),
    Salary Number,
    PersonID int
);