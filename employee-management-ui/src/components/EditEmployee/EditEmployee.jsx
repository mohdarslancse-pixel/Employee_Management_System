import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    MenuItem,
} from "@mui/material";

const API_URL = "https://localhost:7019/api/Employee";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);

    const [updatingEmployeeId, setUpdatingEmployeeId] =
        useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // =========================
    // GET EMPLOYEE
    // =========================

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/${id}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load employee."
                    );
                }

                const data = await response.json();

                console.log(
                    "Employee loaded:",
                    data
                );

                setFormData({
                    ...data,

                    dateOfBirth:
                        data.dateOfBirth
                            ? data.dateOfBirth.substring(0, 10)
                            : "",

                    dateOfJoining:
                        data.dateOfJoining
                            ? data.dateOfJoining.substring(0, 10)
                            : "",
                });
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    // =========================
    // HANDLE INPUT CHANGE
    // =========================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    // =========================
    // UPDATE EMPLOYEE
    // =========================

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (!updatingEmployeeId) {
                setError(
                    "Please enter the Employee ID of the person making the update."
                );

                setSaving(false);
                return;
            }

            const url =
                `${API_URL}/${id}` +
                `?updatingEmployeeId=${updatingEmployeeId}`;

            console.log(
                "Updating Employee ID:",
                updatingEmployeeId
            );

            console.log(
                "Target Employee ID:",
                id
            );

            console.log(
                "Request Body:",
                formData
            );

            const response = await fetch(url, {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber:
                        formData.phoneNumber,

                    dateOfBirth:
                        formData.dateOfBirth || null,

                    dateOfJoining:
                        formData.dateOfJoining,

                    designationId:
                        Number(formData.designationId),

                    department:
                        formData.department,

                    reportingManagerId:
                        formData.reportingManagerId ===
                        "" ||
                        formData.reportingManagerId ===
                        null
                            ? null
                            : Number(
                                  formData.reportingManagerId
                              ),

                    employmentType:
                        formData.employmentType,

                    workLocation:
                        formData.workLocation,

                    status:
                        formData.status,

                    salary:
                        formData.salary === "" ||
                        formData.salary === null
                            ? null
                            : Number(
                                  formData.salary
                              ),

                    address:
                        formData.address,

                    city:
                        formData.city,

                    state:
                        formData.state,

                    country:
                        formData.country,

                    postalCode:
                        formData.postalCode,

                    emergencyContactName:
                        formData.emergencyContactName,

                    emergencyContactNumber:
                        formData.emergencyContactNumber,
                }),
            });

            const result = await response.json();

            console.log(
                "Update response:",
                result
            );

            if (!response.ok) {
                throw new Error(
                    result.message ||
                        "Failed to update employee."
                );
            }

            setSuccess(
                "Employee updated successfully."
            );

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error(
                "Update Employee Error:",
                error
            );

            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography>
                    Loading employee...
                </Typography>
            </Box>
        );
    }

    // =========================
    // ERROR WHILE LOADING
    // =========================

    if (!formData) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography color="error">
                    {error ||
                        "Employee not found."}
                </Typography>

                <Button
                    variant="outlined"
                    onClick={() => navigate("/")}
                    sx={{ marginTop: 2 }}
                >
                    Back to Employees
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            {/* BACK BUTTON */}

            <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{ marginBottom: 3 }}
            >
                ← Back to Employees
            </Button>

            {/* TITLE */}

            <Typography
                variant="h4"
                sx={{ marginBottom: 3 }}
            >
                Edit Employee
            </Typography>

            {/* ERROR */}

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

            {/* SUCCESS */}

            {success && (
                <Box
                    sx={{
                        backgroundColor: "#e8f5e9",
                        color: "#2e7d32",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: 1,
                    }}
                >
                    {success}
                </Box>
            )}

            <Paper sx={{ padding: 3 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    {/* =========================
                        EDITING USER
                    ========================= */}

                    <Typography
                        variant="h6"
                        sx={{
                            marginBottom: 2,
                        }}
                    >
                        Editing Information
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: 2,
                            marginBottom: 4,
                        }}
                    >
                        <TextField
                            label="Employee Being Edited"
                            value={formData.employeeId}
                            disabled
                        />

                        <TextField
                            label="Updating Employee ID"
                            type="number"
                            value={updatingEmployeeId}
                            onChange={(event) =>
                                setUpdatingEmployeeId(
                                    event.target.value
                                )
                            }
                            required
                            helperText="Enter the Employee ID of the person making the change."
                        />
                    </Box>

                    {/* =========================
                        PERSONAL INFORMATION
                    ========================= */}

                    <Typography
                        variant="h6"
                        sx={{
                            marginBottom: 2,
                        }}
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
                            label="Employee ID"
                            value={
                                formData.employeeId
                            }
                            disabled
                        />

                        <TextField
                            label="Employee Code"
                            value={
                                formData.empCode || ""
                            }
                            disabled
                        />

                        <TextField
                            label="First Name"
                            name="firstName"
                            value={
                                formData.firstName ||
                                ""
                            }
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={
                                formData.lastName ||
                                ""
                            }
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={
                                formData.email || ""
                            }
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={
                                formData.phoneNumber ||
                                ""
                            }
                            onChange={handleChange}
                        />

                        <TextField
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={
                                formData.dateOfBirth ||
                                ""
                            }
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label="Date of Joining"
                            name="dateOfJoining"
                            type="date"
                            value={
                                formData.dateOfJoining ||
                                ""
                            }
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Box>

                    {/* =========================
                        EMPLOYMENT INFORMATION
                    ========================= */}

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
                            value={
                                formData.designationId ||
                                ""
                            }
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
                            value={
                                formData.department ||
                                ""
                            }
                            onChange={handleChange}
                        />

                        <TextField
                            label="Reporting Manager ID"
                            name="reportingManagerId"
                            type="number"
                            value={
                                formData.reportingManagerId ??
                                ""
                            }
                            onChange={handleChange}
                        />

                        <TextField
                            select
                            label="Employment Type"
                            name="employmentType"
                            value={
                                formData.employmentType ||
                                ""
                            }
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
                            value={
                                formData.workLocation ||
                                ""
                            }
                            onChange={handleChange}
                        />

                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={
                                formData.status ||
                                ""
                            }
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
                            value={
                                formData.salary ?? ""
                            }
                            onChange={handleChange}
                        />
                    </Box>

                    {/* =========================
                        ADDRESS
                    ========================= */}

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
                            value={
                                formData.address ||
                                ""
                            }
                            onChange={handleChange}
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
                            value={
                                formData.city || ""
                            }
                            onChange={handleChange}
                        />

                        <TextField
                            label="State"
                            name="state"
                            value={
                                formData.state || ""
                            }
                            onChange={handleChange}
                        />

                        <TextField
                            label="Country"
                            name="country"
                            value={
                                formData.country || ""
                            }
                            onChange={handleChange}
                        />

                        <TextField
                            label="Postal Code"
                            name="postalCode"
                            value={
                                formData.postalCode ||
                                ""
                            }
                            onChange={handleChange}
                        />
                    </Box>

                    {/* =========================
                        EMERGENCY CONTACT
                    ========================= */}

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
                            value={
                                formData.emergencyContactName ||
                                ""
                            }
                            onChange={handleChange}
                        />

                        <TextField
                            label="Emergency Contact Number"
                            name="emergencyContactNumber"
                            value={
                                formData.emergencyContactNumber ||
                                ""
                            }
                            onChange={handleChange}
                        />
                    </Box>

                    {/* =========================
                        BUTTONS
                    ========================= */}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "flex-end",
                            gap: 2,
                            marginTop: 4,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate("/")
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Employee"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default EditEmployee;