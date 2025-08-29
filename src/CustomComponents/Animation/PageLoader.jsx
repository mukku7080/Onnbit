import { useState, useEffect } from "react";
import { Spinner, Center, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const PageLoader = ({ children }) => {
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500); // Simulating delay
        return () => clearTimeout(timer);
    }, []);

    return loading ? (
        <Center height="100vh">
            <Spinner size="xl" color="orange.500" />
        </Center>
    ) : (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6,ease:'easeOut' }}
            style={{ minHeight: "100vh", width: "100%" }}
        >
            {children}
        </motion.div>
    );
};


export default PageLoader;
