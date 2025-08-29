import React from 'react'
import { Container, Flex, Text, Box, Link, Divider, Center, Image, Icon, Circle, useColorModeValue } from '@chakra-ui/react'
import { FaInstagram, FaLink, FaTelegramPlane, FaLinkedinIn, FaFacebookF, FaYoutube, FaApple, FaPlay } from "react-icons/fa";


const Footer = () => {
  const sociallink = [FaLink, FaLinkedinIn, FaTelegramPlane, FaInstagram, FaFacebookF, FaYoutube];

  const downloadLInk = [FaApple, FaYoutube]
  const bgColor = useColorModeValue("#f5f7fa", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Container maxW={'container.xxl'} bg={bgColor} height={'auto'} display={'flex'} justifyContent={'center'} borderTop={'1px solid #ccc'} mt={10} >
      {/* mainFlex */}


      <Flex maxW={'container.xxl'} direction={'column'} align={'center'} justifyContent={'center'} height={'100%'}>



        {/* SecondSection ---------------------------------------------------------------------------------------------------------- */}
        <Flex justify={'space-around'} flexWrap={'wrap'} width={'100%'} alignContent={'center'} mt={5} gap={10}>


          <Box flex={{ base: "1 0 100%", lg: "1" }} display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'} gap={5} textAlign={'center'}>

            <Image src='/imagelogo/cryptico.png' w={'160px'} h={'150px'} mx={0}></Image>


            <Flex display={{ base: 'none', sm: 'none', md: 'flex' }} gap={3}>
              {sociallink.map((icon, index) => (


                <Circle key={index} size={6} bgColor={'white'} border={'1px solid #ffffff99'} mb={3}>

                  <Icon as={icon} color={'gray'} ></Icon>
                </Circle>))
              }

            </Flex>


          </Box>


          <Box flex={{ base: "1 0 100%", lg: "1" }} display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'} gap={2} textAlign={'center'}>
            <Text as='h1' fontSize={'2xl'} fontWeight={'500'} color={'#ffb11a'} >About</Text>


            {About.map((about, index) => (
              <Link key={index} color={'gray'} fontSize='14px'>{about.name}</Link>

            ))}


          </Box>

          <Box flex={{ base: "1 0 100%", lg: "1" }} display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'} gap={2} textAlign={'center'}>
            <Text as='h1' fontSize={'2xl'} fontWeight={'500'} color={'#ffb11a'} >Service</Text>

            {services.map((about, index) => (
              <Link key={index} color={'gray'} fontSize='14px'>{about.name}</Link>

            ))}


          </Box>
          <Box flex={{ base: "1 0 100%", lg: "1" }} display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'} gap={2} textAlign={'center'}>
            <Text as='h1' fontSize={'2xl'} fontWeight={'500'} color={'#ffb11a'} >Support</Text>

            {support.map((about, index) => (
              <Link key={index} color={'gray'} fontSize='14px'>{about.name} </Link>

            ))}


          </Box>
          <Box flex={{ base: "1 0 100%", lg: "1" }} display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'} gap={2} textAlign={'center'}>
            <Text as='h1' fontSize={'2xl'} fontWeight={'500'} color={'#ffb11a'} >Products</Text>



            {products.map((about, index) => (
              <Link key={index} color={'gray'} fontSize='14px'>{about.name}</Link>

            ))}

          </Box>





          <Box
            flex={1}
            display={{ base: 'flex', sm: 'flex', md: 'none' }}
            justifyContent={'center'}
            gap={5}
            sx={{
              "@media screen and (max-width: 254px)": {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }
            }}

          >
            {sociallink.map((icon, index) => (


              <Circle key={index} size={6} bgColor={'white'} border={'1px solid #ffffff99'} mb={3}>

                <Icon key={index} as={icon} color={'gray'} ></Icon>
              </Circle>))
            }
          </Box>

        </Flex>


        {/* ThirdSection ---------------------------------------------------------------------------------------------------------- */}
        <Divider color={'gray'} width={'95%'} mt={5} mb={5}></Divider>

        <Flex direction={{ base: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'row' }} color={'white'} flexWrap={'wrap'} margin={'0 80px'} mb={10} gap={5}>
          <Box flex={'2.3'} as='p' fontSize={'12px'} color={'gray'}>
            "CRYPTICO" is a registered trademark of CRYPTICO, Inc. Copyright © 2024 CRYPTICO, Inc. All Rights Reserved.
            CRYPTICO Inc. has no relation to MoneyGram, Western Union, Payoneer, WorldRemit, Paxum, PayPal, Amazon,
            OkPay, Payza, Walmart, Reloadit, Perfect Money, WebMoney, Google Wallet,
            BlueBird, Serve, Square Cash, NetSpend, Chase QuickPay, Skrill, Vanilla, MyVanilla, OneVanilla, Neteller,
            Venmo, Apple, ChimpChange or any other payment method.

          </Box>
          <Box as='p' flex={'.7'} fontSize={{ lg: '14px', xl: '12px' }} color={'gray'}>

            Copyright &copy; 2024 CRYPTICO. All rights reserved.
          </Box>


        </Flex>



      </Flex>



    </Container>
  )
}


const About = [
  { name: "About Cryptico", href: "#" },
  { name: "Press Room", href: "#" },
  { name: "Cryptico Communities", href: "#" },
  { name: "Announcements", href: "#" },
  { name: "Risk Disclosure", href: "#" },
  { name: "Whistleblower Channel", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Islamic Account", href: "#" },
  { name: "Fees & Transactions Overview", href: "#" },
];

const services = [
  { name: "One-Click Buy", href: "#" },
  { name: "P2P Trading (0 Fees)", href: "#" },
  { name: "VIP Program", href: "#" },
  { name: "Referral Program", href: "#" },
  { name: "Institutional Services", href: "#" },
  { name: "Listing Application", href: "#" },
  { name: "Tax API", href: "#" },
  { name: "Audit", href: "#" },
];


const support = [
  { name: "Submit a Request", href: "#" },
  { name: "Help Center", href: "#" },
  { name: "Support Hub", href: "#" },
  { name: "User Feedback", href: "#" },
  { name: "Cryptico Learn", href: "#" },
  { name: "Trading Fee", href: "#" },
  { name: "API", href: "#" },
  { name: "Authenticity Check", href: "#" },
];
const products = [
  { name: "Trade", href: "#" },
  { name: "Derivatives", href: "#" },
  { name: "Earn", href: "#" },
  { name: "Launchpad", href: "#" },
  { name: "NFT", href: "#" },
  { name: "Cryptico Card", href: "#" },
  { name: "TradingView", href: "#" },
];

export default Footer



