import { Box, Button, Card, Divider, Flex, Heading, Icon, Image, Menu, MenuButton, MenuList, MenuItem, Circle } from '@chakra-ui/react'
import React from 'react'
import { LuEqualApproximately } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSend } from "react-icons/tb";

import { SiConvertio } from "react-icons/si";
import { BsArrowBarDown, BsThreeDots } from "react-icons/bs";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { RiArrowRightDownLine } from "react-icons/ri";
import { BsBoxArrowInUpRight, BsBoxArrowInDownRight } from "react-icons/bs";
import TokenDropdown from '../Dropdown/TokenDropdown';


const Addresses = () => {


    return (
        <Flex w={'container.xxl'} gap={10} direction={'column'} alignItems={'center'} justifyContent={'start'} marginTop={'50px'} minH={'80vh'}>
            <Flex
                maxW={{ base: "100%", lg: '100%', xl: "100%" }}
                minW={{ base: "100%", sm: '100%', lg: '100%', xl: "100%" }}
                direction={'column'}
                gap={8}
            >
                <Flex ml={4} width={{ base: '90%', sm: '35%', md: '25%', lg: '20%' }}   >

                    <TokenDropdown />
                </Flex>

                <Address />


            </Flex>

        </Flex>
    )
}

const Address = () => {
    const arr = [1, 2]

    return (
        <>
            <Flex w={'100%'} p={4} direction={'column'}>
                <Heading size={'md'} my={4}> Your Bitcoin crypto addresses</Heading>
                <Flex w={'full'} p={{ base: 2, sm: 0 }} color={'gray'} direction={'column'} gap={3}>
                    <Flex gap={2} bg={'red.100'} p={2} color={'black'}>
                        <Box mt={1} color={'red'}>

                            <AiOutlineExclamationCircle />
                        </Box>
                        <Flex color={'gray'} >
                            <Box as='p' fontWeight={500} >

                                Make sure to only send Bitcoin through the selected network: Bitcoin.&nbsp;
                                <Box as='span' fontWeight={400}>

                                    Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                                </Box>
                            </Box>
                        </Flex>
                    </Flex>
                    {/* Heading start */}
                    <Flex w={'full'} fontSize={'12px'} fontWeight={500} mb={3} mt={10}>
                        <Flex flex={1.4} gap={10}>
                            <Flex flex={.8}> <Box ml={{ base: 0, sm: 12 }} >ADDRESSES</Box></Flex>
                            <Flex flex={1.2} display={{ base: 'none', md: 'Flex' }} ml={3}>NETWORK</Flex>
                        </Flex>
                        <Flex flex={.6}>
                            <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                <Flex display={{ base: 'none', lg: 'flex' }}>CREATED</Flex>
                                <Flex><Box display={'flex'} justifyContent={'end'} textAlign={'end'} >RECIVED TO ADDRESS</Box></Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* Heading End */}

                    {/* Data Part start */}
                    {
                        listData.map((data, index) => (
                            <>

                                <Flex key={index} w={'full'} bg={'white'} p={{ base: 3, sm: 4 }}>
                                    <Flex flex={1.4} gap={10}>
                                        <Flex flex={.8}>
                                            <Flex gap={{ base: 1, sm: 5 }}>
                                                <Flex gap={2} >
                                                    <Image boxSize={5} src={data.logo} mt={1}></Image>
                                                    <Box>{data.id}</Box>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Flex display={{ base: 'none', md: 'Flex' }} direction={'column'} flex={1.2} gap={2}>
                                            {data.network}
                                            <Flex display={{ base: 'flex', lg: 'none' }}>
                                                <Box fontSize={'12px'} >{data.date}</Box>


                                                {/* <Button variant={'outline'} size={'sm'} colorScheme='green'>Completed</Button> */}
                                            </Flex>

                                        </Flex>
                                    </Flex>
                                    <Flex flex={.6} >
                                        <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                            <Box fontSize={'12px'} display={{ base: 'none', lg: 'Flex' }}>{data.date}</Box>

                                            <Flex>
                                                <Flex direction={'column'} textAlign={'end'}  >
                                                    <Box alignItems={'end'}  >{data.amount}</Box>
                                                    <Box alignItems={'end'} fontSize={'12px'} >+0 BTC</Box>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </>
                        ))
                    }
                    {/* Data Part End */}

                </Flex>
            </Flex>
        </>
    )
}




const listData = [
    { id: crypto.randomUUID(), logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040', network: 'Bitcoin', amount: '+0 INR', date: new Date().toLocaleString() },
]



export default Addresses