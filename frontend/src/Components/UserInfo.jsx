import { styled } from "styled-components";
import { motion } from "framer-motion";
import { Avatar, Heading, Image, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import loading from "../Images/loader.gif";

const UserInfo = () => {
    const { id } = useParams();
    const URL = "https://askquestions.onrender.com";
    const auth = useSelector(store => store.AuthReducer);

    const [load, setLoad] = useState(false);
    const [userData, setUserData] = useState({});
    const [postData, setPostData] = useState([]);
    console.log(postData);
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
            setUserData(data.userDetails);
            setPostData(data.postDetails);
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    }

    useEffect(() => {
        fetchTheData();
    }, [])

    if (load) {
        return <motion.div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(200, 180, 240)" }} >
            <Image src={loading} w={["15vw", "15vw", "10vw", "10vw", "5vw"]} marginBottom={"10vh"} />
        </motion.div >
    }
    return <DIV>
        <motion.div style={{ padding: "0.5%" }} initial={{ x: "100vw" }} animate={{ x: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 50 }} exit={{ x: "-100vw", transition: { duration: 0.5 } }}>
            <Heading color={"green"} textAlign={"center"}>User Info</Heading>
            <Stack display={"flex"} flexDirection={["column", "column", "row", "row", "row"]} w={"90%"} m={"auto"} gap={"2%"}>
                <motion.div style={{ width: "50%", height: "fit-content", border: "1px solid black", padding: "2%", backgroundColor: "white", borderRadius: "15px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4%", margin: "auto", marginBottom: "2%" }}>
                        <Avatar src={`https://bit.ly/`} name={userData.username} />
                        <p style={{ fontSize: "larger", fontWeight: 500 }}>{userData.username}</p>
                    </div>
                    <p>Email :- {userData.email}</p>
                    <p>Country :- {userData.country}</p>
                    <p>Questions :- {postData.length}</p>
                </motion.div>
                <motion.div style={{ width: "50%" }}>
                    <Heading color={"red"} textAlign={"center"} fontSize={"larger"}>Asked Questions</Heading>
                    {postData.length > 0 && postData.map((el) => {
                        return <div style={{ padding: "1%", border: "1px solid black", margin: "1%", background: "white" }}>
                            <p>Title :- {el.title}</p>
                            <p>Description :- {el.description}</p>
                            <p>Type :- {el.type}</p>
                            <p>Upvotes :- {el.upvotes}</p>
                        </div>
                    })}
                </motion.div>
            </Stack>
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