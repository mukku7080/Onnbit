import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { color } from "framer-motion";

export default function FastCounterChakra() {
    const [count, setCount] = useState(180);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => (prev < 200 ? prev + 1 : 200));
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box fontSize="36px" fontWeight="bold" color="">
            {count}
            <Box fontSize={'14px' }color={'gray'}>This is cont </Box>
        </Box>
    );
}
