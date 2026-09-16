import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeGrid from "./components/EmployeeGrid/EmployeeGrid";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import CreateEmployee from "./components/CreateEmployee/CreateEmployee";
import EditEmployee from "./components/EditEmployee/EditEmployee";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<EmployeeGrid />}
                />

                <Route
                    path="/employees/:id"
                    element={<EmployeeDetails />}
                />
                <Route
                    path="/employees/edit/:id"
                    element={<EditEmployee />}
                />

                <Route
                    path="/employees/create"
                    element={<CreateEmployee />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;