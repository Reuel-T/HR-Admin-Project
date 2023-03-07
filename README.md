# HR Admin Project

This application consists of 3 parts, A SQL Server Database, a .NET 7 Web API and a React frontend using Vite

## Database
The SQL file used to build the database is included. 

`HR-Admin-Build.sql`

Database Diagram

![Database Diagram](https://user-images.githubusercontent.com/69512501/221414575-e1399946-5b07-418a-b33a-9bdd8fba4347.png)

#

## API
The API needs the connection string of the database to be set using `appsettings.json`

appsettings.json location:

```
root/Hr-API/
```

The connection string needs to be placed here

```json
{ 
  "ConnectionStrings":{
    "ConnectionString" : "CONNECTION STRING GOES HERE"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}

```

Once this is done, run (From the root directory)
```ps
cd Hr-API
dotnet run
```

You can open http://localhost:5252/index.html in your browser to view the Swagger generated UI for the API endpoints as well as test them out without needing to use the frontend.

### API Features

- [x] Add Employees
- [x] Edit Employees
- [x] List Employees
- [x] List Employees Filterable by Department, Status
- [x] Add Departments
- [x] Edit Departments
- [x] List Departments
- [x] List Departments Filterable by Status


- [x] Employees can belong to multiple departments
- [x] Employees can have a personal manager
- [x] Managers can manage multiple departments

#

## Frontend
To setup the frontend, run (From the root directory)

```ps
cd Hr-Frontend
npm install
```

Once done, run 
```ps
npm run dev
```

### Frontend Features

- [x] Login with email and password
- [x] List Employees
- [x] List Departments
- [x] View Own Info
- [x] Edit Employee Data
- [x] Add Employee
- [x] Add Employee to Department
- [x] Add Personal Manager to Employee
- [x] Add Department
- [x] Edit Department
- [x] Change Department Status
- [x] List Employees of Department
- [x] Remove Employee from Department
- [x] Add Department accessible by admin only
- [x] Edit Department accessible by admin only
- [ ] Signed in user only able to view/edit their own info
- [ ] If Manager, view own departments and their employees

