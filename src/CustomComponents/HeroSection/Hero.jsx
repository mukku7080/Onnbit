import React, { useEffect } from 'react'
import CardComponent from '../Cards/CardComponent'
import { Box, Button, Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import Section3 from './Section3'
import { RiArrowRightDoubleLine } from "react-icons/ri";
import Section4 from './Section4';
import SMDashboard from '../SMDashborad/SMDashboard';
import Dashborad1 from '../SMDashborad/Dashborad1';
import Section1 from './Section1';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("authToken")
        console.log("Hero", token);
        if (token === "undefined") {
            navigate("/login")
            localStorage.removeItem("authToken")
        }
    }, [])

    const txtcolor = useColorModeValue('black', 'white');
    const bgcolor = useColorModeValue('linear-gradient(96.76deg, rgba(255, 247, 230, .2) 13.68%, rgba(255, 202, 99, .2) 38.25%, rgba(255, 240, 208, .2) 81.97%), #fff;', 'gray')
    return (
        <>
            <Flex direction={'column'} marginTop={'48px'}>


                <Section1 />
                <Container maxW={'container.xl'} mb={10} >



                    <Dashborad1 />
                    {/* Section-2  -------------------------------------------------------------------------------------*/}
                    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={5}>

                        <Heading size={'lg'}>Get Started in 30 Seconds!</Heading>

                        <Flex justifyContent={'space-between'} maxW={'container.xl'} direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}>

                            {cardData.map((cdata, index) => (

                                <CardComponent
                                    key={cdata.title}
                                    img={cdata.img}
                                    title={cdata.title}
                                    txt={cdata.txt}
                                    btntxt={cdata.btntxt}
                                />

                            ))}
                        </Flex>
                    </Box>

                    {/* Section-3  ----------------------------------------------------------------------------------------- */}
                    <Heading size={'lg'} display={'flex'} justifyContent={'center'} my={10} >Discover More Products</Heading>
                    <Section3 />
                    <Section4 />






                    {/* Embark on Your Crypto Journey Today! */}

                </Container>
                <Box w={'100%'} minH={'200px'} bg={bgcolor} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Flex direction={'column'} w={'100%'} gap={5}>
                        <Heading size={'md'} display={'flex'} justifyContent={'center'} color={txtcolor}>Embark on Your Crypto Journey Today!</Heading>
                        <Box display={'flex'} justifyContent={'center'}>

                            <Button size={'md'} bg={'orange'} onClick={() => navigate('/signup')} rightIcon={<RiArrowRightDoubleLine />}>Sign Up Now</Button>
                        </Box>
                    </Flex>
                </Box>
            </Flex>


        </>
    )
}

const cardData = [
    {
        img: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/spotlight/createAccont1-e0f53b10c86be38180f13cb24c4fab98.png",
        title: "Create Account",
        txt: "Provide your email address and check your inbox for a 6-digit verification code. Simply enter the code on the verification page to complete your signup.",
        btntxt: "Sign Up Now"
    },
    {
        img: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/spotlight/createAccount2-62b09e07db740905e4fb774e5785c79f.png",
        title: "Make Deposit",
        txt: "Fund your account easily on the Bybit Web or App.",
        btntxt: "Deposit Now"
    },
    {
        img: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/spotlight/createAccount3-cb0a3c9c6d134f3aadffd1f7bb35f5c3.png",
        title: "Start Trading",
        txt: "Kick off your journey with your favorite Spot pairs or Futures contracts!",
        btntxt: "Trade Now"
    }
];



export default Hero