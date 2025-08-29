import {
    Flex,
    Heading,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Box,
    Button,
    Image,
    Radio,
    RadioGroup,
    useBreakpointValue,
    FormControl,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    Divider,
    Text,
    Icon,
    FormErrorMessage,
    FormLabel,
    useToast,
    Card
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CurrencyDropdown from '../Dropdown/CurrencyDropdown'
import { MdKeyboardArrowDown } from "react-icons/md";
import PaymentDropdown from '../Dropdown/PaymentDropdown';
import NestedDropdown from '../Dropdown/NestedDropdown';
import OfferLocation from '../Dropdown/OfferLocation';
import { FaPhoneAlt, FaEnvelope, FaUserCircle, FaMapMarkerAlt, FaChevronDown, FaArrowAltCircleRight } from "react-icons/fa";
import CryptoAccordion, { Mybadge } from '../Accordian/CryptoAccordion';
import { IoEyeOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { MyPaymentModal } from '../Dropdown/PaymentModal/MyPaymentModal';
import Pricing from './Pricing';
import OtherSettings from './OtherSettings';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { useOffer } from '../../Context/OfferContext';
import { useAccount } from '../../Context/AccountContext';
import { useNavigate } from 'react-router-dom';






const CreateOffers = () => {



    const initialValues = {
        cryptoType: 'bitcoin',
        action: 'sell',
        paymentType: '',
        paymentMethod: '',
        paymentMethodId: '',
        preferCurrency: 'INR',
        priceType: 'market_price',
        minimum: '258',
        maximum: '300',
        offerMargin: '5',
        fixedPriceValue: '0',
        timeLimit: '30',
        offerTags: [],
        label: '',
        term: '',
        isVerified: false,
        visibility: 'public',

    }

    const validationschema = Yup.object({
        cryptoType: Yup.string().required('Required'),
        action: Yup.string().required('Required'),
        paymentMethod: Yup.string().required('*a payment method is required'),
        preferCurrency: Yup.string().required('Required'),
        priceType: Yup.string().required('Required'),
        minimum: Yup.string().required('Required'),
        maximum: Yup.string().required('Required'),
        offerMargin: Yup.string().required('Required'),
        timeLimit: Yup.string().required('Required'),
        offerTags: Yup.array().of(Yup.string()).optional(),
        label: Yup.string().optional(),
        term: Yup.string().required('required'),

    })
    const { handleAddOffer } = useOffer();
    const toast = useToast();
    const navigate = useNavigate();
    const [crypto, setCrypto] = useState("Bitcoin");
    const [action, setAction] = useState("Sell");
    const [page, setPage] = useState(0);
    const [isDisable, setDisable] = useState(false);
    const [isCreateOffer, setCreateOffer] = useState(false);
    const pages = [
        <PaymentSection action={action} setAction={setAction} setCrypto={setCrypto} crypto={crypto} setDisable={setDisable} />,
        <Pricing />,
        <OtherSettings setCreateOffer={setCreateOffer} />
    ];

    const nextPage = () => {
        if (page < pages.length - 1) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };




    return (
        <>
            <Flex W={'container.xxl'} justifyContent={'center'} alignItems={'center'} marginTop={'54px'}>


                <Flex
                    maxW={{ base: "90%", lg: '90%', xl: "90%" }}
                    minW={{ base: "90%", sm: '90%', lg: '90%', xl: "90%" }}
                    mt={{ base: 20, lg: 10 }}
                >
                    <Flex w={'full'}  >
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationschema}
                            validateOnChange={false}  // Disable immediate validation on change
                            validateOnBlur={false}    // Disable immediate validation on blur
                            onSubmit={async (values) => {
                                const res = await handleAddOffer(values)
                                if (res.status === true) {
                                    toast({
                                        title: res.message,
                                        status: "success",
                                        duration: 2000,
                                        isClosable: true,
                                        position: 'top-right'
                                    })
                                }
                            }
                            }
                        >
                            {
                                ({ values, handleChange, handleBlur, setFieldValue, handleSubmit, touched, errors }) =>
                                (
                                    <Form onSubmit={handleSubmit} >
                                        <Flex w={'100%'} direction={{ base: 'column', lg: 'row' }} flexWrap={'wrap'} gap={5} >

                                            <Flex
                                                // borderRight={{ base: 0, lg: '1px solid #dcdcdc' }}
                                                flex={1.2} width={{ base: '100%', lg: '50%' }}
                                                direction={'column'}

                                            >
                                                <Card
                                                    boxShadow={'md'}
                                                    p={{ base: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
                                                    gap={10}
                                                >

                                                    <Heading size={'lg'}>{`Create an Offer to ${action} ${crypto}`}</Heading>
                                                    <Steper step={page} />

                                                    {React.cloneElement(pages[page], { values, handleChange, handleBlur, setFieldValue, touched, errors })}
                                                </Card>




                                            </Flex>



                                            {/* Right side Section start */}
                                            <Flex flex={.8}
                                                width={{ base: '100%', lg: '50%' }}
                                                my={{ base: 10, sm: 0 }}
                                                position={'sticky'}
                                                top={{ base: '102px', lg: '58px' }}  // Adjust based on navbar height if any4
                                                // height={{ base: 'auto', lg: "calc(100vh - 60px)" }}
                                                zIndex={1}
                                            >
                                                <Card w={'full'} boxShadow={'md'}>

                                                    <Flex w={'full'} direction={'column'} gap={5}
                                                        sx={
                                                            {
                                                                "@media screen and (max-width: 350px)": {
                                                                    maxW: "300px",
                                                                },
                                                            }

                                                        }
                                                    >
                                                        <Flex direction={'column'} gap={5} py={{ base: 2, sm: 10 }} px={{ base: 4, lg: 10 }}>
                                                            <Heading size={'md'}>About This Step</Heading>
                                                            <Flex> Start creating your offer by selecting the cryptocurrency you want to trade, whether or not you want to buy or sell, and the payment method you want to use.</Flex>
                                                            <Flex gap={5} >
                                                                <Button variant={'outline'} _hover={{ bg: 'orange.50' }} border={'1px solid #dcdcdc'} onClick={prevPage} disabled={page === 0}>Previous Step</Button>
                                                                {
                                                                    (page === pages.length - 1) ?

                                                                        <Button
                                                                            isLoading={isCreateOffer}
                                                                            loadingText='Creating....'
                                                                            variant={'outline'}
                                                                            colorScheme='orange'
                                                                            type='submit'
                                                                            isDisabled={!values.term.length > 0}
                                                                            onClick={() => {
                                                                                setCreateOffer(true);
                                                                                setTimeout(() => {
                                                                                    setCreateOffer(false);
                                                                                    navigate('/user-dashboard/myOffers');
                                                                                }, 3000);
                                                                                handleSubmit();
                                                                            }}
                                                                        >
                                                                            Create Offers
                                                                        </Button>
                                                                        :
                                                                        <Button variant={'outline'} colorScheme='orange' onClick={nextPage} isDisabled={!isDisable}>Next Step</Button>
                                                                }
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                </Card>

                                            </Flex>
                                        </Flex>

                                    </Form>
                                )
                            }
                        </Formik>

                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
const steps = [
    { title: 'Payment Method', description: 'Contact Info' },
    { title: 'Pricing', description: 'Date & Time' },
    { title: 'Other Settings', description: 'Select Rooms' },
]
function Steper({ step }) {
    // const { activeStep } = useSteps({
    //     index: step,
    //     count: steps.length,
    // })

    const orientation = useBreakpointValue({ base: "vertical", xl: "horizontal" });

    return (
        <Stepper size={'sm'} orientation={orientation} index={step}


        >
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle fontSize={'22px'}>{step.title}</StepTitle>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}



const PaymentSection = ({ values, handleChange, handleBlur, setFieldValue, touched, errors, setAction, setCrypto, crypto, setDisable }) => {
    const formikHelpers = { values, handleChange, handleBlur, setFieldValue, touched, errors };
    const { handleGetAccountDetail, upibankDetails } = useAccount();
    useEffect(() => {
        console.log(values);
    }, [values]);

    const [value, setValue] = React.useState('Buy')//Radio button
    const [isShow, setShow] = useState(true);
    const [isbankShow, setBankShow] = useState(false);
    const [bankDetail, setBankDetail] = useState('Select Your Bank Account (Optional)');
    const EnableNextStep = () => {
        setDisable(true);
    }
    useEffect(() => {
        if (isbankShow) {
            handleGetAccountDetail(values.paymentType);
        }
        console.log(upibankDetails);
    }, [values.paymentType])
    return (
        <Flex direction={'column'} gap={10}  >
            <Heading size={'md'}>Choose Your Crypto Currency</Heading>
            <FormControl isRequired  >

                <Flex gap={5} flexWrap={{ base: 'wrap', lg: 'wrap' }}>

                    {cryptoOption.map((data, index) => (

                        <Flex key={data.name} border={'1px solid #dcdcdc'} borderRadius={5}>

                            <Button
                                onClick={() => {

                                    setCrypto(data.name)
                                    // onchange = { handleChange }
                                    handleChange({ target: { name: "cryptoType", value: data.name.toLowerCase() } })
                                }
                                }
                                leftIcon={<Image boxSize={5} src={data.logo} ></Image>} >{data.name}

                            </Button>
                        </Flex>
                    ))}

                </Flex>
            </FormControl>
            <Heading size={'md'}>What Would You Like to Do ?</Heading>
            <RadioGroup name={'action'} onChange={handleChange} value={values.action}  >
                <Flex gap={5} direction={'column'}>

                    <Flex gap={2} >
                        <Radio size='md' onChange={handleChange} colorScheme='orange' value='sell' onClick={() => setAction(value)} >
                        </Radio>
                        <Box>Sell {crypto} </Box>
                        <Box display={'flex'} alignItems={'center'} color={'gray'} fontSize={'12px'}> * Your offer will be listed on the Sell {crypto} page</Box>

                    </Flex>
                    <Flex gap={2} >
                        <Radio size='md' onChange={handleChange} colorScheme='orange' value='buy' onClick={() => setAction(value)} >
                        </Radio>
                        <Box>Buy {crypto} </Box>
                        <Box display={'flex'} alignItems={'center'} color={'gray'} fontSize={'12px'}> * Your offer will be listed on the Buy {crypto} page</Box>

                    </Flex>
                </Flex>

            </RadioGroup>


            <Heading size={'md'}>Payment Method</Heading>



            <Flex direction={''} gap={5} flexWrap={{ base: 'wrap', md: 'nowrap' }}  >
                <FormControl isRequired isInvalid={errors.paymentMethod && touched.paymentMethod} >

                    <Flex w={'100%'} direction={'column'} gap={0} >
                        <Flex w={'100%'} direction={'column'} gap={5}>

                            <Heading size={'sm'}>PAYMENT METHOD</Heading>
                            <MyPaymentModal formikHelpers={formikHelpers} name='paymentMethod' setBankShow={setBankShow} setDisable={setDisable} />
                        </Flex>
                        <FormErrorMessage>{errors.paymentMethod}</FormErrorMessage>


                    </Flex>
                </FormControl>

                {isShow &&

                    <Flex w={'100%'} direction={'column'} gap={5}>
                        <Heading size={'sm'}>Prefer Currency</Heading>

                        <Flex border={'1px solid #dcdcdc'} borderRadius={5} >

                            <FormControl>
                                <CurrencyDropdown width={'100%'} formikHelpers={formikHelpers} name='preferCurrency' />
                            </FormControl>
                        </Flex>
                    </Flex>
                }

            </Flex>
            <Flex w={'full'} direction={'column'} gap={1}>
                {
                    isbankShow &&

                    <>

                        <Menu matchWidth  >
                            <MenuButton as={Button} w="full" variant={'outline'}   >
                                <Flex w="full" justify="space-between" align="center">
                                    <Text fontSize={{ base: '12px', sm: '16px' }}>{bankDetail}</Text>
                                    <Icon as={FaArrowAltCircleRight} />
                                </Flex>
                            </MenuButton>
                            <MenuList minW="unset" w="full" p={2}>
                                {/* Add Account Button */}
                                <Button colorScheme="orange" w="150px" mb={2}>
                                    + Add Account
                                </Button>

                                <Divider />

                                {/* List of Bank Accounts */}
                                {
                                    upibankDetails?.payment_details.length > 0 ?
                                        upibankDetails?.payment_details.map((account, index) => (
                                            <MenuItem key={index} p={3} display="flex" flexDirection="column" alignItems="start"
                                                onClick={() => {

                                                    setBankDetail(`${account.account_holder_name} - ${account.bank_name} - ${account.account_number}`);
                                                    setFieldValue('paymentMethodId', account.pd_id);
                                                    EnableNextStep();
                                                }
                                                }
                                            >
                                                <Text fontWeight="bold">{account.account_holder_name}</Text>
                                                <Text fontSize="sm" color="gray.500">{account.bank_name} - {account.account_number}</Text>
                                            </MenuItem>
                                        ))
                                        :
                                        upibankDetails?.upi_details.map((account, index) => (
                                            <MenuItem key={index} p={3} display="flex" flexDirection="column" alignItems="start"
                                                onClick={() => {

                                                    setBankDetail(`${account.account_holder_name} - ${account.bank_name} - ${account.account_number}`);
                                                    setFieldValue('paymentMethodId', account.pd_id);
                                                    EnableNextStep();
                                                }
                                                }
                                            >
                                                <Text fontWeight="bold">{account.account_holder_name}</Text>
                                                <Text fontSize="sm" color="gray.500">{account.bank_name} - {account.account_number}</Text>
                                            </MenuItem>
                                        ))

                                }
                            </MenuList>
                        </Menu>
                        <Flex p={1} color={'#757576'}>Once the trade begins, we’ll automatically share your account holder name and bank’s
                            details with your trade partner (your bank account number will NOT be shared).
                            If you’ve selected several accounts, your trade partner will choose which one to transfer to
                        </Flex>
                    </>

                }

            </Flex>

        </Flex>
    )
}


const bankAccounts = [
    { pd_id: 1, name: "Mukesh rai", bank: "Bank of India", accountNumber: "****1234" },
    { pd_id: 2, name: "Atul Dubey", bank: "kotak mahindra", accountNumber: "****5678" },
    { pd_id: 3, name: "Animesh Pandey", bank: "HDFC", accountNumber: "****9101" }
];

const cryptoOption = [
    { name: 'Bitcoin', logo: '/imagelogo/bitcoin-btc-logo.png' },
    { name: 'Ethereum', logo: '/imagelogo/ethereum-eth-logo.png' },
    { name: 'Binance', logo: '/imagelogo/bnb-bnb-logo.png' },
    { name: 'Tether', logo: '/imagelogo/tether-usdt-logo.png' },
];
export default CreateOffers