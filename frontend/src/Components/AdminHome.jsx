import styled from "styled-components";
import { motion } from "framer-motion";
import { Avatar, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import loading from "../Images/loader.gif";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHome = () => {
    const URL = "https://askquestions.onrender.com";
    const auth = useSelector(store => store.AuthReducer);
    const [load, setLoad] = useState(false);
    const [userData, setUserData] = useState([]);

    const fetchTheData = async () => {
        setLoad(true)
        try {
            let url = `${URL}/admin/`
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

    const handleAdminUpdate = async (data) => {
        data = { ...data, roles: [...data.roles, "admin"] };
        try {
            let res = await fetch(`${URL}/admin/updateuser/${data._id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')[0]}`
                },
                body: JSON.stringify(data)
            })
            if (res.status == 200) {
                let updated = userData.map((el) => {
                    return el._id == data._id ? data : el
                })
                setUserData(updated);
            }
        } catch (error) {
            console.log(error);
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
            <Heading color={"green"} textAlign={"center"}>Welcome Admin</Heading>
            <Stack display={"grid"} gridTemplateColumns={["repeat(2,1fr)", "repeat(2,1fr)", "repeat(3,1fr)", "repeat(3,1fr)", "repeat(3,1fr)"]}>
                {userData.length > 0 && userData.map((el) => {
                    return <motion.div style={{ margin: "2%", borderRadius: "25px", padding: "2%", color: "black", background: "#ffffffb5" }} key={el._id} whileHover={{ boxShadow: "2px 2px 4px black", transition: { duration: 0.5 } }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link to={`/userinfo/${el._id}`}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
                                    <Avatar src={`https://bit.ly/`} name={el.username} />
                                    <p style={{ fontSize: "larger", fontWeight: 500 }}>{el.username}</p>
                                </div>
                                <div style={{ marginTop: "2%", marginBottom: "2%", border: "0.5px solid black" }} ></div>
                                <Text fontSize={"lg"} fontWeight={400}>Email :- {el.email}</Text>
                                <Text fontSize={"lg"} fontWeight={400}>Country :- {el.country}</Text>
                            </div>
                        </Link>
                        {!el.roles.includes("admin") && <Button colorScheme="green" fontWeight={500} onClick={() => handleAdminUpdate(el)}>Make Admin</Button>}
                    </motion.div>
                })}
            </Stack>
        </motion.div>
    </DIV>
}
export default AdminHome;
const DIV = styled.div`
    background: rgb(200, 180, 240);
    font-family: "Roboto";
    min-height: 90vh;
    max-width: 100vw;
    margin: auto;
`