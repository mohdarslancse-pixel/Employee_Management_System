using EmployeeManagement.API.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EmployeeManagement.API.Repositories
{
    public class UserRepository
    {
        private readonly IConfiguration _configuration;

        public UserRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<CurrentUser?> GetCurrentUser(int employeeId)
        {
            var connectionString =
                _configuration.GetConnectionString("DefaultConnection");

            using SqlConnection connection =
                new SqlConnection(connectionString);

            string query = @"
               SELECT
                u.EmployeeId,
                u.UserName,
                r.RoleName AS Role,
                d.HierarchyLevel
                FROM Users u
                INNER JOIN Roles r
                    ON u.RoleId = r.RoleId
                INNER JOIN Employees e
                    ON u.EmployeeId = e.EmployeeId
                INNER JOIN Designations d
                    ON e.DesignationId = d.DesignationId
                WHERE u.EmployeeId = @EmployeeId
                  AND u.IsDeleted = 0
                  AND e.IsDeleted = 0
                  AND u.Status = 'Active'";

            using SqlCommand command =
                new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@EmployeeId", employeeId);

            await connection.OpenAsync();
            Console.WriteLine("=================================");
            Console.WriteLine($"Employee ID received: {employeeId}");
            Console.WriteLine($"Database: {connection.Database}");
            Console.WriteLine($"Server: {connection.DataSource}");
            Console.WriteLine("=================================");

            using SqlDataReader reader =
                await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new CurrentUser
                {
                    EmployeeId = Convert.ToInt32(reader["EmployeeId"]),
                    UserName = reader["UserName"]?.ToString() ?? "",
                    Role = reader["Role"]?.ToString() ?? "",
                    HierarchyLevel = Convert.ToInt32(reader["HierarchyLevel"])
                };
            }

            return null;
        }
    }
}