import React from 'react'
import { Box, Button, Card, Flex, Image, Link, useColorModeValue } from '@chakra-ui/react'
import { MdOutlineContentCopy } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import UserDrware from '../../Drwares/UserDrware';

const TradeHistory = () => {
    const bgcolor = useColorModeValue('gray.100', 'gray.700');





    return (
        <>
            <Card borderRadius={5} p={10} gap={4} boxShadow={'lg'}>
                <Box>You are viewing all trades for the last 3 days</Box>
                <Flex border={'1px solid rgba(128, 128, 128, 0.3)'} py={1} px={3} justifyContent={'space-between'} bgColor={bgcolor} boxShadow={'lg'} borderRadius={'5px'}>
                    <Box fontWeight={500} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        Filter
                    </Box>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <UserDrware />
                    </Box>
                </Flex>
                <Flex border={'1px solid rgba(128, 128, 128, 0.3)'} py={1} px={3} justifyContent={'space-between'} bgColor={bgcolor} boxShadow={'lg'} borderRadius={'5px'}>
                    <Box fontWeight={500} display={'flex'} alignItems={'center'} justifyContent={'center'} color={'gray'}>
                        Export Trades
                    </Box>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button colorScheme='orange'>

                            <LuUpload />
                        </Button>
                    </Box>
                </Flex>

                <Flex border={'1px solid rgba(128, 128, 128, 0.3)'} p={3} justifyContent={'space-between'} bgColor={bgcolor} boxShadow={'lg'} borderRadius={'5px'}>
                    <Box fontWeight={500} display={'flex'} alignItems={'center'} justifyContent={'center'} color={'gray'}>
                        Completed Trades:
                        0% (trades out of 0)
                    </Box>

                </Flex>
                <Flex direction={'column'} border={'1px solid rgba(128, 128, 128, 0.3)'} >

                    <Flex justifyContent={'space-between'} minH={'105px'} bg={bgcolor} borderBottom={'1px solid rgba(128, 128, 128, 0.3)'} px={3}>
                        <Flex fontWeight={500} alignItems={'center'} justifyContent={'center'} color={'gray'}>
                            My Past Trades
                        </Flex>
                        <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                            <Button colorScheme='orange' display={{ base: 'flex', sm: 'flex', md: 'none' }}>
                                <LuUpload />
                            </Button>
                            <Button colorScheme='orange' display={{ base: 'flex', sm: 'flex', md: 'none' }}>
                                <MdOutlineContentCopy />
                            </Button>
                            <Button colorScheme='orange' rightIcon={<LuUpload />} display={{ base: 'none', sm: 'none', md: 'flex' }}>

                                Export Trades

                            </Button>
                            <Button colorScheme='orange' rightIcon={<MdOutlineContentCopy />} display={{ base: 'none', sm: 'none', md: 'flex' }}>

                                Copy Details

                            </Button>
                        </Flex>
                    </Flex>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} p={20}>
                        <Image src='/imagelogo/cryptico.png' maxH={'200px'} maxW={'200px'} ></Image>
                        <Box as='p' color={'gray'}>
                            You haven't traded yet.
                        </Box>
                        <Link color={'orange'}> ! Start Trading Now ! </Link>
                    </Box>

                </Flex>


            </Card>
        </>
    )
}

export default TradeHistory