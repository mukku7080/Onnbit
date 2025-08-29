import {
    Flex, Heading, Radio, Box, Grid, GridItem, Button, InputGroup, InputLeftElement, Input, InputRightElement, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputRightAddon,
    InputLeftAddon,
    RadioGroup
} from '@chakra-ui/react'
import { AiOutlineExclamationCircle } from "react-icons/ai";

import React, { useEffect, useState } from 'react'

const Pricing = ({ values, handleChange, handleBlur, setFieldValue }) => {

    const formikHelpers = { values, handleChange, handleBlur, setFieldValue };
    useEffect(() => {
        console.log(values);
    }, [values]);
    // console.log(values);



    return (
        <Flex direction={'column'} gap={10}>
            <Heading size={'md'}>Trade Pricing</Heading>
            <Heading size={'sm'}>Choose Bitcoin rate you want to use</Heading>
            <RadioGroup name='priceType' defaultValue={values.priceType} onChange={handleChange} value={values.priceType}>
                <Flex gap={5} direction={{ base: 'column', xl: 'row' }} >


                    <Flex gap={1} border={'1px solid #dcdcdc'} direction={'column'} p={2} minW={{ base: 'auto', sm: '300px' }} borderRadius={5} >
                        <Radio size='md' colorScheme='orange' onChange={handleChange} value='market_price' >
                            Market Price
                        </Radio>
                        <Box display={'flex'} alignItems={'center'} color={'gray'} fontSize={'14px'} pl={6}>Your offer’s selling price will change according to the market price of Bitcoin.</Box>

                    </Flex>
                    <Flex gap={1} border={'1px solid #dcdcdc'} direction={'column'} p={2} minW={{ base: 'auto', sm: '300px' }} borderRadius={5} >
                        <Radio size='md' colorScheme='orange' value='fixed_price' onChange={handleChange} >
                            Fixed Price
                        </Radio>
                        <Box display={'flex'} alignItems={'center'} color={'gray'} fontSize={'14px'} pl={6}>Your offer’s selling price is locked when you create it, and won’t change with the market price.</Box>

                    </Flex>
                </Flex>
            </RadioGroup>
            <Flex direction={'column'}>

                <Offermargin formikHelpers={formikHelpers} />
                <TradeLimit formikHelpers={formikHelpers} />
                <TimeLimit formikHelpers={formikHelpers} />
            </Flex>



        </Flex>
    )
}


const TradeLimit = ({ formikHelpers = {} }) => {
    const {
        values = {},
        handleChange = () => { }, // Default to a no-op function
        handleBlur = () => { },
        errors = {},
        touched = {},
        setFieldValue = () => { }
    } = formikHelpers || {}; // Ensure formikHelpers is not undefined
    // const [isfixedprice, setFixedPrice] = useState(true);
    // const minimum = 258;
    // const maximum = minimum + 100;

    return (
        <Grid templateColumns={{ base: 'repeat(1,1fr)', lg: 'repeat(5,1fr)' }} border={'1px solid #dcdcdc'} borderLeft={{ base: '1px solid #dcdcdc', lg: 0 }} p={2}>
            <GridItem colSpan={2} p={2}  >
                <Flex direction={'column'} gap={5} justify={'center'} alignItems={'center'} my={{ md: 10 }}>
                    <Heading size={'md'}>Offer Trades Limit</Heading>
                    {/* <Button size={'sm'} variant={'outline'} px={8} onClick={() => setFixedPrice((prev) => !prev)}>{isfixedprice ? "use range" : "use fixed amount"}</Button> */}
                </Flex>
            </GridItem>
            <GridItem colSpan={3} borderLeft={{ base: 0, lg: '1px solid #dcdcdc' }} borderTop={{ base: '1px solid #dcdcdc', lg: 0 }} p={2}>
                <Flex justifyContent={'center'} alignItems={'center'} gap={5} direction={'column'} px={4} my={10}  >
                    <Flex gap={10} w={'full'} direction={{ base: 'column', xl: 'row' }}>
                        <Flex direction={'column'} flex={1} borderRadius={5}>

                            <FormControl isRequired>
                                <FormLabel>Minimum Trades</FormLabel>

                                <InputGroup >
                                    <Input borderRadius={5} placeholder='type...' name='minimum' onChange={handleChange} defaultValue={values.minimum}  ></Input>
                                    <InputRightAddon bg={'transparent'} borderRadius={5} >
                                        <Box>INR</Box>
                                    </InputRightAddon>
                                </InputGroup>
                            </FormControl>
                        </Flex>
                        <Flex direction={'column'} flex={1} borderRadius={5}>

                            <FormControl isRequired>
                                <FormLabel>Maximum Trades</FormLabel>

                                <InputGroup >
                                    <Input borderRadius={5} placeholder='type...' name='maximum' onChange={handleChange} defaultValue={values.maximum} ></Input>
                                    <InputRightAddon bg={'transparent'} borderRadius={5}>
                                        <Box>INR</Box>
                                    </InputRightAddon>
                                </InputGroup>
                            </FormControl>
                        </Flex>
                    </Flex>



                    <Flex bg={'orange.50'} border={'1px solid orange'} p={2} color={'gray'} gap={2} borderRadius={5}>
                        <AiOutlineExclamationCircle size={30} />
                        If the minimum you set in your currency drops below 3.00 USD in value, we’ll prompt the buyers to pick an amount worth at least 3.00 USD to proceed with the trade.
                    </Flex>

                </Flex>

            </GridItem>
        </Grid>
    )
}



const Offermargin = ({ formikHelpers = {} }) => {
    const {
        values = {},
        handleChange = () => { }, // Default to a no-op function
        handleBlur = () => { },
        errors = {},
        touched = {},
        setFieldValue = () => { }
    } = formikHelpers || {}; // Ensure formikHelpers is not undefined
    const [show, setShow] = useState(false);
    useEffect(() => {
        console.log(values);

    }, [values]);

    return (
        <>
            <Grid templateColumns={{ base: 'repeat(1,1fr)', lg: 'repeat(5,1fr)' }} border={'1px solid #dcdcdc'} borderBottom={0} borderLeft={{ base: '1px solid #dcdcdc', lg: 0 }} p={2}>
                <GridItem colSpan={2} p={2}>
                    <Flex direction={'column'} gap={5} justify={'center'} alignItems={'center'} my={10}>
                        <Heading size={'md'}>Offer margin</Heading>
                        {/* <Button size={'sm'} variant={'outline'} px={8} onClick={() => setShow((prev) => !prev)}>Advance</Button> */}
                    </Flex>
                </GridItem>
                <GridItem colSpan={3} borderLeft={{ base: 0, lg: '1px solid #dcdcdc' }} borderTop={{ base: '1px solid #dcdcdc', lg: 0 }}>
                    <Flex justifyContent={'center'} alignItems={'center'} gap={5} direction={'column'} px={4} my={10} >
                        {
                            values.priceType === 'market_price' ?
                                <FormControl>
                                    <FormLabel>Amount</FormLabel>
                                    <InputGroup >
                                        <InputLeftAddon bg={'transparent'} >%</InputLeftAddon>

                                        <NumberInput borderRadius={0}
                                            value={values.offerMargin}
                                            onChange={(value) =>
                                                setFieldValue('offerMargin', value)
                                            }

                                        >
                                            <NumberInputField borderLeftRadius={0} name='offerMargin' />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </FormControl>
                                :
                                <FormControl>
                                    <FormLabel>Fixed Amound</FormLabel>
                                    <InputGroup >
                                        <InputLeftAddon bg={'transparent'} >INR</InputLeftAddon>

                                        <NumberInput borderRadius={0}
                                            value={values.fixedPriceValue}
                                            onChange={(value) =>
                                                setFieldValue('fixedPriceValue', value)
                                            }

                                        >
                                            <NumberInputField borderLeftRadius={0} name='fixedPriceValue' />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </FormControl>
                        }




                        <Flex bg={'orange.50'} border={'1px solid orange'} p={2} color={'gray'} gap={2} borderRadius={5}>

                            <AiOutlineExclamationCircle size={30} />You can find out more about our margin limits here
                            Lorem ipsum dolor sit amet.
                        </Flex>
                        <Flex direction={'column'} gap={3} color={''}>
                            <Box>
                                Current Bitcoin market price:<b> 8,038,658.22 INR</b>

                            </Box>
                            <Box>
                                I will get <b>108%</b> of IMPS Transfer value through <b>Cryptico</b> on Last price point.
                                So for every <b>263.00 INR</b>   worth of Bitcoin you sell (your minimum trade limit), you will receive an<b>0.00 INR</b>   in return.
                            </Box>
                        </Flex>

                    </Flex>

                </GridItem>
            </Grid>
        </>
    )
}



const TimeLimit = ({ formikHelpers = {} }) => {
    const {
        values = {},
        handleChange = () => { }, // Default to a no-op function
        handleBlur = () => { },
        errors = {},
        touched = {},
        setFieldValue = () => { }
    } = formikHelpers || {}; // Ensure formikHelpers is not undefined
    // const [isfixedprice, setFixedPrice] = useState(true);
    console.log(values);

    return (
        <Grid templateColumns={{ base: 'repeat(1,1fr)', lg: 'repeat(5,1fr)' }} border={'1px solid #dcdcdc'} borderTop={0} borderLeft={{ base: '1px solid #dcdcdc', lg: 0 }} p={2} >
            <GridItem colSpan={2} p={2}>
                <Flex direction={'column'} gap={5} justify={'center'} alignItems={'center'} my={10}>
                    <Heading size={'md'}>Offer Time Limit</Heading>
                </Flex>
            </GridItem>
            <GridItem colSpan={3} borderLeft={{ base: 0, lg: '1px solid #dcdcdc' }} borderTop={{ base: '1px solid #dcdcdc', lg: 0 }}>
                <Flex justifyContent={'center'} alignItems={'center'} gap={5} direction={'column'} px={4} my={10}  >
                    <FormControl>
                        <InputGroup >
                            <InputLeftAddon bg={'transparent'} borderRightRadius={0}>minutes</InputLeftAddon>

                            <NumberInput borderRadius={0} min={30} max={90}
                                value={values.timeLimit} // Bind value to Formik's state
                                onChange={(value) => setFieldValue('timeLimit', value)}
                            >
                                <NumberInputField borderLeftRadius={0} name='timeLimit' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>
                    </FormControl>


                    <Box >
                        This is how much time your trade partner has to make the payment and click Paid before the trade is automatically canceled.
                    </Box>





                </Flex>

            </GridItem>
        </Grid>
    )
}
export default Pricing