import logo from "../Images/logo.png"
import { Box, Image, Link as ChakraLink, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom"
const Navbar = () => {
    return <Flex justifyContent={"space-between"} alignItems={"center"} pr={5} pl={5}>
        <Box>
            <ChakraLink as={Link} to={"/"}>Home</ChakraLink>
        </Box>
        <Box>
            <Image src={logo} m={"auto"} objectFit={"cover"} w={"60%"} cursor={"pointer"} p={5} />
        </Box>
        <ChakraLink>
            <Button colorScheme="purple" >Login</Button>
        </ChakraLink>
    </Flex>
}
export default Navbar;