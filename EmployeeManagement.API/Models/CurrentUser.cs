namespace EmployeeManagement.API.Models
{
    public class CurrentUser
    {
        public int EmployeeId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        public int HierarchyLevel { get; set; }
    }
}