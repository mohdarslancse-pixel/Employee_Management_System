import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    MenuItem,
} from "@mui/material";

const API_URL = "https://localhost:7019/api/Employee";

function CreateEmployee() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        creatingEmployeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        dateOfJoining: "",
        designationId: "",
        department: "",
        reportingManagerId: "",
        employmentType: "",
        workLocation: "",
        status: "Active",
        salary: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        createdBy: "Admin",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            // Validate Creating Employee ID
            if (
                formData.creatingEmployeeId === "" ||
                Number(formData.creatingEmployeeId) <= 0
            ) {
                throw new Error(
                    "Please enter a valid Creating Employee ID."
                );
            }

            // Build query parameter
            const url =
                `${API_URL}?creatingEmployeeId=` +
                `${Number(formData.creatingEmployeeId)}`;

            // Create request body
            // creatingEmployeeId is NOT included because it is a query parameter
            const requestBody = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber:
                    formData.phoneNumber === ""
                        ? null
                        : formData.phoneNumber,

                dateOfBirth:
                    formData.dateOfBirth === ""
                        ? null
                        : formData.dateOfBirth,

                dateOfJoining: formData.dateOfJoining,

                designationId: Number(formData.designationId),

                department:
                    formData.department === ""
                        ? null
                        : formData.department,

                reportingManagerId:
                    formData.reportingManagerId === ""
                        ? null
                        : Number(formData.reportingManagerId),

                employmentType:
                    formData.employmentType === ""
                        ? null
                        : formData.employmentType,

                workLocation:
                    formData.workLocation === ""
                        ? null
                        : formData.workLocation,

                status: formData.status,

                salary:
                    formData.salary === ""
                        ? null
                        : Number(formData.salary),

                address:
                    formData.address === ""
                        ? null
                        : formData.address,

                city:
                    formData.city === ""
                        ? null
                        : formData.city,

                state:
                    formData.state === ""
                        ? null
                        : formData.state,

                country:
                    formData.country === ""
                        ? null
                        : formData.country,

                postalCode:
                    formData.postalCode === ""
                        ? null
                        : formData.postalCode,

                emergencyContactName:
                    formData.emergencyContactName === ""
                        ? null
                        : formData.emergencyContactName,

                emergencyContactNumber:
                    formData.emergencyContactNumber === ""
                        ? null
                        : formData.emergencyContactNumber,

                createdBy: formData.createdBy,
            };

            console.log("Creating Employee ID:", formData.creatingEmployeeId);
            console.log("Request Body:", requestBody);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            let responseData = null;

            try {
                responseData = await response.json();
            } catch {
                responseData = null;
            }

            if (!response.ok) {
                throw new Error(
                    responseData?.message ||
                        "Failed to create employee."
                );
            }

            console.log(
                "Created Employee:",
                responseData
            );

            // Creation successful
            navigate("/");
        } catch (error) {
            console.error("Create Employee Error:", error);

            setError(
                error.message ||
                    "Something went wrong while creating the employee."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{ marginBottom: 3 }}
            >
                ← Back to Employees
            </Button>

            <Typography
                variant="h4"
                sx={{ marginBottom: 3 }}
            >
                Create Employee
            </Typography>

            {error && (
                <Box
                    sx={{
                        backgroundColor: "#ffebee",
                        color: "#c62828",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: 1,
                    }}
                >
                    {error}
                </Box>
            )}

            <Paper sx={{ padding: 3 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    {/* ========================= */}
                    {/* PERSONAL INFORMATION */}
                    {/* ========================= */}

                    <Typography
                        variant="h6"
                        sx={{ marginBottom: 2 }}
                    >
                        Personal Information
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Creating Employee ID"
                            name="creatingEmployeeId"
                            type="number"
                            value={formData.creatingEmployeeId}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        <TextField
                            label="Date of Joining"
                            name="dateOfJoining"
                            type="date"
                            value={formData.dateOfJoining}
                            onChange={handleChange}
                            required
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Box>

                    {/* ========================= */}
                    {/* EMPLOYMENT INFORMATION */}
                    {/* ========================= */}

                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: 4,
                            marginBottom: 2,
                        }}
                    >
                        Employment Information
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: 2,
                        }}
                    >
                        <TextField
                            select
                            label="Designation"
                            name="designationId"
                            value={formData.designationId}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={1}>
                                CEO / Managing Director
                            </MenuItem>

                            <MenuItem value={2}>
                                Director / VP
                            </MenuItem>

                            <MenuItem value={3}>
                                General Manager
                            </MenuItem>

                            <MenuItem value={4}>
                                Manager
                            </MenuItem>

                            <MenuItem value={5}>
                                Assistant Manager
                            </MenuItem>

                            <MenuItem value={6}>
                                Team Lead
                            </MenuItem>

                            <MenuItem value={7}>
                                Senior Executive
                            </MenuItem>

                            <MenuItem value={8}>
                                Executive
                            </MenuItem>

                            <MenuItem value={9}>
                                Associate / Junior Executive
                            </MenuItem>
                        </TextField>

                        <TextField
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Reporting Manager ID"
                            name="reportingManagerId"
                            type="number"
                            value={formData.reportingManagerId}
                            onChange={handleChange}
                        />

                        <TextField
                            select
                            label="Employment Type"
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                        >
                            <MenuItem value="Full Time">
                                Full Time
                            </MenuItem>

                            <MenuItem value="Part Time">
                                Part Time
                            </MenuItem>

                            <MenuItem value="Contract">
                                Contract
                            </MenuItem>

                            <MenuItem value="Intern">
                                Intern
                            </MenuItem>
                        </TextField>

                        <TextField
                            label="Work Location"
                            name="workLocation"
                            value={formData.workLocation}
                            onChange={handleChange}
                        />

                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="Active">
                                Active
                            </MenuItem>

                            <MenuItem value="Inactive">
                                Inactive
                            </MenuItem>
                        </TextField>

                        <TextField
                            label="Salary"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </Box>

                    {/* ========================= */}
                    {/* ADDRESS INFORMATION */}
                    {/* ========================= */}

                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: 4,
                            marginBottom: 2,
                        }}
                    >
                        Address Information
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={2}
                            sx={{
                                gridColumn: {
                                    md: "1 / -1",
                                },
                            }}
                        />

                        <TextField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />

                        <TextField
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Postal Code"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                    </Box>

                    {/* ========================= */}
                    {/* EMERGENCY CONTACT */}
                    {/* ========================= */}

                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: 4,
                            marginBottom: 2,
                        }}
                    >
                        Emergency Contact
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Emergency Contact Name"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Emergency Contact Number"
                            name="emergencyContactNumber"
                            value={formData.emergencyContactNumber}
                            onChange={handleChange}
                        />
                    </Box>

                    {/* ========================= */}
                    {/* BUTTONS */}
                    {/* ========================= */}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                            marginTop: 4,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Employee"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default CreateEmployee;