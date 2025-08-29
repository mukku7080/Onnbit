import { Box, Card, CardBody, Flex, Grid, GridItem, CardHeader, Link, Heading, TableContainer, Thead, Tr, Th, Td, Table, Tbody, Button, Image, Icon, Center } from '@chakra-ui/react'
import React from 'react'

const SMDashboard = () => {
    return (
        <Box maxW='container.xxl' bg={''} display={'flex'} justifyContent='center' alignItems={'center'} mx={20}>

            <Grid maxW={'container.lg'} templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }} gap={10}>
                <GridItem colSpan={{ base: 1, lg: 3 }} bg={''} w={'full'}>
                    <Flex>

                        <Card w={'full'} >
                            <CardHeader display={'flex'} gap={5}>
                                <Heading size={'md'}>Hot Derivatives</Heading>
                                <Heading size={'md'}>Hot Coin</Heading>
                            </CardHeader>
                            <CardBody borderTop={'1px solid #fafafa'} W={'full'} >

                                <TableContainer w={'100%'}>
                                    <Table variant={'unstyled'} w={'full'}>

                                        <Thead color={'gray'}>
                                            <Tr>
                                                <Th>Trading Pairs</Th>
                                                <Th>Last Traded Price</Th>
                                                <Th>24H Change</Th>
                                                <Th>Chart</Th>
                                                <Th>Trade</Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody>



                                            {cryptoData.map((cdata, index) => (



                                                <Tr key={index} >

                                                    <Td>


                                                        <Flex>

                                                            <Image src="imagelogo/etherium.png" boxSize={10} display="inline-block" mt={1} />
                                                            <Center>

                                                                {cdata.pair}
                                                            </Center>

                                                        </Flex>
                                                    </Td>
                                                    <Td>{cdata.price}</Td>
                                                    <Td>{cdata.change}</Td>
                                                    <Td>
                                                        <Image src={cdata.chart}></Image>
                                                    </Td>
                                                    <Td><Button variant='outline' color={'orange'}>Trade</Button></Td>
                                                </Tr>
                                            ))}



                                        </Tbody>
                                    </Table>

                                </TableContainer>

                            </CardBody>
                        </Card>

                    </Flex>


                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 2 }} bg={''}>
                    <Card>
                        <CardBody>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur officia quo minima ea numquam, sint repellat saepe labore excepturi cum, quidem fuga illum quia consectetur consequatur explicabo odit, incidunt voluptatibus ducimus est perspiciatis
                            porro fugiat! Alias omnis maxime ea illo, quia vero praesentium consequatur ullam officia fugiat magni hic est!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptate, aspernatur culpa qui libero neque cupiditate accusamus voluptatem officiis, quam quos accusantium assumenda hic consequatur quisquam laborum eligendi reprehenderit dicta! Cupiditate a laboriosam nemo necessitatibus, officia adipisci quod atque ab consequuntur nulla temporibus asperiores odit cum labore magni facilis placeat?
                        </CardBody>
                    </Card>
                </GridItem>

            </Grid>
        </Box>
    )
}


const cryptoData = [
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
    },
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
export default SMDashboard