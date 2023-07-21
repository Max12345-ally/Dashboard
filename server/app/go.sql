CREATE TABLE Person (
    Number Number,
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Date datetime,
    City varchar(255)
);

CREATE TABLE Description (
    Department varchar(255),
    Salary Number,
    PersonID int
);