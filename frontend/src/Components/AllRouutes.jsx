import { Route, Routes } from "react-router-dom"

const AllRoutes = () => {
    return <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/add" />
        <Route path="/question/:id" />
        <Route path="/profile" />
    </Routes>
}
export default AllRoutes;