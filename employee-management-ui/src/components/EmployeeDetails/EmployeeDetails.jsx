import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    Divider,
    Grid,
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

    const formatDate = (date) => {
        if (!date) return "Not provided";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const displayValue = (value) => {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "Not provided";
        }

        return value;
    };

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
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
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fa",
                padding: { xs: 2, md: 4 },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 3,
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: "#1f2937",
                        }}
                    >
                        Employee Details
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#6b7280",
                            marginTop: 0.5,
                        }}
                    >
                        Complete employee information
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    onClick={() => navigate("/")}
                >
                    ← Back to Employees
                </Button>
            </Box>

            {/* Personal Information */}
            <InfoSection title="Personal Information">
                <InfoItem
                    label="Employee ID"
                    value={employee.employeeId}
                />

                <InfoItem
                    label="Employee Code"
                    value={employee.empCode}
                />

                <InfoItem
                    label="First Name"
                    value={employee.firstName}
                />

                <InfoItem
                    label="Last Name"
                    value={employee.lastName}
                />

                <InfoItem
                    label="Email"
                    value={employee.email}
                />

                <InfoItem
                    label="Phone Number"
                    value={employee.phoneNumber}
                />

                <InfoItem
                    label="Date of Birth"
                    value={formatDate(employee.dateOfBirth)}
                />
            </InfoSection>

            {/* Professional Information */}
            <InfoSection title="Professional Information">
                <InfoItem
                    label="Designation"
                    value={employee.designationName}
                />

                <InfoItem
                    label="Hierarchy Level"
                    value={employee.hierarchyLevel}
                />

                <InfoItem
                    label="Department"
                    value={employee.department}
                />

                <InfoItem
                    label="Reporting Manager"
                    value={employee.reportingManager}
                />

                <InfoItem
                    label="Reporting Manager ID"
                    value={employee.reportingManagerId}
                />

                <InfoItem
                    label="Date of Joining"
                    value={formatDate(employee.dateOfJoining)}
                />

                <InfoItem
                    label="Employment Type"
                    value={employee.employmentType}
                />

                <InfoItem
                    label="Work Location"
                    value={employee.workLocation}
                />

                <InfoItem
                    label="Status"
                    value={employee.status}
                />
            </InfoSection>

            {/* Compensation */}
            <InfoSection title="Compensation">
                <InfoItem
                    label="Salary"
                    value={
                        employee.salary !== null &&
                        employee.salary !== undefined
                            ? `₹${employee.salary}`
                            : "Not provided"
                    }
                />
            </InfoSection>

            {/* Address */}
            <InfoSection title="Address Information">
                <InfoItem
                    label="Address"
                    value={employee.address}
                />

                <InfoItem
                    label="City"
                    value={employee.city}
                />

                <InfoItem
                    label="State"
                    value={employee.state}
                />

                <InfoItem
                    label="Country"
                    value={employee.country}
                />

                <InfoItem
                    label="Postal Code"
                    value={employee.postalCode}
                />
            </InfoSection>

            {/* Emergency Contact */}
            <InfoSection title="Emergency Contact">
                <InfoItem
                    label="Contact Name"
                    value={employee.emergencyContactName}
                />

                <InfoItem
                    label="Contact Number"
                    value={employee.emergencyContactNumber}
                />
            </InfoSection>

            {/* Record Information */}
            <InfoSection title="Record Information">
                <InfoItem
                    label="Created Date"
                    value={formatDate(employee.createdDate)}
                />

                <InfoItem
                    label="Created By"
                    value={employee.createdBy}
                />

                <InfoItem
                    label="Updated Date"
                    value={formatDate(employee.updatedDate)}
                />

                <InfoItem
                    label="Updated By"
                    value={employee.updatedBy}
                />
            </InfoSection>
        </Box>
    );
}

/* ------------------------------------------------ */
/* Reusable Section Component                       */
/* ------------------------------------------------ */

function InfoSection({ title, children }) {
    return (
        <Paper
            elevation={0}
            sx={{
                padding: 3,
                marginBottom: 3,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: 2,
                }}
            >
                {title}
            </Typography>

            <Divider sx={{ marginBottom: 3 }} />

            <Grid container spacing={3}>
                {children}
            </Grid>
        </Paper>
    );
}

/* ------------------------------------------------ */
/* Reusable Information Item                       */
/* ------------------------------------------------ */

function InfoItem({ label, value }) {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Box>
                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        color: "#6b7280",
                        fontWeight: 600,
                        marginBottom: 0.5,
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#111827",
                        fontWeight: 500,
                        wordBreak: "break-word",
                    }}
                >
                    {displayValue(value)}
                </Typography>
            </Box>
        </Grid>
    );
}

function displayValue(value) {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "Not provided";
    }

    return value;
}

export default EmployeeDetails;