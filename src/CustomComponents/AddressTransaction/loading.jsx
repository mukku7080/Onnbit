import { Box, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import gifLoader from './loading.gif'; // ⬅️ your GIF file

export const Loading = () => {
    const [loading, setLoading] = useState(false);

    const sendBitcoin = async () => {
        try {
            setLoading(true); // Show loader
            // ... your transaction code ...
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <>
            {/* Your form and button code here */}

            {loading && (
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    width="100vw"
                    height="100vh"
                    bg="rgba(0, 0, 0, 0.7)"
                    zIndex="9999"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Image src={gifLoader} alt="Loading..." boxSize="150px" />
                </Box>
            )}
        </>
    );
};
