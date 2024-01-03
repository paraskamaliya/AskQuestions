import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar, Box, Image, Spinner } from "@chakra-ui/react";
import loading from "../Images/loader.gif";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiTwotoneLike } from "react-icons/ai";

const Home = () => {
    const URL = "https://askquestions.onrender.com";
    const auth = useSelector(store => store.AuthReducer);

    const [postData, setPostData] = useState([]);
    const [load, setLoad] = useState(false);

    console.log(postData);

    const fetchTheData = async () => {
        setLoad(true)
        try {
            let res = await fetch(`${URL}/posts`, {
                method: "GET"
            })
            let data = await res.json();
            setPostData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false);
        }
    }

    const handleUpvote = async (data) => {
        data = { ...data, upvotes: data.upvotes++ };
        try {
            let res = await fetch(`${URL}/posts/update/${data._id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (res.status == 200) {
                let newData = postData.filter((el) => {
                    return el._id == data._id ? data : el
                })
                setPostData(prev => prev = newData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTheData();
    }, [])
    if (load) {
        return <motion.div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(200, 180, 240)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Image src={loading} w={["15vw", "15vw", "10vw", "10vw", "5vw"]} marginBottom={"10vh"} />
        </motion.div>
    }

    return <DIV>
        <motion.div style={{ width: "90%", margin: "auto", paddingTop: "1%" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            <motion.h1 style={{ fontSize: "2.5em", fontWeight: 500, color: "black", textAlign: "center" }} initial={{ borderBottom: "0" }} animate={{ borderBottom: "1px solid black" }} >Recent Posts</motion.h1>
            <Box display={"grid"} gridTemplateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)", "repeat(2,1fr)"]} >
                {postData.length > 0 && postData.map((el) => (
                    <motion.div style={{ margin: "2%", borderRadius: "25px", padding: "2%", color: "black", background: "#ffffffb5" }} key={el._id} whileHover={{ borderRadius: "0px", cursor: "pointer", boxShadow: "2px 2px 4px black", transition: { duration: 0.5 } }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link to={`/question/${el._id}`}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
                                <Avatar src={`https://bit.ly/${el.username}`} name={el.username} />
                                <p style={{ fontSize: "larger", fontWeight: 500 }}>{el.username}</p>
                            </div>
                            <div style={{ marginTop: "2%", marginBottom: "2%", border: "0.5px solid black" }} ></div>
                            <h1 style={{ fontSize: "larger" }}>Title :- {el.title}</h1>
                            <h1 style={{ fontSize: "larger" }}>Description :- {el.description}</h1>
                            <h1 style={{ fontSize: "larger" }}>Type :- {el.type}</h1>
                            <h1 style={{ fontSize: "larger" }}>Comments :- {el.comments.length}</h1>
                            <h1 style={{ fontSize: "larger" }}>Upvotes :- {el.upvotes}</h1>
                        </Link>
                        <div style={{ display: "flex", justifyContent: "right", alignItems: "center", gap: "2%" }}>
                            {auth.isAuth && <motion.button style={{ fontSize: "larger", fontWeight: 500, padding: "1% 2.5% 1% 2.5%", background: "#F39C12", borderRadius: "15px", display: "flex", alignItems: "center", gap: "3%" }} whileHover={{ background: "#eec179", transition: { duration: 0.5 } }} whileTap={{ background: "#F39C12" }} onClick={() => handleUpvote(el)}>Upvote <AiTwotoneLike size={"1.5em"} /></motion.button>}
                            <p style={{ textAlign: "right", fontWeight: 300 }} >Posted at :- {el.date}</p>
                        </div>
                    </motion.div>
                ))}
            </Box>
        </motion.div>
    </DIV>
}
export default Home;
const DIV = styled.div`
    background: rgb(200, 180, 240);
    font-family: "Roboto";
    min-height: 90vh;
`