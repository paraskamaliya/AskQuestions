import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const PlusButton = () => {
    return (
        <motion.div style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            backgroundColor: "#B79FEA",
            color: "white",
            padding: "0.8% 1% 0.8% 1%",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "2px 3px 3px #868686"
        }} initial={{ x: 100 }} animate={{ x: 0 }} whileHover={{ boxShadow: "0px 0px 2px #868686" }}>
            <Link to={"/add"}>
                <motion.button >
                    <FaPlus />
                </motion.button>
            </Link>
        </motion.div >
    );
}
export default PlusButton;