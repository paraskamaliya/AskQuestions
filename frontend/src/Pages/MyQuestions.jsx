import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import loading from "../Images/loader.gif";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MyQuestions = () => {
    const URL = "https://askquestions.onrender.com";
    const auth = useSelector(store => store.AuthReducer);
    const toast = useToast();
    const [questionData, setQuestionData] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: open, onOpen: onopen, onClose: close } = useDisclosure();
    const [load, setLoad] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [id, setId] = useState("");

    const fetchUserQuestions = async () => {
        setLoad(true)
        try {
            let url = `${URL}/posts/user`
            let res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')[0]}`
                }
            })
            let data = await res.json();
            setQuestionData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false);
        }
    }
    const handleUpdate = async () => {
        const payload = {
            title, description, type
        }
        try {
            let res = await fetch(`${URL}/posts/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')[0]}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (res.status === 200) {
                let data = await res.json();
                let newData = questionData.map((el) => {
                    return el._id === id ? data.postData : el
                })
                setQuestionData((prev) => prev = newData);
                toast({
                    title: "Question Updated",
                    description: "Question is Updated Successfully",
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
    const handleDelete = async () => {
        try {
            let res = await fetch(`${URL}/posts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')[0]}`
                }
            })
            if (res.status == 200) {
                let updated = questionData.filter((el) => el._id !== id)
                setQuestionData((prev) => prev = updated);
                toast({
                    title: "Question is Deleted",
                    description: "Question is deleted successfully",
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
        fetchUserQuestions();
    }, [])

    if (load) {
        return <motion.div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(200, 180, 240)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Image src={loading} w={["15vw", "15vw", "10vw", "10vw", "5vw"]} marginBottom={"10vh"} />
        </motion.div>
    }
    return <div style={{ background: "rgb(200, 180, 240)", minHeight: "90vh" }} >
        <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 500, paddingTop: "0.5%" }}>My Questions</h1>
        <motion.div style={{ width: "90vw", margin: "auto" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
            {questionData.length === 0 && <motion.div style={{ height: "80vh", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(200, 180, 240)", color: "red", fontSize: "1.5rem" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                No questions are posted
            </motion.div>}
            {questionData.length > 0 && <Box display={"grid"} gridTemplateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)", "repeat(2,1fr)"]} >
                {questionData?.map((el) => {
                    return <motion.div style={{ margin: "2%", borderRadius: "25px", padding: "2%", color: "black", background: "#ffffffb5" }} key={el._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link to={`/question/${el._id}`}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
                                <Avatar src={`https://bit.ly/`} name={el.username} />
                                <p style={{ fontSize: "larger", fontWeight: 500 }}>{el.username}</p>
                            </div>
                            <div style={{ marginTop: "2%", marginBottom: "2%", border: "0.5px solid black" }} ></div>
                            <h1 style={{ fontSize: "larger" }}>Title :- {el.title}</h1>
                            <h1 style={{ fontSize: "larger" }}>Description :- {el.description}</h1>
                            <h1 style={{ fontSize: "larger" }}>Type :- {el.type}</h1>
                            <h1 style={{ fontSize: "larger" }}>Comments :- {el.comments?.length}</h1>
                            <h1 style={{ fontSize: "larger" }}>Upvotes :- {el.upvotes}</h1>
                        </Link>
                        <div style={{ display: "flex", justifyContent: "right", alignItems: "center", gap: "2%" }}>
                            <motion.button style={{ fontSize: "larger", fontWeight: 500, padding: "1% 2.5% 1% 2.5%", background: "rgb(255,0,0)", borderRadius: "15px", display: "flex", alignItems: "center", gap: "1%", color: "white" }} whileHover={{ background: "rgb(251, 91, 91)", transition: { duration: 0.5 } }} whileTap={{ background: "rgb(255, 0, 0)" }} onClick={() => {
                                onopen();
                                setId(el._id)
                            }}>Delete<MdDelete size={"1.5em"} /></motion.button>
                            <motion.button style={{ fontSize: "larger", fontWeight: 500, padding: "1% 2.5% 1% 2.5%", background: "rgb(186, 153, 250)", borderRadius: "15px", display: "flex", alignItems: "center", gap: "2%" }} whileHover={{ background: "rgb(200, 180, 240)", transition: { duration: 0.5 } }} whileTap={{ background: "rgb(186, 153, 250)" }} onClick={() => {
                                setDescription(el.description)
                                setTitle(el.title);
                                setType(el.type);
                                setId(el._id);
                                onOpen()
                            }}>Edit <FaEdit size={"1em"} /></motion.button>
                            <p style={{ textAlign: "right", fontWeight: 300 }} >Posted at :- {el.date}</p>
                        </div>
                    </motion.div>
                })}
                <AlertDialog
                    isOpen={open}
                    onClose={close}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Question
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button onClick={close}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={() => {
                                    close();
                                    handleDelete();
                                }} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Question</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input placeholder="Enter Title of Question" borderColor={"purple"} focusBorderColor="rgb(186, 153, 250)" value={title} onChange={(e) => setTitle(e.target.value)} m={1} />
                            <Input placeholder="Enter Description of Question" borderColor={"purple"} focusBorderColor="rgb(186, 153, 250)" value={description} onChange={(e) => setDescription(e.target.value)} m={1} />
                            <Select placeholder="Select Type of Question" value={type} onChange={(e) => setType(e.target.value)} borderColor={"purple"} focusBorderColor="rgb(186, 153, 250)" m={1}>
                                <option value="Tech">Tech</option>
                                <option value="Environmental">Environmental</option>
                                <option value="Language">Language</option>
                                <option value="Sports">Sports</option>
                                <option value="Commerce">Commerce</option>
                                <option value="General">General</option>
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='purple' onClick={() => {
                                handleUpdate()
                                onClose()
                            }}>
                                Update
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
            }
        </motion.div>
    </div>
}
export default MyQuestions;