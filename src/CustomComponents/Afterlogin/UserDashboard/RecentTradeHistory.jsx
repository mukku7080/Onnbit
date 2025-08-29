import { Card, Flex, Box, Heading, Avatar, AvatarBadge, Grid, GridItem, Menu, MenuButton, MenuList, MenuItem, Button, CircularProgress, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import RecentTradePartnerAccordian from '../../Accordian/RecentTradePartnerAccordian';
import PaginatedList from '../../Pagination/Pagination';
import { useTradeProvider } from '../../../Context/TradeContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
const now = new Date();

const RecentTradeHistory = () => {
    const { handleAuthenticatedTradeHistory, runningOffers } = useTradeProvider();
    const [isloading, setIsLoading] = useState(true);
    const spinnerColor = useColorModeValue('whiteAlpha.800', 'gray.500');


    useEffect(() => {
        handleAuthenticatedTradeHistory();
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)

        }, 2000);
    }, [isloading])

    console.log(runningOffers);
    return (
        <>

            {/* for large Screen */}
            <Card borderRadius={5} p={10} gap={4} boxShadow={'lg'} display={{ base: 'none', md: 'flex' }} w={'100%'}>


                <Grid templateColumns={'repeat(3,1fr)'} mb={3}>
                    <GridItem >
                        <Flex>
                            <Flex flex={1}>

                            </Flex>
                            <Flex flex={2}>

                                <Heading size={'sm'} > User Name</Heading>
                            </Flex>
                        </Flex>

                    </GridItem>
                    <GridItem>
                        <Heading size={'sm'}> Result</Heading>

                    </GridItem>
                    <GridItem>
                        <Heading size={'sm'} > Trede Date</Heading>

                    </GridItem>
                </Grid>
                {
                    isloading ?
                        <Box
                            w="100%"
                            h="100%"
                            bg={spinnerColor}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {/* <Spinner mb={10} size="xl" color="blue.500" /> */}
                            <CircularProgress isIndeterminate color="orange.500" size="60px" />
                        </Box>
                        :

                        runningOffers?.data?.map((item, index) => (

                            <>

                                <Grid key={index} templateColumns={'repeat(3,1fr)'} my={2} >
                                    <GridItem>
                                        <Flex>

                                            <Flex flex={1}>

                                                <Avatar size={'sm'} name={item?.partner_details?.username} src={item?.partner_details?.profile_image_url} >
                                                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                </Avatar>
                                            </Flex>
                                            <Flex flex={2} justifyContent={'start'} >

                                                <Box display={'flex'} alignItems={'center'}>{item?.partner_details?.name}</Box>
                                            </Flex>
                                        </Flex>

                                    </GridItem>
                                    <GridItem display={'flex'} alignItems={'center'}>
                                        {
                                            item?.buyer_status === 'success' ?

                                                <Flex gap={2} alignItems={'center'} color={'#6B8E23'}>
                                                    <Box display={'flex'} alignItems='center'>
                                                        <IoMdCheckmark />
                                                    </Box>
                                                    <Box  >Successfull</Box>
                                                </Flex>
                                                :
                                                <Flex gap={2} alignItems={'center'} color={'#B76E79'}>
                                                    <Box display={'flex'} alignItems='center'>
                                                        <MdOutlineCancel />
                                                    </Box>
                                                    <Box  >Cancel</Box>
                                                </Flex>

                                        }

                                    </GridItem>
                                    <GridItem>
                                        <Flex gap={2}>
                                            <Box>{dayjs(item?.created_at)
                                                .tz('Asia/Kolkata')
                                                .format('DD MMM YYYY, hh:mm A')}</Box>
                                            <Box display={'flex'} alignItems='center'>


                                                <Menu>
                                                    <MenuButton  >
                                                        <CiMenuKebab />

                                                    </MenuButton>
                                                    <MenuList borderRadius={0}>
                                                        <MenuItem>Add To Trusted List</MenuItem>
                                                        <MenuItem> Add To Blocked List</MenuItem>
                                                        <MenuItem>View This Trade</MenuItem>
                                                    </MenuList>
                                                </Menu>


                                            </Box>
                                        </Flex>

                                    </GridItem>
                                </Grid>
                            </>
                        ))
                }



                {/* pagination componente */}

                <PaginatedList detail={runningOffers?.pagination} type={'recent-trade-partners'} setIsLoading={setIsLoading} />

            </Card>

            {/* for large Screen End */}


            {/* for small screen */}
            <Card borderRadius={5} p={{ base: 5, sm: 10 }} gap={4} boxShadow={'lg'} display={{ base: 'flex', md: 'none' }} w={'100%'}>
                {
                    isloading ?
                        <Box
                            w="100%"
                            h="100%"
                            bg="whiteAlpha.800"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {/* <Spinner mb={10} size="xl" color="blue.500" /> */}
                            <CircularProgress isIndeterminate color="orange.500" size="60px" />
                        </Box> :

                        runningOffers?.data?.map((item, index) => (

                            <>

                                <RecentTradePartnerAccordian key={index} user={item} />
                            </>
                        ))
                }
                {/* <PaginatedList /> */}
                <PaginatedList detail={runningOffers?.pagination} type={'recent-trade-partners'} setIsLoading={setIsLoading} />

            </Card>
            {/* for small screen End */}

        </>
    )
}

const user = [
    { user_name: "Mukesh rai", profile_url: '', status: true, date: now.toUTCString() },
    { user_name: "Risabh singh", profile_url: '', status: false, date: now.toUTCString() },
    { user_name: "Rohit Gaund", profile_url: '', status: false, date: now.toUTCString() },
    { user_name: "Tamanna Bhati", profile_url: '', status: true, date: now.toUTCString() },
    { user_name: "Kalin Bhaiya", profile_url: '', status: true, date: now.toUTCString() },
]

export default RecentTradeHistory