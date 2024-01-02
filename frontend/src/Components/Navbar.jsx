import logo from "../Images/logo.png"
import { Box, Button, Flex, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
const Navbar = () => {
    return <Flex justifyContent={"space-between"} alignItems={"center"} w={"100vw"}>
        <div className="logo">
            <Link to={"/"}>
                <Image src={logo} objectFit={"cover"} w={["80%", "80%", "50%", "50%", "50%"]} cursor={"pointer"} p={5} />
            </Link>
        </div>
        <Box mr={5}>
            <Link to={"/login"}>
                <Button
                    _hover={{
                        scale: 1.1,
                        borderRadius: "0",
                        transition: "all 0.3s"
                    }}
                    _active={{
                        scale: 0.9,
                        transition: "all 0.3s"
                    }}
                    colorScheme="purple"
                    borderRadius={"40px"}
                >
                    LOGIN
                </Button>
            </Link>
        </Box>
    </Flex>
}
export default Navbar;