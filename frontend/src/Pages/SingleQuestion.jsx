import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Avatar, Box, Button, Image, Textarea, useToast } from "@chakra-ui/react";
import loading from "../Images/loader.gif";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { AiTwotoneLike } from "react-icons/ai";

const SingleQuestion = () => {
    const { id } = useParams();
    const auth = useSelector(store => store.AuthReducer);
    const URL = "https://askquestions.onrender.com";
    const toast = useToast();

    const [postData, setPostData] = useState([]);
    const [simData, setSimData] = useState([]);
    const [load, setLoad] = useState(false);
    const [comment, setComment] = useState("");

    const fetchTheData = async () => {
        setLoad(true)
        try {
            let res = await fetch(`${URL}/posts/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')}`,
                    "content-type": "application/json",
                }
            })
            let data = await res.json();
            console.log(data);
            setPostData(data);
            fetchExtraData(data.type);
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
    const fetchExtraData = async (type) => {
        try {
            let res = await fetch(`${URL}/posts?type=${type}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')}`,
                    "content-type": "application/json",
                }
            })
            let data = await res.json();
            setSimData(data.posts);
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Something went wrong, Please try again",
                duration: 3000,
                isClosable: true,
                status: "error"
            })
        } finally {
            setLoad(false);
        }
    }

    const handleUpvote = async () => {
        let data = { ...postData, upvotes: postData.upvotes + 1 };
        try {
            let res = await fetch(`${URL}/posts/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (res.status === 200) {
                let updated = await res.json();
                setPostData((prev) => prev = updated.postData);
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
    const updateComment = async () => {
        const currentDate = new Date();

        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-IN', dateOptions).format(currentDate);

        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
        const formattedTime = new Intl.DateTimeFormat('en-IN', timeOptions).format(currentDate);

        let payload = {
            username: auth.user.username,
            userId: auth.user._id,
            comment,
            time: `${formattedDate} at ${formattedTime}`,
        }
        let data = { ...postData, comments: [...postData.comments, payload] };
        try {
            let res = await fetch(`${URL}/posts/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (res.status === 200) {
                let updated = await res.json();
                setPostData((prev) => prev = updated.postData);
                toast({
                    title: "Commented Posted",
                    description: "Your commented posted successfully",
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
    const handleDelete = async (time) => {
        const { comments } = postData;
        const updated = comments.filter((el) => {
            return el.time !== time;
        })
        try {
            let res = await fetch(`${URL}/posts/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({ ...postData, comments: updated })
            })
            if (res.status == 200) {
                setPostData({ ...postData, comments: updated })
                toast({
                    title: "Your Commented Deleted",
                    description: "Your commented deleted successfully.",
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
        fetchTheData();
        document.title = "Question Page | AskQuestions"
    }, [id])
    if (load) {
        return <motion.div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(200, 180, 240)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            <Image src={loading} w={["15vw", "15vw", "10vw", "10vw", "5vw"]} marginBottom={"10vh"} />
        </motion.div>
    }
    return <DIV>
        <motion.div style={{ width: "100%", margin: "auto", paddingTop: "1%" }} initial={{ x: "100vw" }} animate={{ x: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 50 }} exit={{ x: "100vw", transition: { duration: 0.5 } }}>
            <Box display={"flex"} flexDirection={["column", "column", "column", "row", "row"]} width={"90%"} margin={"auto"}>
                <Box p={"2%"} w={["100%", "100%", "100%", "140%", "140%"]} >
                    <motion.div style={{ borderRadius: "25px", padding: "2%", color: "black", background: "#ffffffb5", boxShadow: "2px 2px 4px black" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
                            <Avatar src={`https://bit.ly/`} name={postData.username} />
                            <p style={{ fontSize: "larger", fontWeight: 500 }}>{postData.username}</p>
                        </div>
                        <div style={{ marginTop: "2%", marginBottom: "2%", border: "0.5px solid black" }} ></div>
                        <h1 style={{ fontSize: "larger" }}>Title :- {postData.title}</h1>
                        <h1 style={{ fontSize: "larger" }}>Description :- {postData.description}</h1>
                        <h1 style={{ fontSize: "larger" }}>Type :- {postData.type}</h1>
                        <h1 style={{ fontSize: "larger" }}>Comments :- {postData.comments?.length}</h1>
                        <h1 style={{ fontSize: "larger" }}>Upvotes :- {postData.upvotes}</h1>
                        <div style={{ display: "flex", justifyContent: "right", alignItems: "center", gap: "2%" }}>
                            <motion.button style={{ fontSize: "larger", fontWeight: 500, padding: "1% 2.5% 1% 2.5%", background: "rgb(186, 153, 250)", borderRadius: "15px", display: "flex", alignItems: "center", gap: "3%" }} whileHover={{ background: "rgb(200, 180, 240)", transition: { duration: 0.5 } }} whileTap={{ background: "rgb(186, 153, 250)" }} onClick={handleUpvote}>Upvote <AiTwotoneLike size={"1.5em"} /></motion.button>
                            <p style={{ textAlign: "right", fontWeight: 300 }} >Posted at :- {postData.date}</p>
                        </div>
                    </motion.div>
                    {auth.isAuth && <div style={{
                        margin: "2%", padding: "2%", justifyContent: "center", display: "flex", flexDirection: "column"
                    }}>
                        <Textarea bgColor={"white"} color={"black"} borderColor={"black"} placeholder="Enter your comment..." value={comment} onChange={(e) => setComment(e.target.value)} focusBorderColor="black" />
                        <motion.button style={{ textAlign: "right", fontSize: "larger", padding: "1%", margin: "auto", marginTop: "0.5%", width: "fit-content", borderRadius: "15px", backgroundColor: "#27AE60", color: "white" }} whileHover={{ boxShadow: "2px 2px 2px #5c5757FF" }} whileTap={{ boxShadow: "none" }} onClick={updateComment}>Comment</motion.button>
                    </div>}
                    <div style={{ margin: "2%" }}>
                        <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>Comments</h1>
                        {postData?.comments?.length > 0 ? postData.comments.map((el, i) => {
                            return <div key={i} style={{ margin: "1%", padding: "1.5%", border: "1px solid black", background: "#f1f1f1" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "2%", width: "70%" }}>
                                        <Avatar src={`https://bit.ly/`} name={el.username} />
                                        <p style={{ fontSize: "larger", fontWeight: 500 }}>{el.username}</p>
                                    </div>
                                    {el.userId == auth.user._id && <Button colorScheme="red" color={"white"} onClick={() => handleDelete(el.time)}>Delete</Button>}
                                </div>
                                <div style={{ marginTop: "1%", marginBottom: "1%", border: "0.5px solid black" }} ></div>
                                <h1 style={{ fontSize: "larger" }}>{el.comment}</h1>
                                <h1 style={{ fontSize: "larger", textAlign: "right", fontWeight: 300 }}>Commented on :- {el.time}</h1>
                            </div>
                        }) : <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>No Comments are present, Be the first to Comment</h1>}
                    </div>
                </Box>
                <Box m={"2%"} w={["100%", "100%", "100%", "60%", "60%"]} >
                    <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>Similar Questions</h1>
                    {simData?.length > 0 && simData.map((e) => {
                        return <div key={e._id} style={{ margin: "1%", border: "1px solid black", padding: "2%", borderRadius: "15px", background: "#ffffff96" }}>
                            <Link to={`/question/${e._id}`} >
                                <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
                                    <Avatar src={`https://bit.ly/`} name={e.username} />
                                    <p style={{ fontSize: "larger", fontWeight: 500 }}>{e.username}</p>
                                </div>
                                <div style={{ marginTop: "2%", marginBottom: "2%", border: "0.5px solid black" }} ></div>
                                <h1 style={{ fontSize: "larger" }}>Title :- {e.title}</h1>
                                <h1 style={{ fontSize: "larger" }}>Description :- {e.description}</h1>
                                <h1 style={{ fontSize: "larger" }}>Comments :- {e.comments?.length}</h1>
                                <h1 style={{ fontSize: "larger" }}>Upvotes :- {e.upvotes}</h1>
                            </Link>
                        </div>
                    })}
                </Box>
            </Box>
        </motion.div>
    </DIV >
}
export default SingleQuestion;
const DIV = styled.div`
    background: rgb(200, 180, 240);
    font-family: "Roboto";
    min-height: 90vh;
`