import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tooltip } from '@chakra-ui/react'
const PlusButton = () => {
    const isSmallScreen = window.innerWidth <= 500
    return (
        <Link to={"/add"}>
            <Tooltip label="Add Question">
                <motion.div className="plus" style={{
                    position: "fixed",
                    bottom: "50px",
                    right: "50px",
                    backgroundColor: "#27AE60",
                    color: "white",
                    padding: isSmallScreen ? "0.5rem" : "0.8% 1% 0.8% 1%",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    boxShadow: "2px 3px 3px #868686",
                }} initial={{ x: 100 }} animate={{ x: 0 }} whileHover={{ boxShadow: "0px 0px 2px #868686" }}>
                    <motion.button >
                        <FaPlus />
                    </motion.button>
                </motion.div>
            </Tooltip >
        </Link>
    );
}
export default PlusButton;