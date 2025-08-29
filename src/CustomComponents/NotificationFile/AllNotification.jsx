import { Box, Button, Circle, CircularProgress, Flex, Heading, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CiBellOn } from "react-icons/ci";
import { LuCircleUser } from "react-icons/lu";
import { useOtherDetail } from '../../Context/otherContext';
import { IoCheckmarkDone } from 'react-icons/io5';
import { BsBellFill } from "react-icons/bs";
import PaginatedList from '../Pagination/Pagination';


const AllNotification = () => {
    const { notifications } = useOtherDetail();
    const [loading, setLoading] = useState(true);
    const [isinbox, setInbox] = useState(true);
    const [isloading, setIsLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [isloading]);

    return (
        <>
            <Flex mt={100} p={5}>


                <Flex direction={'column'} gap={2} w={'100%'}>

                    <Heading alignSelf={'center'}>
                        Notifications
                    </Heading>
                    <Flex mb={1} gap={5}>
                        <Button borderBottom={'1px solid #dcdcdc'} bg={'none'} borderRadius={0} _hover={{ bg: 'transparent' }} leftIcon={<LuCircleUser />} onClick={() => setInbox(false)}>Moderators</Button>
                        <Button borderBottom={'1px solid #dcdcdc'} bg={'none'} borderRadius={0} _hover={{ bg: 'none' }} leftIcon={<CiBellOn />} onClick={() => setInbox(true)}>Inbox</Button>
                    </Flex>
                    {
                        isinbox ?
                            <Flex direction={'column'} gap={2} p={5} border={'1px solid #dcdcdc'} borderRadius={5} bg={'white'}>
                                {
                                    isloading ?
                                        <Heading size={'lg'} alignSelf={'center'} fontSize={'14px'} color={'gray.500'}>Loading...</Heading>

                                        :
                                        notifications?.data?.map((item, index) =>


                                            <Flex gap={5} key={index} p={4} borderRadius={5} border={'1px solid #dcdcdc'} direction={{ base: 'column', md: 'row' }} justifyContent={'space-between'} >
                                                <Flex flex={0.2} color={'gray'} fontSize={'14px'} fontWeight={500} gap={2}>
                                                    {item.title}

                                                    {
                                                        item.is_read &&
                                                        <Box mt={2} color={'green.500'}>

                                                            <IoCheckmarkDone />
                                                        </Box>
                                                    }
                                                </Flex>
                                                <Flex flexWrap={'wrap'} whiteSpace={'wrap'} flex={0.6}>{item.message}</Flex>
                                                <Flex flex={0.2} color={'gray'} justifyContent={'end'}>{item.time_duration}</Flex>
                                            </Flex>



                                        )
                                }
                                <Flex justifyContent={'space-between'} alignItems={'center'} p={4}  >
                                    {
                                        notifications?.data?.length > 0 &&
                                        <Flex direction={'column'}>
                                            <Box size={'md'} color={'orange.500'} fontWeight={600}>Total Notification : <Box fontWeight={600} as={'span'} color={'black'}> {notifications?.pagination?.total}</Box> </Box>
                                            <Box size={'md'} color={'orange.500'} fontWeight={600}> Pages : <Box fontWeight={600} as={'span'} color={'black'}> {notifications?.pagination?.last_page}</Box></Box>
                                        </Flex>
                                    }
                                    <PaginatedList detail={notifications?.pagination} type={'notification'} setIsLoading={setIsLoading} />

                                </Flex>




                            </Flex>
                            :
                            <Flex direction={'column'} color={'black'} border={'1px solid #dcdcdc'} bg={'white'} gap={5} borderRadius={5} justifyContent={'center'} alignItems={'center'} my={10} p={10}>
                                <Circle size={70} bg={"orange"}>
                                    <BsBellFill size={30} color="white" />
                                </Circle>
                                <Box textAlign={'center'} maxW={'350px'}>
                                    You haven’t received any moderators notifications yet
                                </Box>
                            </Flex>
                    }

                </Flex>

            </Flex>
        </>
    )
}

export default AllNotification