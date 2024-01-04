import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import AddQuestion from "../Pages/AddQuestion";
import SingleQuestion from "../Pages/SingleQuestion";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={
            <PrivateRoute>
                <AddQuestion />
            </PrivateRoute>
        } />
        <Route path="/question/:id" element={
            <PrivateRoute>
                <SingleQuestion />
            </PrivateRoute>
        } />
        <Route path="/profile" />
    </Routes>
}
export default AllRoutes;