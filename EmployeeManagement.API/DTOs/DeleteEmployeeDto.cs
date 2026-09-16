namespace EmployeeManagement.API.DTOs
{
    public class DeleteEmployeeDto
    {
        public int EmployeeId { get; set; }
        public string? EmpCode { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DeletedDate { get; set; }
        public string? DeletedBy { get; set; }
    }
}