import logo from "../Images/logo.png"
import { Avatar, Button, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { motion } from "framer-motion";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "@chakra-ui/icons"

const Navbar = () => {
    const auth = useSelector(store => store.AuthReducer);
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: "10vh", background: "#c7f8d6" }} transition={{ when: "beforeChildren", staggerChildren: 1 }}>
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
                            <Avatar src={`https://bit.ly/${auth.user.username}`} name={auth.user.username} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>item</MenuItem>
                            <MenuItem>item</MenuItem>
                            <MenuItem>item</MenuItem>
                        </MenuList>
                    </Menu>
                }
            </motion.div>
        </div >
    </motion.div >
}
export default Navbar;