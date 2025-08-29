import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Flex, Heading, useDisclosure, FormControl, FormLabel, Input, RadioGroup, Radio, Tag, Collapse, FormErrorMessage, useToast, ButtonGroup, IconButton, Image, Checkbox, Spinner } from '@chakra-ui/react'
import { FaBusinessTime, FaPlus, FaUserCircle } from "react-icons/fa";
import OfferLocation from '../Dropdown/OfferLocation';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { useAccount } from '../../Context/AccountContext';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { gradientButtonStyle } from '../Wallet/CreateWallet';
import AddOnlineWallet from './AddOnlineWallet';




const validationSchema = Yup.object({
    accountType: Yup.string().required("Account type is required"),
    bankName: Yup.string().required("Bank Name is required"),
    accountHolder: Yup.string().required("Account Holder's Name is required"),
    bankCountry: Yup.string().required("Bank Account Country is required"),
    currency: Yup.string().required("Currency is required"),
    isPrimary: Yup.boolean().optional(),
    ifsc: Yup.string().required("IFSC is required"),
    accountNumber: Yup.string().required("Account Number is required"),
    swiftCode: Yup.string().optional(),
    customBankDetails: Yup.string().optional(),
    country: Yup.string().optional(),
    state: Yup.string().optional(),
    city: Yup.string().optional(),
    zipCode: Yup.string().optional(),
    address: Yup.string().optional(),
});


const PaymentMethod = () => {
    const initialValues = {
        accountType: "personal",
        bankName: "",
        accountHolder: "",
        bankCountry: "",
        currency: "",
        isPrimary: false,
        ifsc: "",
        accountNumber: "",
        swiftCode: "",
        customBankDetails: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        address: "",
    };


    const [isNext, setIsNext] = useState(false);
    // const [visibility, setVisibility] = useState("personal");
    const { handleAddAccount, accountDetails, updateIsPrimary, handleGetAccountDetail, upidetails } = useAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(0);
    // const [isChekboxLoading, setChekBoxLoading] = useState(false);
    const [loadingId, setLoadingId] = useState(null);

    const toast = useToast();
    useEffect(() => {
        handleGetAccountDetail('');

    }, []);

    const handleChek = async (data) => {
        setLoadingId(data);
        const value = {
            method: 'bank',
            id: data
        }
        const res = await updateIsPrimary(value);
        console.log(res);
        if (res) {
            await handleGetAccountDetail('');
            setLoadingId(null);
        }


    }


    return (
        <Flex w={'full'} direction={'column'} gap={5} >
            <Card borderRadius={0} p={4} gap={5} border={'1px solid rgba(128, 128, 128, 0.3)'}  >
                <Heading size={'md'} fontWeight={500}>Bank Accounts</Heading>
                <Box as='p' fontSize={'16px'} color={'gray'}>Add your bank account details below. You can share these details with your trade partner via trade chat, for bank transfer trades.</Box>
                <Heading size={'md'} my={5}>Add your First Bank Account</Heading>
                <Flex direction={'column'} gap={5}>
                    {/* BankDetails-------------------------------------------------------------------------------------- */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, actions) => {
                            try {
                                setIsLoading(true)
                                const res = await handleAddAccount(values);
                                console.log(res);
                                const { status, message } = res;
                                if (status === true) {
                                    toast({
                                        title: "Account",
                                        description: message,
                                        status: "success",
                                        duration: 5000,
                                        isClosable: true,
                                        position: "top-right",
                                    });
                                    actions.resetForm({ values: initialValues });
                                }
                            }
                            catch (error) {
                                if (error.errors) {
                                    Object.keys(error.errors).forEach((key) => {
                                        error.errors[key].forEach((message, index) => {
                                            toast({
                                                title: `Error in ${key}]`, // Dynamic key and index
                                                description: message, // Error message
                                                status: "error",
                                                duration: 5000,
                                                isClosable: true,
                                                position: "top-right",
                                            });
                                        });
                                    });
                                }
                            }
                            finally {
                                setIsLoading(false);
                                setReload((prev) => prev + 1); // Increment state to force re-render
                                actions.resetForm({ values: initialValues });
                            }
                            // console.log("Form Data:", values);
                        }}

                    >
                        {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) =>
                            <Form onSubmit={handleSubmit}>
                                {
                                    isNext ?
                                        <>
                                            <BankDetail2 setIsNext={setIsNext} reload={reload} isLoading={isLoading} formikHelpers={{ values, handleChange, handleBlur, handleSubmit, errors, touched }} />

                                        </>
                                        :
                                        <>
                                            <BankDetail1 setIsNext={setIsNext} formikHelpers={{ values, handleChange, handleBlur, errors, touched }} />
                                        </>
                                }
                            </Form>
                        }

                    </Formik>
                    {/* BankDetails End-------------------------------------------------------------------------------------- */}
                </Flex>



            </Card>
            <AddOnlineWallet />

            <Heading pl={4} size={'md'} fontWeight={700}>Bank Details</Heading>

            {
                accountDetails?.length > 0 &&
                accountDetails.map((data, index) => (

                    <Card borderRadius={0} key={index} p={4} gap={5}>
                        <Flex border={'1px solid orange'} >
                            <Flex direction={'column'} gap={5} p={4} w={'full'}>
                                <Flex justifyContent={'space-between'}>

                                    <Box as='p' fontWeight={600} fontSize={'12px'} color={'gray'}>{(data?.account_type)}</Box>
                                    {
                                        loadingId === data?.pd_id ? <Heading size={'sm'} color={'gray.300'} fontWeight={500}>updating...</Heading> :
                                            <Checkbox size={'sm'} fontWeight={500} colorScheme='orange' isChecked={data?.is_primary} onChange={() => handleChek(data?.pd_id)}><Box color={'gray'} fontSize={'12px'}>primary</Box></Checkbox>
                                    }

                                </Flex>
                                <Flex justifyContent={'space-between'} w={'full'} direction={{ base: 'column', sm: 'row' }} gap={5} >
                                    <Flex gap={2} wrap={'wrap'} >

                                        <Button as={Box} size={'sm'} colorScheme='orange'>{data?.bank_name}</Button>
                                        <Flex gap={2} >

                                            <Button as={Box} size={'sm'} colorScheme='teal'>{data?.currency}</Button>
                                            <Box justifyContent={'center'} alignItems={'center'} display={'flex'} color={'gray'} fontSize={'14px'}>{data?.account_number}</Box>
                                        </Flex>
                                    </Flex>
                                    <Flex>
                                        <Button size={'sm'} bgColor={'transparent'} borderRadius={0} color={'red'} display={{ base: 'flex', sm: 'none' }}><RiDeleteBin6Line /></Button>
                                        <Button size={'sm'} bgColor={'transparent'} borderRadius={0} color={'green.300'} display={{ base: 'flex', sm: 'none' }}><MdModeEdit /></Button>
                                        <Button size={'sm'} bgColor={'transparent'} borderRadius={0} color={'red'} leftIcon={<RiDeleteBin6Line />} display={{ base: 'none', sm: 'flex' }}>Delete</Button>
                                        <Button size={'sm'} bgColor={'transparent'} borderRadius={0} color={'green.300'} leftIcon={<MdModeEdit />} display={{ base: 'none', sm: 'flex' }}>Edit</Button>
                                    </Flex>
                                </Flex>

                            </Flex>
                        </Flex>


                    </Card>
                ))
            }






        </Flex>
    )
}


const BankDetail1 = ({ setIsNext, formikHelpers }) => {
    const { values, handleChange, handleBlur, errors, touched } = formikHelpers;

    return (
        <>

            <FormControl isRequired isInvalid={errors.accountType && touched.accountType}>
                <FormLabel>Account Type</FormLabel>
                <RadioGroup
                    // onChange={handleChange}
                    onBlur={handleBlur}
                    name="accountType"
                    value={values.accountType}


                >
                    <Flex display={'flex'} gap={6} direction={'row'} flexWrap={'wrap'}>

                        <Flex alignItems={'center'} px={4} py={2} border={'1px solid #dcdcdc'} gap={3}>

                            <Radio value='personal' onChange={handleChange}  >Personal &nbsp; </Radio>
                            <FaUserCircle size={20} color='gray' />
                        </Flex>
                        <Flex alignItems={'center'} px={4} py={2} border={'1px solid #dcdcdc'} gap={3}>

                            <Radio value='business' onChange={handleChange} >Business &nbsp; </Radio>
                            <FaBusinessTime size={20} color='gray' />
                        </Flex>
                    </Flex>
                </RadioGroup>
                <FormErrorMessage>{errors.accountType}</FormErrorMessage>
            </FormControl>
            <Flex gap={{ base: 5, md: 10 }} direction={{ base: 'column', md: 'row' }}>

                <FormControl isRequired isInvalid={errors.bankCountry && touched.bankCountry} mt={4}>
                    <FormLabel>Bank Account Country</FormLabel>
                    <OfferLocation formikHelpers={formikHelpers} name='bankCountry' />
                    <FormErrorMessage>{errors.bankCountry}</FormErrorMessage>

                </FormControl>
                <FormControl isRequired isInvalid={errors.currency && touched.currency} mt={4} >
                    <FormLabel>Currency</FormLabel>
                    <Flex border={'1px solid #dcdcdc'} borderRadius={5}>

                        <CurrencyDropdown width='100%' formikHelpers={formikHelpers} name='currency' />
                    </Flex>
                    <FormErrorMessage>{errors.currency}</FormErrorMessage>

                </FormControl>
            </Flex>
            <Button mt={5} size={'md'} sx={gradientButtonStyle} width={'60px'} onClick={() => { setIsNext((prev) => !prev) }}>Next</Button>

        </>
    )
}


const BankDetail2 = ({ setIsNext, formikHelpers, isLoading, reload }) => {
    const { values, handleChange, handleBlur, errors, touched } = formikHelpers;
    const [isShow, setShow] = useState(false);
    const { isOpen, onToggle } = useDisclosure()
    return (
        <>
            <Flex direction='column' gap={10} mt={5} key={reload}>

                <Flex direction={'row'} gap={1} >
                    <Heading size={'md'}>Account type</Heading>

                    {/* <RadioGroup  > */}
                    {
                        values.accountType === 'personal' ?
                            <Flex alignItems={'center'} p={2} gap={1} bg={'#feebc8'} borderRadius={5} color={'brown'}>

                                <FaUserCircle size={25} color='#a1341e' />
                                <Heading size={'xs'} value='business' disabled>PERSONAL</Heading>
                            </Flex>
                            :

                            <Flex alignItems={'center'} p={2} gap={1} bg={'#feebc8'} borderRadius={5} color={'brown'}>

                                <FaBusinessTime size={25} color='#a1341e' />
                                <Heading size={'xs'} value='business' disabled>BUSINESS</Heading>
                            </Flex>
                    }

                    {/* </RadioGroup> */}
                </Flex>
                <Flex gap={10} direction={{ base: 'column', md: 'row' }}>

                    <FormControl isRequired isInvalid={errors.bankName && touched.bankName}>
                        <FormLabel>Bank Name</FormLabel>
                        <Input placeholder="Enter bank name" name='bankName' onChange={handleChange} onBlur={handleBlur} />
                        <FormErrorMessage>{errors.bankName}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={errors.accountHolder && touched.accountHolder}>
                        <FormLabel>Account Holder's Name</FormLabel>
                        <Input placeholder="Enter account holder's name" name='accountHolder' onChange={handleChange} onBlur={handleBlur} />
                        <FormErrorMessage>{errors.accountHolder}</FormErrorMessage>
                    </FormControl>
                </Flex>
                <Flex gap={10} direction={{ base: 'column', md: 'row' }}>

                    <FormControl>
                        <FormLabel>Custom Bank Details <Tag colorScheme="orange">Optional</Tag></FormLabel>
                        <Input placeholder="Add any other bank details if needed" name='customBankDetails' onChange={handleChange} onBlur={handleBlur} />

                    </FormControl>

                    <FormControl isDisabled={values.bankCountry !== 'India'} isRequired isInvalid={errors.ifsc && touched.ifsc} >
                        <FormLabel>IFSC</FormLabel>
                        <Input placeholder="Enter IFSC code" name='ifsc' onChange={handleChange} />
                    </FormControl>
                </Flex>
                <Flex gap={10} direction={{ base: 'column', md: 'row' }}>

                    <FormControl isRequired isInvalid={errors.accountNumber && touched.accountNumber}>
                        <FormLabel >Account Number</FormLabel>
                        <Input placeholder="Enter account number" onChange={handleChange} onBlur={handleBlur} name="accountNumber" />
                        <FormErrorMessage>{errors.accountNumber}</FormErrorMessage>

                    </FormControl>

                    <FormControl>
                        <FormLabel>SWIFT / BIC Code <Tag colorScheme="orange"  >Optional</Tag></FormLabel>
                        <Input placeholder="Enter SWIFT / BIC code" onChange={handleChange} name="swiftCode" />
                    </FormControl>
                </Flex>
                <FormControl>
                    <Checkbox colorScheme='orange' isChecked={values.isPrimary} fontWeight={500} name='isPrimary' onChange={handleChange}>is_Primary</Checkbox>
                </FormControl>



            </Flex>



            <Flex direction={'column'}>
                <Button mt={5} size={'md'}
                    _hover={{ bg: "transparent" }} // Disable hover effect
                    _focus={{ boxShadow: "none" }} // Remove focus outline
                    _active={{ bg: "transparent" }}
                    bg={'transparent'}
                    onClick={() => {
                        setShow((prev) => !prev);
                        onToggle();
                    }}
                    leftIcon={isShow ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                    alignSelf={'start'}
                    px={0}
                >
                    International transfer details
                </Button>

                {/* {
                isShow &&
                <InternationDetails />
            } */}
                <Collapse in={isOpen} transition={{ exit: { delay: 0.2 }, enter: { duration: 0.5 } }} animateOpacity>
                    <InternationDetails formikHelpers={formikHelpers} />
                </Collapse>

                <Flex gap={5} >

                    <Button mt={5} size={'md'} sx={gradientButtonStyle} width={'60px'} onClick={() => { setIsNext((prev) => !prev) }}>Back</Button>
                    <Button type='Submit' mt={5} size={'md'} sx={gradientButtonStyle} width={'120px'} loadingText='Loading' isLoading={isLoading}  >Add account</Button>
                </Flex>

            </Flex>

        </>
    )
}

const InternationDetails = ({ formikHelpers }) => {
    const { values, handleChange, handleBlur, errors, touched } = formikHelpers;

    return (
        <>
            <Flex direction={'column'} gap={5} my={10}>
                <Flex gap={10} direction={{ base: 'column', md: 'row' }}>
                    <FormControl >
                        <FormLabel>Country of Residency</FormLabel>
                        <Input placeholder="Enter country" name='country' onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>State/Region</FormLabel>
                        <Input placeholder="Enter state/region" name='state' onChange={handleChange} />
                    </FormControl>


                </Flex>
                <Flex gap={10} direction={{ base: 'column', md: 'row' }}>
                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input placeholder="Enter city" name='city' onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Zip Code</FormLabel>
                        <Input type="number" placeholder="Enter zip code" name='zipCode' onChange={handleChange} />
                    </FormControl>
                </Flex>





                <Flex w={{ base: '100%', md: '48.5%' }}>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input placeholder="Enter address" name='address' onChange={handleChange} />
                    </FormControl>

                </Flex>

            </Flex>
        </>
    )
}

export default PaymentMethod