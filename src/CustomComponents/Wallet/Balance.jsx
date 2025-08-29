import { Box, Button, Card, Divider, Flex, Heading, Icon, Image, Menu, MenuButton, MenuList, MenuItem, Circle, Modal, ModalOverlay, ModalContent, ModalFooter, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, ButtonGroup, Tag, ScaleFade, Fade, Tooltip, FormControl, Input, List, ListItem, useOutsideClick, Avatar, InputGroup, InputRightAddon, FormLabel, InputRightElement, IconButton, useToast, Spinner, CircularProgress, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { LuEqualApproximately } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSend } from "react-icons/tb";

import { SiConvertio } from "react-icons/si";
import { BsArrowBarDown, BsThreeDots } from "react-icons/bs";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { RiArrowRightDownLine } from "react-icons/ri";
import { BsBoxArrowInUpRight, BsBoxArrowInDownRight } from "react-icons/bs";
import { IoWarningOutline } from 'react-icons/io5';
import { MdArrowRightAlt, MdContentCopy, MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { FaArrowRightFromBracket, FaArrowRightLong, FaCopy, FaLessThanEqual } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import CreateWallet, { gradientButtonStyle } from './CreateWallet';
import { useAccount } from '../../Context/AccountContext';
import WalletQR from './WalletQR';
import { useWalletStore } from '../Store/useWalletStore';
import TransactionModal from './TransactionModal';
import { useAuth } from '../../Context/AuthContext';
import CreateTronWallet from './CreateTronWallet';
import { wrap } from 'framer-motion';
import { useOffer } from '../../Context/OfferContext';
import { useOtherDetail } from '../../Context/otherContext';
import * as bitcoin from 'bitcoinjs-lib';
import { isAddress } from 'ethers/lib/utils';
import decryptWithKey from '../Decryption/Decryption';
import { useUser } from '../../Context/userContext';
import { setUserId } from 'firebase/analytics';
import SendBnb from '../AddressTransaction/SendBnb';
import Sendeth from '../AddressTransaction/Sendeth';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import SendUsdt from '../AddressTransaction/SendUSDT';
import SendUsdtNew from '../AddressTransaction/SendUsdtNew';
import useSendUsdtNew from '../AddressTransaction/SendUsdtNew';
import { useCryptoOption } from '../Store/cryptoOption';
import SendBitcoin from '../AddressTransaction/SendBtc';
import PaginatedList from '../Pagination/Pagination';
import TransactionRequest from '../../Modals/TransactionRequest';

const Balance = () => {
    const navigate = useNavigate()
    const { web3wallet, handleGetWeb3Wallet } = useAccount();
    const [isloading, setLoading] = useState(true);
    const setWeb3wallet = useWalletStore((state) => state.setWeb3wallet);
    const { priceRef } = useOtherDetail();
    const [totalamount, setTotalAmount] = useState(0);
    const [totalBtc, setTotalBtc] = useState();
    const cryptoOption = useCryptoOption();

    useEffect(() => {
        if (web3wallet) {
            setWeb3wallet(web3wallet);
        }
    }, [web3wallet])
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);

        }, 2000);
    })
    useEffect(() => {
        handleGetWeb3Wallet();
    }, [])
    useEffect(() => {
        const total = cryptoOption.reduce((sum, item) => {
            const balance = Number(item?.currentPrice) * Number(item?.blc);
            return sum + balance;
        }, 0);

        setTotalAmount(total);
        setTotalBtc(total / (priceRef?.current?.bitcoin?.inr));
    }, [cryptoOption]);

    const data = web3wallet?.data || {}


    const count = Object.keys(data).length;


    return (
        <Flex w={'container.xxl'} gap={10} direction={'column'} alignItems={'center'} justifyContent={'center'} my={20} marginTop={'50px'}>
            <Flex
                maxW={{ base: "100%", lg: '100%', xl: "100%" }}
                minW={{ base: "100%", sm: '100%', lg: '100%', xl: "100%" }}
                direction={'column'}
                gap={8}
            >

                {/* Button With card start */}


                <Flex w={'full'} justifyContent={'space-between'} direction={{ base: 'column', lg: 'row' }} gap={8} >

                    <Card w={{ base: '100%', lg: '30%' }}>
                        <Flex justifyContent={'space-between'}  >

                            <Flex direction={'column'} gap={2} p={4} flex={1}>
                                <Box fontSize={'14px'} fontWeight={500}>
                                    Total Holding
                                </Box>
                                <Heading size={'md'}>{Number(totalBtc).toFixed(8)}&nbsp;BTC</Heading>
                                <Flex alignItems={'center'} gap={2}>
                                    <LuEqualApproximately />
                                    <Box as='span'>{Number(totalamount).toFixed(2)}&nbsp;INR</Box>
                                </Flex>
                            </Flex>

                            <Flex flex={1} justifyContent={'end'} p={4}>
                                <AiOutlineExclamationCircle />
                            </Flex>
                        </Flex>

                    </Card>
                    {/* RightSideButton */}

                    <Flex alignItems={'end'}   >
                        <Button sx={gradientButtonStyle} w={'full'} colorScheme='orange' px={20}> Buy Crypto Directly</Button>
                    </Flex>
                </Flex>

                {/* Button With card End */}

                {/* Dashboard first start */}

                <Flex>
                    <Card w={'100%'} p={4}>
                        <Flex justifyContent={'space-between'}>

                            <Heading size={'md'}>Assets</Heading>
                            <CreateWallet />
                        </Flex>

                        {/* Bellow Assets */}
                        {
                            isloading ?
                                <Heading size={'lg'} alignSelf={'center'} fontSize={'14px'} mt={10} color={'gray.500'}>Loading...</Heading>
                                :
                                count > 0 ?
                                    <Flex p={4} gap={2} direction={'column'} >
                                        {/* TableHeading start -------------------------------------------------------------------------------------------------------------- */}
                                        {
                                            count > 0 &&
                                            <Flex w={'full'} p={{ base: 0, sm: 2 }} gap={10} >
                                                <Flex flex={1.2} color={'gray'} direction={'column'} gap={10}>
                                                    <Flex fontSize={'12px'}>
                                                        <Flex flex={1}  >
                                                            <Box ml={10}>
                                                                Currency
                                                            </Box>
                                                        </Flex>
                                                        <Flex flex={.5} justifyContent={{ base: 'end', xl: 'center' }} mr={{ base: 10, xl: 0 }} >Balance</Flex>
                                                        <Flex flex={.5} justifyContent={'center'} w={'full'} display={{ base: 'none', xl: 'flex' }} > In INR</Flex>
                                                    </Flex>
                                                </Flex>
                                                <Flex flex={.8} color={'green'} gap={20} justifyContent={'space-between'} direction={'column'} display={{ base: 'none', md: 'flex' }} >

                                                </Flex>
                                            </Flex>
                                        }

                                        {/* TableHeading End -------------------------------------------------------------------------------------------------------*/}

                                        {
                                            cryptoOption.map((item, optionIndex) => (
                                                item.status &&

                                                <Flex key={optionIndex} w={'full'} p={{ base: 0, sm: 2 }} gap={10}>
                                                    <Flex flex={1.2} color={'gray'} direction={'column'} >

                                                        {/* Left Side Table Data */}
                                                        <Flex borderRight={{ base: '0', md: '1px solid #dcdcdc' }} >

                                                            <Flex flex={1} gap={2} direction={'column'} justifyContent={'space-between'} >
                                                                <Flex gap={0}>
                                                                    <Box display={'flex'} pt={1} width={'40px'} height={'40px'}>
                                                                        <Image boxSize={5} src={item.logo} alt={item.name} />
                                                                    </Box>
                                                                    <Flex direction={'column'}>
                                                                        <Flex gap={2} flexWrap={'wrap'}>

                                                                            <Heading size={'md'}>
                                                                                {item.shrotName}
                                                                            </Heading>
                                                                            <Box fontSize={'14px'} display={'flex'} alignItems={'center'} as='span' color={'gray.300'} fontWeight={500}>
                                                                                {item.name}
                                                                            </Box>
                                                                        </Flex>
                                                                        <Box display={{ base: 'none', sm: 'flex' }}>{item.pricePerCoin}</Box>
                                                                    </Flex>
                                                                </Flex>
                                                            </Flex>
                                                            <Flex flex={.5} justifyContent={'center'} alignItems={{ base: 'end', xl: 'center' }} direction={'column'} mr={{ base: 0, md: 10, xl: 0 }}>
                                                                <Flex gap={2}>
                                                                    <Flex direction={'column'} textAlign={'end'}>

                                                                        <Heading size={'md'} color={'gray.500'}>
                                                                            {Number(item.blc).toFixed(8)}
                                                                        </Heading>
                                                                        <Flex gap={1} display={{ base: 'flex', xl: 'none' }} justifyContent={'end'} fontSize={'14px'} >
                                                                            {/* <Box pt={1}>
                                                                                <LuEqualApproximately />
                                                                            </Box> */}
                                                                            {`≈ ${(item.currentPrice * item.blc).toFixed(2)} INR`}
                                                                        </Flex>
                                                                    </Flex>
                                                                    <Flex display={{ base: 'flex', md: 'none' }}>

                                                                        <ThreeDotMenu2 option={item.actions} />
                                                                    </Flex>
                                                                </Flex>
                                                            </Flex>
                                                            <Flex flex={.5} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={1} fontSize={'14px'} display={{ base: 'none', xl: 'flex' }}>

                                                                <Flex>


                                                                    {`≈ ${(item.currentPrice * item.blc).toFixed(2)}`}
                                                                </Flex>

                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                    {/* Left Side Table Data End */}


                                                    {/* Right side Table Data Start */}
                                                    <Flex flex={.8} justifyContent={{ md: 'space-between', lg: 'space-around' }} display={{ base: 'none', md: 'flex' }}  >
                                                        {item.send}

                                                        {item.receive}

                                                        {
                                                            cryptoStatus.map((item, index) => (
                                                                <React.Fragment key={index}>

                                                                    <Flex key={index} cursor={'pointer'} direction={'column'} onClick={() => navigate(item.to)} >
                                                                        <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}>{item.icon}</Flex>
                                                                        <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>{item.name}</Flex>
                                                                        <Flex>

                                                                        </Flex>

                                                                    </Flex>
                                                                </React.Fragment>
                                                            ))
                                                        }
                                                        {item.threedots}

                                                    </Flex>
                                                    {/* Right side Table Data End */}

                                                </Flex>
                                            ))
                                        }

                                    </Flex>
                                    :
                                    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} gap={2} mt={50} mb={5}>
                                        <Image opacity={0.6} boxSize={10} src='/imagelogo/Fa6SolidWallet.png'></Image>
                                        <Heading size={'sm'} color={'gray.300'}>oops! no wallet exist</Heading>
                                    </Flex>
                        }
                    </Card>

                </Flex>
                {/* Dashboard first end */}

                <Flex>
                    <LatestTransactions />
                </Flex>

            </Flex>

        </Flex>
    )
}


export const ThreeDotMenu1 = ({ btnName }) => {
    const navigateTo = useNavigate()
    return (

        <Menu>
            <MenuButton alignSelf={'start'}>
                <BsThreeDots />
            </MenuButton>
            <MenuList borderRadius={0} >
                <MenuItem onClick={() => {
                    navigateTo('/buy');

                }}>Buy {btnName}</MenuItem>
                <MenuItem onClick={() => { navigateTo('/sell') }}>Sell {btnName}</MenuItem>
            </MenuList>
        </Menu>

    )
}
export const ThreeDotMenu2 = ({ option }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const navigate = useNavigate();
    return (

        <Menu>
            <MenuButton>
                <PiDotsThreeCircleVerticalThin size={30} />
            </MenuButton>
            <MenuList borderRadius={0} >
                <MenuItem mb={2}>
                    {
                        option.map((item, index) => (
                            item.action &&
                            <Flex gap={5} w={'full'}>
                                <Flex key={index} p={2} borderRadius={5} border={'1px solid #dcdcdc'}>{item.action}</Flex>
                            </Flex>

                        ))
                    }
                </MenuItem>

                {
                    option.slice(2).map((item, index) => (
                        <React.Fragment key={index}>
                            <MenuItem key={index}
                                onClick={() => {
                                    navigate(item.to);
                                }} >
                                <Flex cursor={'pointer'} gap={5} w={'full'}>
                                    <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}>{item.icon}</Flex>
                                    <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>{item.name}</Flex>
                                </Flex>
                            </MenuItem>
                        </React.Fragment>
                    ))
                }



            </MenuList>
        </Menu>

    )
}
export const LatestTransactions = () => {
    const { transaction, handleGetAllTransaction } = useAccount();
    const [isloading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [copiedTrasactionId, setCopiedTransactionId] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const { priceRef } = useOtherDetail();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const bgColorTransactionStrip = useColorModeValue("white", "gray.600")
    const bgmodalColor = useColorModeValue("gray.50", "gray.600")
    const textColor = useColorModeValue('gray.500', 'white');

    const spinnerColor = useColorModeValue('whiteAlpha.800', 'gray.500');

    const totalPages = Math.ceil(transaction?.data?.length / itemsPerPage);
    const currentData = transaction?.data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    useEffect(() => {
        const req = new TransactionRequest();
        getAllTransaction(req);
    }, []);
    const getAllTransaction = async (req) => {
        try {
            setIsLoading(true);
            const response = await handleGetAllTransaction(req);

            if (response?.status === true) {
                if (response?.data?.length === 0) {
                    setIsLoading(false);
                    return (
                        <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} gap={2} mt={50} mb={5} p={4}>
                            <Image opacity={0.6} boxSize={10} src='/imagelogo/HugeiconsExchange03.png'></Image>
                            <Heading size={'sm'} color={'gray.300'}>No Transaction Found</Heading>
                        </Flex>
                    );
                }
                setIsLoading(false);
            }
            return response;
        }
        catch (error) {
            console.log("error", error);
        }

    }
    const handleClick = (transaction) => {
        setSelectedTransaction(transaction);
        onOpen();
    };
    const handleCopyAddress = (item) => {
        console.log(item);
        navigator.clipboard.writeText(item).then(() => {
            setCopiedAddress(true);
            setTimeout(() => {
                setCopiedAddress(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCopyTransaction = (item) => {
        navigator.clipboard.writeText(item).then(() => {
            setCopiedTransactionId(true);
            setTimeout(() => {
                setCopiedTransactionId(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }





    return (
        <>
            <Card w={'100%'} p={4} >
                <Heading size={'md'}> Latest Transactions</Heading>

                {
                    isloading && (
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            w="100%"
                            h="100%"
                            bg={spinnerColor}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            zIndex="10"
                        >
                            {/* <Spinner mb={10} size="xl" color="blue.500" /> */}
                            <CircularProgress isIndeterminate color="orange.500" size="60px" />
                        </Box>
                    )
                }

                {
                    transaction?.data?.length > 0 &&
                    <>

                        <Flex w={'full'} p={{ base: 2, sm: 8 }} color={'gray'} direction={'column'} gap={10}  >
                            {/* Heading start */}

                            <Flex Flex w={'full'} fontSize={'12px'} fontWeight={500} px={5}>
                                <Flex flex={1.4} gap={10}>
                                    <Flex flex={.8}> <Box ml={12} >TRANSACTION</Box></Flex>
                                    <Flex flex={1.2} display={{ base: 'none', md: 'Flex' }} ml={0}>DETAILS</Flex>
                                </Flex>
                                <Flex flex={.6}>
                                    <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                        <Flex display={{ base: 'none', lg: 'flex' }}>STATUS</Flex>
                                        <Flex><Box display={'flex'} justifyContent={'end'} >AMOUNT</Box></Flex>
                                    </Flex>
                                </Flex>
                            </Flex>

                            {/* Heading End */}

                            {/*  Data Part start */}
                            {

                                transaction?.data?.length > 0 ?
                                    transaction?.data.map((item, index) => (

                                        <>
                                            <Flex w={'full'}
                                                p={5}
                                                key={item.txn_id}
                                                onClick={() => handleClick(item)}
                                                cursor={'pointer'}
                                                pb={3}
                                                bg={bgColorTransactionStrip}
                                                // borderBottom={'1px solid #dcdcdc'}
                                                // bg={item.method === 'receive' ? 'green.50' : 'red.50'}
                                                // box shadow={'md'}
                                                _hover={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", bg: 'orange.50' }}
                                                borderRadius={5}
                                            >
                                                <Flex flex={1.4} gap={10} >
                                                    <Flex flex={.8}>
                                                        <Flex gap={5}>
                                                            <Box pt={1}>
                                                                <Circle bg={'orange'} p={2}>
                                                                    {
                                                                        item.method === 'receive' ? <BsBoxArrowInDownRight size={20} /> : <BsBoxArrowInUpRight size={20} />
                                                                    }
                                                                </Circle>
                                                            </Box>
                                                            <Flex direction={'column'}>
                                                                <Box fontWeight={500}>{item.method === 'receive' ? "received" : 'Send'}</Box>
                                                                <Box fontSize={'12px'}>{new Date(Number(item.date_time) * 1000).toLocaleString('en-GB')}</Box>

                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex display={{ base: 'none', md: 'Flex' }} direction={'column'} flex={1.2} gap={2}>
                                                        <Box maxW={'250px'} fontWeight={450}>

                                                            {
                                                                item.method === "receive" ? `receive to ${item.to_address.slice(0, 6)}**********************${item.to_address.slice(-5)}` : `send to ${item.to_address}`
                                                            }
                                                        </Box>
                                                        <Flex display={{ base: 'flex', lg: 'none' }}>

                                                            <Button variant={'outline'} size={'sm'} colorScheme={item.status === 'success' ? 'green' : 'red'}>{item.status}</Button>

                                                        </Flex>

                                                    </Flex>
                                                </Flex>
                                                <Flex flex={.6} >
                                                    <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                                        <Flex display={{ base: 'none', lg: 'Flex' }}>
                                                            <Button variant={'outline'} size={'sm'} colorScheme={item.status === 'success' ? 'green' : 'red'}>{item.status}</Button>
                                                        </Flex>
                                                        <Flex>
                                                            <Flex direction={'column'} textAlign={'end'} fontWeight={500} flexWrap={'wrap'} >
                                                                {
                                                                    item.method === 'receive' ?
                                                                        <Box whiteSpace={'wrap'} color={'green.400'}>
                                                                            {`+${Number(item.paid_amount).toFixed(8)} ${(item.asset).toUpperCase()}`}
                                                                        </Box>
                                                                        :
                                                                        <Flex color={'red.400'}>
                                                                            {`-${Number(item.debit_amount).toFixed(8)} ${(item.asset).toUpperCase()}`}
                                                                        </Flex>


                                                                }
                                                                {/* <Flex alignItems={'end'}  >{`${item.method === 'receive' ? `+ ${item.paid_amount}` : `- ${item.debit_amount}`} ${item.asset.toUpperCase()}`}</Flex> */}
                                                                {
                                                                    item.method === 'receive' ?
                                                                        <Box alignItems={'end'} fontSize={'12px'} color={'green.400'} >
                                                                            {`+${(Number(item.paid_amount) * Number(priceRef?.current?.[CoinSymbolMap[item.asset]].inr)).toFixed(2)} INR`}

                                                                        </Box>
                                                                        :
                                                                        <Box alignItems={'end'} fontSize={'12px'} color={'red.400'} >
                                                                            {`-${(Number(item.debit_amount) * Number(priceRef?.current?.[CoinSymbolMap[item.asset]].inr)).toFixed(2)} INR`}

                                                                        </Box>
                                                                }
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </>
                                    ))
                                    :
                                    <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>

                                        <Image boxSize={120} src='https://2.bp.blogspot.com/-X9sVvOD0hrs/W5cz8WKyknI/AAAAAAAAEKI/s6mNIUQdsy4KGnCgtF1VSZlnj237ArxawCLcBGAs/s1600/not%2Bfound.gif'></Image>
                                    </Flex>
                            }
                            {
                                selectedTransaction &&

                                <Modal key={selectedTransaction.txn_id} isOpen={isOpen} onClose={onClose} isCentered size={'lg'} >
                                    <ModalContent>
                                        <ModalHeader bg={bgmodalColor} borderTopRadius={5}>
                                            Transaction Details
                                            <ModalCloseButton onClick={onClose} />
                                        </ModalHeader>
                                        <ModalBody bg={'transparent'}>
                                            <Flex direction={'column'} gap={7} mt={5}>
                                                <Flex direction={'column'} gap={4}>

                                                    <Flex gap={2} direction={'column'} alignSelf={'center'}>
                                                        <Circle bg={'orange'} p={5}>
                                                            {
                                                                selectedTransaction.method === 'receive' ? <BsBoxArrowInDownRight size={20} /> : <BsBoxArrowInUpRight size={20} />
                                                            }
                                                        </Circle>
                                                        <Flex direction={'column'} alignItems={'center'}>
                                                            <Box fontWeight={500} >{selectedTransaction.method === 'receive' ? "Received" : 'Send'}</Box>

                                                        </Flex>
                                                    </Flex>
                                                    {
                                                        selectedTransaction.method === 'receive' ?
                                                            <Heading alignSelf={'center'} textAlign={'end'} color={'green.400'}>

                                                                {`+${Number(selectedTransaction.paid_amount).toFixed(8)} 
                                                             ${selectedTransaction.asset.toUpperCase()}`}

                                                            </Heading>
                                                            :
                                                            <Heading alignSelf={'center'} textAlign={'end'} color={'red.400'}>


                                                                {`-${Number(selectedTransaction.debit_amount).toFixed(8)} 
                                                             ${selectedTransaction.asset.toUpperCase()}`}
                                                            </Heading>
                                                    }
                                                    <Flex alignselectedTransactions={'center'} justifyContent={'center'} p={2} fontSize={'12px'} color={'gray.500'} fontWeight={500}>
                                                        {`send to ${selectedTransaction.to_address}`}
                                                    </Flex>
                                                </Flex>

                                                <Divider />



                                                <Flex justifyContent={'space-between'}>
                                                    <Box fontWeight={500}>Time :</Box>
                                                    <Box>{new Date(Number(selectedTransaction.date_time) * 1000).toLocaleString('en-GB')}</Box>

                                                </Flex>
                                                <Flex justifyContent={'space-between'}>
                                                    <Box fontWeight={500}>Status :</Box>
                                                    <Box borderRadius={5} p={1} bg={bgmodalColor} border={'1px solid #dcdcdc'}>{selectedTransaction.status}</Box>
                                                </Flex>
                                                <Flex justifyContent={'space-between'}>
                                                    <Box fontWeight={500}>Fee :</Box>
                                                    <Box>{selectedTransaction.transfer_fee}</Box>
                                                </Flex>
                                                <Flex justifyContent={'space-between'}>
                                                    <Box fontWeight={500}>Transaction link :</Box>
                                                    <Flex gap={1} as={Link} _hover={{ textDecoration: 'underline' }} color={'orange.400'} >
                                                        View in Blockchain
                                                        <Box mt={1} color={'orange.400'}>
                                                            <BsBoxArrowInUpRight />
                                                        </Box>
                                                    </Flex>
                                                </Flex>
                                                <Flex justifyContent={'space-between'} direction={'column'} gap={2}>
                                                    <Box fontWeight={500}>Address :</Box>
                                                    <Flex borderRadius={5} border={'1px solid #dcdcdc'} direction={'column'} bg={bgmodalColor} p={2} gap={2}>
                                                        <Box w={'full'}>

                                                            {selectedTransaction.to_address}
                                                        </Box>
                                                        <Tooltip label={copiedAddress ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} >
                                                            <Box alignSelf={'end'} mt={1} cursor={'pointer'} onClick={() => handleCopyAddress(selectedTransaction.to_address)}>

                                                                <MdContentCopy />

                                                            </Box>
                                                        </Tooltip>

                                                    </Flex>
                                                </Flex>

                                                <Flex justifyContent={'space-between'} direction={'column'} gap={2}>
                                                    <Box fontWeight={500}>Transaction hash ID :</Box>
                                                    <Flex borderRadius={5} bg={bgmodalColor} direction={'column'} border={'1px solid #dcdcdc'} p={2} gap={2} >
                                                        <Box as='span' w={'full'}>

                                                            <Box as='span'>
                                                                {selectedTransaction.txn_hash_id}

                                                            </Box>
                                                        </Box>
                                                        <Tooltip label={copiedTrasactionId ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} >
                                                            <Box alignSelf={'end'} mt={1} onClick={() => handleCopyTransaction(selectedTransaction.txn_hash_id)}>

                                                                <MdContentCopy />
                                                            </Box>
                                                        </Tooltip>
                                                    </Flex>
                                                </Flex>

                                            </Flex>


                                        </ModalBody>
                                        <ModalFooter>
                                            <Button className='btn btn-primary' onClick={onClose}>Close</Button>


                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            }
                            {/* Data Part End */}

                        </Flex>
                    </>

                }


                <Flex justifyContent={'space-between'} direction={{ base: 'column', md: 'row' }} alignItems={'center'} px={8}  >
                    {
                        transaction?.data?.length > 0 &&
                        <Flex direction={'column'} textAlign={{ base: 'center', md: 'start' }}>
                            <Box size={'md'} color={'orange.500'} fontWeight={600}>Total Transaction : <Box fontWeight={600} as={'span'} color={textColor}> {transaction?.pagination?.total}</Box> </Box>
                            <Box size={'md'} color={'orange.500'} fontWeight={600}> Pages : <Box fontWeight={600} as={'span'} color={textColor}> {transaction?.pagination?.last_page}</Box></Box>
                        </Flex>
                    }
                    <PaginatedList detail={transaction?.pagination} setIsLoading={setIsLoading} type='all' />
                </Flex>


            </Card>
        </>
    )
}





export const Receive1 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [copied, setCopied] = useState(false);
    const { web3wallet } = useAccount();
    const bgmodalHeader = useColorModeValue("orange.50", "gray.600")
    const bgmodalFooter = useColorModeValue("red.100", "gray.600")

    const handleCopy = () => {
        navigator.clipboard.writeText(web3wallet?.data?.bitcoin[0]?.wallet_address).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 2, md: 0 }} onClick={onOpen} w={'auto'} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><RiArrowRightDownLine /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Receive</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={bgmodalHeader} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src='/imagelogo/bitcoin-btc-logo.png' boxSize={5}></Image>
                            Receive Bitcoin

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={5}>
                            {/* <Flex direction={'column'}>
                                <ButtonGroup>
                                    <Button borderRadius={0} bg={'transparent'} _hover={{ bg: 'transparent', borderBottom: '1px solid black' }}>Bitcoin network</Button>
                                    <Button borderRadius={0} bg={'transparent'} _hover={{ bg: 'transparent', borderBottom: '1px solid black' }}>Lightning</Button>
                                </ButtonGroup>
                                <Divider />
                            </Flex> */}
                            <Flex my={7}>
                                <WalletQR walletAddress={web3wallet?.data?.bitcoin?.length > 0 ? web3wallet?.data?.bitcoin[0]?.wallet_address : 'No Bitcoin wallet address available'} />
                                {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                            </Flex>
                            <Heading size={'lg'}>Your Bitcoin address</Heading>
                            <Flex direction={'column'}>

                                <Box color={'gray'}>Use this address to deposit Bitcoin (BTC):</Box>
                                <Box fontWeight={500}>{web3wallet?.data?.bitcoin?.length > 0 ? web3wallet?.data?.bitcoin[0]?.wallet_address : 'No Bitcoin wallet address available'}</Box>
                            </Flex>
                            <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                <Button mb={5} colorScheme='orange' w={'150px'} onClick={handleCopy}>Copy address</Button>
                            </Tooltip>

                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={bgmodalFooter} borderBottomRadius={5}>
                        <Flex direction={'column'} justifyContent={'center'} alignItems={'start'}>
                            {/* <Box ml={3} >

                                <IoWarningOutline size={30} color={'red.500'} />
                            </Box> */}
                            <Box p={4}>

                                <Box as='span' fontWeight={500}> Make sure to only send BTC through the selected network: Bitcoin.&nbsp;</Box>
                                Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                            </Box>
                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export const Receive2 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const address = '0xae2244e9bD6fC01b52d8E1b634eE5Db94eA6Ca48'
    const [copied, setCopied] = useState(false);
    const { web3wallet } = useAccount();
    const bgmodalHeader = useColorModeValue("orange.50", "gray.600")
    const bgmodalFooter = useColorModeValue("red.100", "gray.600")


    const handleCopy = () => {
        navigator.clipboard.writeText(web3wallet?.data?.ethereum[0]?.wallet_address).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 2, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><RiArrowRightDownLine /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Receive</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md' }} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader bg={bgmodalHeader} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src='/imagelogo/ethereum-eth-logo.png' boxSize={5}></Image>
                            Receive Etherum

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex my={7} direction={'column'} gap={8}>

                            <Flex >
                                <WalletQR walletAddress={web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[0]?.wallet_address : 'No Bitcoin wallet address available'} />

                                {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                            </Flex>
                            <Heading size={'lg'}>Your ERC-20 address</Heading>
                            <Flex direction={'column'}>

                                <Box color={'gray'}>Use this address to deposit Ethereum (ETH):</Box>
                                <Box fontWeight={500}>{web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[0]?.wallet_address : 'No Bitcoin wallet address available'}</Box>
                            </Flex>
                            <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                <Button mb={2} colorScheme='orange' w={'150px'} onClick={handleCopy}>Copy address</Button>
                            </Tooltip>

                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={bgmodalFooter} borderBottomRadius={5}>
                        <Flex direction={'column'} justifyContent={'center'} alignItems={'start'}>
                            <Box ml={3} >

                                <IoWarningOutline size={30} color={'red.500'} />
                            </Box>
                            <Box p={4}>

                                <Box as='span' fontWeight={500}>Make sure to only send ETH through the selected network: ERC-20.&nbsp; </Box>
                                Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                            </Box>
                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export const Receive3 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const address = '0xae2244e9bD6fC01b52d8E1b634eE5Db94eA6Ca48'
    const [copied, setCopied] = useState(false);
    const { web3wallet } = useAccount();
    const bgmodalHeader = useColorModeValue("orange.50", "gray.600");
    const bgmodalFooter = useColorModeValue("red.100", "gray.600");


    const handleCopy = () => {
        navigator.clipboard.writeText(web3wallet?.data?.binance?.length > 0 ? web3wallet?.data?.binance[0]?.wallet_address : 'No Bitcoin wallet address available')
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
            });
    }
    return (
        <>
            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 2, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><RiArrowRightDownLine /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Receive</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md' }}>
                <ModalOverlay />
                <ModalContent >
                    {/* <Flex bg={'gray.100'} p={2} alignItems={'center'} justifyContent={'space-between'}> */}
                    <ModalHeader bg={bgmodalHeader} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src='/imagelogo/bnb-bnb-logo.png' boxSize={5}></Image>
                            Receive BNB

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    {/* </Flex> */}
                    <ModalBody>
                        <Flex my={7} direction={'column'} gap={8}>

                            <Flex >
                                <WalletQR walletAddress={web3wallet?.data?.binance?.length > 0 ? web3wallet?.data?.binance[0]?.wallet_address : 'No Bitcoin wallet address available'} />

                                {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                            </Flex>
                            <Heading size={'lg'}>Your ERC-20 address</Heading>
                            <Flex direction={'column'}>

                                <Box color={'gray'}>Use this address to deposit BNB (BNB):</Box>
                                <Box fontWeight={500}>{web3wallet?.data?.binance?.length > 0 ? web3wallet?.data?.binance[0]?.wallet_address : 'No Bitcoin wallet address available'}</Box>
                            </Flex>
                            <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                <Button mb={2} colorScheme='orange' w={'150px'} onClick={handleCopy}>Copy address</Button>
                            </Tooltip>


                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={bgmodalFooter} borderBottomRadius={5}>
                        <Flex direction={'column'} justifyContent={'center'} alignItems={'start'}>
                            <Box ml={3} >

                                <IoWarningOutline size={30} color={'red.500'} />
                            </Box>
                            <Box p={4}>

                                <Box as='span' fontWeight={500}>Make sure to only send BNB through the selected network: ERC-20. &nbsp; </Box>
                                Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                            </Box>
                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const Receive4 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [istron, setTron] = React.useState(false)
    const [active, setActive] = React.useState('eth')
    const addressTron = 'TFk4Ee97s4cPqebEeUY5kbDfPgqiRfR6X9'
    const addressEth = '0xae2244e9bD6fC01b52d8E1b634eE5Db94eA6Ca48'
    const [copied, setCopied] = useState(false);
    const { web3wallet } = useAccount();
    const bgmodalHeader = useColorModeValue("orange.50", "gray.600");
    const bgmodalFooter = useColorModeValue("red.100", "gray.600");
    const bgmodaltag = useColorModeValue("orange.100", "gray.500");


    const handleCopyTron = () => {
        navigator.clipboard.writeText(web3wallet?.data?.tron?.length > 0 ? web3wallet?.data?.tron[0]?.wallet_address : 'No Tron wallet address available').then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCopyEth = () => {
        navigator.clipboard.writeText(web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[1]?.wallet_address : 'No ETh wallet address available').then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 2, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><RiArrowRightDownLine /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Receive</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md' }} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader bg={bgmodalHeader} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src='/imagelogo/tether-usdt-logo.png' boxSize={5}></Image>
                            Receive USDT

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={5}>
                            <Flex direction={'column'}>
                                <ButtonGroup gap={2} >
                                    <Flex gap={2} >

                                        <Button
                                            p={0}
                                            size={'sm'}
                                            borderBottom={active === 'eth' ? '1px solid black' : '0px'}
                                            borderRadius={0}
                                            bg={'transparent'}
                                            _hover={{ bg: 'transparent' }}
                                            onClick={() => {
                                                setTron(false);
                                                setActive('eth');
                                            }
                                            }
                                        >
                                            Eth network
                                        </Button>
                                        <Button
                                            gap={2}
                                            p={0}
                                            size={'sm'}
                                            borderBottom={active === 'tron' ? '1px solid black' : '0px'}
                                            borderRadius={0} bg={'transparent'}
                                            _hover={{ bg: 'transparent' }}
                                            onClick={() => {
                                                setTron(true)
                                                setActive('tron');
                                            }
                                            }>TRON network <Tag bg={bgmodaltag} >cheaper</Tag>

                                        </Button>
                                    </Flex>

                                </ButtonGroup>
                                <Divider />
                            </Flex>
                            {
                                istron ?

                                    web3wallet.data.tron ?

                                        <Flex my={5} direction={'column'} gap={7}>

                                            <Flex>
                                                <WalletQR walletAddress={web3wallet?.data?.tron[0]?.wallet_address} />

                                                {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                                            </Flex>
                                            <Heading size={'lg'}>Your TRC-20 address</Heading>
                                            <Flex direction={'column'}>

                                                <Box color={'gray'}>Use this address to deposit Tether (USDT):</Box>
                                                <Box fontWeight={500}>{web3wallet?.data?.tron?.[0]?.wallet_address}</Box>
                                            </Flex>
                                            <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                                <Button mb={5} colorScheme='orange' w={'150px'} onClick={handleCopyTron}>Copy address</Button>
                                            </Tooltip>

                                        </Flex>
                                        :
                                        <Flex my={5} direction={'column'} gap={7}>

                                            <Flex>
                                                <WalletQR walletAddress={'Plz create wallet'} />

                                                {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                                            </Flex>
                                            <Heading size={'lg'}>Your TRC-20 address</Heading>
                                            <Flex direction={'column'}>

                                                <Box border={'1px solid #dcdcdc'} borderRadius={5} bg={'red.50'} fontWeight={500} p={4} color={'gray.500'}>Wallet not created yet!</Box>
                                            </Flex>
                                            {/* <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                                <Button mb={5} colorScheme='orange' w={'150px'} onClick={handleCopyTron}>Copy address</Button>
                                            </Tooltip> */}
                                            <CreateTronWallet />

                                        </Flex>

                                    :

                                    <Flex my={5} direction={'column'} gap={7}>

                                        <Flex >
                                            {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}
                                            <WalletQR walletAddress={web3wallet?.data?.tron?.length > 0 ? web3wallet?.data?.ethereum[1]?.wallet_address : 'No Bitcoin wallet address available'} />

                                        </Flex>
                                        <Heading size={'lg'}>Your ERC-20 address</Heading>
                                        <Flex direction={'column'}>

                                            <Box color={'gray'}>Use this address to deposit Ethereum (ETH):</Box>
                                            <Box fontWeight={500}>{web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[1]?.wallet_address : 'No Bitcoin wallet address available'}</Box>
                                        </Flex>
                                        <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={200} hasArrow>

                                            <Button mb={2} colorScheme='orange' w={'150px'} onClick={handleCopyEth}>Copy Address</Button>
                                        </Tooltip>


                                    </Flex>

                            }

                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={bgmodalFooter} borderBottomRadius={5}>
                        <Flex direction={'column'} justifyContent={'center'} alignItems={'start'}>
                            {
                                istron ?

                                    <Box p={4}>

                                        <Box as='span' fontWeight={500}> Make sure to only send USDT through the selected network: TRC-20.&nbsp;</Box>
                                        Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                                    </Box>
                                    :
                                    <Box p={4}>

                                        <Box as='span' fontWeight={500}> Make sure to only send USDT through the selected network: ERC-20.&nbsp;</Box>
                                        Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                                    </Box>

                            }

                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export const Send1 = () => {
    const { status, sendusdt } = useSendUsdtNew();
    const { user } = useUser();
    const { handleOtherUserDetail, otherUserDetail, setOtherUserDetail } = useAuth();
    const { handleSendInternalTransaction, handleWalletAddressTransaction, handleUpdateWalletAddressTransaction, handleFeeCalculation } = useAccount()
    const cryptoOption = useCryptoOption();
    const [headername, setHeaderName] = useState(cryptoOption[0].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[0].logo);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [asset, setAsset] = useState(cryptoOption[0].asset);
    const [network, setNetwork] = useState(cryptoOption[0].network);
    const [isbyaddress, setIsByAddress] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isopen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const wrapperRef = useRef();
    const [currentPrice, setCurrentPrice] = useState(cryptoOption[0].currentPrice);
    const allUsersRef = useRef([]);
    const [isBtc, setBtc] = useState(true);
    const factor = Math.pow(10, 2);
    const { priceRef } = useOtherDetail();
    const [isUserValid, setUserValid] = useState(false);
    const [isWalletValid, setWalletValid] = useState(false);
    const [userid, setUserId] = useState();
    const [isContinue, setIsContinue] = useState(false);
    const [isSend, setSend] = useState(true);
    const [availableBlc, setAvailableBalance] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    const toast = useToast();
    const [transferFee, setTransferFee] = useState(0);
    const [totalAssetValue, setTotalAssetValue] = useState(0);
    const bgmodalColor = useColorModeValue("gray.100", "gray.600")
    const bgmodalHeader = useColorModeValue("orange.50", "gray.600")
    const bginputColor = useColorModeValue("#e8f0fe", "gray.700")
    const btnColor = useColorModeValue('gray.200', 'gray.400')


    const resetState = () => {
        setHeaderName(cryptoOption[0].name);
        setHeaderLogo(cryptoOption[0].logo);
        setAsset(cryptoOption[0].asset);
        setNetwork(cryptoOption[0].network);
    }
    const assetValue = isBtc ? amount : amount / priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    const assetInrValue = amount * priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    // const transferFee = (amount * 0.02) / 100;
    const transferFeeInr = transferFee * priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    // const totalAssetValue = Number(assetValue) + Number(transferFee);
    const totalAssetInrValue = (Number(totalAssetValue)) * Number(priceRef.current?.[CoinSymbolMap[asset]]?.inr);

    const Dto = {
        username: inputValue,
        network: network,
        asset: asset,
        assetValue: assetValue,
    }
    const feeCalculationDto = {
        asset: asset,
        network: network,
        assetValue: assetValue,
    }
    const AddressDto = {
        toAddress: walletAddress,
        network: network,
        asset: asset,
        assetValue: assetValue,
        totalAsset: Number(totalAssetValue)

    }
    useEffect(() => {
        setUserId(user?.user_id);
    }, [user])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                if (inputValue) {
                    const response = await handleOtherUserDetail(Dto);
                    if (response.data[0].username === inputValue) {
                        setUserValid(true);
                    }
                    else {
                        setUserValid(false);
                    }

                    allUsersRef.current = response.data || [];
                    filterSuggestions(inputValue);

                }
                else {
                    setSuggestions([]);
                }
            }
            catch (error) {
                throw error?.response ? error?.response?.data : error?.response?.message;
            }
        }
        fetchdata();
    }, [inputValue]);


    useOutsideClick({
        ref: wrapperRef,
        handler: () => setIsOpen(false),
    });
    const filterSuggestions = (value) => {
        const filtered = allUsersRef.current.filter((item) =>
            item.username.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filtered);
        setIsOpen(filtered.length > 0);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };
    const handleWalletAddress = (e) => {
        const value = e.target.value;
        setWalletAddress(value);
    };

    const handleSelect = (name) => {
        setInputValue(name);
        setIsOpen(false);
    };
    const handleAmount = (e) => {
        setAmount(e.target.value);

    }
    const handleContinue = async () => {
        const response = await handleFeeCalculation(feeCalculationDto);
        if (response.status === true) {
            setTransferFee(response?.data?.transferFee);
            setTotalAssetValue(response?.data?.totalAsset);
            setIsContinue(true);
        }
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            if (isWalletValid) {
                const res = await handleWalletAddressTransaction(AddressDto);

                if (res?.status === true) {

                    const response = await decryptWithKey(res?.data, userid)
                    console.log(response);

                    const privateKey = await decryptWithKey(response?.senderWalletData?.wallet_key, userid);
                    let txResponse;
                    if (asset === 'btc') {
                        txResponse = await SendBitcoin(privateKey, walletAddress, response?.transactionData?.paid_amount);
                    }
                    if (asset === 'bnb') {
                        txResponse = await SendBnb(privateKey, walletAddress, response?.transactionData?.paid_amount);
                    }
                    if (asset === 'eth') {
                        txResponse = await Sendeth(privateKey, walletAddress, response?.transactionData?.paid_amount)
                    }
                    if (asset === 'usdt') {
                        txResponse = await sendusdt(privateKey, walletAddress, response?.transactionData?.paid_amount)
                    }
                    console.log(txResponse);
                    if (txResponse?.transactionHash) {
                        const txnRequestDto = {
                            "txnId": response?.transactionData?.txn_id,
                            "txnHashId": txResponse?.transactionHash,
                            "status": txResponse?.status === 1 ? "success" : "failed",
                        }
                        const updateResponse = await handleUpdateWalletAddressTransaction(txnRequestDto);
                        if (updateResponse.status === true) {
                            setIsLoading(false);
                            onClose();
                            setAmount(0);
                            setWalletAddress('');
                            setIsContinue(false);
                            toast({
                                title: "Transaction Success",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                                position: 'top-right'
                            })
                        }
                        console.log(updateResponse);
                    }
                }
            }
            else {
                const response = await handleSendInternalTransaction(Dto);
                console.log(response);
                if (response.status === true) {
                    setIsLoading(false);
                    onClose();
                    setAmount(0);
                    setWalletAddress('');
                    setIsContinue(false);
                    toast({
                        title: "Transaction Success",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: 'top-right'
                    })

                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setWalletValid(isValidWalletAddress(walletAddress, asset));
    }, [walletAddress, asset]);

    function isValidWalletAddress(address, coin, network = 'testnet') {
        const btcNetwork = network === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
        switch (coin.toLowerCase()) {
            case 'btc':
                try {
                    bitcoin.address.toOutputScript(address, btcNetwork);
                    return true;
                } catch (e) {
                    return false;
                }

            case 'eth':
            case 'bnb':
            case 'usdt': // all use Ethereum-style addresses
                return isAddress(address);

            default:
                return false;
        }
    }


    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 2, md: 0 }} onClick={onOpen}  >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState} size={{ base: 'sm', md: 'lg' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={bgmodalHeader} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src={headerlogo} boxSize={5}></Image>
                            Send {headername}

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    {
                        !isContinue ?

                            <ModalBody>
                                <Flex direction={'column'} gap={5} my={5}>

                                    <SelectToken index={0} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} setAsset={setAsset} setNetwork={setNetwork} setCurrentPrice={setCurrentPrice} setAvailableBalance={setAvailableBalance} />

                                    <Flex direction={'column'} bg={bgmodalColor} borderRadius={5} py={4}>

                                        <Flex justifyContent={'space-between'} p={4} >
                                            <Heading size={'md'}>Send to </Heading>
                                            <ButtonGroup size={'sm'} >
                                                <Button bg={isbyaddress ? 'orange' : btnColor} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} fontSize={'12px'} onClick={() => { setIsByAddress(true); setInputValue(null) }}>Address</Button>
                                                <Button bg={isbyaddress ? btnColor : 'orange'} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} fontSize={'12px'} onClick={() => { setIsByAddress(false); setWalletAddress(null) }}>Cryptico User</Button>
                                            </ButtonGroup>
                                        </Flex>
                                        {
                                            isbyaddress ?

                                                <FormControl p={4} borderRadius={5}>
                                                    <Input
                                                        px={0}
                                                        border={'none'}
                                                        value={walletAddress}
                                                        _hover={{ border: 'none' }}
                                                        _focus={{ boxShadow: 'none' }}
                                                        onChange={handleWalletAddress}
                                                        placeholder='Paste or Enter wallet address here '
                                                    />
                                                </FormControl>
                                                :
                                                <FormControl p={4} borderRadius={5}>
                                                    <Box ref={wrapperRef}>
                                                        <Input
                                                            px={0}
                                                            border={'none'}
                                                            _hover={{ border: 'none' }}
                                                            _focus={{ boxShadow: 'none' }}
                                                            placeholder='Enter username '
                                                            value={inputValue}
                                                            onChange={handleChange}

                                                        />

                                                        {isopen && suggestions?.length > 0 && (
                                                            <Box
                                                                px={4}
                                                                position="absolute"
                                                                top="100%"
                                                                left="0"
                                                                right="0"
                                                                bg="gray.100"
                                                                borderRadius="md"
                                                                mt={1}
                                                                zIndex="dropdown"
                                                                boxShadow="md"
                                                            >
                                                                <List spacing={0}>
                                                                    {suggestions?.map((item, index) => (
                                                                        <Flex mb={2} >
                                                                            <Avatar name={item.username} src={item.profile_image}></Avatar>
                                                                            <ListItem mt={1}
                                                                                key={index}
                                                                                px={3}
                                                                                py={2}
                                                                                fontSize={'14px'}
                                                                                fontWeight={500}
                                                                                _hover={{ bg: "gray.100", cursor: "pointer" }}
                                                                                onClick={() => handleSelect(item.username)}
                                                                            >
                                                                                Cryptico user &nbsp;
                                                                                <Box as='span' color='orange' _hover={{ textDecoration: 'underline' }} >

                                                                                    {item.username}

                                                                                </Box>
                                                                            </ListItem>
                                                                        </Flex>

                                                                    ))}
                                                                </List>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </FormControl>
                                        }
                                    </Flex>


                                    {/* Amount Section start----------------------------------- */}
                                    {
                                        (isUserValid || isWalletValid) ?
                                            <Card bg={bgmodalColor} gap={1}>
                                                <Flex justifyContent={'space-between'} p={4}>

                                                    <Heading size={'md'}>Amount to send</Heading>
                                                    <Box>Available : {Number(availableBlc).toFixed(8)}</Box>

                                                </Flex>


                                                <FormControl px={4}>
                                                    <InputGroup>

                                                        {
                                                            isBtc ?
                                                                <>
                                                                    <Input
                                                                        type='number'
                                                                        fontSize={'22px'}
                                                                        border={'none'}
                                                                        onChange={handleAmount}
                                                                        fontWeight={700}
                                                                        value={amount === 0 || amount === '' ? '' : amount}
                                                                        py={10}
                                                                        placeholder={amount > 0 ? availableBlc : '0.00000000'}
                                                                        _hover={{ border: 'none' }}
                                                                        _focus={{ boxShadow: 'none' }}
                                                                    ></Input>

                                                                    <InputRightAddon color={'gray'} fontSize={'16px'} border={'none'} fontWeight={700} py={10}>{asset.toLocaleUpperCase()}</InputRightAddon>
                                                                </>

                                                                :
                                                                <>
                                                                    <Input
                                                                        type='number'
                                                                        fontSize={'22px'}
                                                                        border={'none'}
                                                                        value={amount}
                                                                        onChange={handleAmount}
                                                                        fontWeight={700}
                                                                        py={10}
                                                                        placeholder='≈ 0.00'
                                                                        _hover={{ border: 'none' }}
                                                                        _focus={{ boxShadow: 'none' }}
                                                                    ></Input>

                                                                    <InputRightAddon color={'gray'} fontSize={'16px'} border={'none'} fontWeight={700} py={10}>INR</InputRightAddon>
                                                                </>

                                                        }
                                                    </InputGroup>
                                                </FormControl>
                                                {
                                                    isBtc ?
                                                        <Box borderRadius={5} fontWeight={500} m={4} w={'auto'} p={4} py={2} bg={bginputColor}>{`${amount * priceRef?.current?.[CoinSymbolMap[asset]]?.inr}`} INR</Box>
                                                        :
                                                        <Box borderRadius={5} fontWeight={500} m={4} w={'auto'} p={4} py={2} bg={bginputColor}>{`${(amount / priceRef?.current?.[CoinSymbolMap[asset]]?.inr).toFixed(8)}`}  {asset.toLocaleUpperCase()}</Box>


                                                }
                                                <Flex justifyContent={'space-between'} p={4}>
                                                    <ButtonGroup gap={1}>
                                                        <Button size={'sm'} bg={btnColor} onClick={() => setAmount(0)}>min</Button>
                                                        <Button size={'sm'} bg={btnColor} onClick={() => setAmount(availableBlc)}>max</Button>
                                                    </ButtonGroup>
                                                    <ButtonGroup gap={1}>
                                                        <Button isActive={isBtc} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} size={'sm'} bg={btnColor} onClick={() => setBtc(true)}>{asset.toLocaleUpperCase()}</Button>
                                                        <Button _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} size={'sm'} bg={btnColor} onClick={() => setBtc(false)}>INR</Button>
                                                    </ButtonGroup>
                                                </Flex>
                                            </Card>
                                            :
                                            <FormControl bg={bgmodalColor}>
                                                <Input
                                                    disabled
                                                    type='number'
                                                    fontSize={'22px'}
                                                    border={'none'}
                                                    onChange={handleAmount}
                                                    fontWeight={700}
                                                    py={10}
                                                    placeholder='Amount to send'
                                                    _hover={{ border: 'none' }}
                                                    _focus={{ boxShadow: 'none' }}
                                                ></Input>
                                            </FormControl>

                                    }
                                    {/* Amount Section End----------------------------------- */}

                                    <Button isLoading={isContinue} isDisabled={Number(amount) > 0 ? false : true} fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.200' }} bg={bgmodalColor} p={10} onClick={handleContinue}   >
                                        <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                            Continue
                                            <FaArrowRightLong />
                                        </Flex>
                                    </Button>
                                </Flex>
                            </ModalBody>
                            :
                            <ModalBody>
                                <Flex direction={'column'} gap={5} py={2} my={5} bg={'#F8F8F8'}>
                                    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} className='first-part'>
                                        <Box mb={2} color={'gray'} fontWeight={500}>You are sending</Box>
                                        <Box fontSize={'22px'} fontWeight={650} size={'lg'} >{`${Number(assetValue).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                        <Box mb={3}>{`≈ ${Number(assetInrValue).toFixed(2)}INR`}</Box>
                                        {
                                            inputValue ?
                                                <Box fontWeight={500}>To Cryptico User</Box>
                                                :
                                                <Box fontWeight={500}>To Address</Box>
                                        }
                                        {
                                            inputValue ?
                                                <Box fontSize={'14px'} fontWeight={500}>{inputValue}</Box>
                                                :
                                                <Box fontSize={'14px'} fontWeight={500}>{walletAddress}</Box>
                                        }
                                    </Flex>
                                    <Divider></Divider>
                                    <Flex direction={'column'} className='second-part' p={6} gap={5}>
                                        <Flex className='s1' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontSize={'14px'} p={1} bg={'gray.200'} borderRadius={5}>
                                                    {asset.toLocaleUpperCase()} network fee
                                                </Box>
                                                <Box fontSize={'12px'}>-----</Box>
                                            </Flex>
                                            <Box fontSize={'14px'} fontWeight={500}>------</Box>
                                        </Flex>
                                        <Flex className='s2' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontSize={'14px'}>

                                                    Cryptico fee
                                                </Box>
                                                <Box fontSize={'12px'}>{`≈ ${Number(transferFeeInr).toFixed(2)} INR`}</Box>
                                            </Flex>
                                            <Box fontSize={'14px'} fontWeight={500}>{`${Number(transferFee).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                        </Flex>
                                        <Flex className='s3' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontWeight={500}>

                                                    Total
                                                </Box>
                                                <Box fontSize={'12px'}>To be deducted from your Cryptico Wallet</Box>
                                            </Flex>
                                            <Flex direction={'column'} textAlign={'end'}>

                                                <Box fontSize={'14px'} fontWeight={500}>{`${Number(totalAssetValue).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                                <Box fontSize={'12px'}>{`≈ ${Number(totalAssetInrValue).toFixed(2)} INR`}</Box>
                                            </Flex>
                                        </Flex>




                                    </Flex>
                                    <Flex className='third-part' p={4} gap={5} direction={'column'}>
                                        <VerifyPassword setSend={setSend} />
                                        <Flex w={'full'} gap={5}>
                                            <Button bg={'blue.100'} color={'blue.400'} flex={0.3} size={'lg'} py={8} onClick={() => setIsContinue(false)}>Back</Button>

                                            <Button isLoading={isloading} spinner={null} loadingText='Processing...' isDisabled={isSend} bg={'orange.100'} color={'orange.400'} flex={0.7} size={'lg'} py={8} onClick={handleSubmit}>Send</Button>

                                        </Flex>
                                        {/* {
                                            isloading &&
                                            <>

                                                <Heading color={'blue.600'} px={2} size={'sm'}>During Transaction, Please do not press back or close the browser.</Heading>
                                                <Heading color={'red.600'} px={2} size={'sm'}>Important: Stay on this screen to ensure successful completion.</Heading>
                                            </>
                                        } */}
                                    </Flex>

                                </Flex>

                            </ModalBody>
                    }

                </ModalContent>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button>Save</Button>
                </ModalFooter>
            </Modal>

            {/* After Processing the loader appear */}
            {
                isloading &&
                <Modal isOpen={isloading} onClose={() => setIsLoading(false)} isCentered size="full">
                    <ModalOverlay bg="blackAlpha.700" />
                    <ModalContent bg="transparent" boxShadow="none">
                        <ModalBody flexDirection={'column'} gap={3} display="flex" justifyContent="center" alignItems="center" h="100vh" >
                            <Image src="/imagelogo/loading.gif" alt="Sending transaction..." boxSize="150px" />
                            <Heading color={'blue.600'} px={2} size={'md'}>During Transaction, Please do not press back or close the browser.</Heading>
                            <Heading color={'red.700'} px={2} size={'md'}>Important: Stay on this screen to ensure successful completion.</Heading>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }


        </>
    )
}

export const Send2 = () => {
    const { status, sendusdt } = useSendUsdtNew();
    const { user } = useUser();
    const { handleOtherUserDetail, otherUserDetail, setOtherUserDetail } = useAuth();
    const { handleSendInternalTransaction, handleWalletAddressTransaction, handleUpdateWalletAddressTransaction, handleFeeCalculation } = useAccount()
    const cryptoOption = useCryptoOption();
    const [headername, setHeaderName] = useState(cryptoOption[1].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[1].logo);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [asset, setAsset] = useState(cryptoOption[1].asset);
    const [network, setNetwork] = useState(cryptoOption[1].network);
    const [isbyaddress, setIsByAddress] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isopen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const wrapperRef = useRef();
    const [currentPrice, setCurrentPrice] = useState(cryptoOption[1].currentPrice);
    const allUsersRef = useRef([]);
    const [isBtc, setBtc] = useState(true);
    const factor = Math.pow(10, 2);
    const { priceRef } = useOtherDetail();
    const [isUserValid, setUserValid] = useState(false);
    const [isWalletValid, setWalletValid] = useState(false);
    const [userid, setUserId] = useState();
    const [isContinue, setIsContinue] = useState(false);
    const [isSend, setSend] = useState(true);
    const [availableBlc, setAvailableBalance] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    const toast = useToast();
    const [transferFee, setTransferFee] = useState(0);
    const [totalAssetValue, setTotalAssetValue] = useState(0);
    const bgmodalColor = useColorModeValue("gray.100", "gray.600")
    const bgmodalHeader = useColorModeValue("orange.50", "gray.600")
    const bginputColor = useColorModeValue("#e8f0fe", "gray.700")
    const btnColor = useColorModeValue('gray.200', 'gray.400')


    const resetState = () => {
        setHeaderName(cryptoOption[1].name);
        setHeaderLogo(cryptoOption[1].logo);
        setAsset(cryptoOption[1].asset);
        setNetwork(cryptoOption[1].network);
    }
    const assetValue = isBtc ? amount : amount / priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    const assetInrValue = amount * priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    // const transferFee = (amount * 0.02) / 100;
    const transferFeeInr = transferFee * priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    // const totalAssetValue = Number(assetValue) + Number(transferFee);
    const totalAssetInrValue = (Number(totalAssetValue)) * Number(priceRef.current?.[CoinSymbolMap[asset]]?.inr);

    const Dto = {
        username: inputValue,
        network: network,
        asset: asset,
        assetValue: assetValue,
    }
    const feeCalculationDto = {
        asset: asset,
        network: network,
        assetValue: assetValue,
    }
    const AddressDto = {
        toAddress: walletAddress,
        network: network,
        asset: asset,
        assetValue: assetValue,
        totalAsset: Number(totalAssetValue)

    }
    useEffect(() => {
        setUserId(user?.user_id);
    }, [user])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                if (inputValue) {
                    const response = await handleOtherUserDetail(Dto);
                    if (response.data[0].username === inputValue) {
                        setUserValid(true);
                    }
                    else {
                        setUserValid(false);
                    }

                    allUsersRef.current = response.data || [];
                    filterSuggestions(inputValue);

                }
                else {
                    setSuggestions([]);
                }
            }
            catch (error) {
                throw error?.response ? error?.response?.data : error?.response?.message;
            }
        }
        fetchdata();
    }, [inputValue]);


    useOutsideClick({
        ref: wrapperRef,
        handler: () => setIsOpen(false),
    });
    const filterSuggestions = (value) => {
        const filtered = allUsersRef.current.filter((item) =>
            item.username.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filtered);
        setIsOpen(filtered.length > 0);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };
    const handleWalletAddress = (e) => {
        const value = e.target.value;
        setWalletAddress(value);
    };

    const handleSelect = (name) => {
        setInputValue(name);
        setIsOpen(false);
    };
    const handleAmount = (e) => {
        setAmount(e.target.value);

    }
    const handleContinue = async () => {
        const response = await handleFeeCalculation(feeCalculationDto);
        if (response.status === true) {
            setTransferFee(response?.data?.transferFee);
            setTotalAssetValue(response?.data?.totalAsset);
            setIsContinue(true);
        }

    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (isWalletValid) {
                const res = await handleWalletAddressTransaction(AddressDto);

                if (res.status === true) {

                    const response = await decryptWithKey(res.data, userid)
                    console.log(response);

                    const privateKey = await decryptWithKey(response?.senderWalletData?.wallet_key, userid);
                    let txResponse;
                    if (asset === 'bnb') {
                        txResponse = await SendBnb(privateKey, walletAddress, response?.transactionData?.paid_amount);
                    }
                    if (asset === 'eth') {
                        txResponse = await Sendeth(privateKey, walletAddress, response?.transactionData?.paid_amount)
                    }
                    if (asset === 'usdt') {
                        txResponse = await sendusdt(privateKey, walletAddress, response?.transactionData?.paid_amount)
                    }
                    if (txResponse.transactionHash) {
                        const txnRequestDto = {
                            "txnId": response?.transactionData?.txn_id,
                            "txnHashId": txResponse?.transactionHash,
                            "status": txResponse?.status === 1 ? "success" : "failed",
                        }
                        const updateResponse = await handleUpdateWalletAddressTransaction(txnRequestDto);
                        if (updateResponse.status === true) {
                            setIsLoading(false);
                            onClose();
                            setAmount(0);
                            setWalletAddress('');
                            setIsContinue(false);
                            toast({
                                title: "Transaction Success",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                                position: 'top-right'
                            })
                        }
                        console.log(updateResponse);
                    }
                }
            }
            else {
                await handleSendInternalTransaction(Dto);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setWalletValid(isValidWalletAddress(walletAddress, asset));
    }, [walletAddress, asset]);

    function isValidWalletAddress(address, coin) {
        switch (coin.toLowerCase()) {
            case 'btc':
                try {
                    bitcoin.address.toOutputScript(address);
                    return true;
                } catch (e) {
                    return false;
                }

            case 'eth':
            case 'bnb':
            case 'usdt': // all use Ethereum-style addresses
                return isAddress(address);

            default:
                return false;
        }
    }


    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 2, md: 0 }} onClick={onOpen}  >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState} size={{ base: 'sm', md: 'lg' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={bgmodalHeader} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src={headerlogo} boxSize={5}></Image>
                            Send {headername}

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    {
                        !isContinue ?

                            <ModalBody>
                                <Flex direction={'column'} gap={5} my={5}>

                                    <SelectToken index={1} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} setAsset={setAsset} setNetwork={setNetwork} setCurrentPrice={setCurrentPrice} setAvailableBalance={setAvailableBalance} />

                                    <Flex direction={'column'} bg={bgmodalColor} borderRadius={5} py={4}>

                                        <Flex justifyContent={'space-between'} p={4} >
                                            <Heading size={'md'}>Send to </Heading>
                                            <ButtonGroup size={'sm'} >
                                                <Button bg={isbyaddress ? 'orange' : btnColor} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} fontSize={'12px'} onClick={() => setIsByAddress(true)}>Address</Button>
                                                <Button bg={isbyaddress ? btnColor : 'orange'} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} fontSize={'12px'} onClick={() => setIsByAddress(false)}>Cryptico User</Button>
                                            </ButtonGroup>

                                        </Flex>
                                        {
                                            isbyaddress ?

                                                <FormControl p={4} borderRadius={5}>
                                                    <Input
                                                        px={0}
                                                        border={'none'}
                                                        value={walletAddress}
                                                        _hover={{ border: 'none' }}
                                                        _focus={{ boxShadow: 'none' }}
                                                        onChange={handleWalletAddress}
                                                        placeholder='Paste or Enter wallet address here '
                                                    />
                                                </FormControl>
                                                :
                                                <FormControl p={4} borderRadius={5}>
                                                    <Box ref={wrapperRef}>
                                                        <Input
                                                            px={0}
                                                            border={'none'}
                                                            _hover={{ border: 'none' }}
                                                            _focus={{ boxShadow: 'none' }}
                                                            placeholder='Enter username '
                                                            value={inputValue}
                                                            onChange={handleChange}

                                                        />

                                                        {isopen && suggestions?.length > 0 && (
                                                            <Box
                                                                px={4}
                                                                position="absolute"
                                                                top="100%"
                                                                left="0"
                                                                right="0"
                                                                bg="gray.100"
                                                                borderRadius="md"
                                                                mt={1}
                                                                zIndex="dropdown"
                                                                boxShadow="md"
                                                            >
                                                                <List spacing={0}>
                                                                    {suggestions?.map((item, index) => (
                                                                        <Flex mb={2} >
                                                                            <Avatar name={item.username} src={item.profile_image}></Avatar>
                                                                            <ListItem mt={1}
                                                                                key={index}
                                                                                px={3}
                                                                                py={2}
                                                                                fontSize={'14px'}
                                                                                fontWeight={500}
                                                                                _hover={{ bg: "gray.100", cursor: "pointer" }}
                                                                                onClick={() => handleSelect(item.username)}
                                                                            >
                                                                                Cryptico user &nbsp;
                                                                                <Box as='span' color='orange' _hover={{ textDecoration: 'underline' }} >

                                                                                    {item.username}

                                                                                </Box>
                                                                            </ListItem>
                                                                        </Flex>

                                                                    ))}
                                                                </List>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </FormControl>
                                        }
                                    </Flex>


                                    {/* Amount Section start----------------------------------- */}
                                    {
                                        (isUserValid || isWalletValid) ?
                                            <Card bg={bgmodalColor} gap={1}>
                                                <Flex justifyContent={'space-between'} p={4}>

                                                    <Heading size={'md'}>Amount to send</Heading>
                                                    <Box>Available : {Number(availableBlc).toFixed(8)}</Box>

                                                </Flex>


                                                <FormControl px={4}>
                                                    <InputGroup>

                                                        {
                                                            isBtc ?
                                                                <>
                                                                    <Input
                                                                        type='number'
                                                                        fontSize={'22px'}
                                                                        border={'none'}
                                                                        onChange={handleAmount}
                                                                        fontWeight={700}
                                                                        value={amount === 0 || amount === '' ? '' : amount}
                                                                        py={10}
                                                                        placeholder={amount > 0 ? availableBlc : '0.00000000'}
                                                                        _hover={{ border: 'none' }}
                                                                        _focus={{ boxShadow: 'none' }}
                                                                    ></Input>

                                                                    <InputRightAddon color={'gray'} fontSize={'16px'} border={'none'} fontWeight={700} py={10}>{asset.toLocaleUpperCase()}</InputRightAddon>
                                                                </>

                                                                :
                                                                <>
                                                                    <Input
                                                                        type='number'
                                                                        fontSize={'22px'}
                                                                        border={'none'}
                                                                        value={amount}
                                                                        onChange={handleAmount}
                                                                        fontWeight={700}
                                                                        py={10}
                                                                        placeholder='≈ 0.00'
                                                                        _hover={{ border: 'none' }}
                                                                        _focus={{ boxShadow: 'none' }}
                                                                    ></Input>

                                                                    <InputRightAddon color={'gray'} fontSize={'16px'} border={'none'} fontWeight={700} py={10}>INR</InputRightAddon>
                                                                </>

                                                        }
                                                    </InputGroup>
                                                </FormControl>
                                                {
                                                    isBtc ?
                                                        <Box borderRadius={5} fontWeight={500} m={4} w={'auto'} p={4} py={2} bg={bginputColor}>{`${amount * priceRef?.current?.[CoinSymbolMap[asset]]?.inr}`} INR</Box>
                                                        :
                                                        <Box borderRadius={5} fontWeight={500} m={4} w={'auto'} p={4} py={2} bg={bginputColor}>{`${(amount / priceRef?.current?.[CoinSymbolMap[asset]]?.inr).toFixed(8)}`}  {asset.toLocaleUpperCase()}</Box>


                                                }
                                                <Flex justifyContent={'space-between'} p={4}>
                                                    <ButtonGroup gap={1}>
                                                        <Button size={'sm'} bg={btnColor} onClick={() => setAmount(0)}>min</Button>
                                                        <Button size={'sm'} bg={btnColor} onClick={() => setAmount(availableBlc)}>max</Button>
                                                    </ButtonGroup>
                                                    <ButtonGroup gap={1}>
                                                        <Button isActive={isBtc} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} size={'sm'} bg={btnColor} onClick={() => setBtc(true)}>{asset.toLocaleUpperCase()}</Button>
                                                        <Button _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} size={'sm'} bg={btnColor} onClick={() => setBtc(false)}>INR</Button>
                                                    </ButtonGroup>
                                                </Flex>
                                            </Card>
                                            :
                                            <FormControl bg={bgmodalColor}>
                                                <Input
                                                    disabled
                                                    type='number'
                                                    fontSize={'22px'}
                                                    border={'none'}
                                                    onChange={handleAmount}
                                                    fontWeight={700}
                                                    py={10}
                                                    placeholder='Amount to send'
                                                    _hover={{ border: 'none' }}
                                                    _focus={{ boxShadow: 'none' }}
                                                ></Input>
                                            </FormControl>

                                    }
                                    {/* Amount Section End----------------------------------- */}

                                    <Button isDisabled={Number(amount) > 0 ? false : true} fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.100' }} bg={bgmodalColor} p={10} onClick={handleContinue}   >
                                        <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                            Continue
                                            <FaArrowRightLong />
                                        </Flex>
                                    </Button>
                                </Flex>
                            </ModalBody>
                            :
                            <ModalBody>
                                <Flex direction={'column'} gap={5} py={2} my={5} bg={'#F8F8F8'}>
                                    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} className='first-part'>
                                        <Box mb={2} color={'gray'} fontWeight={500}>You are sending</Box>
                                        <Box fontSize={'22px'} fontWeight={650} size={'lg'} >{`${Number(assetValue).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                        <Box mb={3}>{`≈ ${Number(assetInrValue).toFixed(2)}INR`}</Box>
                                        <Box>to Address</Box>
                                        <Box fontSize={'14px'} fontWeight={500}>{walletAddress}</Box>

                                    </Flex>
                                    <Divider></Divider>
                                    <Flex direction={'column'} className='second-part' p={6} gap={5}>
                                        <Flex className='s1' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontSize={'14px'} p={1} bg={'gray.200'} borderRadius={5}>

                                                    {asset.toLocaleUpperCase()} network fee
                                                </Box>
                                                <Box fontSize={'12px'}>-----</Box>
                                            </Flex>
                                            <Box fontSize={'14px'} fontWeight={500}>------</Box>
                                        </Flex>
                                        <Flex className='s2' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontSize={'14px'}>

                                                    Cryptico fee
                                                </Box>
                                                <Box fontSize={'12px'}>{`≈ ${Number(transferFeeInr).toFixed(2)} INR`}</Box>
                                            </Flex>
                                            <Box fontSize={'14px'} fontWeight={500}>{`${Number(transferFee).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                        </Flex>
                                        <Flex className='s3' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontWeight={500}>

                                                    Total
                                                </Box>
                                                <Box fontSize={'12px'}>To be deducted from your Cryptico Wallet</Box>
                                            </Flex>
                                            <Flex direction={'column'} textAlign={'end'}>

                                                <Box fontSize={'14px'} fontWeight={500}>{`${Number(totalAssetValue).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                                <Box fontSize={'12px'}>{`≈ ${Number(totalAssetInrValue).toFixed(2)} INR`}</Box>
                                            </Flex>
                                        </Flex>




                                    </Flex>
                                    <Flex className='third-part' p={4} gap={5} direction={'column'}>
                                        <VerifyPassword setSend={setSend} />
                                        <Flex w={'full'} gap={5}>
                                            <Button bg={'blue.100'} color={'blue.400'} flex={0.3} size={'lg'} py={8} onClick={() => setIsContinue(false)}>Back</Button>

                                            <Button isLoading={isloading} spinner={null} loadingText='Processing...' isDisabled={isSend} bg={'orange.100'} color={'orange.400'} flex={0.7} size={'lg'} py={8} onClick={handleSubmit}>Send</Button>

                                        </Flex>
                                        {
                                            isloading &&
                                            <>

                                                <Heading color={'blue.600'} px={2} size={'sm'}>During Transaction, Please do not press back or close the browser.</Heading>
                                                <Heading color={'red.600'} px={2} size={'sm'}>Important: Stay on this screen to ensure successful completion.</Heading>
                                            </>
                                        }
                                    </Flex>

                                </Flex>

                            </ModalBody>
                    }

                </ModalContent>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button>Save</Button>
                </ModalFooter>
            </Modal>
            {/* After Processing the loader appear */}
            {
                isloading &&
                <Modal isOpen={isloading} onClose={() => setIsLoading(false)} isCentered size="full">
                    <ModalOverlay bg="blackAlpha.700" />
                    <ModalContent bg="transparent" boxShadow="none">
                        <ModalBody flexDirection={'column'} gap={3} display="flex" justifyContent="center" alignItems="center" h="100vh" >
                            <Image src="/imagelogo/loading.gif" alt="Sending transaction..." boxSize="150px" />
                            <Heading color={'blue.600'} px={2} size={'md'}>During Transaction, Please do not press back or close the browser.</Heading>
                            <Heading color={'red.700'} px={2} size={'md'}>Important: Stay on this screen to ensure successful completion.</Heading>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </>
    )
}

export const Send3 = () => {
    const { status, sendusdt } = useSendUsdtNew();
    const { user } = useUser();
    const { handleOtherUserDetail, otherUserDetail, setOtherUserDetail } = useAuth();
    const { handleSendInternalTransaction, handleWalletAddressTransaction, handleUpdateWalletAddressTransaction, handleFeeCalculation } = useAccount()
    const cryptoOption = useCryptoOption();
    const [headername, setHeaderName] = useState(cryptoOption[2].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[2].logo);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [asset, setAsset] = useState(cryptoOption[2].asset);
    const [network, setNetwork] = useState(cryptoOption[2].network);
    const [isbyaddress, setIsByAddress] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isopen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const wrapperRef = useRef();
    const [currentPrice, setCurrentPrice] = useState(cryptoOption[2].currentPrice);
    const allUsersRef = useRef([]);
    const [isBtc, setBtc] = useState(true);
    const factor = Math.pow(10, 2);
    const { priceRef } = useOtherDetail();
    const [isUserValid, setUserValid] = useState(false);
    const [isWalletValid, setWalletValid] = useState(false);
    const [userid, setUserId] = useState();
    const [isContinue, setIsContinue] = useState(false);
    const [isSend, setSend] = useState(true);
    const [availableBlc, setAvailableBalance] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    const toast = useToast();
    const [transferFee, setTransferFee] = useState(0);
    const [totalAssetValue, setTotalAssetValue] = useState(0);
    const bgmodalColor = useColorModeValue("gray.100", "gray.600")
    const bgmodalHeader = useColorModeValue("orange.50", "gray.600")
    const bginputColor = useColorModeValue("#e8f0fe", "gray.700")
    const btnColor = useColorModeValue('gray.200', 'gray.400')


    const resetState = () => {
        setHeaderName(cryptoOption[2].name);
        setHeaderLogo(cryptoOption[2].logo);
        setAsset(cryptoOption[2].asset);
        setNetwork(cryptoOption[2].network);
    }
    const assetValue = isBtc ? amount : amount / priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    const assetInrValue = amount * priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    // const transferFee = (amount * 0.02) / 100;
    const transferFeeInr = transferFee * priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    // const totalAssetValue = Number(assetValue) + Number(transferFee);
    const totalAssetInrValue = (Number(totalAssetValue)) * Number(priceRef.current?.[CoinSymbolMap[asset]]?.inr);

    const Dto = {
        username: inputValue,
        network: network,
        asset: asset,
        assetValue: assetValue,
    }
    const feeCalculationDto = {
        asset: asset,
        network: network,
        assetValue: assetValue,
    }
    const AddressDto = {
        toAddress: walletAddress,
        network: network,
        asset: asset,
        assetValue: assetValue,
        totalAsset: Number(totalAssetValue)

    }
    useEffect(() => {
        setUserId(user?.user_id);
    }, [user])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                if (inputValue) {
                    const response = await handleOtherUserDetail(Dto);
                    if (response.data[0].username === inputValue) {
                        setUserValid(true);
                    }
                    else {
                        setUserValid(false);
                    }

                    allUsersRef.current = response.data || [];
                    filterSuggestions(inputValue);

                }
                else {
                    setSuggestions([]);
                }
            }
            catch (error) {
                throw error?.response ? error?.response?.data : error?.response?.message;
            }
        }
        fetchdata();
    }, [inputValue]);


    useOutsideClick({
        ref: wrapperRef,
        handler: () => setIsOpen(false),
    });
    const filterSuggestions = (value) => {
        const filtered = allUsersRef.current.filter((item) =>
            item.username.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filtered);
        setIsOpen(filtered.length > 0);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };
    const handleWalletAddress = (e) => {
        const value = e.target.value;
        setWalletAddress(value);
    };

    const handleSelect = (name) => {
        setInputValue(name);
        setIsOpen(false);
    };
    const handleAmount = (e) => {
        setAmount(e.target.value);

    }
    const handleContinue = async () => {
        const response = await handleFeeCalculation(feeCalculationDto);
        if (response.status === true) {
            setTransferFee(response?.data?.transferFee);
            setTotalAssetValue(response?.data?.totalAsset);
            setIsContinue(true);
        }

    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (isWalletValid) {
                const res = await handleWalletAddressTransaction(AddressDto);

                if (res.status === true) {

                    const response = await decryptWithKey(res.data, userid)
                    console.log(response);

                    const privateKey = await decryptWithKey(response?.senderWalletData?.wallet_key, userid);
                    let txResponse;
                    if (asset === 'bnb') {
                        txResponse = await SendBnb(privateKey, walletAddress, response?.transactionData?.paid_amount);
                    }
                    if (asset === 'eth') {
                        txResponse = await Sendeth(privateKey, walletAddress, response?.transactionData?.paid_amount)
                    }
                    if (asset === 'usdt') {
                        txResponse = await sendusdt(privateKey, walletAddress, response?.transactionData?.paid_amount)
                    }
                    if (txResponse.transactionHash) {
                        const txnRequestDto = {
                            "txnId": response?.transactionData?.txn_id,
                            "txnHashId": txResponse?.transactionHash,
                            "status": txResponse?.status === 1 ? "success" : "failed",
                        }
                        const updateResponse = await handleUpdateWalletAddressTransaction(txnRequestDto);
                        if (updateResponse.status === true) {
                            setIsLoading(false);
                            onClose();
                            setAmount(0);
                            setWalletAddress('');
                            setIsContinue(false);
                            toast({
                                title: "Transaction Success",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                                position: 'top-right'
                            })
                        }
                        console.log(updateResponse);
                    }
                }
            }
            else {
                await handleSendInternalTransaction(Dto);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setWalletValid(isValidWalletAddress(walletAddress, asset));
    }, [walletAddress, asset]);

    function isValidWalletAddress(address, coin) {
        switch (coin.toLowerCase()) {
            case 'btc':
                try {
                    bitcoin.address.toOutputScript(address);
                    return true;
                } catch (e) {
                    return false;
                }

            case 'eth':
            case 'bnb':
            case 'usdt': // all use Ethereum-style addresses
                return isAddress(address);

            default:
                return false;
        }
    }


    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 2, md: 0 }} onClick={onOpen}  >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState} size={{ base: 'sm', md: 'lg' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={bgmodalHeader} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src={headerlogo} boxSize={5}></Image>
                            Send {headername}

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    {
                        !isContinue ?

                            <ModalBody>
                                <Flex direction={'column'} gap={5} my={5}>

                                    <SelectToken index={2} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} setAsset={setAsset} setNetwork={setNetwork} setCurrentPrice={setCurrentPrice} setAvailableBalance={setAvailableBalance} />

                                    <Flex direction={'column'} bg={bgmodalColor} borderRadius={5} py={4}>

                                        <Flex justifyContent={'space-between'} p={4} >
                                            <Heading size={'md'}>Send to </Heading>
                                            <ButtonGroup size={'sm'} >
                                                <Button bg={isbyaddress ? 'orange' : btnColor} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} fontSize={'12px'} onClick={() => setIsByAddress(true)}>Address</Button>
                                                <Button bg={isbyaddress ? btnColor : 'orange'} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} fontSize={'12px'} onClick={() => setIsByAddress(false)}>Cryptico User</Button>
                                            </ButtonGroup>

                                        </Flex>
                                        {
                                            isbyaddress ?

                                                <FormControl p={4} borderRadius={5}>
                                                    <Input
                                                        px={0}
                                                        border={'none'}
                                                        value={walletAddress}
                                                        _hover={{ border: 'none' }}
                                                        _focus={{ boxShadow: 'none' }}
                                                        onChange={handleWalletAddress}
                                                        placeholder='Paste or Enter wallet address here '
                                                    />
                                                </FormControl>
                                                :
                                                <FormControl p={4} borderRadius={5}>
                                                    <Box ref={wrapperRef}>
                                                        <Input
                                                            px={0}
                                                            border={'none'}
                                                            _hover={{ border: 'none' }}
                                                            _focus={{ boxShadow: 'none' }}
                                                            placeholder='Enter username '
                                                            value={inputValue}
                                                            onChange={handleChange}

                                                        />

                                                        {isopen && suggestions?.length > 0 && (
                                                            <Box
                                                                px={4}
                                                                position="absolute"
                                                                top="100%"
                                                                left="0"
                                                                right="0"
                                                                bg="gray.100"
                                                                borderRadius="md"
                                                                mt={1}
                                                                zIndex="dropdown"
                                                                boxShadow="md"
                                                            >
                                                                <List spacing={0}>
                                                                    {suggestions?.map((item, index) => (
                                                                        <Flex mb={2} >
                                                                            <Avatar name={item.username} src={item.profile_image}></Avatar>
                                                                            <ListItem mt={1}
                                                                                key={index}
                                                                                px={3}
                                                                                py={2}
                                                                                fontSize={'14px'}
                                                                                fontWeight={500}
                                                                                _hover={{ bg: "gray.100", cursor: "pointer" }}
                                                                                onClick={() => handleSelect(item.username)}
                                                                            >
                                                                                Cryptico user &nbsp;
                                                                                <Box as='span' color='orange' _hover={{ textDecoration: 'underline' }} >

                                                                                    {item.username}

                                                                                </Box>
                                                                            </ListItem>
                                                                        </Flex>

                                                                    ))}
                                                                </List>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </FormControl>
                                        }
                                    </Flex>


                                    {/* Amount Section start----------------------------------- */}
                                    {
                                        (isUserValid || isWalletValid) ?
                                            <Card bg={bgmodalColor} gap={1}>
                                                <Flex justifyContent={'space-between'} p={4}>

                                                    <Heading size={'md'}>Amount to send</Heading>
                                                    <Box>Available : {Number(availableBlc).toFixed(8)}</Box>

                                                </Flex>


                                                <FormControl px={4}>
                                                    <InputGroup>

                                                        {
                                                            isBtc ?
                                                                <>
                                                                    <Input
                                                                        type='number'
                                                                        fontSize={'22px'}
                                                                        border={'none'}
                                                                        onChange={handleAmount}
                                                                        fontWeight={700}
                                                                        value={amount === 0 || amount === '' ? '' : amount}
                                                                        py={10}
                                                                        placeholder={amount > 0 ? availableBlc : '0.00000000'}
                                                                        _hover={{ border: 'none' }}
                                                                        _focus={{ boxShadow: 'none' }}
                                                                    ></Input>

                                                                    <InputRightAddon color={'gray'} fontSize={'16px'} border={'none'} fontWeight={700} py={10}>{asset.toLocaleUpperCase()}</InputRightAddon>
                                                                </>

                                                                :
                                                                <>
                                                                    <Input
                                                                        type='number'
                                                                        fontSize={'22px'}
                                                                        border={'none'}
                                                                        value={amount}
                                                                        onChange={handleAmount}
                                                                        fontWeight={700}
                                                                        py={10}
                                                                        placeholder='≈ 0.00'
                                                                        _hover={{ border: 'none' }}
                                                                        _focus={{ boxShadow: 'none' }}
                                                                    ></Input>

                                                                    <InputRightAddon color={'gray'} fontSize={'16px'} border={'none'} fontWeight={700} py={10}>INR</InputRightAddon>
                                                                </>

                                                        }
                                                    </InputGroup>
                                                </FormControl>
                                                {
                                                    isBtc ?
                                                        <Box borderRadius={5} fontWeight={500} m={4} w={'auto'} p={4} py={2} bg={bginputColor}>{`${amount * priceRef?.current?.[CoinSymbolMap[asset]]?.inr}`} INR</Box>
                                                        :
                                                        <Box borderRadius={5} fontWeight={500} m={4} w={'auto'} p={4} py={2} bg={bginputColor}>{`${(amount / priceRef?.current?.[CoinSymbolMap[asset]]?.inr).toFixed(8)}`}  {asset.toLocaleUpperCase()}</Box>


                                                }
                                                <Flex justifyContent={'space-between'} p={4}>
                                                    <ButtonGroup gap={1}>
                                                        <Button size={'sm'} bg={btnColor} onClick={() => setAmount(0)}>min</Button>
                                                        <Button size={'sm'} bg={btnColor} onClick={() => setAmount(availableBlc)}>max</Button>
                                                    </ButtonGroup>
                                                    <ButtonGroup gap={1}>
                                                        <Button isActive={isBtc} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} size={'sm'} bg={btnColor} onClick={() => setBtc(true)}>{asset.toLocaleUpperCase()}</Button>
                                                        <Button _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} size={'sm'} bg={btnColor} onClick={() => setBtc(false)}>INR</Button>
                                                    </ButtonGroup>
                                                </Flex>
                                            </Card>
                                            :
                                            <FormControl bg={bgmodalColor}>
                                                <Input
                                                    disabled
                                                    type='number'
                                                    fontSize={'22px'}
                                                    border={'none'}
                                                    onChange={handleAmount}
                                                    fontWeight={700}
                                                    py={10}
                                                    placeholder='Amount to send'
                                                    _hover={{ border: 'none' }}
                                                    _focus={{ boxShadow: 'none' }}
                                                ></Input>
                                            </FormControl>

                                    }
                                    {/* Amount Section End----------------------------------- */}

                                    <Button isDisabled={Number(amount) > 0 ? false : true} fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.100' }} bg={bgmodalColor} p={10} onClick={handleContinue}   >
                                        <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                            Continue
                                            <FaArrowRightLong />
                                        </Flex>
                                    </Button>
                                </Flex>
                            </ModalBody>
                            :
                            <ModalBody>
                                <Flex direction={'column'} gap={5} py={2} my={5} bg={'#F8F8F8'}>
                                    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} className='first-part'>
                                        <Box mb={2} color={'gray'} fontWeight={500}>You are sending</Box>
                                        <Box fontSize={'22px'} fontWeight={650} size={'lg'} >{`${Number(assetValue).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                        <Box mb={3}>{`≈ ${Number(assetInrValue).toFixed(2)}INR`}</Box>
                                        <Box>to Address</Box>
                                        <Box fontSize={'14px'} fontWeight={500}>{walletAddress}</Box>

                                    </Flex>
                                    <Divider></Divider>
                                    <Flex direction={'column'} className='second-part' p={6} gap={5}>
                                        <Flex className='s1' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontSize={'14px'} p={1} bg={'gray.200'} borderRadius={5}>

                                                    {asset.toLocaleUpperCase()} network fee
                                                </Box>
                                                <Box fontSize={'12px'}>-----</Box>
                                            </Flex>
                                            <Box fontSize={'14px'} fontWeight={500}>------</Box>
                                        </Flex>
                                        <Flex className='s2' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontSize={'14px'}>

                                                    Cryptico fee
                                                </Box>
                                                <Box fontSize={'12px'}>{`≈ ${Number(transferFeeInr).toFixed(2)} INR`}</Box>
                                            </Flex>
                                            <Box fontSize={'14px'} fontWeight={500}>{`${Number(transferFee).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                        </Flex>
                                        <Flex className='s3' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontWeight={500}>

                                                    Total
                                                </Box>
                                                <Box fontSize={'12px'}>To be deducted from your Cryptico Wallet</Box>
                                            </Flex>
                                            <Flex direction={'column'} textAlign={'end'}>

                                                <Box fontSize={'14px'} fontWeight={500}>{`${Number(totalAssetValue).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                                <Box fontSize={'12px'}>{`≈ ${Number(totalAssetInrValue).toFixed(2)} INR`}</Box>
                                            </Flex>
                                        </Flex>




                                    </Flex>
                                    <Flex className='third-part' p={4} gap={5} direction={'column'}>
                                        <VerifyPassword setSend={setSend} />
                                        <Flex w={'full'} gap={5}>
                                            <Button bg={'blue.100'} color={'blue.400'} flex={0.3} size={'lg'} py={8} onClick={() => setIsContinue(false)}>Back</Button>

                                            <Button isLoading={isloading} spinner={null} loadingText='Processing...' isDisabled={isSend} bg={'orange.100'} color={'orange.400'} flex={0.7} size={'lg'} py={8} onClick={handleSubmit}>Send</Button>

                                        </Flex>
                                        {
                                            isloading &&
                                            <>

                                                <Heading color={'blue.600'} px={2} size={'sm'}>During Transaction, Please do not press back or close the browser.</Heading>
                                                <Heading color={'red.600'} px={2} size={'sm'}>Important: Stay on this screen to ensure successful completion.</Heading>
                                            </>
                                        }
                                    </Flex>

                                </Flex>

                            </ModalBody>
                    }

                </ModalContent>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button>Save</Button>
                </ModalFooter>
            </Modal>
            {/* After Processing the loader appear */}
            {
                isloading &&
                <Modal isOpen={isloading} onClose={() => setIsLoading(false)} isCentered size="full">
                    <ModalOverlay bg="blackAlpha.700" />
                    <ModalContent bg="transparent" boxShadow="none">
                        <ModalBody flexDirection={'column'} gap={3} display="flex" justifyContent="center" alignItems="center" h="100vh" >
                            <Image src="/imagelogo/loading.gif" alt="Sending transaction..." boxSize="150px" />
                            <Heading color={'blue.600'} px={2} size={'md'}>During Transaction, Please do not press back or close the browser.</Heading>
                            <Heading color={'red.700'} px={2} size={'md'}>Important: Stay on this screen to ensure successful completion.</Heading>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </>
    )
}

export const Send4 = () => {
    const { status, sendusdt } = useSendUsdtNew();
    const { user } = useUser();
    const { handleOtherUserDetail, otherUserDetail, setOtherUserDetail } = useAuth();
    const { handleSendInternalTransaction, handleWalletAddressTransaction, handleUpdateWalletAddressTransaction, handleFeeCalculation } = useAccount()
    const cryptoOption = useCryptoOption();
    const [headername, setHeaderName] = useState(cryptoOption[3].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[3].logo);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [asset, setAsset] = useState(cryptoOption[3].asset);
    const [network, setNetwork] = useState(cryptoOption[3].network);
    const [isbyaddress, setIsByAddress] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isopen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const wrapperRef = useRef();
    const [currentPrice, setCurrentPrice] = useState(cryptoOption[3].currentPrice);
    const allUsersRef = useRef([]);
    const [isBtc, setBtc] = useState(true);
    const factor = Math.pow(10, 2);
    const { priceRef } = useOtherDetail();
    const [isUserValid, setUserValid] = useState(false);
    const [isWalletValid, setWalletValid] = useState(false);
    const [userid, setUserId] = useState();
    const [isContinue, setIsContinue] = useState(false);
    const [isSend, setSend] = useState(true);
    const [availableBlc, setAvailableBalance] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    const toast = useToast();
    const [transferFee, setTransferFee] = useState(0);
    const [totalAssetValue, setTotalAssetValue] = useState(0);
    const bgmodalColor = useColorModeValue("gray.100", "gray.600")
    const bgmodalHeader = useColorModeValue("orange.50", "gray.600")
    const bginputColor = useColorModeValue("#e8f0fe", "gray.700")
    const btnColor = useColorModeValue('gray.200', 'gray.400')


    const resetState = () => {
        setHeaderName(cryptoOption[3].name);
        setHeaderLogo(cryptoOption[3].logo);
        setAsset(cryptoOption[3].asset);
        setNetwork(cryptoOption[3].network);
    }
    const assetValue = isBtc ? amount : amount / priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    const assetInrValue = amount * priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    // const transferFee = (amount * 0.02) / 100;
    const transferFeeInr = transferFee * priceRef.current?.[CoinSymbolMap[asset]]?.inr;
    // const totalAssetValue = Number(assetValue) + Number(transferFee);
    const totalAssetInrValue = (Number(totalAssetValue)) * Number(priceRef.current?.[CoinSymbolMap[asset]]?.inr);

    const Dto = {
        username: inputValue,
        network: network,
        asset: asset,
        assetValue: assetValue,
    }
    const feeCalculationDto = {
        asset: asset,
        network: network,
        assetValue: assetValue,
    }
    const AddressDto = {
        toAddress: walletAddress,
        network: network,
        asset: asset,
        assetValue: assetValue,
        totalAsset: Number(totalAssetValue)

    }
    useEffect(() => {
        setUserId(user?.user_id);
    }, [user])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                if (inputValue) {
                    const response = await handleOtherUserDetail(Dto);
                    if (response.data[0].username === inputValue) {
                        setUserValid(true);
                    }
                    else {
                        setUserValid(false);
                    }

                    allUsersRef.current = response.data || [];
                    filterSuggestions(inputValue);

                }
                else {
                    setSuggestions([]);
                }
            }
            catch (error) {
                throw error?.response ? error?.response?.data : error?.response?.message;
            }
        }
        fetchdata();
    }, [inputValue]);


    useOutsideClick({
        ref: wrapperRef,
        handler: () => setIsOpen(false),
    });
    const filterSuggestions = (value) => {
        const filtered = allUsersRef.current.filter((item) =>
            item.username.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filtered);
        setIsOpen(filtered.length > 0);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };
    const handleWalletAddress = (e) => {
        const value = e.target.value;
        setWalletAddress(value);
    };

    const handleSelect = (name) => {
        setInputValue(name);
        setIsOpen(false);
    };
    const handleAmount = (e) => {
        setAmount(e.target.value);

    }
    const handleContinue = async () => {
        const response = await handleFeeCalculation(feeCalculationDto);
        if (response.status === true) {
            setTransferFee(response?.data?.transferFee);
            setTotalAssetValue(response?.data?.totalAsset);
            setIsContinue(true);
        }

    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (isWalletValid) {
                const res = await handleWalletAddressTransaction(AddressDto);

                if (res.status === true) {

                    const response = await decryptWithKey(res.data, userid)
                    console.log(response);

                    const privateKey = await decryptWithKey(response?.senderWalletData?.wallet_key, userid);
                    let txResponse;
                    if (asset === 'bnb') {
                        txResponse = await SendBnb(privateKey, walletAddress, response?.transactionData?.paid_amount);
                    }
                    if (asset === 'eth') {
                        txResponse = await Sendeth(privateKey, walletAddress, response?.transactionData?.paid_amount)
                    }
                    if (asset === 'usdt') {
                        txResponse = await sendusdt(privateKey, walletAddress, response?.transactionData?.paid_amount)
                    }
                    if (txResponse.transactionHash) {
                        const txnRequestDto = {
                            "txnId": response?.transactionData?.txn_id,
                            "txnHashId": txResponse?.transactionHash,
                            "status": txResponse?.status === 1 ? "success" : "failed",
                        }
                        const updateResponse = await handleUpdateWalletAddressTransaction(txnRequestDto);
                        if (updateResponse.status === true) {
                            setIsLoading(false);
                            onClose();
                            setAmount(0);
                            setWalletAddress('');
                            setIsContinue(false);
                            toast({
                                title: "Transaction Success",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                                position: 'top-right'
                            })
                        }
                        console.log(updateResponse);
                    }
                }
            }
            else {
                await handleSendInternalTransaction(Dto);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setWalletValid(isValidWalletAddress(walletAddress, asset));
    }, [walletAddress, asset]);

    function isValidWalletAddress(address, coin) {
        switch (coin.toLowerCase()) {
            case 'btc':
                try {
                    bitcoin.address.toOutputScript(address);
                    return true;
                } catch (e) {
                    return false;
                }

            case 'eth':
            case 'bnb':
            case 'usdt': // all use Ethereum-style addresses
                return isAddress(address);

            default:
                return false;
        }
    }


    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 2, md: 0 }} onClick={onOpen}  >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState} size={{ base: 'sm', md: 'lg' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={bgmodalHeader} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src={headerlogo} boxSize={5}></Image>
                            Send {headername}

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    {
                        !isContinue ?

                            <ModalBody>
                                <Flex direction={'column'} gap={5} my={5}>

                                    <SelectToken index={3} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} setAsset={setAsset} setNetwork={setNetwork} setCurrentPrice={setCurrentPrice} setAvailableBalance={setAvailableBalance} />

                                    <Flex direction={'column'} bg={bgmodalColor} borderRadius={5} py={4}>

                                        <Flex justifyContent={'space-between'} p={4} >
                                            <Heading size={'md'}>Send to </Heading>
                                            <ButtonGroup size={'sm'} >
                                                <Button bg={isbyaddress ? 'orange' : 'gray.300'} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} fontSize={'12px'} onClick={() => setIsByAddress(true)}>Address</Button>
                                                <Button bg={isbyaddress ? 'gray.300' : 'orange'} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} fontSize={'12px'} onClick={() => setIsByAddress(false)}>Cryptico User</Button>
                                            </ButtonGroup>

                                        </Flex>
                                        {
                                            isbyaddress ?

                                                <FormControl p={4} borderRadius={5}>
                                                    <Input
                                                        px={0}
                                                        border={'none'}
                                                        value={walletAddress}
                                                        _hover={{ border: 'none' }}
                                                        _focus={{ boxShadow: 'none' }}
                                                        onChange={handleWalletAddress}
                                                        placeholder='Paste or Enter wallet address here '
                                                    />
                                                </FormControl>
                                                :
                                                <FormControl p={4} borderRadius={5}>
                                                    <Box ref={wrapperRef}>
                                                        <Input
                                                            px={0}
                                                            border={'none'}
                                                            _hover={{ border: 'none' }}
                                                            _focus={{ boxShadow: 'none' }}
                                                            placeholder='Enter username '
                                                            value={inputValue}
                                                            onChange={handleChange}

                                                        />

                                                        {isopen && suggestions?.length > 0 && (
                                                            <Box
                                                                px={4}
                                                                position="absolute"
                                                                top="100%"
                                                                left="0"
                                                                right="0"
                                                                bg="gray.100"
                                                                borderRadius="md"
                                                                mt={1}
                                                                zIndex="dropdown"
                                                                boxShadow="md"
                                                            >
                                                                <List spacing={0}>
                                                                    {suggestions?.map((item, index) => (
                                                                        <Flex mb={2} >
                                                                            <Avatar name={item.username} src={item.profile_image}></Avatar>
                                                                            <ListItem mt={1}
                                                                                key={index}
                                                                                px={3}
                                                                                py={2}
                                                                                fontSize={'14px'}
                                                                                fontWeight={500}
                                                                                _hover={{ bg: "gray.100", cursor: "pointer" }}
                                                                                onClick={() => handleSelect(item.username)}
                                                                            >
                                                                                Cryptico user &nbsp;
                                                                                <Box as='span' color='orange' _hover={{ textDecoration: 'underline' }} >

                                                                                    {item.username}

                                                                                </Box>
                                                                            </ListItem>
                                                                        </Flex>

                                                                    ))}
                                                                </List>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </FormControl>
                                        }
                                    </Flex>


                                    {/* Amount Section start----------------------------------- */}
                                    {
                                        (isUserValid || isWalletValid) ?
                                            <Card bg={bgmodalColor} gap={1}>
                                                <Flex justifyContent={'space-between'} p={4}>

                                                    <Heading size={'md'}>Amount to send</Heading>
                                                    <Box>Available : {Number(availableBlc).toFixed(8)}</Box>

                                                </Flex>


                                                <FormControl px={4}>
                                                    <InputGroup>

                                                        {
                                                            isBtc ?
                                                                <>
                                                                    <Input
                                                                        type='number'
                                                                        fontSize={'22px'}
                                                                        border={'none'}
                                                                        onChange={handleAmount}
                                                                        fontWeight={700}
                                                                        value={amount === 0 || amount === '' ? '' : amount}
                                                                        py={10}
                                                                        placeholder={amount > 0 ? availableBlc : '0.00000000'}
                                                                        _hover={{ border: 'none' }}
                                                                        _focus={{ boxShadow: 'none' }}
                                                                    ></Input>

                                                                    <InputRightAddon color={'gray'} fontSize={'16px'} border={'none'} fontWeight={700} py={10}>{asset.toLocaleUpperCase()}</InputRightAddon>
                                                                </>

                                                                :
                                                                <>
                                                                    <Input
                                                                        type='number'
                                                                        fontSize={'22px'}
                                                                        border={'none'}
                                                                        value={amount}
                                                                        onChange={handleAmount}
                                                                        fontWeight={700}
                                                                        py={10}
                                                                        placeholder='≈ 0.00'
                                                                        _hover={{ border: 'none' }}
                                                                        _focus={{ boxShadow: 'none' }}
                                                                    ></Input>

                                                                    <InputRightAddon color={'gray'} fontSize={'16px'} border={'none'} fontWeight={700} py={10}>INR</InputRightAddon>
                                                                </>

                                                        }
                                                    </InputGroup>
                                                </FormControl>
                                                {
                                                    isBtc ?
                                                        <Box borderRadius={5} fontWeight={500} m={4} w={'auto'} p={4} py={2} bg={bginputColor}>{`${amount * priceRef?.current?.[CoinSymbolMap[asset]]?.inr}`} INR</Box>
                                                        :
                                                        <Box borderRadius={5} fontWeight={500} m={4} w={'auto'} p={4} py={2} bg={bginputColor}>{`${(amount / priceRef?.current?.[CoinSymbolMap[asset]]?.inr).toFixed(8)}`}  {asset.toLocaleUpperCase()}</Box>


                                                }
                                                <Flex justifyContent={'space-between'} p={4}>
                                                    <ButtonGroup gap={1}>
                                                        <Button size={'sm'} bg={btnColor} onClick={() => setAmount(0)}>min</Button>
                                                        <Button size={'sm'} bg={btnColor} onClick={() => setAmount(availableBlc)}>max</Button>
                                                    </ButtonGroup>
                                                    <ButtonGroup gap={1}>
                                                        <Button isActive={isBtc} _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} size={'sm'} bg={btnColor} onClick={() => setBtc(true)}>{asset.toLocaleUpperCase()}</Button>
                                                        <Button _active={{ bg: 'orange' }} _focus={{ bg: 'orange' }} size={'sm'} bg={btnColor} onClick={() => setBtc(false)}>INR</Button>
                                                    </ButtonGroup>
                                                </Flex>
                                            </Card>
                                            :
                                            <FormControl bg={bgmodalColor}>
                                                <Input
                                                    disabled
                                                    type='number'
                                                    fontSize={'22px'}
                                                    border={'none'}
                                                    onChange={handleAmount}
                                                    fontWeight={700}
                                                    py={10}
                                                    placeholder='Amount to send'
                                                    _hover={{ border: 'none' }}
                                                    _focus={{ boxShadow: 'none' }}
                                                ></Input>
                                            </FormControl>

                                    }
                                    {/* Amount Section End----------------------------------- */}

                                    <Button isDisabled={Number(amount) > 0 ? false : true} fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.100' }} bg={bgmodalColor} p={10} onClick={handleContinue}   >
                                        <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                            Continue
                                            <FaArrowRightLong />
                                        </Flex>
                                    </Button>
                                </Flex>
                            </ModalBody>
                            :
                            <ModalBody>
                                <Flex direction={'column'} gap={5} py={2} my={5} bg={'#F8F8F8'}>
                                    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} className='first-part'>
                                        <Box mb={2} color={'gray'} fontWeight={500}>You are sending</Box>
                                        <Box fontSize={'22px'} fontWeight={650} size={'lg'} >{`${Number(assetValue).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                        <Box mb={3}>{`≈ ${Number(assetInrValue).toFixed(2)}INR`}</Box>
                                        <Box>to Address</Box>
                                        <Box fontSize={'14px'} fontWeight={500}>{walletAddress}</Box>

                                    </Flex>
                                    <Divider></Divider>
                                    <Flex direction={'column'} className='second-part' p={6} gap={5}>
                                        <Flex className='s1' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontSize={'14px'} p={1} bg={'gray.200'} borderRadius={5}>

                                                    {asset.toLocaleUpperCase()} network fee
                                                </Box>
                                                <Box fontSize={'12px'}>-----</Box>
                                            </Flex>
                                            <Box fontSize={'14px'} fontWeight={500}>------</Box>
                                        </Flex>
                                        <Flex className='s2' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontSize={'14px'}>

                                                    Cryptico fee
                                                </Box>
                                                <Box fontSize={'12px'}>{`≈ ${Number(transferFeeInr).toFixed(2)} INR`}</Box>
                                            </Flex>
                                            <Box fontSize={'14px'} fontWeight={500}>{`${Number(transferFee).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                        </Flex>
                                        <Flex className='s3' justifyContent={'space-between'}>
                                            <Flex direction={'column'}>
                                                <Box fontWeight={500}>

                                                    Total
                                                </Box>
                                                <Box fontSize={'12px'}>To be deducted from your Cryptico Wallet</Box>
                                            </Flex>
                                            <Flex direction={'column'} textAlign={'end'}>

                                                <Box fontSize={'14px'} fontWeight={500}>{`${Number(totalAssetValue).toFixed(8)} ${asset.toUpperCase()}`}</Box>
                                                <Box fontSize={'12px'}>{`≈ ${Number(totalAssetInrValue).toFixed(2)} INR`}</Box>
                                            </Flex>
                                        </Flex>




                                    </Flex>
                                    <Flex className='third-part' p={4} gap={5} direction={'column'}>
                                        <VerifyPassword setSend={setSend} />
                                        <Flex w={'full'} gap={5}>
                                            <Button bg={'blue.100'} color={'blue.400'} flex={0.3} size={'lg'} py={8} onClick={() => setIsContinue(false)}>Back</Button>

                                            <Button isLoading={isloading} spinner={null} loadingText='Processing...' isDisabled={isSend} bg={'orange.100'} color={'orange.400'} flex={0.7} size={'lg'} py={8} onClick={handleSubmit}>Send</Button>

                                        </Flex>
                                        {
                                            isloading &&
                                            <>

                                                <Heading color={'blue.600'} px={2} size={'sm'}>During Transaction, Please do not press back or close the browser.</Heading>
                                                <Heading color={'red.600'} px={2} size={'sm'}>Important: Stay on this screen to ensure successful completion.</Heading>
                                            </>
                                        }
                                    </Flex>

                                </Flex>

                            </ModalBody>
                    }

                </ModalContent>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button>Save</Button>
                </ModalFooter>
            </Modal>
            {/* After Processing the loader appear */}
            {
                isloading &&
                <Modal isOpen={isloading} onClose={() => setIsLoading(false)} isCentered size="full">
                    <ModalOverlay bg="blackAlpha.700" />
                    <ModalContent bg="transparent" boxShadow="none">
                        <ModalBody flexDirection={'column'} gap={3} display="flex" justifyContent="center" alignItems="center" h="100vh" >
                            <Image src="/imagelogo/loading.gif" alt="Sending transaction..." boxSize="150px" />
                            <Heading color={'blue.600'} px={2} size={'md'}>During Transaction, Please do not press back or close the browser.</Heading>
                            <Heading color={'red.700'} px={2} size={'md'}>Important: Stay on this screen to ensure successful completion.</Heading>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </>
    )
}

export const SelectToken = ({ index, setHeaderName, setHeaderLogo, setAsset, setNetwork, setCurrentPrice, setAvailableBalance }) => {
    const cryptoOption = useCryptoOption();
    const [option, setOption] = useState(cryptoOption[index].name);
    const [logo, setlogo] = useState(cryptoOption[index].logo);
    const bgmodalColor = useColorModeValue("gray.100", "gray.600")
    const textColor = useColorModeValue('gray.500', 'white');
    const hoverColor = useColorModeValue("gray.200", "gray.500");

    return (
        <>
            <Menu matchWidth >

                <MenuButton as={Button} py={8} w={'full'} borderRadius={5} bg={bgmodalColor} rightIcon={<MdKeyboardArrowDown />} _hover={{ bg: hoverColor }}  >
                    <Flex gap={2}>
                        <Image boxSize={5} src={logo}></Image>
                        {option}
                    </Flex>

                </MenuButton>
                <MenuList borderRadius={0} p={2}  >
                    {cryptoOption.map((data, index) => (
                        <>
                            <MenuItem key={data.name} onClick={() => {
                                setOption(data.name);
                                setHeaderName(data.name);
                                setHeaderLogo(data.logo);
                                setlogo(data.logo);
                                setAsset(data.asset);
                                setNetwork(data.network);
                                setCurrentPrice(data.currentPrice);
                                setAvailableBalance(data.blc);


                            }} gap={3} _hover={{ bg: "blue.100" }}><Image boxSize={5} src={data.logo}></Image>{data.name}</MenuItem>
                        </>
                    ))}

                </MenuList>
            </Menu>
        </>
    )
}

const VerifyPassword = ({ blockChainType = {}, onClose, setSend }) => {
    // const { blockchain, network, asset } = blockChainType;
    const [password, setPassword] = useState('');
    const { handlePasswordMatch, passwordmatch } = useAuth();
    const [showpassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isProceeding, setProceeding] = useState(false);
    const { handleCreateWallet, handleUpdateweb3WalletAddress, handleGetWeb3Wallet } = useAccount();
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isPassWordMessageShow, setPasswordMessageShow] = useState(false);
    const [passworSEMessage, setPasswordSEMessage] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [privateKeys, setPrivateKeys] = useState([]);
    // const [createWalletErrorMessage, setCreateWalletErrorMessage] = useState(false);
    const { user } = useUser();
    const handleClick = async () => {
        setLoading(true);
        try {
            const res = await handlePasswordMatch(password);
            if (res.passwordVerified) {
                setSend(false);
                setIsInputDisabled(true);
                setPasswordMessageShow(true);
                console.log(res?.message);
                setPasswordSEMessage(res?.message);
                setLoading(false);
            }
            else {
                setPasswordSEMessage(res?.message);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <>

            <Flex w={'full'} direction={'column'} gap={5}>

                <Flex w={'full'} gap={3} direction={{ base: 'column', sm: 'row' }} >
                    <FormControl isRequired>
                        <FormLabel>password</FormLabel>
                        <InputGroup>

                            <Input w={'full'} name="password" isDisabled={isInputDisabled} placeholder='Enter Password' value={password} type={showpassword ? "text" : "password"} _focus={{ boxShadow: '0px', border: '0px' }} onChange={(e) => setPassword(e.target.value)} />

                            <InputRightElement >
                                <IconButton
                                    bg={'transparent'}
                                    h="1.75rem"
                                    size=""
                                    // border={'1px solid #c05621'}
                                    px={4}
                                    py={3}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    icon={showpassword ? <IoMdEye /> : <IoMdEyeOff />}
                                    aria-label="Toggle Password Visibility"
                                    _hover={{ bg: 'transparent' }}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Flex justifyContent={'space-between'} alignSelf={'end'} direction={'column'} >

                        <Button
                            isLoading={isLoading}
                            isDisabled={isInputDisabled}
                            loadingText='wait..' onClick={handleClick}
                            alignSelf={'center'}
                            spinner={null}
                            textAlign={'center'}
                            sx={gradientButtonStyle}
                            size={'md'}
                            // variant={'outline'}
                            w={'80px'}
                        >
                            Verify
                        </Button>

                    </Flex>


                </Flex>
                {
                    isPassWordMessageShow ?
                        passwordmatch?.passwordVerified === true &&
                        <Box color='green.500' fontWeight={700}>{passworSEMessage}</Box>

                        :
                        <Box color={'red.500'}>{passworSEMessage}</Box>

                }



            </Flex>




        </>
    )
}


const cryptoStatus = [
    { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
]


const data = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "David" },
    { name: "Daniel" },
];
const CoinSymbolMap = {
    btc: 'bitcoin',
    eth: 'ethereum',
    bnb: 'binancecoin',
    usdt: 'tether'
}

export default Balance