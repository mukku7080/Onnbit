import { AbsoluteCenter, Box, Card, CardBody, Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react' 
 
 
 
 export default function ChakraMarquee() {
    return (
      <Box
        overflow="hidden"
        whiteSpace="nowrap"
        position="relative"
        width="100%"
        background="red"
        padding="10px 0"
        color="white"
        fontSize="24px"
        sx={{
          "@keyframes marquee": {
            "0%": { transform: "translateX(100%)" },
            "50%": { transform: "translateX(-100%)" }
          },
          animation: "marquee 10s linear infinite"
        }}
      >
        🚀 Welcome to My Crypto Dashboard | Live Market Updates | Trade Now!
      </Box>
    );
  }