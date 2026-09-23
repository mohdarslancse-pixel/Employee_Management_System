import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../services/employeeService";

import {
    Box,
    TextField,
    Typography,
    Button,
    IconButton,
    Tooltip,
} from "@mui/material";

import {
    Edit,
    Delete,
    Visibility,
    Add,
    Search,
} from "@mui/icons-material";

const API_URL = "https://localhost:7019/api/Employee";

function EmployeeGrid() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    /* ================================
       FETCH EMPLOYEES
    ================================= */

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

            console.log("Employees received:", data);

            setEmployees(
                data.map((employee) => ({
                    ...employee,

                    // MUI DataGrid requires a unique id
                    id: employee.employeeId,
                }))
            );
        } catch (error) {
            console.error("Error fetching employees:", error);

            setError(
                "Unable to load employees. Please check whether the API is running."
            );
        } finally {
            setLoading(false);
        }
    };

    /* ================================
       INITIAL LOAD
    ================================= */

    useEffect(() => {
        fetchEmployees();
    }, []);

    /* ================================
       SEARCH
    ================================= */

    const handleSearch = (event) => {
        const value = event.target.value;

        setSearch(value);

        fetchEmployees(value);
    };

    const handleClear = () => {
        setSearch("");
        fetchEmployees("");
    };

    /* ================================
       VIEW EMPLOYEE
    ================================= */

    const handleView = (employeeId) => {
        if (!employeeId) {
            console.error(
                "Employee ID is missing while opening details."
            );
            return;
        }

        console.log(
            "Opening employee details for ID:",
            employeeId
        );

        navigate(`/employees/${employeeId}`);
    };

    /* ================================
       EDIT EMPLOYEE
    ================================= */

    const handleEdit = (employeeId) => {
        if (!employeeId) {
            console.error(
                "Employee ID is missing while editing."
            );
            return;
        }

        navigate(`/employees/edit/${employeeId}`);
    };

    /* ================================
       DELETE EMPLOYEE
    ================================= */

    // const handleDelete = (employeeId) => {
    //     if (!employeeId) {
    //         console.error(
    //             "Employee ID is missing while deleting."
    //         );
    //         return;
    //     }

    //     // Delete functionality is already working.
    //     // Keeping the existing button here.
    //     console.log(
    //         "Delete clicked for employee:",
    //         employeeId
    //     );
    // };
    const handleDelete = async (employeeId) => {
    try {
        const deletingEmployeeId = 1; // temporary testing ID

        await deleteEmployee(employeeId, deletingEmployeeId);

        alert("Employee deleted successfully");

        fetchEmployees();
    } catch (error) {
        console.error("Delete error:", error);
        setError(error.message);
    }
};
    /* ================================
       COLUMNS
    ================================= */

    const columns = [
        {
            field: "serialNo",
            headerName: "S.No.",
            width: 75,
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

        /* ================================
           EMPLOYEE ID
        ================================= */

        {
            field: "employeeId",
            headerName: "Employee ID",
            width: 120,

            renderCell: (params) => {
                // IMPORTANT:
                // Get the actual database EmployeeId
                const employeeId =
                    params.row.employeeId ?? params.row.id;

                return (
                    <Button
                        variant="text"
                        onClick={() =>
                            handleView(employeeId)
                        }
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            minWidth: "auto",
                            padding: "4px 8px",
                        }}
                    >
                        {employeeId}
                    </Button>
                );
            },
        },

        /* ================================
           EMPLOYEE CODE
        ================================= */

        {
            field: "empCode",
            headerName: "Employee Code",
            width: 145,
        },

        /* ================================
           FIRST NAME
        ================================= */

        {
            field: "firstName",
            headerName: "First Name",
            width: 130,
        },

        /* ================================
           LAST NAME
        ================================= */

        {
            field: "lastName",
            headerName: "Last Name",
            width: 130,
        },

        /* ================================
           EMAIL
        ================================= */

        {
            field: "email",
            headerName: "Email",
            width: 230,
        },

        /* ================================
           DESIGNATION
        ================================= */

        {
            field: "designationName",
            headerName: "Designation",
            width: 190,
        },

        /* ================================
           DEPARTMENT
        ================================= */

        {
            field: "department",
            headerName: "Department",
            width: 160,
        },

        /* ================================
           REPORTING MANAGER
        ================================= */

        {
            field: "reportingManager",
            headerName: "Reporting Manager",
            width: 180,
        },

        /* ================================
           STATUS
        ================================= */

        {
            field: "status",
            headerName: "Status",
            width: 110,

            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            padding: "4px 10px",
                            borderRadius: "20px",

                            backgroundColor:
                                params.value === "Active"
                                    ? "#dce5fc"
                                    : "#fee2e2",

                            color:
                                params.value === "Active"
                                    ? "#15803d"
                                    : "#b91c1c",

                            fontSize: "12px",
                            fontWeight: 700,
                        }}
                    >
                        {params.value || "Unknown"}
                    </Box>
                </Box>
            ),
        },

        /* ================================
           ACTIONS
        ================================= */

        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            filterable: false,

            renderCell: (params) => {
                const employeeId =
                    params.row.employeeId ?? params.row.id;

                return (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            gap: 0.5,
                        }}
                    >
                        <Tooltip title="View">
                            <IconButton
                                size="small"
                                onClick={() =>
                                    handleView(employeeId)
                                }
                                sx={{
                                    color: "#2563eb",
                                }}
                            >
                                <Visibility fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                onClick={() =>
                                    handleEdit(employeeId)
                                }
                                sx={{
                                    color: "#2563eb",
                                }}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                onClick={() =>
                                    handleDelete(employeeId)
                                }
                                sx={{
                                    color: "#dc2626",
                                }}
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

    /* ================================
       UI
    ================================= */

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f8fc",
                padding: {
                    xs: 2,
                    md: 4,
                },
            }}
        >
            <Box
                sx={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >
                {/* ================================
                    HEADER
                ================================= */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },
                        gap: 2,
                        marginBottom: 3,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "28px",
                                    md: "34px",
                                },
                                fontWeight: 800,
                                color: "#172554",
                            }}
                        >
                            Employee Management
                        </Typography>

                        <Typography
                            sx={{
                                color: "#64748b",
                                fontSize: "14px",
                                marginTop: 0.5,
                            }}
                        >
                            Manage and view all employees
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() =>
                            navigate(
                                "/employees/create"
                            )
                        }
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            padding: "10px 18px",
                            boxShadow: "none",

                            "&:hover": {
                                boxShadow:
                                    "0 4px 12px rgba(37,99,235,0.25)",
                            },
                        }}
                    >
                        Create Employee
                    </Button>
                </Box>

                {/* ================================
                    SEARCH CARD
                ================================= */}

                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: 2,
                        marginBottom: 2,
                        boxShadow:
                            "0 2px 8px rgba(15,23,42,0.04)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Search Employees"
                            placeholder="Search by name, email, code, designation..."
                            value={search}
                            onChange={handleSearch}
                            size="small"

                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor:
                                        "#ffffff",

                                    "& fieldset": {
                                        borderColor:
                                            "#cbd5e1",
                                    },

                                    "&:hover fieldset": {
                                        borderColor:
                                            "#94a3b8",
                                    },

                                    "&.Mui-focused fieldset": {
                                        borderColor:
                                            "#2563eb",
                                        borderWidth: "2px",
                                    },
                                },

                                "& .MuiInputLabel-root": {
                                    color: "#64748b",
                                },

                                "& .MuiInputLabel-root.Mui-focused":
                                    {
                                        color: "#2563eb",
                                    },
                            }}
                        />

                        <Button
                            variant="contained"
                            startIcon={<Search />}
                            onClick={() =>
                                fetchEmployees(search)
                            }
                            sx={{
                                height: "40px",
                                borderRadius: "7px",
                                textTransform: "none",
                                fontWeight: 600,
                                minWidth: "105px",
                            }}
                        >
                            Search
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={handleClear}
                            sx={{
                                height: "40px",
                                borderRadius: "7px",
                                textTransform: "none",
                                fontWeight: 600,
                                minWidth: "80px",
                            }}
                        >
                            Clear
                        </Button>
                    </Box>
                </Box>

                {/* ================================
                    ERROR
                ================================= */}

                {error && (
                    <Box
                        sx={{
                            backgroundColor: "#fef2f2",
                            color: "#b91c1c",
                            border: "1px solid #fecaca",
                            borderRadius: "8px",
                            padding: 2,
                            marginBottom: 2,
                        }}
                    >
                        {error}
                    </Box>
                )}

                {/* ================================
                    DATA GRID
                ================================= */}

                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        boxShadow:
                            "0 3px 12px rgba(15,23,42,0.06)",
                    }}
                >
                    <DataGrid
                        rows={employees}
                        columns={columns}
                        loading={loading}

                        pageSizeOptions={[
                            5,
                            10,
                            25,
                        ]}

                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                    page: 0,
                                },
                            },
                        }}

                        disableRowSelectionOnClick

                        sx={{
                            border: "none",

                            "& .MuiDataGrid-columnHeaders":
                                {
                                    backgroundColor:
                                        "#f8fafc",
                                    borderBottom:
                                        "1px solid #e2e8f0",
                                },

                            "& .MuiDataGrid-columnHeaderTitle":
                                {
                                    fontWeight: 700,
                                    color: "#334155",
                                },

                            "& .MuiDataGrid-cell": {
                                borderBottom:
                                    "1px solid #f1f5f9",
                                color: "#334155",
                            },

                            "& .MuiDataGrid-row:hover": {
                                backgroundColor:
                                    "#f8fafc",
                            },

                            "& .MuiDataGrid-footerContainer":
                                {
                                    borderTop:
                                        "1px solid #e2e8f0",
                                },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default EmployeeGrid;