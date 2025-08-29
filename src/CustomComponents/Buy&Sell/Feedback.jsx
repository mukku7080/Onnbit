import React, { useEffect, useState } from 'react';
import {
    Box,
    Text,
    Textarea,
    Button,
    VStack,
    HStack,
    IconButton,
    Avatar,
    Divider,
    useToast,
    Badge,
    Flex,
    Card,
    Heading,
    Image,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaEdit } from 'react-icons/fa';
import { useTradeData } from '../DataContext/TradeDataContext';
import { useTradeProvider } from '../../Context/TradeContext';
import { useUser } from '../../Context/userContext';
import { useParams } from 'react-router-dom';

const Feedback = ({ tradeDetail, user_id, partnerDetail }) => {
    const toast = useToast();
    const { handleCreateFeedback, error, handleGetFeedback, feedbackdetail } = useTradeProvider();
    const { tradeId, tradeType } = useParams();
    const [feedbackText, setFeedbackText] = useState('');
    const [likeStatus, setLikeStatus] = useState(true); // 'like' or 'dislike'
    const [feedbackGiven, setFeedbackGiven] = useState(false); // simulate feedback status
    const buyerFeedback = feedbackdetail?.feedbackFromBuyer;
    const sellerFeedback = feedbackdetail?.feedbackFromSeller;
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useUser();
    const [isloading, setIsLoading] = useState(false);

    const data = Object.values(feedbackdetail).filter(item => item?.user_id == user_id);
    const userFeedback = Object.values(feedbackdetail).filter(item => item?.feedback_from_id == user_id);
    const totalReviews = tradeDetail?.review ? Object.keys(tradeDetail?.review).length : 0;
    console.log(totalReviews);



    const [otherfeedbackList, setFeedbackList] = useState([
        {
            user: data[0]?.userDetails?.username,
            status: data[0]?.like == 1 ? 'like' : 'dislike',
            text: data[0]?.review,
            date: new Date(data[0]?.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        }

    ]);
    const [userfeedbackList, setUserFeedbackList] = useState([
        {
            user: userFeedback[0]?.userDetails?.username,
            status: userFeedback[0]?.like == 1 ? 'like' : 'dislike',
            text: userFeedback[0]?.review,
            date: new Date(userFeedback[0]?.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        }

    ]);
    function pollFeedback(tradeid) {
        let count = 0;
        const maxCalls = 3;

        const intervalId = setInterval(async () => {
            try {
                handleGetFeedback(tradeid);
            } catch (error) {
                console.error("Failed to fetch feedback:", error);
            }

            count++;
            if (count >= maxCalls) {
                clearInterval(intervalId);
            }
        }, 5000);
    }
    useEffect(() => {
        handleGetFeedback(tradeDetail?.trade_id);

    }, [totalReviews])
    const handleSubmit = async () => {
        setIsLoading(true);
        const dto = {
            trade_id: tradeDetail?.trade_id,
            like: likeStatus,
            review: feedbackText
        }
        try {
            const response = await handleCreateFeedback(dto)
            if (response.status) {
                toast({
                    title: 'Feedback Submitted',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                handleGetFeedback(tradeDetail?.trade_id);

                setIsLoading(false);
                pollFeedback(tradeDetail?.trade_id);
            }
            else {
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }

        // setFeedbackGiven(true);
        setFeedbackText('');
        setLikeStatus(null);


    };


    return (
        <>
            <Flex gap={2} mt={{ base: 10, md: 10, lg: 0, xl: 0 }} alignItems={'center'}>
                <Image src='/imagelogo/Blinker.gif' boxSize={6} />
                {/* <Heading>Trade Completed</Heading> */}
                <Heading color={statusColorMap[tradeDetail?.trade_status]} size={'lg'}>{`Trade ${statusMatch[tradeDetail?.trade_status]}`}</Heading>

            </Flex>
            <Box rounded="lg" bg="white" boxShadow="sm">
                <Flex alignItems={'center'}>
                    <Image src='/imagelogo/Congratulations.gif' boxSize={12} />
                    <Heading size={'sm'} color={'green.400'} pr={2} >{`you have successfully completed a trade of ${Number(tradeDetail?.hold_asset).toFixed(4)} ${tradeDetail?.asset}`}</Heading>
                </Flex>
                <Divider />
                <Box p={5} >
                    {
                        tradeType == 'buy_trade' ?
                            <Flex direction={'column'} gap={5} mt={2} mb={8}>
                                <Heading fontSize={'md'}>Trade History</Heading>
                                <Flex direction={{ base: "column", xl: "row" }} flex={'wrap'} gap={2}>
                                    <Card direction={'row'} flex={1} p={4} gap={2}>
                                        <Avatar name={user?.username} size="sm" />
                                        <Flex direction={'column'}>

                                            <HStack flexWrap={'wrap'}>
                                                <Text fontWeight="bold">{user?.username}</Text>
                                                <Badge colorScheme='green'>Purchased</Badge>
                                            </HStack>
                                            {/* <Flex gap={2}>

                                        <Text fontWeight={600}>{Number(tradeDetail?.buy_amount).toFixed(2)}</Text>
                                        <Text fontWeight={600}>INR</Text>
                                    </Flex> */}
                                            <Flex gap={2}>

                                                <Text fontWeight={600}>{Number(tradeDetail?.hold_asset).toFixed(4)}</Text>
                                                <Text fontWeight={600} textTransform={'capitalize'}>{tradeDetail?.asset}</Text>
                                            </Flex>
                                        </Flex>

                                    </Card>
                                    <Card direction={'row'} flex={1} p={4} gap={2}>
                                        <Avatar name={partnerDetail?.username} size="sm" />
                                        <Flex direction={'column'}>

                                            <HStack flexWrap={'wrap'}>
                                                <Text fontWeight="bold">{partnerDetail?.username}</Text>
                                                <Badge colorScheme='red'>Sold</Badge>
                                            </HStack>
                                            {/* <Flex gap={2}>

                                        <Text fontWeight={600}>{Number(tradeDetail?.buy_amount).toFixed(2)}</Text>
                                        <Text fontWeight={600}>INR</Text>
                                    </Flex> */}
                                            <Flex gap={2}>

                                                <Text fontWeight={600}>{Number(tradeDetail?.hold_asset).toFixed(4)}</Text>
                                                <Text fontWeight={600} textTransform={'capitalize'}>{tradeDetail?.asset}</Text>
                                            </Flex>
                                        </Flex>

                                    </Card>

                                </Flex>
                            </Flex>
                            :
                            <Flex direction={'column'} gap={5} mt={2} mb={8}>
                                <Heading fontSize={'md'}>Trade History</Heading>
                                <Flex direction={{ base: "column", xl: "row" }} flex={'wrap'} gap={2}>
                                    <Card direction={'row'} flex={1} p={4} gap={2}>
                                        <Avatar name={user?.username} size="sm" />
                                        <Flex direction={'column'}>

                                            <HStack flexWrap={'wrap'}>
                                                <Text fontWeight="bold">{user?.username}</Text>
                                                <Badge colorScheme='red'>{tradeType == 'buy_trade' ? 'purchased' : 'sold'}</Badge>
                                            </HStack>
                                            {/* <Flex gap={2}>

                                        <Text fontWeight={600}>{Number(tradeDetail?.buy_amount).toFixed(2)}</Text>
                                        <Text fontWeight={600}>INR</Text>
                                    </Flex> */}
                                            <Flex gap={2}>

                                                <Text fontWeight={600}>{Number(tradeDetail?.hold_asset).toFixed(4)}</Text>
                                                <Text fontWeight={600} textTransform={'capitalize'}>{tradeDetail?.asset}</Text>
                                            </Flex>
                                        </Flex>

                                    </Card>
                                    <Card direction={'row'} flex={1} p={4} gap={2}>
                                        <Avatar name={partnerDetail?.username} size="sm" />
                                        <Flex direction={'column'}>

                                            <HStack flexWrap={'wrap'}>
                                                <Text fontWeight="bold">{partnerDetail?.username}</Text>
                                                <Badge colorScheme='green'>Purchased</Badge>
                                            </HStack>
                                            {/* <Flex gap={2}>

                                        <Text fontWeight={600}>{Number(tradeDetail?.buy_amount).toFixed(2)}</Text>
                                        <Text fontWeight={600}>INR</Text>
                                    </Flex> */}
                                            <Flex gap={2}>

                                                <Text fontWeight={600}>{Number(tradeDetail?.hold_asset).toFixed(4)}</Text>
                                                <Text fontWeight={600} textTransform={'capitalize'}>{tradeDetail?.asset}</Text>
                                            </Flex>
                                        </Flex>

                                    </Card>

                                </Flex>
                            </Flex>

                    }




                    <Text fontSize="xl" fontWeight="semibold" mb={4}>
                        How was your trading experience?
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" mb={4}>
                        You can leave only one feedback for each payment method trade.
                    </Text>

                    {
                        (userFeedback.length < 1 || isEdit === true) ?
                            <VStack align="start" spacing={4} mb={6}>
                                <HStack spacing={4}>
                                    <Text fontWeight="medium">Your Rating:</Text>
                                    <IconButton
                                        icon={<FaThumbsUp />}
                                        aria-label="Like"
                                        variant={likeStatus ? 'solid' : 'outline'}
                                        colorScheme="green"
                                        onClick={() => setLikeStatus(true)}
                                    />
                                    <IconButton
                                        icon={<FaThumbsDown />}
                                        aria-label="Dislike"
                                        variant={!likeStatus ? 'solid' : 'outline'}
                                        colorScheme="red"
                                        onClick={() => setLikeStatus(false)}
                                    />
                                </HStack>

                                <Textarea
                                    placeholder="Write your review..."
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    bg="gray.50"
                                    resize="none"
                                />

                                <Button colorScheme="blue" onClick={handleSubmit} isLoading={isloading} loadingText="Submitting...">
                                    Submit Feedback
                                </Button>
                            </VStack>
                            :
                            <>
                                {
                                    (userFeedback.length > 0 && isEdit === false) &&

                                    <Flex p={4} gap={4} bg="gray.50" rounded="md" boxShadow="xs" direction={'column'}>
                                        <Flex justify="space-between" align="center">
                                            <HStack>
                                                <Avatar name={userFeedback[0]?.userDetails?.username} size="sm" />
                                                <Text fontWeight="bold">{userFeedback[0]?.userDetails?.username}</Text>
                                            </HStack>

                                            <Text fontSize="sm" color="gray.500">
                                                {new Date(userFeedback[0]?.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </Text>
                                        </Flex>
                                        <Badge
                                            maxW={'64px'}
                                            colorScheme={userFeedback[0]?.like == 1 ? 'green' : 'red'}
                                            variant="subtle"
                                        >
                                            {userFeedback[0]?.like == 1 ? 'Positive' : 'Negative'}
                                        </Badge>
                                        <Text mt={2} color="gray.700">
                                            {userFeedback[0]?.review}
                                        </Text>

                                        <Button
                                            isLoading={isloading}
                                            loadingText="Updating..."
                                            leftIcon={<FaEdit />}
                                            alignSelf={'self-start'}
                                            size="sm"
                                            colorScheme="teal"
                                            onClick={() => setIsEdit(true)}>
                                            Edit Feedback
                                        </Button>
                                    </Flex>

                                }

                            </>


                    }

                    <Divider mb={4} />
                    {
                        data.length > 0 &&


                        <Text fontSize="md" fontWeight="semibold" mb={3}>
                            Feedback from &nbsp;
                            <span style={{ color: 'orange' }}>

                                {data[0]?.userDetails?.username}
                            </span>
                        </Text>
                    }

                    <VStack align="stretch" spacing={4}>
                        {
                            data.length > 0 ?
                                <Flex p={4} gap={4} bg="gray.50" rounded="md" boxShadow="xs" direction={'column'}>
                                    <Flex justify="space-between" align="center">
                                        <HStack>
                                            <Avatar name={data[0]?.userDetails?.username} size="sm" />
                                            <Text fontWeight="bold">{data[0]?.userDetails?.username}</Text>
                                        </HStack>

                                        <Text fontSize="sm" color="gray.500">
                                            {new Date(data[0]?.created_at).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </Text>
                                    </Flex>
                                    <Badge
                                        maxW={'64px'}
                                        colorScheme={data[0]?.like == 1 ? 'green' : 'red'}
                                        variant="subtle"
                                    >
                                        {data[0]?.like == 1 ? 'Positive' : 'Negative'}
                                    </Badge>
                                    <Text mt={2} color="gray.700">
                                        {data[0]?.review}
                                    </Text>
                                </Flex>

                                :
                                <></>
                        }
                    </VStack>
                </Box>
            </Box>
        </>
    );
};
const statusMatch = {
    'pending': 'Started',
    'processing': 'In Progress...',
    'cancel': 'Cancelled',
    'expired': 'Expired',
    'success': 'Completed',
    'reject': 'Rejected',
}
const statusColorMap = {
    pending: 'gray.500',      // Started
    Processing: 'blue.500',   // In Progress
    cancel: 'red.500',        // Cancelled
    expired: 'orange.400',    // Expired
    success: 'green.500',     // Completed
    reject: 'red.600',        // Rejected
};
export default Feedback;
