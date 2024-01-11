import { styled } from "styled-components";
import { motion } from "framer-motion";
import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const UserInfo = () => {
    const { id } = useParams();
    const URL = "https://askquestions.onrender.com";
    const auth = useSelector(store => store.AuthReducer);

    const [load, setLoad] = useState(false);
    const [userData, setUserData] = useState({});
    console.log(userData);
    const fetchTheData = async () => {
        setLoad(true)
        try {
            let url = `${URL}/admin/user/${id}`
            let res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')[0]}`
                }
            })
            let data = await res.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    }

    useEffect(() => {
        fetchTheData();
    }, [])
    return <DIV>
        <motion.div style={{ padding: "0.5%" }} initial={{ x: "100vw" }} animate={{ x: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 50 }} exit={{ x: "-100vw", transition: { duration: 0.5 } }}>
            <Heading color={"green"} textAlign={"center"}>User Info</Heading>
        </motion.div>
    </DIV>
}
export default UserInfo;
const DIV = styled.div`
    background: rgb(200, 180, 240);
    font-family: "Roboto";
    min-height: 90vh;
    max-width: 100vw;
    margin: auto;
`