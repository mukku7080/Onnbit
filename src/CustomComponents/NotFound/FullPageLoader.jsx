import { Box, Text, Spinner, Image, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const FullPageLoader = () => {
    return (
        <Box
            height="100vh"
            width="100vw"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgGradient="linear(to-br, gray.900, gray.800)"
            color="white"
            flexDirection="column"
        >
            <VStack spacing={6}>
                <Image
                    src="https://media.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif"
                    alt="Loading"
                    boxSize="100px"
                    animation={`${spinAnimation} 5s linear infinite`}
                />

                <Text fontSize="2xl" fontWeight="bold" color="teal.300">
                    Loading your experience...
                </Text>

                {/* <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="teal.300"
                    size="xl"
                /> */}
            </VStack>
        </Box>
    );
};

export default FullPageLoader;
