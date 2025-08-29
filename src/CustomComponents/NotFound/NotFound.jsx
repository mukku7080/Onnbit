import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gradientButtonStyle } from '../Wallet/CreateWallet';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#FFF4E6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '2rem',
                textAlign: 'center',
            }}
        >
            <motion.img
                src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                alt="Page not found"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                // maxWidth={{ base: '300px' }}
            style={{ maxWidth: '300px', marginBottom: '2rem' }}
            />

            <motion.h1
                style={{ fontSize: '2.5rem', color: '#FF6600', fontWeight: 'bold', marginBottom: '1rem' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                404 - Page Not Found
            </motion.h1>

            <motion.p
                style={{ fontSize: '1.1rem', color: '#333', maxWidth: '500px', marginBottom: '2rem' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Sorry, we couldn't find what you were looking for. Maybe the page has moved or never existed. Let's get you back to the Cryptico homepage!
            </motion.p>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <Button
                    size="lg"
                    sx={gradientButtonStyle}
                    // bg="#FF6600"
                    // color="white"
                    // _hover={{ bg: '#e65c00' }}
                    onClick={() => navigate('/')}
                >
                    Go Home
                </Button>
            </motion.div>
        </div>
    );
};

export default NotFound;
