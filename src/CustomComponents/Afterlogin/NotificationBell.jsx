import React, { useEffect, useState } from "react";
import {
    IconButton, Box, Modal, ModalBody, ModalContent, ModalOverlay, ModalFooter, Flex, useDisclosure, ModalHeader, ModalCloseButton, Button,

    Badge,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
    PopoverArrow,
    Center,
    Image,
    Icon,
    Circle,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useOtherDetail } from "../../Context/otherContext";
import { FaUser } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import { LuCircleUser } from "react-icons/lu";
import { SlBell } from "react-icons/sl";
import { BsBellFill } from "react-icons/bs";
import { gradientButtonStyle } from "../Wallet/CreateWallet";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
    const [notification, setNotification] = useState();
    const { notifications,
        handleMarkAsRead,
        unreadNotification,
        handleGetAllNotification,
        handleMarkAsReadById,
        notificationCount,
        readNotification,
        setNotificationCount,

    } = useOtherDetail();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isinbox, setInbox] = useState(true);
    const navigate = useNavigate();

    const handleMarkAsReadClick = async () => {
        const response = await handleMarkAsRead();
        if (response?.status) {
            setNotification(response.data?.analytics.totalUnreadNotification);
            setNotificationCount(0);
        }
    }
    const handleMarkAsReadByIdClick = async (id) => {
        await handleMarkAsReadById(id);
        setNotificationCount(prevCount => prevCount - 1);
    }


    return (
        <>
            <Popover placement="bottom-end" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                <PopoverTrigger>
                    <Box position="relative" display="inline-block">
                        <IconButton
                            icon={<IoMdNotificationsOutline />}
                            aria-label="Notifications"
                            size="sm"
                            _hover={{ bg: "gray.200" }}
                        />
                        {notificationCount > 0 && (
                            <Badge
                                position="absolute"
                                top="-1"
                                right="-1"
                                borderRadius="full"
                                bg="red.500"
                                color="white"
                                px={2}
                                fontSize="0.8em"
                            >
                                {notificationCount}
                            </Badge>
                        )}
                    </Box>
                </PopoverTrigger>

                <PopoverContent boxShadow="xl" borderRadius="lg" w={{ base: '300px', sm: "400px" }} >
                    <PopoverArrow />
                    <PopoverCloseButton color={'gray'} />
                    <PopoverHeader fontWeight="bold" borderBottom="1px solid #ddd" color={"black"}>
                        Notifications
                    </PopoverHeader>
                    <PopoverBody overflowY={"auto"} maxH={'60vh'}>

                        <Flex justifyContent={'space-between'} mb={1}>
                            <Button borderBottom={'1px solid #dcdcdc'} bg={'none'} borderRadius={0} _hover={{ bg: 'transparent' }} leftIcon={<LuCircleUser />} onClick={() => setInbox(false)}>Moderators</Button>
                            <Button borderBottom={'1px solid #dcdcdc'} bg={'none'} borderRadius={0} _hover={{ bg: 'none' }} leftIcon={<CiBellOn />} onClick={() => setInbox(true)}>Inbox</Button>
                        </Flex>
                        <Flex justifyContent={'space-between'} mb={5}>
                            <Box px={2} color={'gray'} fontSize={'12px'} fontWeight={500}>Notification</Box>
                            {
                                isinbox &&
                                <Box as="Button" px={2} color={'gray'} fontSize={'12px'} onClick={handleMarkAsReadClick} fontWeight={500}>Mark as read</Box>
                            }
                        </Flex>
                        {
                            isinbox ?

                                <Flex direction="column" gap={1} >
                                    <AnimatePresence>
                                        {
                                            unreadNotification?.length > 0 ?
                                                (
                                                    unreadNotification?.slice(0, 3).map((data, index) => (
                                                        data?.is_read === true ? "" :

                                                            <motion.div
                                                                key={data.notification_id}
                                                                initial={{ opacity: 0, y: 0 }}
                                                                animate={{ opacity: 1, height: "auto" }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                                style={{ overflow: "hidden", position: "relative", marginBottom: "10px" }}
                                                            >

                                                                <Flex
                                                                    cursor={"pointer"}
                                                                    key={index}

                                                                    p={4}
                                                                    borderRadius="10px"
                                                                    direction="column"
                                                                    onClick={async () => {
                                                                        await handleMarkAsReadByIdClick(data?.notification_id);
                                                                        {
                                                                            if (data?.operation_type && data?.operation_id) {
                                                                                // navigate(`/tradeStart/${data?.operation_id}/${data?.operation_type}`);
                                                                                window.location.href = `/tradeStart/${data?.operation_id}/${data?.operation_type}`;

                                                                            }
                                                                        }
                                                                    }}
                                                                    sx={{
                                                                        backgroundImage: "linear-gradient(to right, #FFAFBD 0%, #ffc3a0  51%, #FFAFBD  100%)",
                                                                        backgroundSize: "200% auto",
                                                                        color: "white",
                                                                        boxShadow: "0 0 20px #eee",
                                                                        borderRadius: "10px",
                                                                        transition: "0.5s",
                                                                        _hover: {
                                                                            padding: "14px",
                                                                            backgroundPosition: "right center",
                                                                            color: "#fff",
                                                                            textDecoration: "none",
                                                                        },
                                                                    }}
                                                                >
                                                                    <Box fontWeight={700} fontSize="14px">{data.title}</Box>
                                                                    <Box>{data.message}</Box>
                                                                    <Box fontSize="14px" opacity={0.8}>{data.time_duration}</Box>
                                                                </Flex>
                                                            </motion.div>

                                                    ))
                                                )
                                                :

                                                readNotification?.length > 0 ?
                                                    readNotification?.slice(0, 4).map((data, index) => (
                                                        data?.is_read === false ? "" :
                                                            <Flex
                                                                cursor={"pointer"}
                                                                key={index}
                                                                color={'black'}

                                                                p={4}
                                                                borderRadius="10px"
                                                                direction="column"
                                                                onClick={async () => {
                                                                    await handleMarkAsReadByIdClick(data?.notification_id);
                                                                    {
                                                                        if (data?.operation_type && data?.operation_id) {
                                                                            // navigate(`/tradeStart/${data?.operation_id}/${data?.operation_type}`);
                                                                            window.location.href = `/tradeStart/${data?.operation_id}/${data?.operation_type}`;

                                                                            onClose();
                                                                        }
                                                                    }
                                                                }}
                                                                bg={'#f5f7fa'}
                                                            >
                                                                <Box fontWeight={700} fontSize="14px">{data.title}</Box>
                                                                <Box>{data.message}</Box>
                                                                <Box fontSize="12px" opacity={0.8}>{data.time_duration}</Box>
                                                            </Flex>
                                                    ))
                                                    :
                                                    (
                                                        <Box

                                                            textAlign="center"
                                                            color="gray.500">
                                                            No new notifications
                                                        </Box>
                                                    )

                                        }
                                    </AnimatePresence>



                                    <Button
                                        variant={'outline'}
                                        w="100%"
                                        alignSelf={'center'}
                                        _hover={{ bg: 'transparent' }}
                                        p={4}
                                        mb={5}
                                        onClick={() => {

                                            navigate('/allNotification')
                                            onClose();
                                        }
                                        }
                                    >
                                        View all notifications
                                    </Button>
                                </Flex>
                                :
                                <Flex direction={'column'} color={'black'} gap={5} justifyContent={'center'} alignItems={'center'} my={10}>
                                    <Circle size={70} bg={"orange"}>
                                        <BsBellFill size={30} color="white" />
                                    </Circle>
                                    <Box textAlign={'center'} maxW={'350px'}>
                                        You haven’t received any moderators notifications yet
                                    </Box>
                                </Flex>
                        }
                    </PopoverBody>
                </PopoverContent>
            </Popover>

        </>
    );
};




const notificationsData = [
    {
        id: 1,
        title: "New Message",
        message: "You have received a new message from John.",
        timestamp: new Date().toISOString(),
        read: false,
    },
    {
        id: 2,
        title: "System Update",
        message: "A new update is available. Please update your app.",
        timestamp: new Date().toISOString(),
        read: true,
    },
    {
        id: 3,
        title: "Friend Request",
        message: "Anna sent you a friend request.",
        timestamp: new Date().toISOString(),
        read: false,
    },
];


export default NotificationBell;
