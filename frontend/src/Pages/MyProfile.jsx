import { Input, Select } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MyProfile = () => {
    const auth = useSelector(store => store.AuthReducer);
    const [userData, setUserData] = useState({});
    console.log(auth);
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        setUserData(auth.user);
    })

    return <div style={{ background: "rgb(200, 180, 240)", minHeight: "90vh" }} >
        <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 500, paddingTop: "0.5%" }}>My Profile</h1>
        <motion.div style={{ width: "50%", margin: "auto" }} initial={{ x: "100vw" }} animate={{ x: 0 }} transition={{ delay: 0.3 }} >
            <Input value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} placeholder="Enter Username" borderColor={"black"} focusBorderColor="black" m={1} isReadOnly={edit} />
            <Input value={userData.email} borderColor={"black"} focusBorderColor="black" m={1} isReadOnly />
            <Select value={userData.country} onChange={(e) => setUserData({ ...userData, country: e.target.value })} placeholder="Select Country" borderColor={"black"} focusBorderColor="black" m={1} isReadOnly={edit}>
                <option value={"India"}>India</option>
                <option value={"China"}>China</option>
                <option value={"United States"}>United States</option>
                <option value={"Indonesia"}>Indonesia</option>
                <option value={"Pakistan"}>Pakistan</option>
                <option value={"Brazil"}>Brazil</option>
                <option value={"Nigeria"}>Nigeria</option>
                <option value={"United Kingdom"}>United Kingdom</option>
                <option value={"Bangladesh"}>Bangladesh</option>
                <option value={"Russia"}>Russia</option>
                <option value={"Mexico"}>Mexico</option>
            </Select>
        </motion.div>
    </div>
}
export default MyProfile;