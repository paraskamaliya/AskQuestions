import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar, Box, Image, Select } from "@chakra-ui/react";
import loading from "../Images/loader.gif";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiTwotoneLike } from "react-icons/ai";

const Home = () => {
    const URL = "https://askquestions.onrender.com";
    const limit = 10;
    const auth = useSelector(store => store.AuthReducer);

    const [postData, setPostData] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    const [type, setType] = useState("");
    const [order, setOrder] = useState("");

    const fetchTheData = async () => {
        setLoad(true)
        try {
            let url = `${URL}/posts?page=${page}&limit=${limit}`
            if (order !== "") {
                url += `&order=${order}`
            }
            if (type !== "") {
                url += `&type=${type}`
            }
            let res = await fetch(url, {
                method: "GET"
            })
            let data = await res.json();
            setPostData(data.posts);
            setTotalPage(Math.ceil(data.totalPosts / limit))
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false);
        }
    }

    const handleUpvote = async (data) => {
        data = { ...data, upvotes: data.upvotes + 1 };
        try {
            let res = await fetch(`${URL}/posts/update/${data._id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (res.status === 200) {
                let updated = await res.json();
                let newData = postData.map((el) => {
                    return el._id === data._id ? updated.postData : el
                })
                setPostData((prev) => prev = newData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTheData();
    }, [type, order, page])
    if (load) {
        return <motion.div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(200, 180, 240)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Image src={loading} w={["15vw", "15vw", "10vw", "10vw", "5vw"]} marginBottom={"10vh"} />
        </motion.div>
    }

    return <DIV>
        <motion.div style={{ width: "90%", margin: "auto", paddingTop: "1%" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            <motion.div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} initial={{ borderBottom: "0" }} animate={{ borderBottom: "1px solid black" }}>
                <motion.h1 style={{ fontSize: "2.5em", fontWeight: 500, color: "black" }} >Recent Posts</motion.h1>
                <div style={{ display: "flex", gap: "1vw" }}>
                    <Select placeholder="Select Type for Filter" bgColor={"white"} borderColor={"black"} focusBorderColor="black" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Tech">Tech</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Language">Language</option>
                        <option value="Sports">Sports</option>
                        <option value="Commerce">Commerce</option>
                        <option value="General">General</option>
                    </Select>
                    <Select value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Select order for Sort" bgColor={"white"} borderColor={"black"} focusBorderColor="black">
                        <option value={"asc"}>Ascending</option>
                        <option value={"desc"}>Descending</option>
                    </Select>
                </div>
            </motion.div>
            {postData.length === 0 && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "81vh" }}>
                <motion.h1 style={{ color: "red", fontSize: "2rem" }} initial={{ x: "-100vw" }} animate={{ x: 0 }} transition={{ type: "spring", damping: 30 }}>No data is Present</motion.h1>
            </div>}
            {postData.length > 0 && <Box display={"grid"} gridTemplateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)", "repeat(2,1fr)"]} >
                {postData?.map((el) => {
                    return <motion.div style={{ margin: "2%", borderRadius: "25px", padding: "2%", color: "black", background: "#ffffffb5" }} key={el._id} whileHover={{ borderRadius: "0px", cursor: "pointer", boxShadow: "2px 2px 4px black", transition: { duration: 0.5 } }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link to={`/question/${el._id}`}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
                                <Avatar src={`https://bit.ly/`} name={el.username} />
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
                            {auth.isAuth && <motion.button style={{ fontSize: "larger", fontWeight: 500, padding: "1% 2.5% 1% 2.5%", background: "rgb(186, 153, 250)", borderRadius: "15px", display: "flex", alignItems: "center", gap: "3%" }} whileHover={{ background: "rgb(200, 180, 240)", transition: { duration: 0.5 } }} whileTap={{ background: "rgb(186, 153, 250)" }} onClick={() => handleUpvote(el)}>Upvote <AiTwotoneLike size={"1.5em"} /></motion.button>}
                            <p style={{ textAlign: "right", fontWeight: 300 }} >Posted at :- {el.date}</p>
                        </div>
                    </motion.div>
                })}
            </Box>
            }
            <div style={{ display: "flex", justifyContent: "center", padding: "2%", width: "90%", margin: "auto", gap: "1vw" }}>
                {
                    totalPage !== 0 && new Array(totalPage).fill().map((_, i) => {
                        return <motion.button style={{
                            padding: "0.5% 1% 0.5% 1%", background: "white", borderRadius: "10px", boxShadow: page === i + 1 && "2px 2px 2px #5c5757FF"
                        }} onClick={() => setPage(i + 1)} transition={{ duration: 0.5 }} key={i}>{i + 1}</motion.button>
                    })
                }
            </div>
        </motion.div>
    </DIV >
}
export default Home;
const DIV = styled.div`
    background: rgb(200, 180, 240);
    font-family: "Roboto";
    min-height: 90vh;
`