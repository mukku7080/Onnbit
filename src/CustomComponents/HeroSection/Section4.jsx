import { AbsoluteCenter, Box, Card, CardBody, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import FaqAccordion from '../Accordian/FaqAccordian';



const Section4 = () => {
    return (
        <>


            <Box w={'container.xxl'} bg={''} display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={10} alignItems={'center'} my={10} minH={'85vh'}>
                <Flex gap={10} direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }} maxW={'90%'} alignItems={'center'}>


                    {/* LeftSection Start----------------------------------------------------------------- */}
                    <Card flex={'1'} boxShadow={'none'} w={'auto'} >
                        <CardBody>

                            <Flex flex={1} gap={5} direction={'column'}  >
                                <Heading maxW={'500px'} >Trade AnyTime,Anywhere.</Heading>
                                <Box maxW={'500px'} as='p'>
                                    Open new positions instatnly,wheterher it's on Cryptico App or Web.
                                </Box>


                                <Flex gap={5} wrap={{ base: 'wrap', sm: 'nowrap' }}>

                                    {items.map((data, index) => (
                                        <Box key={index} maxW={'82px'} minH={'82px'} display={'flex'} alignItems={'center'} borderRadius={'8px'} justifyContent={'center'} flexDirection={'column'} >
                                            <Image src={data.imgsrc} alt={data.title} w={'100%'} maxH={'40px'} maxW={'40px'} />
                                            <Box as='p' fontSize={'10px'} minW={'66px'} textAlign={'center'} p={1}>{data.txt}</Box>
                                        </Box>

                                    ))}
                                </Flex>


                                <Flex minW={'82px'} minH={'82px'} gap={5}>
                                    <Box minW={'82px'} minH={'82px'} bg={'white'} display={'flex'} alignItems={'center'} borderRadius={'8px'} justifyContent={'center'} flexDirection={'column'} >
                                        <Image src='https://www.bybitglobal.com/common-static/fhs/bybit-home-new/qrCode.png?quality=70&format=webp&resize=width/150' alt='Qr' w={'100%'} maxH={'82px'} maxW={'82px'} />
                                    </Box>


                                    <Box display={'flex'} flexDirection={'column'} gap={2} justifyContent={'center'}>

                                        <Box as='p' fontSize={'10px'} color={'gray'}>Scan Now to Download</Box>
                                        <Box as='p' color={'black'}>iOS & Android</Box>
                                    </Box>
                                </Flex>

                            </Flex>
                        </CardBody>

                    </Card>
                    {/* LeftSection End----------------------------------------------------------------- */}




                    {/* Right Side Section------------------------------------------------------------------------ */}


                    <Card boxShadow={'none'} flex={'1'} >
                        <CardBody >

                            {/* <Box flex={1}> */}

                            <Image src='https://www.bybitglobal.com/common-static/fhs/bybit-home-new/spotlight/guidedDownload-719a743bafab69372545119a49d84970.png?quality=70&format=avif&resize=width/686'></Image>

                            {/* </Box> */}
                        </CardBody>
                    </Card>




                </Flex>


                {/* Below Section */}
                <Box
                    w="100%"
                    minW={{ base: 'container', sm: 'container.sm', md: 'container.md', lg: 'container.lg' }}
                    sx={{
                        "@media screen and (max-width: 650px)": {
                            minW: '400px',
                        },
                        "@media screen and (max-width: 500px)": {
                            minW: "300px",
                        },
                    }}
                    gap={2}
                >

                    <Heading size={'lg'} fontWeight={'500'} mt={20} pl={6}>FAQs</Heading>


                    <FaqAccordion />
                    {/* <Accordion defaultActiveKey="" flush >
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header  >What is Cryptico</Accordion.Header>
                            <Accordion.Body  >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>How to invest in Cryptico</Accordion.Header>
                            <Accordion.Body >
                                Another content goes here...
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> */}
                </Box>


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

export default Section4