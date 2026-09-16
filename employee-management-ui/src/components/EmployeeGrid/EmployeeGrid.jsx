import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Typography,
    Button,
} from "@mui/material";

const API_URL = "https://localhost:7019/api/Employee";

function EmployeeGrid() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const fetchEmployees = async (searchText = "") => {
        try {
            setLoading(true);
            setError("");

            const url = searchText
                ? `${API_URL}?search=${encodeURIComponent(searchText)}`
                : API_URL;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }

            const data = await response.json();

            setEmployees(
                data.map((employee) => ({
                    ...employee,
                    id: employee.employeeId,
                }))
            );
        } catch (error) {
            console.error(error);

            setError(
                "Unable to load employees. Please check whether the API is running."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;

        setSearch(value);
        fetchEmployees(value);
    };

    const handleDelete = async (employeeId) => {
    const deletingEmployeeId = prompt(
        "Enter your Employee ID to perform delete:"
    );

    if (!deletingEmployeeId) {
        return;
    }

    const confirmed = window.confirm(
        `Are you sure you want to delete Employee ID ${employeeId}?`
    );

    if (!confirmed) {
        return;
    }

    try {
        setLoading(true);
        setError("");

        const response = await fetch(
            `${API_URL}/${employeeId}?deletingEmployeeId=${deletingEmployeeId}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to delete employee."
            );
        }

        alert("Employee deleted successfully.");

        // Refresh the grid
        await fetchEmployees(search);

    } catch (error) {
        console.error(error);

        setError(
            error.message || "Unable to delete employee."
        );
    } finally {
        setLoading(false);
    }
};

    const columns = [
        {
            field: "serialNo",
            headerName: "S.No.",
            width: 80,
            sortable: false,
            filterable: false,

            renderCell: (params) => {
                const page =
                    params.api.paginationModel?.page ?? 0;

                const pageSize =
                    params.api.paginationModel?.pageSize ?? 10;

                return (
                    page * pageSize +
                    params.api.getRowIndexRelativeToVisibleRows(
                        params.id
                    ) +
                    1
                );
            },
        },

        {
            field: "employeeId",
            headerName: "Employee ID",
            width: 120,

            renderCell: (params) => (
                <Button
                    variant="text"
                    onClick={() =>
                        navigate(
                            `/employees/${params.row.employeeId}`
                        )
                    }
                >
                    {params.row.employeeId}
                </Button>
            ),
        },

        {
            field: "empCode",
            headerName: "Employee Code",
            width: 140,
        },

        {
            field: "firstName",
            headerName: "First Name",
            width: 130,
        },

        {
            field: "lastName",
            headerName: "Last Name",
            width: 130,
        },

        {
            field: "email",
            headerName: "Email",
            width: 220,
        },

        {
            field: "designationName",
            headerName: "Designation",
            width: 180,
        },

        {
            field: "department",
            headerName: "Department",
            width: 160,
        },

        {
            field: "reportingManager",
            headerName: "Reporting Manager",
            width: 180,
        },

        {
            field: "status",
            headerName: "Status",
            width: 120,
        },

        // ACTIONS
        {
            field: "actions",
            headerName: "Actions",
            width: 180,
            sortable: false,
            filterable: false,

            renderCell: (params) => (
                <>
                    {/* EDIT BUTTON */}
                    <button
                        onClick={() =>
                            navigate(
                                `/employees/edit/${params.row.employeeId}`
                            )
                        }
                        style={{
                            marginRight: "8px",
                            padding: "6px 14px",
                            background: "white",
                            border: "1px solid #1976d2",
                            color: "#1976d2",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        EDIT
                    </button>

                    {/* DELETE BUTTON */}
                   <button
    onClick={() =>
        handleDelete(params.row.employeeId)
    }
    style={{
        padding: "6px 12px",
        background: "white",
        border: "1px solid #d32f2f",
        color: "#d32f2f",
        borderRadius: "4px",
        cursor: "pointer",
    }}
>
    DELETE
</button>
                </>
            ),
        },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                padding: 3,
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 3,
                }}
            >
                <Typography variant="h4">
                    Employee Grid
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        navigate("/employees/create")
                    }
                >
                    + Create Employee
                </Button>
            </Box>

            {/* SEARCH */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    marginBottom: 2,
                    alignItems: "center",
                }}
            >
                <TextField
                    label="Search Employees"
                    placeholder="Search by name, email, code, designation..."
                    value={search}
                    onChange={handleSearch}
                    size="small"
                    sx={{ flex: 1 }}
                />

                <Button
                    variant="contained"
                    onClick={() =>
                        fetchEmployees(search)
                    }
                >
                    Search
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => {
                        setSearch("");
                        fetchEmployees("");
                    }}
                >
                    Clear
                </Button>
            </Box>

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

            {/* DATA GRID */}
            <Box
                sx={{
                    height: 600,
                    width: "100%",
                }}
            >
                <DataGrid
                    rows={employees}
                    columns={columns}
                    loading={loading}
                    pageSizeOptions={[5, 10, 25]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                                page: 0,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
}

export default EmployeeGrid;