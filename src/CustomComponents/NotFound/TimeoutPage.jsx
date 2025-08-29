import React from 'react';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const TimeoutPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Flex
            minH="100vh"
            px={8}
            py={12}
            bg="gray.100"
            align="center"
            justify="center"
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 0, md: 5 }}
        >
            {/* Left Side - Text */}
            <Box flex="1" textAlign={{ base: 'center', md: 'left' }}
                mt={{ base: 20 }}


            >
                <Heading size={{ base: "xl", lg : "2xl" }} mb={4} color="red.500">
                    Session Timeout
                </Heading>
                <Text fontSize="lg" color="gray.600">
                    Your session has expired due to inactivity. Please log in again or return to the homepage.
                </Text>
                <Button mt={6} colorScheme="teal" size="lg" onClick={handleGoHome}>
                    Go to Home
                </Button>
            </Box>

            {/* Right Side - Card with Image */}
            <Box
                flex="1.5"
                bg="white"
                p={6}
                height={'100%'}
                borderRadius="2xl"
                // boxShadow="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
            // maxW="60%"
            >
                <Image
                    src="/imagelogo/timeout.svg"
                    alt="Session Timeout Sketch"
                    borderRadius="xl"
                    objectFit="cover"
                    maxH="400px"
                />
            </Box>
        </Flex>
    );
};

export default TimeoutPage;
