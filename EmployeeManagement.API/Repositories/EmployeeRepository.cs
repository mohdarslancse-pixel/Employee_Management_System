using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EmployeeManagement.API.Repositories
{
    public class EmployeeRepository
    {
        private readonly IConfiguration _configuration;

        public EmployeeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<Employee>> GetEmployees(string? search = null)
        {
            var employees = new List<Employee>();

            var connectionString =
                _configuration.GetConnectionString("DefaultConnection");

            using SqlConnection connection = new SqlConnection(connectionString);

            using SqlCommand command = new SqlCommand(
                "sp_GetEmployees",
                connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue(
                "@Search",
                string.IsNullOrEmpty(search) ? DBNull.Value : search);

            await connection.OpenAsync();

            using SqlDataReader reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                employees.Add(new Employee
                {
                    EmployeeId = Convert.ToInt32(reader["EmployeeId"]),
                    EmpCode = reader["EmpCode"].ToString(),
                    FirstName = reader["FirstName"].ToString(),
                    LastName = reader["LastName"].ToString(),
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"]?.ToString(),

                    DateOfJoining =
                        Convert.ToDateTime(reader["DateOfJoining"]),

                    DesignationName =
                        reader["DesignationName"].ToString(),

                    HierarchyLevel =
                        Convert.ToInt32(reader["HierarchyLevel"]),

                    Department =
                        reader["Department"]?.ToString(),

                    EmploymentType =
                        reader["EmploymentType"]?.ToString(),

                    WorkLocation =
                        reader["WorkLocation"]?.ToString(),

                    Status =
                        reader["Status"]?.ToString(),

                    ReportingManagerId =
                        reader["ReportingManagerId"] == DBNull.Value
                            ? null
                            : Convert.ToInt32(reader["ReportingManagerId"]),

                    ReportingManager =
                        reader["ReportingManager"]?.ToString()
                });
            }

            return employees;
        }
        public async Task<Employee?> GetEmployeeById(int employeeId)
        {
            var connectionString =
                _configuration.GetConnectionString("DefaultConnection");

            using SqlConnection connection =
                new SqlConnection(connectionString);

            using SqlCommand command =
                new SqlCommand("sp_GetEmployeeById", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@EmployeeId", employeeId);

            await connection.OpenAsync();

            using SqlDataReader reader =
                await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new Employee
                {
                    EmployeeId = Convert.ToInt32(reader["EmployeeId"]),

                    EmpCode = reader["EmpCode"]?.ToString(),

                    FirstName = reader["FirstName"]?.ToString(),

                    LastName = reader["LastName"]?.ToString(),

                    Email = reader["Email"]?.ToString(),

                    PhoneNumber = reader["PhoneNumber"]?.ToString(),

                    DateOfBirth =
                        reader["DateOfBirth"] == DBNull.Value
                            ? null
                            : Convert.ToDateTime(reader["DateOfBirth"]),

                    DateOfJoining =
                        Convert.ToDateTime(reader["DateOfJoining"]),

                    DesignationId =
                        Convert.ToInt32(reader["DesignationId"]),

                    DesignationName =
                        reader["DesignationName"]?.ToString(),

                    HierarchyLevel =
                        Convert.ToInt32(reader["HierarchyLevel"]),

                    Department =
                        reader["Department"]?.ToString(),

                    ReportingManagerId =
                        reader["ReportingManagerId"] == DBNull.Value
                            ? null
                            : Convert.ToInt32(reader["ReportingManagerId"]),

                    ReportingManager =
                        reader["ReportingManager"]?.ToString(),

                    EmploymentType =
                        reader["EmploymentType"]?.ToString(),

                    WorkLocation =
                        reader["WorkLocation"]?.ToString(),

                    Status =
                        reader["Status"]?.ToString(),

                    Salary =
                        reader["Salary"] == DBNull.Value
                            ? null
                            : Convert.ToDecimal(reader["Salary"]),

                    Address =
                        reader["Address"]?.ToString(),

                    City =
                        reader["City"]?.ToString(),

                    State =
                        reader["State"]?.ToString(),

                    Country =
                        reader["Country"]?.ToString(),

                    PostalCode =
                        reader["PostalCode"]?.ToString(),

                    EmergencyContactName =
                        reader["EmergencyContactName"]?.ToString(),

                    EmergencyContactNumber =
                        reader["EmergencyContactNumber"]?.ToString()
                };
            }

            return null;
        }

        public async Task<Employee> CreateEmployee(
    CreateEmployeeDto employee)
        {
            var connectionString =
                _configuration.GetConnectionString("DefaultConnection");

            using SqlConnection connection =
                new SqlConnection(connectionString);

            using SqlCommand command =
                new SqlCommand("sp_CreateEmployee", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue(
                "@FirstName", employee.FirstName);

            command.Parameters.AddWithValue(
                "@LastName", employee.LastName);

            command.Parameters.AddWithValue(
                "@Email", employee.Email);

            command.Parameters.AddWithValue(
                "@PhoneNumber",
                (object?)employee.PhoneNumber ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@DateOfBirth",
                (object?)employee.DateOfBirth ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@DateOfJoining",
                employee.DateOfJoining);

            command.Parameters.AddWithValue(
                "@DesignationId",
                employee.DesignationId);

            command.Parameters.AddWithValue(
                "@Department",
                (object?)employee.Department ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@ReportingManagerId",
                (object?)employee.ReportingManagerId ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@EmploymentType",
                (object?)employee.EmploymentType ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@WorkLocation",
                (object?)employee.WorkLocation ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@Status",
                employee.Status);

            command.Parameters.AddWithValue(
                "@Salary",
                (object?)employee.Salary ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@Address",
                (object?)employee.Address ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@City",
                (object?)employee.City ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@State",
                (object?)employee.State ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@Country",
                (object?)employee.Country ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@PostalCode",
                (object?)employee.PostalCode ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@EmergencyContactName",
                (object?)employee.EmergencyContactName ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@EmergencyContactNumber",
                (object?)employee.EmergencyContactNumber ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@CreatedBy",
                (object?)employee.CreatedBy ?? "System");

            await connection.OpenAsync();

            using SqlDataReader reader =
                await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new Employee
                {
                    EmployeeId =
                        Convert.ToInt32(reader["EmployeeId"]),

                    EmpCode =
                        reader["EmpCode"]?.ToString(),

                    FirstName =
                        reader["FirstName"]?.ToString(),

                    LastName =
                        reader["LastName"]?.ToString(),

                    Email =
                        reader["Email"]?.ToString(),

                    PhoneNumber =
                        reader["PhoneNumber"]?.ToString(),

                    DateOfJoining =
                        Convert.ToDateTime(reader["DateOfJoining"]),

                    DesignationName =
                        reader["DesignationName"]?.ToString(),

                    HierarchyLevel =
                        Convert.ToInt32(reader["HierarchyLevel"]),

                    Department =
                        reader["Department"]?.ToString(),

                    ReportingManagerId =
                        reader["ReportingManagerId"] == DBNull.Value
                            ? null
                            : Convert.ToInt32(reader["ReportingManagerId"]),

                    ReportingManager =
                        reader["ReportingManager"]?.ToString(),

                    EmploymentType =
                        reader["EmploymentType"]?.ToString(),

                    WorkLocation =
                        reader["WorkLocation"]?.ToString(),

                    Status =
                        reader["Status"]?.ToString()
                };
            }

            throw new Exception("Employee was not created.");
        }


        public async Task<Employee> UpdateEmployee(int employeeId, UpdateEmployeeDto employee)
        {
            var connectionString =
                _configuration.GetConnectionString("DefaultConnection");

            using SqlConnection connection =
                new SqlConnection(connectionString);

            using SqlCommand command =
                new SqlCommand("sp_UpdateEmployee", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue(
                "@EmployeeId", employeeId);

            command.Parameters.AddWithValue(
                "@FirstName", employee.FirstName);

            command.Parameters.AddWithValue(
                "@LastName", employee.LastName);

            command.Parameters.AddWithValue(
                "@Email", employee.Email);

            command.Parameters.AddWithValue(
                "@PhoneNumber",
                (object?)employee.PhoneNumber ?? DBNull.Value);

            command.Parameters.AddWithValue(
     "@DateOfBirth",
     employee.DateOfBirth ?? (object)DBNull.Value);

            command.Parameters.AddWithValue(
                "@DateOfJoining",
                employee.DateOfJoining);

            command.Parameters.AddWithValue(
                "@DesignationId",
                employee.DesignationId);

            command.Parameters.AddWithValue(
                "@Department",
                (object?)employee.Department ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@ReportingManagerId",
                (object?)employee.ReportingManagerId ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@EmploymentType",
                (object?)employee.EmploymentType ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@WorkLocation",
                (object?)employee.WorkLocation ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@Status",
                employee.Status);

            command.Parameters.AddWithValue(
                "@Salary",
                (object?)employee.Salary ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@Address",
                (object?)employee.Address ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@City",
                (object?)employee.City ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@State",
                (object?)employee.State ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@Country",
                (object?)employee.Country ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@PostalCode",
                (object?)employee.PostalCode ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@EmergencyContactName",
                (object?)employee.EmergencyContactName ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@EmergencyContactNumber",
                (object?)employee.EmergencyContactNumber ?? DBNull.Value);

            command.Parameters.AddWithValue(
                "@UpdatedBy",
                (object?)employee.UpdatedBy ?? "System");

            await connection.OpenAsync();

            using SqlDataReader reader =
                await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new Employee
                {
                    EmployeeId =
                        Convert.ToInt32(reader["EmployeeId"]),

                    EmpCode =
                        reader["EmpCode"]?.ToString(),

                    FirstName =
                        reader["FirstName"]?.ToString(),

                    LastName =
                        reader["LastName"]?.ToString(),

                    Email =
                        reader["Email"]?.ToString(),

                    PhoneNumber =
                        reader["PhoneNumber"]?.ToString(),

                    DateOfJoining =
                        Convert.ToDateTime(reader["DateOfJoining"]),

                    DesignationName =
                        reader["DesignationName"]?.ToString(),

                    HierarchyLevel =
                        Convert.ToInt32(reader["HierarchyLevel"]),

                    Department =
                        reader["Department"]?.ToString(),

                    ReportingManagerId =
                        reader["ReportingManagerId"] == DBNull.Value
                            ? null
                            : Convert.ToInt32(reader["ReportingManagerId"]),

                    ReportingManager =
                        reader["ReportingManager"]?.ToString(),

                    EmploymentType =
                        reader["EmploymentType"]?.ToString(),

                    WorkLocation =
                        reader["WorkLocation"]?.ToString(),

                    Status =
                        reader["Status"]?.ToString()
                };
            }

            throw new Exception("Employee was not updated.");
        }

        public async Task<DeleteEmployeeDto?> SoftDeleteEmployee(
      int employeeId,
      string deletedBy)
        {
            var connectionString =
                _configuration.GetConnectionString("DefaultConnection");

            using SqlConnection connection =
                new SqlConnection(connectionString);

            using SqlCommand command = new SqlCommand(
                "sp_SoftDeleteEmployee",
                connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue(
                "@EmployeeId",
                employeeId);

            command.Parameters.AddWithValue(
                "@DeletedBy",
                deletedBy);

            await connection.OpenAsync();

            using SqlDataReader reader =
                await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new DeleteEmployeeDto
                {
                    EmployeeId =
                        reader.GetInt32(reader.GetOrdinal("EmployeeId")),

                    EmpCode =
                        reader["EmpCode"]?.ToString(),

                    FirstName =
                        reader["FirstName"]?.ToString(),

                    LastName =
                        reader["LastName"]?.ToString(),

                    IsDeleted =
                        reader.GetBoolean(reader.GetOrdinal("IsDeleted")),

                    DeletedDate =
                        reader.GetDateTime(reader.GetOrdinal("DeletedDate")),

                    DeletedBy =
                        reader["DeletedBy"]?.ToString()
                };
            }

            return null;
        }


        public async Task<int?> GetDesignationHierarchyLevel(
    int designationId)
        {
            var connectionString =
                _configuration.GetConnectionString("DefaultConnection");

            using SqlConnection connection =
                new SqlConnection(connectionString);

            string query = @"
        SELECT HierarchyLevel
        FROM Designations
        WHERE DesignationId = @DesignationId";

            using SqlCommand command =
                new SqlCommand(query, connection);

            command.Parameters.AddWithValue(
                "@DesignationId",
                designationId);

            await connection.OpenAsync();

            var result = await command.ExecuteScalarAsync();

            if (result == null)
                return null;

            return Convert.ToInt32(result);
        }
    }
}