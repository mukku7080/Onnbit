import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    InputGroup,
    Input,
    InputRightElement,
    InputLeftElement,
    Heading,
    Flex,
    Box,
    Image,
    Icon,
    useColorModeValue,
    Grid,
    GridItem, IconButton,
    ButtonGroup
} from '@chakra-ui/react'
import { RiBankLine, RiSearchLine } from "react-icons/ri";
import { PiBankLight, PiCurrencyCircleDollarThin, PiMoneyThin, PiGameControllerLight, PiPaypalLogoThin, PiBankBold, PiBankDuotone } from "react-icons/pi";
import { CiWallet, CiCreditCard2, CiGift, CiBank } from "react-icons/ci";
import { FaGooglePay } from "react-icons/fa";
import { RxHamburgerMenu, RxReset } from "react-icons/rx";
import { useState } from 'react';
import { useOffer } from '../../../Context/OfferContext';
import { IoCloseCircle, IoLockClosedOutline } from 'react-icons/io5';
import { FaClosedCaptioning, FaPlus } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';
export const MyPaymentModal = ({ formikHelpers = {}, name, setDisable, setBankShow = () => { } }) => {
    const { queryParams, setQueryParams } = useOffer()

    const {
        values = {},
        handleChange = () => { }, // Default to a no-op function
        handleBlur = () => { },
        errors = {},
        touched = {},
        setFieldValue = () => { }, // Default to a no-op function
    } = formikHelpers || {};
    const bgColor = useColorModeValue("orange.50", "gray.900");
    const [option, setOption] = useState('All Payment Method');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [searchTerm, setSearchTerm] = useState("");
    const [isCloseShow, setCloseShow] = useState(false);
    const filteredIndianOptions = IndianpaymentOptions.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <ButtonGroup isAttached variant={'outline'} w={'full'}>

                <Button variant={'outline'} w={'full'} bg={'transparent'} _hover={{ bg: 'transparent' }} isTruncated onClick={onOpen} leftIcon={<PiBankDuotone size={20} />} display={'flex'} justifyContent={'start'} gap={1} fontWeight={400} fontSize={'14px'} >
                    {option}
                </Button>
                {
                    isCloseShow &&
                    <IconButton
                        icon={<RxReset boxSize={3} />}
                        size="md"
                        bg={'gray.200'}
                        aria-label="Clear selection"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent modal from opening
                            setOption('All Payment Method');     // Reset selected option
                            setQueryParams((prev) => ({ ...prev, paymentMethod: null }))
                            setCloseShow(false);
                        }}
                    />
                }


            </ButtonGroup>



            <Modal isOpen={isOpen} size={'2xl'} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxW={{ base: '90%', md: '70%' }}>
                    <ModalHeader>Available Payment Methods</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Flex direction={'column'} bg={bgColor} w={'100%'} p={4} borderRadius={5} mb={8}>

                            <FormControl>
                                <InputGroup  >
                                    <InputLeftElement><RiSearchLine /></InputLeftElement>
                                    <Input placeholder='Search here..' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} focusBorderColor="orange.100" // Changes border color on focus
                                        _hover={{ borderColor: "orange.100" }}>

                                    </Input>
                                </InputGroup>
                            </FormControl>
                            <Grid templateColumns={{ base: 'repeat(2,1fr)', sm: 'repeat(3,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(6,1fr)' }} flexWrap={'wrap'} gap={10} >
                                {
                                    paymentOptions.map((data, index) => (
                                        <GridItem key={index} >

                                            <Flex flex={1} direction={'column'} mt={4} justifyContent={'center'} alignItems={'center'} h={'100px'}>
                                                {data.icon}
                                                <Box as='p' fontWeight={400} fontSize={'16px'} textAlign={'center'}>{data.name}</Box>
                                                <Box as='p' fontWeight={400} color={'gray'} fontSize={'11px'}>CHOICE : 5</Box>
                                            </Flex>
                                        </GridItem>

                                    ))
                                }


                            </Grid>
                        </Flex>
                        <Heading fontWeight={500} size={'md'} mb={8}>Popular In India</Heading>
                        <FormControl>

                            <Flex w={'100%'} p={4} borderRadius={5} gap={{ base: 5, md: 5, lg: 10 }} wrap={'wrap'}  >

                                {filteredIndianOptions.length > 0 ? (
                                    filteredIndianOptions.map((data, index) => (
                                        <Flex key={index}
                                            justifyContent={'start'}
                                            alignItems={'center'}
                                            gap={2}
                                            border={'1px solid #dcdcdc'}
                                            p={2}
                                            w={{ base: '100%', sm: '45%', md: '30%', lg: '20%' }}
                                            borderRadius={5}
                                            cursor={'pointer'}
                                            onClick={() => {
                                                setOption(data.name);
                                                handleChange({ target: { name: name, value: data.value } });
                                                setFieldValue('paymentType', data.type);
                                                onClose();
                                                setBankShow(true);
                                                setQueryParams((prev) => ({ ...prev, paymentMethod: data.value }))
                                                setCloseShow(true);
                                                setDisable(true);


                                            }}
                                        >
                                            {data.icon}
                                            <Box>{data.name}</Box>
                                        </Flex>
                                    ))
                                ) : (
                                    <Box>No results found</Box>
                                )}
                            </Flex>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='orange' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const paymentOptions = [
    {
        id: 1,
        name: 'Bank Transfer',
        icon: <PiBankLight size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 2,
        name: 'Debit/Credit Card',
        icon: <CiCreditCard2 size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 3,
        name: 'Fift Card',
        icon: <CiGift size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 4,
        name: 'Digital Currency',
        icon: <PiCurrencyCircleDollarThin size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 5,
        name: 'Cash Payment',
        icon: <PiMoneyThin size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 5,
        name: 'Wallet',
        icon: <CiWallet size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    }

]


const IndianpaymentOptions = [
    {
        id: 1,
        name: 'IMPS Transfer',
        value: 'imps',
        type: 'bank',
        icon: <PiBankLight size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 2,
        name: 'NEFT Transfer',
        value: 'neft',
        type: 'bank',
        icon: <PiBankLight size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 3,
        name: 'RTGS Transfer',
        value: 'rtgs',
        type: 'bank',
        icon: <PiBankLight size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 4,
        name: 'Amazon Pay',
        value: 'amazon pay',
        type: 'upi',
        icon: <CiWallet size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 5,
        name: 'Google Pay',
        value: 'google pay',
        type: 'upi',
        icon: <FaGooglePay size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 6,
        name: 'Game Items',
        value: 'game items',
        type: 'upi',
        icon: <PiGameControllerLight size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 7,
        name: 'PhonePe',
        value: 'phonepe',
        type: 'upi',
        icon: <CiWallet size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 8,
        name: 'Paytm',
        value: 'paytm',
        type: 'upi',
        icon: <PiPaypalLogoThin size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    }

]