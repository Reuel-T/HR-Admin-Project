CREATE DATABASE [HR-ADMIN]

/*
	EMPLOYEES
	First Name
	Last Name
	Telephone Number
	Email Address
	Employee Manager (Role, Bool?)
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
	EmployeePassword VARCHAR(255) NOT NULL
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
	DepartmentID INT FOREIGN KEY REFERENCES Departments(DepartmentID)
)

SELECT * FROM Employees
SELECT * FROM Departments
SELECT * FROM DepartmentEmployees