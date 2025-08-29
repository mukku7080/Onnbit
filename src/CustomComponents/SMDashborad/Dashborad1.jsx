import { Flex, Box, Grid, GridItem, Button, Image, Center, Card, CardBody, CardHeader, Heading, Link, Divider } from '@chakra-ui/react'
import React from 'react';
import { RiArrowRightDoubleLine } from "react-icons/ri";


const Dashborad1 = () => {
    return (
        <Flex justifyContent={'center'} maxW={'container.xxl'} my={20} direction={'column'} gap={5}
            sx={
                {
                    "@media screen and (max-width:550px)": {
                        display: 'none'
                    }
                }
            }>

            <Box>

                <Flex justify={'space-between'}>
                    <Heading size={'lg'} fontWeight={'500'}> Catch Your Next Trading Opportunity</Heading>
                    <Button rightIcon={<RiArrowRightDoubleLine />} bg={'white'} color={'orange'}> See More</Button>
                </Flex>
            </Box>
            <Box>

                <Flex maxW={'container.xl'} gap={10} flexDirection={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }} >



                    {/* LeftSide dashboard */}
                    <Card>
                        <Box display={'flex'} gap={3}>
                            <Button as={Link} bg={'transparent'} _hover={{ borderBottom: '1px solid orange', textDecoration: 'none' }}  >Hot Derivatives</Button>
                            <Button as={Link} bg={'transparent'} _hover={{ borderBottom: '1px solid orange', textDecoration: 'none' }}>Hot Coins</Button>

                        </Box>
                        <Divider opacity={0.1} marginTop={'0px'} />
                        <CardBody>

                            <Box flex={1.2}>
                                <Grid templateColumns={'repeat(6,1fr)'} templateRows={'repeat(2,1fr)'} columnGap={10} rowGap={1}>
                                    <GridItem fontSize={'14px'} color={'gray'} mb={5} colSpan={2} pl={10} >Trading Pairs</GridItem>
                                    <GridItem fontSize={'14px'} color={'gray'} mb={5}>Last Traded Price</GridItem>
                                    <GridItem fontSize={'14px'} color={'gray'} mb={5}>24H Change</GridItem>
                                    <GridItem fontSize={'14px'} color={'gray'} mb={5}>Chart</GridItem>
                                    <GridItem fontSize={'14px'} color={'gray'} mb={5}>Trade</GridItem>

                                    {cryptoData.map((cdata, index) => (


                                        <React.Fragment key={index}>
                                            <GridItem colSpan={2} key={index} mb={5}>
                                                <Flex>

                                                    <Image src={cdata.img} boxSize={10} display="inline-block" mt={-1.5} />

                                                    {cdata.pair}

                                                </Flex>


                                            </GridItem>
                                            <GridItem key={index} mb={5}>{cdata.price}</GridItem>
                                            <GridItem key={index} mb={5}>{cdata.change}</GridItem>
                                            <GridItem key={index} mb={5}> <Image src={cdata.chart} maxW={'80px'} maxH={'40px'}></Image></GridItem>
                                            <GridItem key={index} mb={5}><Button variant='outline' color={'orange'}>Trade</Button></GridItem>

                                        </React.Fragment>


                                    ))}




                                </Grid>

                            </Box>
                        </CardBody>
                    </Card>

                    {/* RightSide Dashborad */}
                    <Card>
                        <CardBody>

                            <Heading size={'md'} >Top Gainers</Heading>

                            <Divider opacity={0.5} my={3} />
                            <Box flex={.8} >
                                <Grid templateColumns={'repeat(4,1fr)'} templateRows={'repeat(2,1fr)'} gap={8}>


                                    {gainers.map((cdata, index) => (


                                        <React.Fragment key={index}>
                                            <GridItem colSpan={2} key={index}>
                                                <Flex>

                                                    <Image src="imagelogo/etherium.png" boxSize={10} display="inline-block" mt={-1.5} />

                                                    {cdata.pair}

                                                </Flex>

                                            </GridItem>
                                            <GridItem key={index}>{cdata.price}</GridItem>
                                            <GridItem key={index}>{cdata.change}</GridItem>


                                        </React.Fragment>


                                    ))}



                                </Grid>
                                <Heading mt={5} size={'md'} >New Listing</Heading>
                                <Divider opacity={0.5} my={3} />
                                <Grid templateColumns={'repeat(4,1fr)'} templateRows={'repeat(2,1fr)'} gap={8}>


                                    {losers.map((cdata, index) => (


                                        <React.Fragment key={index}>
                                            <GridItem colSpan={2} key={index}>
                                                <Flex>

                                                    <Image src="imagelogo/etherium.png" boxSize={10} display="inline-block" mt={-1.5} />

                                                    {cdata.pair}

                                                </Flex>

                                            </GridItem>
                                            <GridItem key={index}>{cdata.price}</GridItem>
                                            <GridItem key={index}>{cdata.change}</GridItem>


                                        </React.Fragment>


                                    ))}



                                </Grid>

                            </Box>
                        </CardBody>
                    </Card>
                </Flex>
            </Box>
            <Box>

                <Flex gap={5}>
                    <Button rightIcon={<RiArrowRightDoubleLine />} bg={'orange'} color={'white'} > Get Started</Button>
                    <Heading size={'sm'} fontWeight={'500'} display={'flex'} alignItems={'center'} color={'orange'}> Sign up now to create your own portfolio for free!</Heading>
                </Flex>
            </Box>

        </Flex>
    )
}


const cryptoData = [
    {
        pair: "BTCUSDT",
        price: 105260.60,
        change: "+3.03%",
        chart: "imagelogo/grow1.png",
        img: "imagelogo/bitcoin.png"
    },
    {
        pair: "ETHUSDT",
        price: 3193.45,
        change: "+2.11%",
        chart: "imagelogo/grow1.png",
        img: "imagelogo/etherium.png"

    },
    {
        pair: "SOLUSDT",
        price: 239.690,
        change: "+3.96%",
        chart: "imagelogo/grow1.png",
        img: "imagelogo/bitcoin.png"
    },
    {
        pair: "XRPUSDT",
        price: 3.1154,
        change: "-0.07%",
        chart: "imagelogo/grow1.png",
        img: "imagelogo/etherium.png"
    },
    {
        pair: "WIFUSDT",
        price: 1.1989,
        change: "-6.41%",
        chart: "imagelogo/grow1.png",
        img: "imagelogo/bitcoin.png"
    },
    {
        pair: "TRUMPUSDT",
        price: 27.883,
        change: "+1.09%",
        chart: "imagelogo/grow1.png",
        img: "imagelogo/etherium.png"
    }
];

const gainers = [
    {
        pair: "BTCUSDT",
        price: 105260.60,
        change: "+3.03%",
        chart: "imagelogo/grow1.png"
    },
    {
        pair: "ETHUSDT",
        price: 3193.45,
        change: "+2.11%",
        chart: "imagelogo/grow1.png"
    },
    {
        pair: "SOLUSDT",
        price: 239.690,
        change: "+3.96%",
        chart: "imagelogo/grow1.png"
    }
];

const losers = [
    {
        pair: "XRPUSDT",
        price: 3.1154,
        change: "-0.07%",
        chart: "imagelogo/grow1.png"
    },
    {
        pair: "WIFUSDT",
        price: 1.1989,
        change: "-6.41%",
        chart: "imagelogo/grow1.png"
    },
    {
        pair: "TRUMPUSDT",
        price: 27.883,
        change: "+1.09%",
        chart: "imagelogo/grow1.png"
    }
];


export default Dashborad1