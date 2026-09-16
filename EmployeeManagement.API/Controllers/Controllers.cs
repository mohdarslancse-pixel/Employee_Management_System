using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees(
            [FromQuery] string? search)
        {
            var employees =
                await _employeeService.GetEmployees(search);

            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee =
                await _employeeService.GetEmployeeById(id);

            if (employee == null)
            {
                return NotFound(new
                {
                    message = "Employee not found."
                });
            }

            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(
            [FromQuery] int creatingEmployeeId,
            [FromBody] CreateEmployeeDto employee)
        {
            var createdEmployee =
                await _employeeService.CreateEmployee(
                    employee,
                    creatingEmployeeId);

            return CreatedAtAction(
                nameof(GetEmployeeById),
                new { id = createdEmployee.EmployeeId },
                createdEmployee);
        }

        [HttpPut("{employeeIdToUpdate}")]
        public async Task<IActionResult> UpdateEmployee(
            int employeeIdToUpdate,
            [FromQuery] int updatingEmployeeId,
            [FromBody] UpdateEmployeeDto employee)
        {
            var result =
                await _employeeService.UpdateEmployee(
                    employeeIdToUpdate,
                    employee,
                    updatingEmployeeId);

            return Ok(result);
        }

        [HttpDelete("{employeeIdToDelete}")]
        public async Task<IActionResult> DeleteEmployee(
            int employeeIdToDelete,
            [FromQuery] int deletingEmployeeId)
        {
            var result =
                await _employeeService.SoftDeleteEmployee(
                    employeeIdToDelete,
                    deletingEmployeeId);

            if (result == null)
            {
                return NotFound(new
                {
                    message = "Employee not found or already deleted."
                });
            }

            return Ok(result);
        }
    }
}