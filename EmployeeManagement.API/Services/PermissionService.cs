using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Services
{
    public class PermissionService
    {
        public bool CanModifyEmployee(
            string role,
            int currentEmployeeLevel,
            int targetEmployeeLevel)
        {
            // Admin can modify anyone
            if (role == "Admin")
            {
                return true;
            }

            // Manager can modify only lower-level employees
            if (role == "Manager")
            {
                return targetEmployeeLevel > currentEmployeeLevel;
            }

            // Employee is view-only
            return false;
        }


        public bool CanCreateEmployee(
    string role,
    int currentEmployeeLevel,
    int targetEmployeeLevel)
        {
            if (role == "Admin")
                return true;

            if (role == "Manager")
                return targetEmployeeLevel > currentEmployeeLevel;

            return false;
        }
    }
}