import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import AddQuestion from "../Pages/AddQuestion";

const AllRoutes = () => {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddQuestion />} />
        <Route path="/question/:id" />
        <Route path="/profile" />
    </Routes>
}
export default AllRoutes;