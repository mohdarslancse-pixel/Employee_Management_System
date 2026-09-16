namespace EmployeeManagement.API.DTOs
{
    public class UpdateEmployeeDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime DateOfJoining { get; set; }

        public int DesignationId { get; set; }

        public string? Department { get; set; }

        public int? ReportingManagerId { get; set; }

        public string? EmploymentType { get; set; }

        public string? WorkLocation { get; set; }

        public string Status { get; set; } = "Active";

        public decimal? Salary { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Country { get; set; }

        public string? PostalCode { get; set; }

        public string? EmergencyContactName { get; set; }

        public string? EmergencyContactNumber { get; set; }

        public string? UpdatedBy { get; set; }
    }
}