import logo from "../Images/logo.png"
import { Avatar, Button, Image, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react"
import { motion } from "framer-motion";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon } from "@chakra-ui/icons"
import { LOGOUT } from "../Redux/AuthReducer/actionType";

const Navbar = () => {
    const auth = useSelector(store => store.AuthReducer);
    const URL = "https://askquestions.onrender.com";
    const dispatch = useDispatch();
    const toast = useToast();
    const handleLogout = async () => {
        try {
            let res = await fetch(`${URL}/users/logout`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${auth.token.split('"')[0]}`,
                    "content-type": "application/json"
                }
            })
            if (res.status == 200) {
                dispatch({ type: LOGOUT })
                toast({
                    title: "Logout Successfully",
                    description: "You are Logged out Successfully",
                    duration: 3000,
                    isClosable: false,
                    status: "success"
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return <div style={{ height: "10vh", borderBottom: "1px solid black", background: "rgba(100, 150, 190, 0.3)" }} >
        <div style={{ width: "95%", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1%", height: "100%" }}>
            <motion.div>
                <Link to={"/"}>
                    <Image src={logo} objectFit={"cover"} w={["70%", "70%", "50%", "50%", "50%"]} cursor={"pointer"} />
                </Link>
            </motion.div>
            <motion.div >
                {auth.isAuth == false ?
                    <Link to={"/login"}>
                        <Button letterSpacing={"1px"} color="white" backgroundColor="#B79FEA" borderRadius={"40px"} boxShadow={"0px 2px 2px black"} _hover={{ borderRadius: 0, transition: "all 0.5s", backgroundColor: "#9f72ff", transform: "scale(1.1)" }} _active={{ transform: "scale(0.9)", transition: "all 0.5s" }}>
                            LOGIN
                        </Button>
                    </Link> :
                    <Menu>
                        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} rightIcon={<ChevronDownIcon fontSize={"2xl"} />}>
                            <Avatar src={`https://bit.ly/`} name={auth.user.username} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem textAlign={"center"} borderBottom={"1px solid black"}>
                                <Link to={"/myquestions"} style={{ width: "100%", fontWeight: 500, fontSize: "larger" }}>My Questions</Link>
                            </MenuItem>
                            <MenuItem textAlign={"center"} borderBottom={"1px solid black"}>
                                <Link to={"/profile"} style={{ width: "100%", fontWeight: 500, fontSize: "larger" }}>My Profile</Link>
                            </MenuItem>
                            <MenuItem textAlign={"center"}>
                                <Button style={{ margin: "auto", width: "100%", fontWeight: 500, fontSize: "larger", background: "red", color: "white" }} onClick={handleLogout}>Logout</Button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                }
            </motion.div>
        </div >
    </div>
}
export default Navbar;