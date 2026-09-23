# Employee Management System

A full-stack Employee Management System built using **React**, **ASP.NET Core Web API**, and **Microsoft SQL Server**.

The application provides employee management functionality such as viewing employees, searching employees, viewing complete employee details, creating employees, updating employee information, and soft deleting employees.

The backend follows a layered architecture using **Controller, Service, Repository, and Permission Service** layers, while database operations are handled using **SQL Server Stored Procedures**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Application Flow](#application-flow)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database Design](#database-design)
- [Database Tables](#database-tables)
- [Database Relationships](#database-relationships)
- [Organizational Hierarchy](#organizational-hierarchy)
- [Stored Procedures](#stored-procedures)
- [Employee Code Generation](#employee-code-generation)
- [Soft Delete](#soft-delete)
- [Permission Management](#permission-management)
- [API Endpoints](#api-endpoints)
- [API Request Flow](#api-request-flow)
- [Exception Handling](#exception-handling)
- [CORS Configuration](#cors-configuration)
- [Installation and Setup](#installation-and-setup)
- [Database Setup](#database-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Swagger API Documentation](#swagger-api-documentation)
- [Current Authentication Status](#current-authentication-status)
- [Security Considerations](#security-considerations)
- [Future Improvements](#future-improvements)
- [Learning Objectives](#learning-objectives)
- [Project Status](#project-status)
- [Author](#author)

---

# Project Overview

The **Employee Management System** is a full-stack web application designed to manage employee information and organizational hierarchy.

The application consists of three major components:

1. **React Frontend**
2. **ASP.NET Core Web API**
3. **Microsoft SQL Server Database**

The frontend communicates with the backend through REST APIs. The backend handles business logic, permission checking, and database communication. SQL Server stores employee, user, role, designation, and audit information.

### High-Level Architecture

```text
                    Employee Management System
                              |
             +----------------+----------------+
             |                                 |
             v                                 v
       React Frontend                    ASP.NET Core API
             |                                 |
             | HTTP/REST                     Controller
             |                                 |
             |                                 v
             |                              Service
             |                            /         \
             |                           /           \
             |                          v             v
             |                 Permission Service  Repository
             |                                         |
             |                                         v
             |                                  Stored Procedures
             |                                         |
             +-----------------------------------------+
                                                       |
                                                       v
                                                SQL Server
```

---

# Key Features

## Employee Management

- View all active employees
- Search employees
- View complete employee details
- Create new employees
- Update employee information
- Soft delete employees
- Automatic Employee Code generation
- Reporting manager hierarchy
- Department information
- Employee status management
- Audit information

## UI Features

- Material UI based interface
- MUI DataGrid
- Search functionality
- Pagination
- Employee details page
- Create Employee form
- Edit Employee form
- Delete Employee functionality
- Navigation using React Router
- Loading indicators
- Error messages

## Backend Features

- RESTful APIs
- Controller-Service-Repository architecture
- Dependency Injection
- Stored Procedure based database operations
- Permission checking
- Exception handling middleware
- CORS configuration
- Swagger/OpenAPI documentation

## Database Features

- Relational data model
- Primary Keys
- Foreign Keys
- Identity columns
- Unique constraints
- Self-referencing relationships
- Stored Procedures
- Soft deletion
- Audit fields
- Organizational hierarchy

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | Frontend framework |
| Vite | Frontend build tool |
| JavaScript | Programming language |
| Material UI | UI component library |
| MUI DataGrid | Employee data table |
| React Router | Client-side routing |
| Fetch API | API communication |

## Backend

| Technology | Purpose |
|---|---|
| ASP.NET Core Web API | Backend framework |
| C# | Programming language |
| ADO.NET | Database connectivity |
| Microsoft.Data.SqlClient | SQL Server communication |
| Dependency Injection | Service management |
| Middleware | Centralized exception handling |
| Swagger | API documentation/testing |

## Database

| Technology | Purpose |
|---|---|
| Microsoft SQL Server | Relational database |
| SQL Server Management Studio | Database management |
| Stored Procedures | Database operations |

## Development Tools

- Visual Studio
- Visual Studio Code
- Git
- GitHub
- Swagger
- Postman

---

# System Architecture

The backend follows a layered architecture.

```text
                 Client
                   |
                   v
             React Frontend
                   |
                   | HTTP Request
                   v
          ASP.NET Core Web API
                   |
                   v
              Controller
                   |
                   v
               Service
              /       \
             /         \
            v           v
 Permission Service   Repository
                         |
                         v
                 Stored Procedure
                         |
                         v
                    SQL Server
```

Each layer has a specific responsibility.

## Controller Layer

Handles HTTP requests and responses. It receives requests from the frontend and calls the appropriate service method.

## Service Layer

Contains business logic such as employee operations, current-user lookup, permission checking, and coordination between repositories.

## Repository Layer

Handles communication with SQL Server, including opening connections, executing stored procedures, passing parameters, and mapping results.

## Permission Service

Determines whether a user can modify a target employee based on application role and hierarchy level.

---

# Application Flow

A typical request follows this flow:

```text
User
 |
 v
React UI
 |
 | HTTP Request
 v
ASP.NET Core Controller
 |
 v
Employee Service
 |
 +------> User Repository
 |
 +------> Permission Service
 |
 v
Employee Repository
 |
 v
Stored Procedure
 |
 v
SQL Server
 |
 v
Repository
 |
 v
Service
 |
 v
Controller
 |
 | HTTP Response
 v
React UI
```

---

# Project Structure

```text
EmployeeManagement
│
├── EmployeeManagement.API
│
├── employee-management-ui
│
├── EmployeeManagement.slnx
│
├── README.md
│
└── .gitignore
```

## Backend Project Structure

```text
EmployeeManagement.API
│
├── Controllers
│   └── Controllers.cs
│
├── DTOs
│   ├── CreateEmployeeDto.cs
│   ├── UpdateEmployeeDto.cs
│   └── DeleteEmployeeDto.cs
│
├── Middleware
│   └── ExceptionMiddleware.cs
│
├── Models
│   ├── Employee.cs
│   └── CurrentUser.cs
│
├── Repositories
│   ├── EmployeeRepository.cs
│   └── UserRepository.cs
│
├── Services
│   ├── EmployeeService.cs
│   └── PermissionService.cs
│
├── Program.cs
│
└── appsettings.json
```

## Frontend Project Structure

```text
employee-management-ui
│
├── public
│
├── src
│   ├── assets
│   │
│   ├── components
│   │   ├── EmployeeGrid
│   │   │   └── EmployeeGrid.jsx
│   │   │
│   │   ├── EmployeeDetails
│   │   │   └── EmployeeDetails.jsx
│   │   │
│   │   ├── CreateEmployee
│   │   │   └── CreateEmployee.jsx
│   │   │
│   │   └── EditEmployee
│   │       └── EditEmployee.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# Frontend

The frontend is developed using React and Material UI. The main employee listing uses **MUI DataGrid**.

The frontend is responsible for displaying employee data, collecting user input, sending API requests, navigation, loading states, and error messages.

## Frontend Routes

| Route | Purpose |
|---|---|
| `/` | Employee Grid |
| `/employees/:id` | Employee Details |
| `/employees/edit/:id` | Edit Employee |
| `/employees/create` | Create Employee |

## Employee Grid

The grid displays:

- Serial Number
- Employee ID
- Employee Code
- First Name
- Last Name
- Email
- Designation
- Department
- Reporting Manager
- Status
- Actions

The Employee ID is clickable and opens the employee details page.

## Search

The frontend sends:

```text
GET /api/Employee?search={searchValue}
```

The backend passes the search value to `sp_GetEmployees`.

The search covers fields including first name, last name, employee code, email, designation, and department.

---

# Create Employee

The frontend sends:

```text
POST /api/Employee?creatingEmployeeId={id}
```

The backend:

1. Retrieves the current user.
2. Checks permission.
3. Calls the repository.
4. Executes `sp_CreateEmployee`.
5. Generates the Employee ID.
6. Generates the Employee Code.
7. Returns the created employee.

---

# Edit Employee

The edit page first retrieves the employee:

```text
GET /api/Employee/{id}
```

After editing, it sends:

```text
PUT /api/Employee/{employeeIdToUpdate}?updatingEmployeeId={id}
```

The backend retrieves the current user, retrieves the target employee, checks permission, executes `sp_UpdateEmployee`, and returns the updated employee.

---

# Delete Employee

The application uses soft deletion.

The frontend sends:

```text
DELETE /api/Employee/{employeeIdToDelete}?deletingEmployeeId={id}
```

The backend retrieves the current user, retrieves the target employee, checks permission, executes `sp_SoftDeleteEmployee`, and marks the employee as deleted.

The employee then no longer appears in the active employee grid.

---

# Database Design

The application uses Microsoft SQL Server.

The main tables are:

```text
Roles
Designations
Employees
Users
```

The database separates application roles, organizational designations, employee information, and application user information.

---

# Database Tables

## Roles

The `Roles` table stores application-level roles.

| Column | Type | Description |
|---|---|---|
| RoleId | INT | Primary key |
| RoleName | VARCHAR(50) | Application role name |

Current roles:

```text
Admin
Manager
Employee
```

Role represents **application permissions**, not organizational designation.

---

## Designations

The `Designations` table stores organizational positions.

| Column | Type | Description |
|---|---|---|
| DesignationId | INT | Primary key |
| DesignationName | VARCHAR(100) | Designation name |
| HierarchyLevel | INT | Organizational hierarchy level |

Current hierarchy:

```text
1  - CEO / Managing Director
2  - Director / VP
3  - General Manager
4  - Manager
5  - Assistant Manager
6  - Team Lead
7  - Senior Executive
8  - Executive
9  - Associate / Junior Executive
```

A smaller hierarchy level represents a higher organizational position.

---

## Employees

The `Employees` table is the main business table.

| Column | Purpose |
|---|---|
| EmployeeId | Unique employee identifier |
| EmpCode | Employee business code |
| FirstName | Employee first name |
| LastName | Employee last name |
| Email | Employee email |
| PhoneNumber | Employee phone number |
| DateOfBirth | Employee date of birth |
| DateOfJoining | Date employee joined |
| DesignationId | Employee designation |
| Department | Employee department |
| ReportingManagerId | Employee's reporting manager |
| EmploymentType | Employment type |
| WorkLocation | Employee work location |
| Status | Employee status |
| Salary | Employee salary |
| Address | Employee address |
| City | Employee city |
| State | Employee state |
| Country | Employee country |
| PostalCode | Postal/ZIP code |
| EmergencyContactName | Emergency contact name |
| EmergencyContactNumber | Emergency contact number |
| IsDeleted | Soft-delete flag |
| CreatedDate | Record creation date |
| CreatedBy | Record creator |
| UpdatedDate | Last update date |
| UpdatedBy | Last updater |
| DeletedDate | Record deletion date |
| DeletedBy | User who deleted the record |

---

## Users

The `Users` table stores application users.

| Column | Purpose |
|---|---|
| UserId | Unique application user ID |
| EmployeeId | Associated employee |
| UserName | Application username |
| RoleId | Application role |
| Status | User status |
| CreatedDate | User creation date |
| IsDeleted | Soft-delete flag |

A user is associated with an employee using `EmployeeId` and with an application role using `RoleId`.

---

# Database Relationships

```text
Roles
   |
   | RoleId
   v
Users
   |
   | EmployeeId
   v
Employees
   |
   | DesignationId
   v
Designations
```

The Employees table also has a self-referencing relationship:

```text
Employees
    |
    | ReportingManagerId
    v
Employees
```

## Relationship Details

### Roles → Users

One role can be assigned to multiple users.

```text
Roles 1 -------- * Users
```

### Designations → Employees

One designation can be assigned to multiple employees.

```text
Designations 1 -------- * Employees
```

### Employees → Employees

One employee can be the reporting manager for multiple employees.

```text
Employees 1 -------- * Employees
```

This is implemented using `ReportingManagerId`.

---

# Organizational Hierarchy

The current hierarchy is:

```text
Level 1
CEO / Managing Director
        |
        v
Level 2
Director / VP
        |
        v
Level 3
General Manager
        |
        v
Level 4
Manager
        |
        +----------------+
        |                |
        v                v
Level 5              Level 6
Assistant Manager    Team Lead
                         |
                         v
                     Level 7
                 Senior Executive
                         |
                         v
                     Level 8
                     Executive
                         |
                         v
                     Level 9
              Associate / Junior Executive
```

The actual reporting relationship is stored in `ReportingManagerId`.

---

# Employee ID

`EmployeeId` is the primary key of the Employees table and uses SQL Server:

```sql
IDENTITY(1,1)
```

SQL Server automatically generates the Employee ID.

Identity values are not guaranteed to be gap-free, so a missing number does not necessarily indicate a database problem.

---

# Employee Code Generation

The Employee Code is generated using:

```text
FirstName + EmployeeId
```

and converted to uppercase.

Example:

```text
FirstName = Arjun
EmployeeId = 10

EmpCode = ARJUN10
```

The creation process is:

```text
Create Employee
      |
      v
INSERT Employee
      |
      v
SQL Server generates EmployeeId
      |
      v
SCOPE_IDENTITY()
      |
      v
Generate EmpCode
      |
      v
Update EmpCode
      |
      v
Return employee
```

---

# Stored Procedures

The application uses stored procedures for database operations.

```text
sp_GetEmployees
sp_GetEmployeeById
sp_CreateEmployee
sp_UpdateEmployee
sp_SoftDeleteEmployee
```

## sp_GetEmployees

Retrieves active employees, joins designation and reporting manager information, filters soft-deleted records, and supports search.

Active records are filtered using:

```sql
IsDeleted = 0
```

## sp_GetEmployeeById

Retrieves complete information for one employee using:

```text
@EmployeeId
```

It joins the employee with designation and reporting manager information and returns active employees.

## sp_CreateEmployee

Creates a new employee, obtains the SQL Server-generated Employee ID, generates the Employee Code, and returns the created employee.

## sp_UpdateEmployee

Updates an existing employee and validates employee existence, designation, reporting manager, and self-reporting.

## sp_SoftDeleteEmployee

Soft deletes an employee by setting:

```text
IsDeleted = 1
```

and records:

```text
DeletedDate
DeletedBy
UpdatedDate
UpdatedBy
```

---

# Soft Delete

Instead of physically deleting an employee:

```sql
DELETE FROM Employees
WHERE EmployeeId = @EmployeeId
```

the application performs a logical deletion:

```sql
UPDATE Employees
SET IsDeleted = 1
WHERE EmployeeId = @EmployeeId
```

The record remains in the database but is excluded from active employee queries.

## Benefits

- Prevents permanent data loss
- Maintains historical information
- Supports auditing
- Preserves relationships
- Allows future restoration
- Reduces accidental data loss

---

# Permission Management

The backend implements hierarchy-based permission checking.

## Role

Application-level permission:

```text
Admin
Manager
Employee
```

## Designation

Organizational position:

```text
CEO
Director / VP
Manager
Team Lead
Executive
```

Role and Designation are separate concepts.

---

# Permission Rules

```text
Admin
  |
  +---- Can modify employees

Manager
  |
  +---- Can modify employees below their hierarchy level

Employee
  |
  +---- Cannot modify employees
```

## Hierarchy Permission Example

Suppose the current user is at hierarchy level 4.

A target employee at level 8:

```text
8 > 4
```

is below the current user's hierarchy level and can be modified according to the current rule.

A target employee at level 3:

```text
3 > 4
```

does not satisfy the rule and cannot be modified.

---

# API Endpoints

Base route:

```text
/api/Employee
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/Employee` | Get active employees |
| GET | `/api/Employee/{id}` | Get employee by ID |
| POST | `/api/Employee` | Create employee |
| PUT | `/api/Employee/{id}` | Update employee |
| DELETE | `/api/Employee/{id}` | Soft delete employee |

## GET Employees

```http
GET /api/Employee
```

Search example:

```http
GET /api/Employee?search=Arjun
```

## GET Employee By ID

```http
GET /api/Employee/10
```

## Create Employee

```http
POST /api/Employee?creatingEmployeeId=20
```

## Update Employee

```http
PUT /api/Employee/10?updatingEmployeeId=4
```

Here:

```text
10 = employee being updated
4  = employee performing the update
```

## Delete Employee

```http
DELETE /api/Employee/10?deletingEmployeeId=4
```

Here:

```text
10 = employee being deleted
4  = employee performing the deletion
```

---

# API Request Flow

## Get Employees

```text
React
 |
 | GET /api/Employee
 v
EmployeeController
 |
 v
EmployeeService
 |
 v
EmployeeRepository
 |
 v
sp_GetEmployees
 |
 v
SQL Server
 |
 v
EmployeeRepository
 |
 v
EmployeeService
 |
 v
EmployeeController
 |
 v
React
```

## Create Employee

```text
React Create Form
        |
        | POST
        v
EmployeeController
        |
        v
EmployeeService
        |
        v
UserRepository
        |
        v
Current User
        |
        v
Permission Check
        |
        v
EmployeeRepository
        |
        v
sp_CreateEmployee
        |
        v
SQL Server
        |
        v
Created Employee
        |
        v
React
```

## Update Employee

```text
React Edit Form
       |
       | PUT
       v
EmployeeController
       |
       v
EmployeeService
       |
       +----> UserRepository
       |
       +----> EmployeeRepository
       |
       +----> PermissionService
       |
       v
EmployeeRepository
       |
       v
sp_UpdateEmployee
       |
       v
SQL Server
       |
       v
Updated Employee
       |
       v
React
```

## Delete Employee

```text
React
 |
 | DELETE
 v
EmployeeController
 |
 v
EmployeeService
 |
 +----> UserRepository
 |
 +----> EmployeeRepository
 |
 +----> PermissionService
 |
 v
EmployeeRepository
 |
 v
sp_SoftDeleteEmployee
 |
 v
SQL Server
 |
 | IsDeleted = 1
 v
React
 |
 v
Employee removed from active grid
```

---

# Exception Handling

The backend contains custom exception middleware:

```text
ExceptionMiddleware
```

The middleware provides centralized exception handling.

The application handles exceptions such as:

```text
UnauthorizedAccessException
ArgumentException
General Exception
```

Typical HTTP status codes include:

| Status Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Employee successfully created |
| 400 | Bad request |
| 403 | Permission denied |
| 404 | Employee not found |
| 500 | Unexpected server error |

Example:

```json
{
  "success": false,
  "statusCode": 403,
  "message": "You do not have permission to update this employee."
}
```

---

# CORS Configuration

During development, the frontend and backend run on different origins.

Frontend:

```text
http://localhost:5173
```

Backend:

```text
https://localhost:7019
```

CORS is configured in ASP.NET Core so the frontend development origin can communicate with the backend.

---

# Installation and Setup

## Prerequisites

Install:

- .NET SDK
- Visual Studio
- Node.js
- SQL Server
- SQL Server Management Studio (SSMS)
- Git
- Visual Studio Code

---

# Database Setup

1. Install Microsoft SQL Server.
2. Install SQL Server Management Studio.
3. Create the Employee Management database.
4. Create the tables:
   - Roles
   - Designations
   - Employees
   - Users
5. Create the required primary keys and foreign keys.
6. Insert the required roles.
7. Insert designations and hierarchy levels.
8. Insert initial employees and users.
9. Create the stored procedures.

Required stored procedures:

```text
sp_GetEmployees
sp_GetEmployeeById
sp_CreateEmployee
sp_UpdateEmployee
sp_SoftDeleteEmployee
```

---

# Backend Setup

Open the solution in Visual Studio:

```text
EmployeeManagement.slnx
```

Configure the SQL Server connection string for your local environment.

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_CONNECTION_STRING"
  }
}
```

Do not commit passwords, API keys, tokens, or other secrets to GitHub.

Run the ASP.NET Core API using the HTTPS profile.

---

# Frontend Setup

Open a terminal inside:

```text
employee-management-ui
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# Running the Application

## Start Backend

Run the ASP.NET Core project from Visual Studio using the HTTPS profile.

Backend:

```text
https://localhost:7019
```

## Start Frontend

```bash
cd employee-management-ui
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Swagger API Documentation

Swagger/OpenAPI is used for API documentation and testing.

After starting the backend, open:

```text
https://localhost:7019/swagger
```

Swagger allows the available API endpoints to be viewed and tested.

---

# Current Authentication Status

Authentication has **not yet been implemented**.

For the current development version, the employee ID performing create, update, and delete operations is supplied manually through the frontend:

```text
creatingEmployeeId
updatingEmployeeId
deletingEmployeeId
```

This approach is intended for development and permission testing.

It should **not** be considered secure production authentication.

---

# Planned Authentication Architecture

A future implementation can use JWT-based authentication:

```text
User Login
     |
     v
Authentication
     |
     v
JWT Token
     |
     v
Frontend
     |
     | Authorization: Bearer <token>
     v
ASP.NET Core API
     |
     v
JWT Middleware
     |
     v
User Claims
     |
     v
Authorization
     |
     v
Business Operation
```

The current user's identity should eventually come from authenticated claims rather than a user-controlled query parameter.

---

# Security Considerations

For production deployment, additional security features should be implemented:

- JWT authentication
- Proper authorization
- Password hashing


---

# Future Improvements

## Authentication

- Login functionality
- JWT authentication
- Refresh tokens
- Password hashing
- Logout

## Authorization

- Role-based authorization
- Claims-based authorization
- Frontend permission handling
- More granular hierarchy permissions

## Employee Management

- Restore deleted employees
- Employee history
- Employee profile picture
- Document management
- Employee transfer between departments

## Database

- Additional audit logging
- Database migrations
- Improved indexing
- Performance optimization
- Advanced reporting

## Frontend

- Improved UI/UX
- Responsive design
- Advanced filters
- Server-side pagination
- Sorting
- Dashboard
- Charts and analytics
- Toast notifications

## Backend

- Automated testing
- Unit tests
- Integration tests
- API versioning
- Structured logging
- Validation framework
- Global API response model

## Deployment

- Cloud SQL Server
- Cloud API hosting
- Frontend hosting
- CI/CD pipeline
- Environment-specific configuration
- Production monitoring

---

# Learning Objectives

This project demonstrates practical knowledge of:

## Frontend Development

- React
- Components
- Props
- State
- Hooks
- React Router
- Forms
- API communication
- Material UI
- MUI DataGrid

## Backend Development

- ASP.NET Core Web API
- Controllers
- Services
- Repositories
- Dependency Injection
- DTOs
- Middleware
- REST APIs
- HTTP status codes
- Exception handling
- CORS

## Database Development

- SQL Server
- Tables
- Primary Keys
- Foreign Keys
- Identity columns
- Unique constraints
- Stored Procedures
- Joins
- Self-referencing relationships
- Soft deletion
- Audit columns
- Hierarchical data

## Software Architecture

- Layered architecture
- Separation of concerns
- Business logic separation
- Database abstraction
- API-based communication

---

# Project Status

| Feature | Status |
|---|---|
| Employee Listing | Completed |
| Employee Search | Completed |
| Employee Details | Completed |
| Create Employee | Completed |
| Edit Employee | Completed |
| Soft Delete Employee | Completed |
| Hierarchy Management | Completed |
| Backend Permission Checking | Implemented |
| Exception Middleware | Implemented |
| Swagger | Implemented |
| CORS | Implemented |
| Authentication | Planned |
| Restore Deleted Employee | Planned |
| Role-Based Frontend Permissions | Planned |

---

# Development Notes

The current version is designed primarily for development and learning.

The application currently runs locally using:

```text
Frontend:
http://localhost:5173

Backend:
https://localhost:7019

Database:
Local SQL Server
```

