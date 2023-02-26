# HR Admin Project

This application consists of 3 parts, A SQL Server Database, a .NET 7 Web API and a React frontend using Vite

## Database
The SQL file used to build the database is included. 

`HR-Admin-Build.sql`

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

# API Features

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
