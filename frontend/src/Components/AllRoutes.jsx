import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import AddQuestion from "../Pages/AddQuestion";
import SingleQuestion from "../Pages/SingleQuestion";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/MyProfile";
import MyQuestions from "../Pages/MyQuestions";

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
        <Route path="/profile" element={
            <PrivateRoute>
                <MyProfile />
            </PrivateRoute>
        } />
        <Route path="/myquestions" element={
            <PrivateRoute>
                <MyQuestions />
            </PrivateRoute>
        } />
    </Routes>
}
export default AllRoutes;