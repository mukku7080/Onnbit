import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle, Box, Button, Card, Flex, FormControl, Input, useToast } from '@chakra-ui/react'
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { SiConvertio } from "react-icons/si";
import { TbArrowsExchange2 } from "react-icons/tb";
import { CgArrowsExchangeAltV } from "react-icons/cg";

import TokenDropdown from '../Dropdown/TokenDropdown';
import { useCryptoOption } from '../Store/cryptoOption';
import { useAccount } from '../../Context/AccountContext';
import { useWalletStore } from '../Store/useWalletStore';
import { useOtherDetail } from '../../Context/otherContext';
import { number } from 'framer-motion';
import { gradientButtonStyle } from './CreateWallet';
import PageLoader from '../Animation/PageLoader';


const Convert = () => {
    const [index, setIndex] = React.useState(0);
    const [index1, setIndex1] = React.useState(1);
    const [refreshCountdown, setRefreshCountdown] = useState(30);
    const cryptoDetails = useCryptoOption();
    const { web3wallet, handleGetWeb3Wallet, handleInternalAssetConvertion, FeeCalculation } = useAccount();
    const { priceRef } = useOtherDetail();
    const setWeb3wallet = useWalletStore((state) => state.setWeb3wallet);
    const [totalamount, setTotalAmount] = useState(0);
    const [totalBtc, setTotalBtc] = useState();
    const [fromAsset, setFromAsset] = React.useState(cryptoDetails?.[index]?.asset);
    const [toAsset, setToAsset] = React.useState(cryptoDetails?.[index1]?.asset);
    const [fromAssetValue, setFromAssetValue] = React.useState(0);
    const [toAssetValue, setToAssetValue] = React.useState(0);
    const [totalAssetValue, setTotalAssetValue] = useState();
    const [exchangeRate, setExchangeRate] = useState(0);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    useEffect(() => {
        if (web3wallet) {
            setWeb3wallet(web3wallet);
        }
    }, [web3wallet])
    useEffect(() => {
        handleGetWeb3Wallet();
    }, [])
    useEffect(() => {
        const total = cryptoDetails.reduce((sum, item) => {
            const balance = Number(item?.currentPrice) * Number(item?.blc);
            return sum + balance;
        }, 0);
        setTotalAmount(total);
        setTotalBtc(total / (priceRef?.current?.bitcoin?.inr));
    }, [cryptoDetails]);
    useEffect(() => {
        setFromAsset(cryptoDetails?.[index]?.asset);
        setToAsset(cryptoDetails?.[index1]?.asset);
    }, [index, index1]);
    useEffect(() => {
        convertAsset(fromAssetValue);
    }, [index, index1]);


    function convertAsset(fromAssetValue) {
        const inrValue = fromAssetValue * cryptoDetails?.[index]?.currentPrice;
        const targetAmount = inrValue / cryptoDetails?.[index1]?.currentPrice === 'NaN' ? 0 : inrValue / cryptoDetails?.[index1]?.currentPrice;
        setToAssetValue(targetAmount !== 'NaN' ? targetAmount.toFixed(8) : 0);
        return targetAmount;
    }

    // ExchangeRate js-----------------------
    useEffect(() => {
        setExchangeRate(ExchangeRate());
        const timeinterval = setInterval(() => {
            setExchangeRate(ExchangeRate());
            setRefreshCountdown(30);
        }, 30000);

        const countdownInterval = setInterval(() => {
            setRefreshCountdown(prev => (prev > 0 ? prev - 1 : 30));
        }, 1000);

        return () => {
            clearInterval(timeinterval);
            clearInterval(countdownInterval);
        };
    }, [cryptoDetails]);

    function ExchangeRate() {
        const inrValue = 1 * cryptoDetails?.[index]?.currentPrice;
        const targetAmount = inrValue / cryptoDetails?.[index1]?.currentPrice;
        return targetAmount;
    }
    function ToFromConversionAsset(tosAssetValue) {
        const inrValue = tosAssetValue * cryptoDetails?.[index1]?.currentPrice;
        const targetAmount = inrValue / cryptoDetails?.[index]?.currentPrice;
        setFromAssetValue(targetAmount !== 0 ? targetAmount.toFixed(8) : '');
        return targetAmount;
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setFromAssetValue(value);
        convertAsset(value);
    };
    const handleToChange = (e) => {
        const value = e.target.value;
        setToAssetValue(value);
        ToFromConversionAsset(value);
    };
    const handleConvert = async () => {
        setLoading(true);

        const feeCalculationDto = {
            "asset": cryptoDetails?.[index]?.asset,
            "network": cryptoDetails?.[index]?.network,
            "assetValue": 0.000006,
            "assetConversion": true
        }
        const res = await FeeCalculation(feeCalculationDto);
        const numericFromValue = parseFloat(fromAssetValue) || 0;
        const ConvertDto = {
            "fromAsset": cryptoDetails?.[index]?.asset,
            "fromAssetValue": fromAssetValue,
            "toAsset": cryptoDetails?.[index1]?.asset,
            "toAssetValue": toAssetValue,
            "fromAssetTotalValue": (
                numericFromValue + (numericFromValue * (res?.data?.transferPercentage || 0)) / 100
            ).toFixed(8)
        }
        const response = await handleInternalAssetConvertion(ConvertDto);
        console.log(response);
        if (response?.status === true) {
            toast({
                title: "Asset Converted Successfully",
                status: "success", // ✅ Use 'status' instead of 'icon'
                position: 'bottom',   // Chakra supports: 'top', 'top-right', etc. ('center' is not valid)
                duration: 3000,
                isClosable: true
            });

            setLoading(false);
        }
    }

    return (
        <>
            {
                (cryptoDetails?.[index1].currentPrice === undefined) ?
                    <PageLoader />
                    :
                    <Flex w={'container.xxl'} gap={10} direction={'column'} alignItems={'center'} justifyContent={'start'} my={20} marginTop={'50px'} minH={'70vh'}>
                        <Flex
                            maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                            minW={{ base: "100%", sm: '90%', lg: '90%', xl: "90%" }}
                            direction={'column'}
                            gap={8}
                        >

                            <Card w={'full'} p={4}

                            >
                                <Flex w={'full'} direction={{ base: 'column', lg: 'row' }} my={5} >

                                    {/* Convert from start */}

                                    <Flex flex={4.8} direction={'column'} gap={5} p={4}  >
                                        <Flex justifyContent={'space-between'} w={'full'} gap={2}>

                                            <Box fontWeight={'500'}>You are converting</Box>
                                            <Box textAlign={'end'}><Box fontWeight={500} as={'span'} color={'orange.500'}>Available :</Box> {cryptoDetails?.[index]?.blc !== undefined ? Number(cryptoDetails?.[index]?.blc).toFixed(8) : 0}</Box>
                                        </Flex>
                                        <Flex justifyContent={'space-between'} direction={{ base: 'column-reverse', sm: 'row' }} alignItems={'center'} w={'full'} gap={2}>
                                            <Flex flex={1.2}>

                                                <FormControl>
                                                    <Input
                                                        p={0}
                                                        fontWeight={'700'}
                                                        fontSize={'30px'}
                                                        value={fromAssetValue === 0 || fromAssetValue === '' ? '' : fromAssetValue}
                                                        placeholder="Enter Amount"
                                                        onChange={handleChange}
                                                        size={{ base: 'none', md: 'lg' }}
                                                        border={'none'} _hover={{ border: 'none' }}
                                                        _focus={{ boxShadow: 'none' }}>

                                                    </Input>
                                                </FormControl>
                                            </Flex>
                                            <Flex flex={.8} w={'full'}>

                                                <TokenDropdown index={index} setIndex={setIndex} />
                                            </Flex>
                                        </Flex>
                                        <Box>

                                            <Button bgColor='gary.200' size={'sm'}>
                                                min 0.000017774
                                            </Button>
                                        </Box>

                                    </Flex>
                                    {/* Convert from End */}
                                    <Flex flex={.4} justifyContent={'center'} alignItems={'center'} color={'orange.500'} >
                                        <Flex display={{ base: 'none', lg: 'flex' }}>

                                            <TbArrowsExchange2 size={30} />
                                        </Flex>
                                        <Flex display={{ base: 'flex', lg: 'none' }}>

                                            <CgArrowsExchangeAltV size={30} />
                                        </Flex>
                                    </Flex>


                                    {/* Convert to start */}
                                    <Flex flex={4.8} direction={'column'} gap={5} p={4}>
                                        <Flex justifyContent={'space-between'} w={'full'} gap={2}>

                                            <Box fontWeight={500}>You will  receive</Box>
                                            <Box textAlign={'end'}><Box fontWeight={500} as={'span'} color={'orange.500'}>Available :</Box> {cryptoDetails?.[index1]?.blc !== undefined ? Number(cryptoDetails?.[index1]?.blc).toFixed(8) : 0}</Box>
                                        </Flex>
                                        <Flex justifyContent={'space-between'} w={'full'} gap={2} direction={{ base: 'column-reverse', sm: 'row' }}>
                                            <Flex flex={1.2}>

                                                <FormControl>
                                                    <Input
                                                        p={0}
                                                        fontWeight={'700'}
                                                        fontSize={'30px'}
                                                        value={toAssetValue === 0 || toAssetValue === '' ? '' : toAssetValue}
                                                        placeholder='Enter Amount'
                                                        onChange={handleToChange}
                                                        size={'lg'}
                                                        border={'none'}
                                                        _hover={{ border: 'none' }}
                                                        _focus={{ boxShadow: 'none' }}
                                                    >
                                                    </Input>
                                                </FormControl>
                                            </Flex>
                                            <Flex flex={.8}>

                                                <TokenDropdown index={index1} setIndex={setIndex1} />
                                            </Flex>
                                        </Flex>


                                    </Flex>
                                    {/* Convert to End */}
                                </Flex>
                                <Flex w={'full'} borderTop={'1px solid #dcdcdc'} p={4}  >
                                    <Flex mt={5} w={'full'}>
                                        <Flex w={'full'} justifyContent={'space-between'} wrap={'wrap'} gap={5} >

                                            <Flex gap={4}>
                                                <Box >
                                                    <SiConvertio size={30} color='orange' />
                                                </Box>
                                                <Flex direction={'column'} fontSize={{ base: '12px', sm: '14px', md: '16px' }} >
                                                    <Box>
                                                        Exchange Rate :&nbsp;
                                                        <Box as={'span'} fontWeight={'700'} color={'orange.500'}>

                                                            1 {(cryptoDetails?.[index]?.asset).toUpperCase()} = {exchangeRate.toFixed(8)} {(cryptoDetails?.[index1]?.asset).toUpperCase()}
                                                        </Box>
                                                    </Box>
                                                    <Box fontSize={'12px'}>Refressing Time {refreshCountdown}s</Box>
                                                </Flex>

                                            </Flex>
                                            <Flex>

                                                <Button isLoading={loading} loadingText='Converting...' px={10} size={{ base: 'sm', md: 'md' }} sx={gradientButtonStyle} onClick={handleConvert}>Convert</Button>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>

                            </Card>
                        </Flex>
                    </Flex>
            }
        </>

    )
}

export default Convert