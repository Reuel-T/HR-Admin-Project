CREATE DATABASE [HR-ADMIN]

/*
	EMPLOYEES
	First Name
	Last Name
	Telephone Number
	Email Address
	Employee Manager (Another Employee)
	Status
	Password
*/

/*
	DEPARTMENTS
	Name
	Status
*/

/*
	ROLE INFO
	0 - SU
	1 - MANAGER
	2 - EMPLOYEE
*/
CREATE TABLE Employees -- TABLE FOR ALL EMPLOYEE INFO
(
	EmployeeID INT IDENTITY(0,1) PRIMARY KEY,
	EmployeeFirstName VARCHAR(64) NOT NULL,
	EmployeeSurname VARCHAR(64) NOT NULL,
	EmployeeTelephoneNumber VARCHAR(20),
	EmployeeEmailAddress VARCHAR(64) UNIQUE NOT NULL,
	EmployeeRole TINYINT NOT NULL,
	EmployeeStatus BIT NOT NULL,
	EmployeePassword VARCHAR(255) NOT NULL,
	EmployeeManagerID INT FOREIGN KEY REFERENCES Employees(EmployeeID) --Self Reference on Manager
)

CREATE TABLE Departments -- TABLE FOR ALL DEPARTMENT INFO
(
	DepartmentID INT IDENTITY(10,1) PRIMARY KEY,
	DepartmentName VARCHAR(64) NOT NULL,
	DepartmentStatus BIT NOT NULL,
)

CREATE TABLE DepartmentEmployees -- BRDIGE ENTITY BETWEEN EMPLOYEES AND DEPARTMENTS
(
	DepartmentEmployeeID INT IDENTITY (1,1) PRIMARY KEY,
	EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID),
	DepartmentID INT FOREIGN KEY REFERENCES Departments(DepartmentID),
	DepartmentManager BIT NOT NULL --stores if the member of the department is a manager of the department
)

SELECT * FROM Employees
SELECT * FROM Departments
SELECT * FROM DepartmentEmployees

INSERT INTO Employees VALUES 
(
	'admin','user','000000000','hradmin@test.com',0,1,'TestPass1234', null
)

INSERT INTO Departments VALUES
(
	'Admin',1
)


INSERT INTO DepartmentEmployees VALUES
(
	0,10,1
)


SELECT * FROM DepartmentEmployees WHERE EmployeeID = 1


DROP TABLE DepartmentEmployees
DROP TABLE Employees
DROP TABLE Departments