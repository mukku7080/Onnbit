import { AbsoluteCenter, Box, Card, CardBody, Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import CryptoAccordion from '../Accordian/CryptoAccordion';
import Accordion from 'react-bootstrap/Accordion';


const Section1 = () => {
    return (
        <>


            <Box w={'container.xxl'} bg={'black'} display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={10} alignItems={'center'} minH={'450px'} >
                <Flex
                    gap={10}
                    direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }} minW={'80%'}
                    alignItems={'center'}
                    mt={{ base: 20, lg: 0 }}



                >


                    {/* LeftSection Start----------------------------------------------------------------- */}
                    <Card flex={'1'}
                        boxShadow={'none'}
                        w={'auto'}
                        bgImage={'https://www.bybitglobal.com/bycsi-root/bybit/deadpool/2470ad99dd4f11ef844fa625bea524b2.png?quality=70&format=avif&resize=width/2880'}
                        bgRepeat={'no-repeat'}
                        bgSize={'cover'}
                        bgPosition={'center'}
                        minH={'450px'}

                    >






                        <CardBody>

                            <Flex gap={5} direction={'column'} ml={20}  >
                                <Heading maxW={'500px'} color={'white'} >Copy Trading Gold&FX Fiesta</Heading>
                                <Box maxW={'500px'} as='p' color={'orange'} >
                                    Win your share of 130,000 USDT!
                                </Box>


                                <Flex gap={5} wrap={{ base: 'wrap', sm: 'nowrap' }}>

                                    {items.map((data, index) => (
                                        <Box key={index} maxW={'82px'} minH={'82px'} display={'flex'} alignItems={'center'} borderRadius={'8px'} justifyContent={'center'} flexDirection={'column'} >
                                            <Image src={data.imgsrc} alt={data.title} w={'100%'} maxH={'40px'} bg={'white'} maxW={'40px'} />
                                            <Box as='p' fontSize={'10px'} minW={'66px'} textAlign={'center'} color={'white'} p={1}>{data.txt}</Box>
                                        </Box>

                                    ))}
                                </Flex>


                                <Flex minW={'82px'} minH={'82px'} gap={5}>
                                    <Box minW={'82px'} minH={'82px'} bg={'white'} display={'flex'} alignItems={'center'} borderRadius={'8px'} justifyContent={'center'} flexDirection={'column'} >
                                        <Image src='https://www.bybitglobal.com/common-static/fhs/bybit-home-new/qrCode.png?quality=70&format=webp&resize=width/150' alt='Qr' w={'100%'} maxH={'82px'} maxW={'82px'} />
                                    </Box>


                                    <Box display={'flex'} flexDirection={'column'} gap={0} justifyContent={'center'}>

                                        <Box as='p' fontSize={'10px'} color={'gray'}>Scan Now to Download</Box>
                                        <Box as='p' color={'gray'}>iOS & Android</Box>
                                    </Box>
                                </Flex>

                            </Flex>
                        </CardBody>

                    </Card>
                    {/* LeftSection End----------------------------------------------------------------- */}




                    {/* Right Side Section------------------------------------------------------------------------ */}







                </Flex>





            </Box>

        </>
    )
}



const items = [
    { txt: "App Store", imgsrc: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/pc/appstore-47ff262997f8d723706ca638f8bd9d67.svg" },
    { txt: "Android APK", imgsrc: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/pc/android-bd8aee1484ce1680a0a815eac2a3e211.svg" },
    { txt: "Google Play", imgsrc: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/pc/googleplay-1e427977e42df2cfc0b148c2865179c2.png" },
    { txt: "API", imgsrc: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/pc/api-03d915f9273477c6390cdc44006eb22f.svg" }

];

export default Section1