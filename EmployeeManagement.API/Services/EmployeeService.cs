using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Models;
using EmployeeManagement.API.Repositories;

namespace EmployeeManagement.API.Services
{
    public class EmployeeService
    {
        private readonly EmployeeRepository _employeeRepository;
        private readonly UserRepository _userRepository;
        private readonly PermissionService _permissionService;

        public EmployeeService(
            EmployeeRepository employeeRepository,
            UserRepository userRepository,
            PermissionService permissionService)
        {
            _employeeRepository = employeeRepository;
            _userRepository = userRepository;
            _permissionService = permissionService;
        }

        public async Task<List<Employee>> GetEmployees(string? search = null)
        {
            return await _employeeRepository.GetEmployees(search);
        }

        public async Task<Employee?> GetEmployeeById(int employeeId)
        {
            return await _employeeRepository.GetEmployeeById(employeeId);
        }

        public async Task<Employee> CreateEmployee(CreateEmployeeDto employee)
        {
            return await _employeeRepository.CreateEmployee(employee);
        }

        public async Task<Employee> CreateEmployee(
    CreateEmployeeDto employee,
    int creatingEmployeeId)
        {
            var currentUser =
                await _userRepository.GetCurrentUser(creatingEmployeeId);

            if (currentUser == null)
                throw new Exception("Current user not found.");
             employee.CreatedBy = currentUser.UserName;
            var targetHierarchyLevel =
                await _employeeRepository.GetDesignationHierarchyLevel(
                    employee.DesignationId);

            if (targetHierarchyLevel == null)
                throw new ArgumentException(
                    "Invalid designation.");

            bool canCreate =
                _permissionService.CanCreateEmployee(
                    currentUser.Role,
                    currentUser.HierarchyLevel,
                    targetHierarchyLevel.Value);

            if (!canCreate)
                throw new UnauthorizedAccessException(
                    "You do not have permission to create an employee at this hierarchy level.");

            return await _employeeRepository.CreateEmployee(employee);
        }
        public async Task<DeleteEmployeeDto?> SoftDeleteEmployee(
    int employeeId,
    int deletingEmployeeId)
        {
            // Get the person performing the delete
            var currentUser =
                await _userRepository.GetCurrentUser(deletingEmployeeId);

            if (currentUser == null)
                throw new Exception("Current user not found.");

            // Get the employee we want to delete
            var targetEmployee =
                await _employeeRepository.GetEmployeeById(employeeId);

            if (targetEmployee == null)
                throw new KeyNotFoundException("Employee not found.");

            // Check permission
            bool canModify =
                _permissionService.CanModifyEmployee(
                    currentUser.Role,
                    currentUser.HierarchyLevel,
                    targetEmployee.HierarchyLevel);

            if (!canModify)
                throw new UnauthorizedAccessException(
                    "You do not have permission to delete this employee.");

            // Permission granted → soft delete
            return await _employeeRepository.SoftDeleteEmployee(
                employeeId,
                currentUser.UserName);
        }

        public async Task<Employee> UpdateEmployee(
    int employeeId,
    UpdateEmployeeDto employee,
    int currentEmployeeId)
        {
            var currentUser =
                await _userRepository.GetCurrentUser(currentEmployeeId);

            if (currentUser == null)
                throw new Exception("Current user not found.");

            var targetEmployee =
                await _employeeRepository.GetEmployeeById(employeeId);

            if (targetEmployee == null)
                throw new Exception("Employee not found.");

            bool canModify =
                _permissionService.CanModifyEmployee(
                    currentUser.Role,
                    currentUser.HierarchyLevel,
                    targetEmployee.HierarchyLevel);

            if (!canModify)
                throw new UnauthorizedAccessException(
                    "You do not have permission to update this employee.");

            return await _employeeRepository.UpdateEmployee(
                employeeId,
                employee);
        }
    }
}