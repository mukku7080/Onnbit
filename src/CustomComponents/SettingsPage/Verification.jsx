import {
    Box, Checkbox, Flex, FormControl, FormLabel, Heading, Input, FormErrorMessage,
    Button,
    VStack,
    Select,
    Tag,
    InputGroup,
    InputRightAddon,
    HStack, PinInput, PinInputField,
    useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdArrowRightAlt, MdMarkEmailRead, MdMobileFriendly, MdOutlineLocationOff } from 'react-icons/md'
import CurrencyDropdown from '../Dropdown/CurrencyDropdown'
import NumberDropdownNew from '../Dropdown/NumberDropdownNew'
import { FaIdCard } from 'react-icons/fa'
import { useFormik } from "formik";
import * as Yup from "yup";
import OfferLocation from '../Dropdown/OfferLocation'
import CountryCodeDropdown from '../Dropdown/CountryCodeDropdown'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase.config';
import VerificationProvider, { useVerification } from '../../Context/VerificationContext'
import { useUser } from '../../Context/userContext'
// import { gradientButtonStyle } from '../Wallet/CreateWallet';

const validationSchema = Yup.object({
    documenttype: Yup.string().required("Please select a document type"),
    issuingCountry: Yup.string().required("required"),
    residenceCountry: Yup.string().required("required"),
    region: Yup.string().required("Region/State is required"),
    city: Yup.string().required("City is required"),
    address1: Yup.string().required("Address Line 1 is required"),
    address2: Yup.string(),
    zip: Yup.string()
        .matches(/^\d{6}$/, "Zip code must be 6 digits")
        .required("Zip code is required"),
    frontImage: Yup.mixed().required("Front image is required"),
    backImage: Yup.mixed().required("Back image is required"),
});

const Verification = () => {
    return (
        <>
            <Flex direction={'column'} gap={10}>
                <Heading size={'lg'}>Verification</Heading>
                <PhoneVerification />

                <EmailVerification />
                <IdVerification />
                <AddressVerification />

            </Flex>

        </>)
}

const PhoneVerification = () => {
    const [isShow, setShow] = useState(false);
    const [phone, setPhone] = useState();
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [fullPhone, setFullPhone] = useState(null);
    const [isotpsend, setIsOtpSend] = useState(false);


    const sendOtp = async () => {
        console.log('Sending OTP to:', fullPhone);
        try {

            const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
                size: 'invisible',
                callback: (response) => {
                    console.log('reCAPTCHA verified!');
                },
                'expired-callback': () => {
                    console.log('reCAPTCHA expired. Please solve again.');
                }
            })

            const confirmation = await signInWithPhoneNumber(auth, fullPhone, recaptchaVerifier);
            console.log(confirmation);
            setUser(confirmation);
        } catch (error) {
            console.log('Error sending OTP:', error);
        }
    };

    const verifyOtp = async () => {
        console.log('Verifying OTP:', otp);
        try {
            const confirmationResult = user;
            const data = await confirmationResult.confirm(otp);
            console.log('OTP verified:', data);
        } catch (error) {
            console.log('OTP verification failed:', error);
        }
    };
    useEffect(() => {
        setFullPhone(`${countryCode?.trim()}${phone?.trim()}`);

    }, [countryCode, phone])
    useEffect(() => {
        if (otp?.length === 6) {
            verifyOtp();
        }
    }, [otp]);
    return (
        <>
            <Flex direction={'column'} border={'1px solid #dcdcdc'} borderRadius={5}>

                <Flex className='main1' p={4} color={'red.500'}>
                    <Flex gap={2} cursor={'pointer'} onClick={() => setShow(!isShow)}>
                        <MdMobileFriendly size={50} opacity={0.2} />
                        <Flex direction={'column'} gap={1}>
                            <Heading size={'md'}>Phone Verification</Heading>
                            <Heading size={'xs'} color={'gray'}>Not Verified</Heading>
                        </Flex>
                    </Flex>

                </Flex>
                {
                    isShow &&
                    <Flex p={4} direction={'column'} gap={5} borderTop={'1px solid #dcdcdc'}>
                        <Flex direction={'column'} gap={2} w={{ base: '100%', md: '50%' }}>
                            {
                                isotpsend ?


                                    <FormControl isRequired >
                                        <FormLabel>OTP</FormLabel>

                                        {/* <Flex direction={'column'} gap={2}> */}

                                        <HStack>
                                            <PinInput

                                                value={otp}
                                                onChange={setOtp} // Update state when user types
                                            // onComplete={verifyOtp}
                                            >
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                            </PinInput>
                                        </HStack>
                                        {/* </Flex> */}
                                    </FormControl>
                                    :
                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                        <Flex border={'1px solid #dcdcdc'} p={2} gap={2} borderRadius={5} flexWrap={'nowrap'}>
                                            <Box>
                                                <CountryCodeDropdown setCountryCode={setCountryCode} />
                                            </Box>

                                            <Input size={'sm'} borderLeftRadius={0} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter your Number'></Input>

                                        </Flex>
                                    </FormControl>
                            }


                            {
                                isotpsend ? ""
                                    :
                                    <FormControl>
                                        <Flex>
                                            <Button colorScheme='gray' onClick={() => {
                                                sendOtp();
                                                setIsOtpSend(true);
                                            }}
                                                variant={'outline'}
                                                size={'sm'}
                                                alignSelf={'end'}
                                            >
                                                Send OTP
                                            </Button>
                                        </Flex>

                                    </FormControl>
                            }
                        </Flex>
                        <Box alignSelf={'center'} id="recaptcha" style={{ display: 'block' }}></Box>

                    </Flex>

                }
            </Flex>
        </>
    )
}


const EmailVerification = () => {
    const { handleGetAddressVerificationDetail } = useVerification();
    const { user } = useUser();



    return (
        <>
            <Flex direction={'column'} gap={10}>
                <Flex direction={'column'} border={'1px solid #dcdcdc'} borderRadius={5}>

                    <Flex className='main1' p={4}>
                        <Flex gap={2} color={'green.500'}>
                            <MdMarkEmailRead size={50} opacity={0.2} />
                            <Flex direction={'column'} gap={1}>
                                <Heading size={'md'}>Email Verification</Heading>
                                <Heading size={'xs'} color={'green.400'}>Verified</Heading>
                            </Flex>
                        </Flex>

                    </Flex>



                </Flex>

            </Flex>

        </>
    )
}
const IdVerification = () => {
    const { user } = useUser();
    const { handleGetIdVerificationDetail, idVerificationdetail } = useVerification();
    const [show, setShow] = useState(false);
    const getVerificationDetail = async () => {
        const response = await handleGetIdVerificationDetail()
        if (
            Object.keys(response?.id_data || {}).length === 0 ||
            response?.id_data?.status === 'reject' // status is 'reject'
        ) {
            setShow(true);
        }
    }
    useEffect(() => {
        handleGetIdVerificationDetail();
    }, [])


    return (
        <>
            <Flex direction={'column'} gap={10}>
                <Flex direction={'column'} border={'1px solid #dcdcdc'} borderRadius={5}>

                    <Flex className='main1' p={4}>
                        <Flex cursor={'pointer'} onClick={getVerificationDetail} gap={2}
                            color={
                                idVerificationdetail?.id_verification_status === 'verified'
                                    ? 'green.500'
                                    : idVerificationdetail?.id_verification_status === 'pending'
                                        ? 'orange.400'
                                        : 'red.500'
                            }
                        >
                            <FaIdCard size={50} opacity={0.2} />
                            <Flex direction={'column'} gap={1}>
                                <Heading size={'md'}>ID Verification</Heading>
                                <Heading size={'xs'}
                                    color={
                                        idVerificationdetail?.id_verification_status === 'verified'
                                            ? 'green.400'
                                            : idVerificationdetail?.id_verification_status === 'pending'
                                                ? 'orange.400'
                                                : 'red.500'
                                    }
                                >
                                    {idVerificationdetail?.id_verification_status === 'verified'
                                        ? 'verified'
                                        : idVerificationdetail?.id_verification_status === 'pending'
                                            ? 'Pending'
                                            : 'Not Verified'}
                                </Heading>
                            </Flex>
                        </Flex>

                    </Flex>

                    {
                        !user?.id_verified &&
                        show &&
                        <Flex p={4} borderTop={'1px solid #dcdcdc'} direction={'column'} gap={5} mt={0} >
                            <ResidenceForm setShow={setShow} />
                        </Flex>
                    }

                </Flex>


            </Flex>

        </>
    )
}
const AddressVerification = () => {
    const { user } = useUser();
    const [show, setShow] = useState(false);
    const { handleGetAddressVerificationDetail, addressVerificationdetail } = useVerification();
    const getAddressVerificationDetail = async () => {
        const response = await handleGetAddressVerificationDetail()
        console.log(response);
        if (
            Object.keys(response?.address_data || {}).length === 0 ||
            response?.address_data?.status === 'reject' // status is 'reject'
        ) {
            setShow(true);
        }
    }
    useEffect(() => {
        getAddressVerificationDetail();
    }, []);
    return (
        <>
            <Flex direction={'column'} gap={10}>
                <Flex direction={'column'} border={'1px solid #dcdcdc'} borderRadius={5}>

                    <Flex className='main1' p={4} cursor={'pointer'} onClick={getAddressVerificationDetail} gap={2}
                        color={
                            addressVerificationdetail?.address_verification_status === 'verified'
                                ? 'green.500'
                                : addressVerificationdetail?.address_verification_status === 'pending'
                                    ? 'orange.400'
                                    : 'red.500'
                        }
                    >
                        <Flex gap={2}>
                            <MdOutlineLocationOff size={50} opacity={0.2} />
                            <Flex direction={'column'} gap={1}>
                                <Heading size={'md'}>Address Verification</Heading>
                                <Heading size={'xs'} color={
                                    addressVerificationdetail?.address_verification_status === 'verified'
                                        ? 'green.500'
                                        : addressVerificationdetail?.address_verification_status === 'pending'
                                            ? 'orange.400'
                                            : 'red.500'
                                }>

                                    {addressVerificationdetail?.address_verification_status === 'verified'
                                        ? 'Verified'
                                        : addressVerificationdetail?.address_verification_status === 'pending'
                                            ? 'Pending'
                                            : 'Not Verified'}

                                </Heading>
                            </Flex>
                        </Flex>

                    </Flex>
                    {
                        !user?.id_verified &&
                        show &&
                        <Flex p={4} borderTop={'1px solid #dcdcdc'} direction={'column'} gap={5} mt={0} >
                            <AddressVerificatonForm setShow={setShow} />
                        </Flex>
                    }

                </Flex>

            </Flex>
        </>
    )
}








const ResidenceForm = ({ setShow }) => {
    const { handleIdVerification } = useVerification();
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            issuingCountry: "",
            residenceCountry: "",
            documenttype: "",
            region: "",
            city: "",
            address1: "",
            address2: "",
            zip: "",
            frontImage: null,
            backImage: null,

        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("issuing_country", values.issuingCountry);
            formData.append("id_type", values.documenttype);
            formData.append("residence_country", values.residenceCountry);
            formData.append("residence_state", values.region);
            formData.append("residence_city", values.city);
            formData.append("address_line1", values.address1);
            formData.append("address_line2", values.address2);
            formData.append("residence_zip", values.zip);
            formData.append("document_front_image", values.frontImage);
            formData.append("document_back_image", values.backImage);
            const response = await handleIdVerification(formData);
            if (response.status) {
                toast({
                    title: 'Id Verification Submitted',

                    description: `Your Id verification details have been successfully submitted. 
                    Our team is currently reviewing the information.
                     This process may take a little time. We’ll notify you once your Id is verified.`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                })
                setIsLoading(false);
                setShow(false);
            }

            console.log(response);

        },
    });
    const handleFileChange = (e, side) => {
        const file = e.target.files[0];
        if (!file) return;

        if (side === 'front') {
            formik.setFieldValue('frontImage', file);
        } else {
            formik.setFieldValue('backImage', file);
        }
    };

    return (
        <Box w={{ base: '100%', md: '100%' }} borderRadius="md" >
            <form onSubmit={formik.handleSubmit}>
                <Flex direction={'column'} gap={5}>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>

                            <FormControl >
                                <FormLabel>Issuing Country</FormLabel>
                                <OfferLocation formikHelpers={formik} name='issuingCountry' />
                            </FormControl>
                        </Flex>
                        <Flex flex={1}>
                            <FormControl>
                                <FormLabel>Residence Country</FormLabel>
                                <OfferLocation formikHelpers={formik} name='residenceCountry' />
                            </FormControl>

                        </Flex>
                    </Flex>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>
                            <FormControl isInvalid={formik.touched.region && formik.errors.region}>
                                <DocumentDropdown formik={formik} />
                                <FormErrorMessage>{formik.errors.region}</FormErrorMessage>
                            </FormControl>

                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Region/State */}
                            <FormControl isInvalid={formik.touched.region && formik.errors.region}>
                                <FormLabel>Residence Region/State</FormLabel>
                                <Input
                                    name="region"
                                    placeholder="Enter your region/state"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.region}
                                />
                                <FormErrorMessage>{formik.errors.region}</FormErrorMessage>
                            </FormControl>

                        </Flex>
                    </Flex>


                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>
                            {/* Residence City */}
                            <FormControl isInvalid={formik.touched.city && formik.errors.city}>
                                <FormLabel>Residence City</FormLabel>
                                <Input
                                    name="city"
                                    placeholder="Enter your city"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                />
                                <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Address Line 1 */}
                            <FormControl isInvalid={formik.touched.address1 && formik.errors.address1}>
                                <FormLabel>Residence Address Line 1</FormLabel>
                                <Input
                                    name="address1"
                                    placeholder="Enter address line 1"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address1}
                                />
                                <FormErrorMessage>{formik.errors.address1}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                    </Flex>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>

                            {/* Residence Address Line 2 (Optional) */}
                            <FormControl>
                                <FormLabel>Residence Address Line 2<Tag>optional</Tag></FormLabel>
                                <Input
                                    name="address2"
                                    placeholder="Enter address line 2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address2}
                                />
                            </FormControl>

                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Zip */}
                            <FormControl isInvalid={formik.touched.zip && formik.errors.zip}>
                                <FormLabel>Residence Zip</FormLabel>
                                <Input
                                    name="zip"
                                    placeholder="Enter zip code"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zip}
                                />
                                <FormErrorMessage>{formik.errors.zip}</FormErrorMessage>
                            </FormControl>

                        </Flex>
                    </Flex>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>
                            <FormControl>
                                <FormLabel>Front of Document:</FormLabel>
                                <Input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(e, 'front')} border={'none'} p={0} borderRadius={0} />
                            </FormControl>
                        </Flex>
                        <Flex flex={1}>
                            <FormControl>
                                <FormLabel>Back of Document:</FormLabel>
                                <Input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(e, 'back')} border={'none'} p={0} borderRadius={0} />
                            </FormControl>
                        </Flex>
                    </Flex>

                    {/* Submit Button */}
                    <Button colorScheme="orange" variant={'outline'} type="submit" width='200px' isDisabled={!formik.isValid} loadingText={'Submitting...'} isLoading={isLoading}>
                        Start Verification Process
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};
const AddressVerificatonForm = ({ setShow }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleAddressVerification } = useVerification();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            country: "",
            documenttype: "",
            state: "",
            city: "",
            address1: "",
            address2: "",
            zip: "",
            frontImage: null,
            backImage: null,

        },
        validationSchema: Yup.object({
            country: Yup.string().required("required"),
            documenttype: Yup.string().required("Please select a document type"),
            state: Yup.string().required("Region/State is required"),
            city: Yup.string().required("City is required"),
            address1: Yup.string().required("Address Line 1 is required"),
            address2: Yup.string(),
            zip: Yup.string()
                .matches(/^\d{6}$/, "Zip code must be 6 digits")
                .required("Zip code is required"),
            frontImage: Yup.mixed().required("Front image is required"),
            backImage: Yup.mixed().required("Back image is required"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("country", values.country);
            formData.append("doc", values.documenttype);
            formData.append("state", values.state);
            formData.append("city", values.city);
            formData.append("address1", values.address1);
            formData.append("address2", values.address2);
            formData.append("zip", values.zip);
            formData.append("front_document", values.frontImage);
            formData.append("back_document", values.backImage);
            const response = await handleAddressVerification(formData);
            if (response.status) {
                toast({
                    title: 'Address Verification Submitted',

                    description: `Your address verification details have been successfully submitted. 
                    Our team is currently reviewing the information.
                     This process may take a little time. We’ll notify you once your address is verified.`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                })
                setIsLoading(false);
                setShow(false);

            }
            else {
                setIsLoading(false);
                toast({
                    title: 'Error',
                    description: response?.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })

            }
        },
    });
    const handleFileChange = (e, side) => {
        const file = e.target.files[0];
        if (!file) return;

        if (side === 'front') {
            formik.setFieldValue('frontImage', file);
        } else {
            formik.setFieldValue('backImage', file);
        }
    };

    return (
        <Box w={{ base: '100%', md: '100%' }} borderRadius="md" >
            <form onSubmit={formik.handleSubmit}>
                <Flex direction={'column'} gap={5}>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>

                            <FormControl >
                                <FormLabel>Country</FormLabel>
                                <OfferLocation formikHelpers={formik} name='country' />
                            </FormControl>
                        </Flex>

                    </Flex>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>
                            <FormControl isInvalid={formik.touched.documenttype && formik.errors.documenttype}>
                                <AddressDocumentDropdown formik={formik} />
                                <FormErrorMessage>{formik.errors.documenttype}</FormErrorMessage>
                            </FormControl>

                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Region/State */}
                            <FormControl isInvalid={formik.touched.state && formik.errors.state}>
                                <FormLabel>Residence Region/State</FormLabel>
                                <Input
                                    name="state"
                                    placeholder="Enter your region/state"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.state}
                                />
                                <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
                            </FormControl>

                        </Flex>
                    </Flex>


                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>
                            {/* Residence City */}
                            <FormControl isInvalid={formik.touched.city && formik.errors.city}>
                                <FormLabel>Residence City</FormLabel>
                                <Input
                                    name="city"
                                    placeholder="Enter your city"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                />
                                <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Address Line 1 */}
                            <FormControl isInvalid={formik.touched.address1 && formik.errors.address1}>
                                <FormLabel>Residence Address Line 1</FormLabel>
                                <Input
                                    name="address1"
                                    placeholder="Enter address line 1"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address1}
                                />
                                <FormErrorMessage>{formik.errors.address1}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                    </Flex>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>

                            {/* Residence Address Line 2 (Optional) */}
                            <FormControl>
                                <FormLabel>Residence Address Line 2<Tag>optional</Tag></FormLabel>
                                <Input
                                    name="address2"
                                    placeholder="Enter address line 2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address2}
                                />
                            </FormControl>

                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Zip */}
                            <FormControl isInvalid={formik.touched.zip && formik.errors.zip}>
                                <FormLabel>Residence Zip</FormLabel>
                                <Input
                                    name="zip"
                                    placeholder="Enter zip code"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zip}
                                />
                                <FormErrorMessage>{formik.errors.zip}</FormErrorMessage>
                            </FormControl>

                        </Flex>

                    </Flex>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>
                            <FormControl>

                                <FormLabel>Front of Document:</FormLabel>
                                <Input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(e, 'front')} border={'none'} p={0} borderRadius={0} />
                            </FormControl>
                        </Flex>
                        <Flex flex={1}>
                            <FormControl>

                                <FormLabel>Back of Document:</FormLabel>
                                <Input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(e, 'back')} border={'none'} p={0} borderRadius={0} />
                            </FormControl>
                        </Flex>
                    </Flex>

                    {/* Submit Button */}
                    <Button colorScheme="orange" loadingText={'Submitting...'} variant={'outline'} type="submit" width='200px' isDisabled={!formik.isValid} isLoading={isLoading} >
                        Start Verification Process
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};

const DocumentDropdown = ({ formik }) => {
    const [documentType, setDocumentType] = useState("");

    return (
        <FormControl isInvalid={formik.touched.documenttype && formik.errors.documenttype}>
            <FormLabel>Select Document Type</FormLabel>
            <Select
                name="documenttype"
                value={formik.values.documenttype}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                <option value="">Select type</option>
                <option value="driving licence">Driving License</option>
                <option value="Passport">Passport</option>
                <option value="Id Card">ID Card</option>
            </Select>
            <FormErrorMessage>{formik.errors.documenttype}</FormErrorMessage>
        </FormControl>
    );
}

const AddressDocumentDropdown = ({ formik }) => {
    const [documentType, setDocumentType] = useState("");

    return (
        <FormControl isInvalid={formik.touched.documenttype && formik.errors.documenttype}>
            <FormLabel>Select Document Type</FormLabel>
            <Select
                name="documenttype"
                value={formik.values.documenttype}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                <option value="">Select type</option>
                <option value="bank statement">Bank Statement</option>
                <option value="credit card">Credit Card</option>
                <option value="electricity bill">Electricity Bill</option>
            </Select>
            <FormErrorMessage>{formik.errors.documenttype}</FormErrorMessage>
        </FormControl>
    );
}


export default Verification