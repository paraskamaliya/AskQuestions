import { Input, Select, Textarea, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
const AddQuestion = () => {
    const URL = "https://askquestions.onrender.com";
    const auth = useSelector(store => store.AuthReducer);
    const toast = useToast();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    const handlePost = async () => {
        const currentDate = new Date();

        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-IN', dateOptions).format(currentDate);

        const payload = {
            title,
            description,
            type,
            date: formattedDate
        }
        try {
            let res = await fetch(`${URL}/posts/add`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')[0]}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (res.status == 200) {
                toast({
                    title: "Question Posted",
                    description: "Your Question is Successfully Posted",
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

    return <div style={{ height: "90vh", background: "rgb(200, 180, 240)" }}>
        <motion.div style={{ width: "40%", margin: "auto", textAlign: "center", paddingTop: "4%" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 500 }}>Fill the form to Add an Question</h1>
            <Input placeholder="Enter Title of Question" value={title} onChange={(e) => setTitle(e.target.value)} borderColor={"black"} focusBorderColor="black" m={1} />
            <Textarea placeholder="Enter Description of Question" value={description} onChange={(e) => setDescription(e.target.value)} borderColor={"black"} focusBorderColor="black" m={1} />
            <Select placeholder="Select Type of Question" value={type} onChange={(e) => setType(e.target.value)} borderColor={"black"} focusBorderColor="black" m={1}>
                <option value="Tech">Tech</option>
                <option value="Environmental">Environmental</option>
                <option value="Language">Language</option>
                <option value="Sports">Sports</option>
                <option value="Commerce">Commerce</option>
                <option value="General">General</option>
            </Select>
            <motion.button style={{ background: "#27AE60", padding: "2% 5% 2% 5%", borderRadius: "15px", color: "white", fontSize: "larger" }} whileHover={{ boxShadow: "2px 2px 2px #5c5757FF" }} whileTap={{ boxShadow: "none" }} onClick={handlePost}>Submit</motion.button>
        </motion.div>
    </div>
}
export default AddQuestion;