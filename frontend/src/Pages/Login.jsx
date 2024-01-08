import { motion } from "framer-motion";
import { useState } from "react";
import { styled } from "styled-components";
import { IoPersonSharp } from "react-icons/io5";
import { Box, IconButton, Input, InputGroup, InputRightElement, Select, Spinner, useToast } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { LOGIN } from "../Redux/AuthReducer/actionType";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const URL = "https://askquestions.onrender.com";
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [signShow, setSignShow] = useState(false);

    const [showPass, setShowPass] = useState(false);
    const [load, setLoad] = useState(false);

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPass, setLoginPass] = useState("")

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [country, setCountry] = useState("");

    // password verification
    const [length, setLength] = useState(false);
    const [capLetter, setCapLetter] = useState(false);
    const [smaLetter, setSmaLetter] = useState(false);
    const [speChar, setSpeChar] = useState(false);

    const handleLogin = async () => {
        const payload = {
            email: loginEmail,
            password: loginPass
        }
        if (loginEmail !== "" && loginPass !== "") {
            try {
                setLoad(true);
                let res = await fetch(`${URL}/users/signin`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                if (res.status === 200) {
                    toast({
                        title: "Login Successfully",
                        description: "You are logged in",
                        duration: 3000,
                        isClosable: true,
                        status: "success"
                    })
                    let data = await res.json();
                    dispatch({ type: LOGIN, payload: data })
                    navigate(location.state || "/", { replace: true })
                }
                else if (res.status === 202) {
                    toast({
                        title: "Wrong Credentials",
                        description: "Data is not present, Please register",
                        duration: 3000,
                        isClosable: true,
                        status: "error"
                    })
                } else {
                    toast({
                        title: "Something went wrong",
                        description: "Something went wrong, Please try again",
                        duration: 3000,
                        isClosable: true,
                        status: "error"
                    })
                }
                setLoad(false);
            } catch (error) {
                setLoad(false);
                toast({
                    title: "Something went wrong",
                    description: "Something went wrong, Please try again",
                    duration: 3000,
                    isClosable: true,
                    status: "error"
                })
            }
        }
        else {
            toast({
                title: "Insufficient Information",
                description: "Please fill all required details",
                status: "warning",
                duration: 3000,
                isClosable: false
            })
        }
    }

    const handleRegister = async () => {
        const payload = {
            email, username, password, conPassword, country
        }
        if (!email || !username || !country || !password || !conPassword) {
            toast({
                title: "Insufficient Information",
                description: "Please fill all required details",
                status: "warning",
                duration: 3000,
                isClosable: false
            })
            return;
        }
        if (password === conPassword && length && speChar && smaLetter && capLetter) {
            try {
                setLoad(true);
                let res = await fetch(`${URL}/users/register`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                if (res.status === 200) {
                    signShow((prev) => prev = false);
                    toast({
                        title: "Successfully Registered",
                        description: "You are successfully registered, Please login",
                        duration: 3000,
                        isClosable: true,
                        status: "success"
                    })
                }
                setLoad(false);
            } catch (error) {
                setLoad(false);
            }
        } else {
            toast({
                title: "Password Error",
                description: "Password must be same with Confirm Password",
                duration: 3000,
                isClosable: true,
                status: "info"
            })
        }
    }
    const handlePasswordInput = (str) => {
        console.log(str);
        let Capital = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        let Small = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        let Special = ["!", "@", "#", "$", "%", "^", "&", "*"]

        let hasCapital = false;
        let hasSmall = false;
        let hasSpecial = false;

        if (str.length >= 8) {
            setLength(true);
        }
        else {
            setLength(false);
        }

        for (let i = 0; i < str.length; i++) {
            if (Capital.includes(str[i])) {
                hasCapital = true;
            }

            if (Small.includes(str[i])) {
                hasSmall = true;
            }

            if (Special.includes(str[i])) {
                hasSpecial = true;
            }
        }
        setCapLetter(hasCapital);
        setSmaLetter(hasSmall);
        setSpeChar(hasSpecial);
    }
    const buttonVariant = {
        hover: {
            background: "linear-gradient(to right, #6F7CDB, #B79FEA)",
            borderRadius: "10px",
            textShadow: "0px 0px 5px white",
            transition: { duration: 0.5 }
        },
        tap: {
            scale: 0.8
        }
    }
    return <DIV>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: "100%" }} transition={{ delay: 0.5 }}>
            {
                signShow === false ?
                    <Box className="cont" w={["90%", "90%", "60%", "50%", "40%"]} style={{
                        borderRadius: "20px",
                        backdropFilter: "blur(10px)",
                        padding: "2%",
                        background: "linear - gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                        WebkitBackdropFilter: "blur(10px)"
                    }}>
                        <h1 style={{ marginBottom: "3%" }}>Login</h1>
                        <IoPersonSharp style={{ border: "1px solid black", borderRadius: "50%", padding: "13", margin: "auto", marginBottom: "5%" }} size={"6em"} />
                        <Input type="email" placeholder="Enter Registered Email" borderColor={"black"} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} focusBorderColor="#B79FEA" mb={"3%"} p={2} required />
                        <InputGroup>
                            <Input type={showPass ? "text" : "password"} placeholder="Enter Password" borderColor={"black"} focusBorderColor="#B79FEA" mb={"3%"} p={2} value={loginPass} onChange={(e) => setLoginPass(e.target.value)} required />
                            <InputRightElement>
                                <IconButton size={"sm"} fontSize={"md"} icon={showPass ? <ViewOffIcon /> : <ViewIcon />} bg={"#B79FEA"} color={"white"} _hover={{ bg: "#B79FEA" }} onClick={() => setShowPass(!showPass)} />
                            </InputRightElement>
                        </InputGroup>
                        <motion.button
                            style={{
                                background: "linear-gradient(to right, #B79FEA, #6F7CDB)",
                                borderRadius: "40px",
                                border: "none",
                                fontSize: "1.5em",
                                padding: "3% 7.5% 3% 7.5%",
                                color: "white"
                            }}
                            variants={buttonVariant}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={handleLogin}
                        >
                            {load ? <Spinner /> : "Login"}
                        </motion.button>
                        <p style={{ margin: "3%" }}>New User ? <span onClick={() => setSignShow(!signShow)} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Register</span></p>
                    </Box>
                    :
                    <Box className="cont" w={["90%", "90%", "60%", "50%", "40%"]} style={{
                        borderRadius: "20px",
                        backdropFilter: "blur(10px)",
                        padding: "2%",
                        background: "linear - gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                        WebkitBackdropFilter: "blur(10px)"
                    }}>
                        <h1 style={{ marginBottom: "3%" }}>SignUp</h1>
                        <Input type="text" placeholder="Enter Username" borderColor={"black"} focusBorderColor="#B79FEA" mb={"3%"} p={2} value={username} onChange={(e) => setUsername(e.target.value)} isRequired />
                        <Input type="email" placeholder="Enter Email" borderColor={"black"} focusBorderColor="#B79FEA" mb={"3%"} p={2} value={email} onChange={(e) => setEmail(e.target.value)} isRequired />
                        <Select placeholder="Select Country" borderColor={"black"} focusBorderColor="#B79FEA" style={{ marginBottom: "3%" }} value={country} onChange={(e) => setCountry(e.target.value)} isRequired>
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
                        <Input type="password" placeholder="Enter Password" borderColor={"black"} focusBorderColor="#B79FEA" mb={"3%"} p={2} value={password} onChange={(e) => {
                            setPassword((prev) => prev = e.target.value)
                            handlePasswordInput(e.target.value)
                        }} isRequired />
                        <Input type="text" placeholder="Enter Confirm Password" borderColor={"black"} value={conPassword} onChange={(e) => setConPassword(e.target.value)} focusBorderColor="#B79FEA" mb={"1%"} p={2} isRequired />
                        <div style={{ textAlign: "left", paddingBottom: "1%" }}>
                            <p style={{ color: length ? "green" : "red" }}>Password should contain atleast 8 Characters {length ? "✅" : "❌"}</p>
                            <p style={{ color: smaLetter ? "green" : "red" }}>Password should contain atleast 1 Small Character (a,b,c,...) {smaLetter ? "✅" : "❌"}</p>
                            <p style={{ color: capLetter ? "green" : "red" }}>Password should contain atleast 1 Capital Character (A,B,C,...) {capLetter ? "✅" : "❌"}</p>
                            <p style={{ color: speChar ? "green" : "red" }}>Password should contain atleast 1 Special Character (!,@,#,$,%,^,&,*) {speChar ? "✅" : "❌"}</p>
                        </div>
                        <motion.button
                            style={{
                                background: "linear-gradient(to right, #B79FEA, #6F7CDB)",
                                borderRadius: "40px",
                                border: "none",
                                fontSize: "1.5em",
                                padding: "3% 7.5% 3% 7.5%",
                                color: "white"
                            }}
                            variants={buttonVariant}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={handleRegister}
                        >{load ? <Spinner /> : "Register"}</motion.button>
                        <p style={{ margin: "3%" }}>Already Register ? <span onClick={() => setSignShow(!signShow)} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Login</span></p>
                    </Box>
            }
        </motion.div>
    </DIV >
}
export default Login;
const DIV = styled.div`
    padding: 1%;
    height: 90vh;
    background: linear-gradient(to bottom, white, #a984fa);
    justify-content: center;
    transition: all 0.5s;
    align-items: center;
    div{
        margin: auto;
        text-align: center;
    }
    div h1{
        font-size: xx-large;
        font-weight: 500;
        margin-bottom: 2%;
    }
    
`