import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar, Image, Spinner } from "@chakra-ui/react";
import loading from "../Images/loader.gif";
import { useSelector } from "react-redux";
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
            console.log(res);
            // if (res.status == 200) {
            //     let newData = postData.filter((el) => {
            //         return el._id == data._id ? data : el
            //     })
            //     setPostData(prev => prev = newData);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTheData();
    }, [])
    if (load) {
        return <motion.div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Image src={loading} w={["15vw", "15vw", "10vw", "10vw", "5vw"]} marginBottom={"10vh"} />
        </motion.div>
    }

    return <DIV>
        <motion.div style={{ width: "90%", margin: "auto" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            <motion.h1 style={{ fontSize: "2.5em", fontWeight: 500, color: "white" }} initial={{ borderBottom: "0" }} animate={{ borderBottom: "1px solid white" }} >Recent Posts</motion.h1>
            <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ when: "beforeChildren", staggerChildren: 1 }}>
                {postData.length > 0 && postData.map((el) => (
                    <motion.div style={{ margin: "2%", borderRadius: "25px", padding: "2%", color: "black", background: "#ffffffb5" }} key={el._id} whileHover={{ borderRadius: "0px", cursor: "pointer", transition: { duration: 0.5 } }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
                            <Avatar src={`https://bit.ly/${el.username}`} name={el.username} />
                            <p style={{ fontSize: "larger", fontWeight: 500 }}>{el.username}</p>
                        </div>
                        <div style={{ marginTop: "2%", marginBottom: "2%", border: "0.5px solid black" }} ></div>
                        <h1>Title :- {el.title}</h1>
                        <h1>Description :- {el.description}</h1>
                        <h1>Type :- {el.type}</h1>
                        <h1>Upvotes :- {el.upvotes}</h1>
                        <h1>Comments :- {el.comments.length}</h1>
                        {auth.isAuth && <button onClick={() => handleUpvote(el)}>Upvote</button>}
                        <p style={{ textAlign: "right", fontWeight: 300 }}>Posted at :- {el.date}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </DIV>
}
export default Home;
const DIV = styled.div`
    background: black;
`