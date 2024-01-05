import { Button, Input, Select, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PATCH } from "../Redux/AuthReducer/actionType";
const MyProfile = () => {
    const URL = "https://askquestions.onrender.com";
    const auth = useSelector(store => store.AuthReducer);
    const [userData, setUserData] = useState(auth.user);
    const [edit, setEdit] = useState(true);
    const dispatch = useDispatch();
    const toast = useToast();

    const handleUpdate = async () => {
        try {
            let res = await fetch(`${URL}/users/update/${userData._id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')[0]}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            if (res.status === 200) {
                dispatch({ type: PATCH, payload: userData })
                toast({
                    title: "User data is Updated",
                    description: "Your profile data is updated",
                    duration: 3000,
                    isClosable: true,
                    status: "success"
                })
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Something went wrong, Please try again",
                duration: 3000,
                isClosable: true,
                status: "error"
            })
        }
    }
    useEffect(() => {
        setUserData(auth.user);
    }, [])

    return <div style={{ background: "rgb(200, 180, 240)", minHeight: "90vh" }} >
        <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 500, paddingTop: "0.5%" }}>My Profile</h1>
        <motion.div style={{ width: "50%", margin: "auto", justifyContent: "center", textAlign: "center" }} initial={{ x: "100vw" }} animate={{ x: 0 }} transition={{ delay: 0.3 }} >
            <Input value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} placeholder="Enter Username" borderColor={"black"} focusBorderColor="black" m={1} isReadOnly={edit} />
            <Input value={userData.email} borderColor={"black"} focusBorderColor="black" m={1} isReadOnly />
            <Select value={userData.country} onChange={(e) => setUserData({ ...userData, country: e.target.value })} placeholder="Select Country" borderColor={"black"} focusBorderColor="black" m={1} disabled={edit}>
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
            <Button colorScheme="purple" onClick={() => setEdit((prev) => !prev)}>{edit ? "Edit" : "Cancel"}</Button>
            {!edit && <Button colorScheme="green" onClick={handleUpdate} ml={2}>Update</Button>}
        </motion.div>
    </div>
}
export default MyProfile;