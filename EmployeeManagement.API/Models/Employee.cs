namespace EmployeeManagement.API.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string EmpCode { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public DateTime DateOfJoining { get; set; }

        public int DesignationId { get; set; }
        public string DesignationName { get; set; }
        public int HierarchyLevel { get; set; }

        public string Department { get; set; }

        public int? ReportingManagerId { get; set; }
        public string ReportingManager { get; set; }

        public string EmploymentType { get; set; }
        public string WorkLocation { get; set; }
        public string Status { get; set; }

        public decimal? Salary { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }

        public string EmergencyContactName { get; set; }
        public string EmergencyContactNumber { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime CreatedDate { get; set; }

        public string CreatedBy { get; set; } = string.Empty;

        public DateTime? UpdatedDate { get; set; }

        public string? UpdatedBy { get; set; }

        public DateTime? DeletedDate { get; set; }

        public string? DeletedBy { get; set; }
    }
}