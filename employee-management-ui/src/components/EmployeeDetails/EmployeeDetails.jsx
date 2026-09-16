import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
} from "@mui/material";

const API_URL = "https://localhost:7019/api/Employee";

function EmployeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/${id}`);

                if (!response.ok) {
                    throw new Error("Employee not found");
                }

                const data = await response.json();

                setEmployee(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load employee details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ padding: 4, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography color="error">
                    {error}
                </Typography>

                <Button
                    sx={{ marginTop: 2 }}
                    variant="contained"
                    onClick={() => navigate("/")}
                >
                    Back to Employees
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{ marginBottom: 3 }}
            >
                ← Back to Employees
            </Button>

            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Employee Details
            </Typography>

            <Paper sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Personal Information
                </Typography>

                <Typography>
                    <strong>Employee ID:</strong> {employee.employeeId}
                </Typography>

                <Typography>
                    <strong>Employee Code:</strong> {employee.empCode}
                </Typography>

                <Typography>
                    <strong>First Name:</strong> {employee.firstName}
                </Typography>

                <Typography>
                    <strong>Last Name:</strong> {employee.lastName}
                </Typography>

                <Typography>
                    <strong>Email:</strong> {employee.email}
                </Typography>

                <Typography>
                    <strong>Phone:</strong> {employee.phoneNumber}
                </Typography>

                <Typography sx={{ marginTop: 3 }}>
                    <strong>Designation:</strong>{" "}
                    {employee.designationName}
                </Typography>

                <Typography>
                    <strong>Department:</strong>{" "}
                    {employee.department}
                </Typography>

                <Typography>
                    <strong>Reporting Manager:</strong>{" "}
                    {employee.reportingManager}
                </Typography>

                <Typography>
                    <strong>Status:</strong> {employee.status}
                </Typography>
            </Paper>
        </Box>
    );
}

export default EmployeeDetails;