import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";

const AllRoutes = () => {
    return <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login />} />
        <Route path="/add" />
        <Route path="/question/:id" />
        <Route path="/profile" />
    </Routes>
}
export default AllRoutes;