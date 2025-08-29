
import React, { useEffect, useRef } from 'react'

import {
    Box,
    Button,
    Flex,
    Heading,
    Tooltip,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowTrendUp, FaRegThumbsDown } from "react-icons/fa6";

import { FaCheck } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { gradientButtonStyle } from '../../Wallet/CreateWallet';
import { grayGradient } from '../../../Styles/Gradient';

const ActiveOfferListComponent = ({ index, data }) => {
    const navigate = useNavigate();
          const bgColor_tags = useColorModeValue('gray.200', 'gray.600');

    const parsedData = JSON.parse(data?.payment_method);
    return (
        <Flex key={index} w={'full'} border={'1px solid #dcdcdc'} borderBottomRadius={0} direction={'column'} >
            {/* Row1 */}
            <Flex w={'full'} gap={{ base: 2, sm: 10 }} p={4} >
                {/* Pay With */}
                <Flex direction={'column'} flex={2} gap={1}>
                    <Flex fontWeight={600} gap={2} direction={'column'}>
                        <Flex wrap={'wrap'} >
                            {parsedData?.payment_method}
                        </Flex>
                    </Flex>
                    <Flex wrap={'wrap'} color={'gray'}> {data?.offer_terms}</Flex>
                </Flex>
                {/* Trade speed */}
                <Flex flex={1} display={{ base: 'none', md: 'flex' }} justifyContent={'end'}>
                    <Flex gap={2} color={'gray'} justifyContent={'end'}>
                        <Flex wrap={'nowrap'} mt={1} alignItems={'start'} justifyContent={'center'} gap={2}>

                            2&nbsp;min
                            <MdOutlineWatchLater size={20} />
                        </Flex>
                    </Flex>
                </Flex>
                {/* pricePerBitcoin */}
                <Flex flex={2} justifyContent={'end'} alignItems={'start'}>
                    <Flex direction={'column'} justifyContent={'end'} alignContent={'flex-end'} alignItems={'end'} gap={2}>

                        <Heading size={'md'} textAlign={'end'}>9,199,002.07 INR</Heading>
                        <Flex gap={3} fontSize={'14px'} textAlign={'end'}>
                            <Flex display={'flex'} alignItems={'center'} gap={1}>
                                <Flex gap={2} alignItems={'center'}>
                                    <Box as='span'>

                                        1 USD=0.93 USD of BTC

                                        <Flex gap={2} alignItems={'center'} color={'green'} justifyContent={'end'} textAlign={'end'}>

                                            <FaArrowTrendUp />
                                            <Box>8%</Box>
                                            <Box>
                                                <Tooltip label='Current Market Price Indicator' fontSize='md' color={'gray'} placement={'bottom'} bg={'white'} p={4}>
                                                    <Box as='span'>

                                                        <AiOutlineExclamationCircle />
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Flex>



                            </Flex>


                        </Flex>


                    </Flex>


                </Flex>
            </Flex>
            {/* Row2 */}
            <Flex w={'full'} gap={{ base: 2, sm: 10 }} py={2} alignItems={'center'}  >
                {/* Buy from */}
                <Flex direction={'column'} flex={1} >
                    <Flex gap={2} flexWrap={'wrap'} pl={4}>
                        {
                            data?.offer_tags.length > 0 && data?.offer_tags.map((tag, index) => (

                                <Box
                                    p={2}
                                    key={index}
                                    fontSize={'12px'}
                                    fontWeight={500}
                                    borderRadius={5}
                                    bg={bgColor_tags}
                                >{tag}</Box>
                            ))
                        }

                    </Flex>


                </Flex>
                {/* pricePerBitcoin */}
                <Flex flex={2} justifyContent={'end'} alignItems={'center'}>
                    <Flex direction={'column'} justifyContent={'end'} alignContent={'flex-end'} alignItems={'end'} gap={2} pr={2}>


                        <Flex gap={4} flexWrap={'wrap'} justifyContent={'end'} alignItems={'center'}>
                            <Flex direction={'column'} fontSize={'13px'}>

                                <Box textAlign={'end'}>

                                    {`Min purchase: ${data?.min_trade_limit} INR`}
                                </Box>
                                <Box textAlign={'end'}>

                                    {`Max purchase: ${data?.max_trade_limit} INR`}
                                </Box>
                            </Flex>
                            <Flex alignItems={'center'} gap={2} >
                                <Button size={'sm'} variant='outline' bg={'transparent'}><CiStar /></Button>
                                <Button sx={gradientButtonStyle} size={'sm'} onClick={() => navigate('/buyOffer')}>Buy</Button>
                            </Flex>

                        </Flex>
                    </Flex>


                </Flex>
            </Flex>



        </Flex>
    )
}
export default ActiveOfferListComponent;