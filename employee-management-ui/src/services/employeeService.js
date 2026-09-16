const API_URL = "https://localhost:7019/api/Employee";

export const getEmployees = async (search = "") => {
    const url = search
        ? `${API_URL}?search=${encodeURIComponent(search)}`
        : API_URL;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    return await response.json();
};