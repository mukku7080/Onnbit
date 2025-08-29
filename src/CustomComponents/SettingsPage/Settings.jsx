import {
    Box, Button, Card, Collapse, Divider, Flex, Grid, GridItem, Heading, IconButton, useDisclosure,
    Image, Link, useColorModeValue,
    RadioGroup,
    Radio,
    Stack,
    Text,
    InputGroup,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    Avatar,
    InputRightAddon
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { FaArrowTrendUp, FaUser } from "react-icons/fa6";
import { HiMiniArrowPath } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { MdOutlineFileDownload, MdKeyboardArrowRight, MdKeyboardArrowDown, MdDomainVerification, MdModeEdit, MdUpload } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { PiChecks } from "react-icons/pi";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineBank, AiOutlineSecurityScan } from 'react-icons/ai';
import { CiCircleQuestion } from 'react-icons/ci';
import NumberDropdown from '../Dropdown/NumberDropdown';
import PhoneInputWithCountry from '../Dropdown/NumberDropdown';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import SearchableMultiSelect from '../Dropdown/SearchableMultiSelect';
import LanguageSelectorDropdown from '../Dropdown/LanguageSelectorDropdown';



const Settings = () => {
    const navigate = useNavigate();


    const bgcolor = useColorModeValue('gray.100', 'gray.700');
    const [istoogle, setToogle] = useState(false);
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();
    const [visibility, setVisibility] = useState("firstName");
    const [isLoading, setIsLoading] = useState(false)
    // const { user, error } = useUser();
    return (
        <Flex maxW={'container.xxl'} bg={''} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={10} my={10} marginTop={'54px'}>


            <Flex
                // minW={'80%'}
                maxW={{ base: "90%", lg: '90%', xl: "90%" }}
                minW={{ base: "90%", sm: '90%', lg: '90%', xl: "90%" }}
                bg={''}
                direction={'column'}
                gap={5}
                mx={5}
                mt={{ base: 20, lg: 10 }}
            >



                <Flex gap={5} direction={'column'}>
                    {/*content Heading and toggle layer */}
                    <Flex flex={1} direction={'column'} gap={5}
                        display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                    >
                        <Card h={{ md: '50px', lg: '50px', xl: '120px' }} w={'full'} borderRadius={5} bg={'transparent'} boxShadow={'none'} direction={'row'} justifyContent={'start'} >

                            <Flex justify={'flex-end'} alignItems={'center'} flex={{ base: 1, md: 'auto' }} gap={5} >


                                <IconButton

                                    onClick={onToggle}
                                    color={'black'}
                                    fontFamily={'heading'}
                                    fontSize={'4xl'}
                                    icon={isOpen1 ? <IoCloseOutline /> : <IoMenuOutline />}
                                    variant={'ghost'}
                                    aria-label={'Toggle Navigation'}

                                />

                            </Flex>
                        </Card>
                        {/* <Collapse in={isOpen} animateOpacity transition={{ exit: { delay: 0 }, enter: { duration: 0.5 } }}>
                            <Mobilecollapse1 />
                        </Collapse> */}

                        <Collapse in={isOpen} animateOpacity transition={{ exit: { delay: 0 }, enter: { duration: 0.5 } }}>
                            <Mobilecollapse2 onClose={onToggle} />
                        </Collapse>
                    </Flex>
                    {/* content Heading and toggle layer */}


                    <Flex gap={5}>

                        <Flex flex={.4} display={{ base: 'none', lg: 'flex' }} direction={'column'} gap={5}
                        //  display={{ base: 'none', md: 'flex' }}
                        >

                            {/* Left nav Start Here */}
                            <Card borderRadius={5} display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex' }} justifyContent={'center'} boxShadow={'lg'} >

                                <Flex justifyContent={'center'} alignItems={'center'} direction={'column'}  >
                                    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} minW={'100%'} maxH={'80%'}  >


                                        {
                                            userOption.map((data, index) => (


                                                <React.Fragment key={index}>

                                                    <Button as={Button}
                                                        isLoading={isLoading}
                                                        width={'100%'}
                                                        bg={'transparent'}
                                                        // borderBottom={'1px solid #dcdcdc'}
                                                        borderRadius={'none'}
                                                        key={index} py={8}




                                                        justifyContent="flex-start"
                                                        _hover={{
                                                            bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                                            // borderRight: '1px solid black'
                                                        }}
                                                        onClick={() => {
                                                            // setIsLoading(true);
                                                            // setLoadingIndex(index);
                                                            navigate(`${data.to}`);
                                                            // setTimeout(() => {
                                                            //     // setIsLoading(false);
                                                            //     setLoadingIndex(null);
                                                            // }, 300)

                                                        }}

                                                    >
                                                        <Flex align="center" gap={2}>
                                                            {data.icon}
                                                            <span>{data.btn_name}</span>
                                                        </Flex>
                                                    </Button>
                                                    <Divider></Divider>
                                                </React.Fragment>



                                            ))
                                        }



                                    </Flex>


                                </Flex>


                            </Card>
                        </Flex>

                        <Flex flex={1.6} gap={5} direction={'column'} w={'100%'} >

                            <Card h={'auto'} borderRadius={5} direction={'column'} boxShadow={'lg'} w={{ base: '100%', md: '100%' }} p={4}>

                                <Outlet />

                            </Card>

                        </Flex>
                    </Flex>
                </Flex>


            </Flex>


        </Flex>
    )
}



const Mobilecollapse1 = () => {

    return (

        <>
            <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={1} width={'full'} transition="all 0.5s ease-in-out"   >

                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} h={'100px'} direction={'column'} justifyContent={'center'} alignItems={''} boxShadow={'lg'} borderRadius={0} >




                        <Flex gap={10} mx={5}>
                            <Box>
                                <Image src='/imagelogo/Master.png' h={'50px'} w={'50px'} />
                            </Box>
                            <Flex direction={'column'}>
                                <Box>

                                    Account Level : 1

                                </Box>
                                <Box>
                                    Account Limit: 87022.8

                                </Box>
                            </Flex>
                        </Flex>


                    </Card>
                </GridItem>
                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} h={'100px'} borderRadius={0} direction={'column'} justifyContent={'center'} alignItems={''} boxShadow={'lg'}>

                        <Flex gap={10} mx={5}>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Image src='/imagelogo/phoneverify.png' h={'50px'} w={'50px'} />
                            </Box>
                            <Flex direction={'column'}>
                                <Box color={'red'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>

                                    Phone Number Not Verified
                                </Box>
                                <Box sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>
                                    Take a minute to verify your number
                                </Box>
                                <Link color={'orange'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>verify</Link>
                            </Flex>
                        </Flex>
                    </Card>
                </GridItem>
                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} h={'100px'} borderRadius={0} direction={'column'} justifyContent={'center'} alignItems={''} boxShadow={'lg'}>

                        <Flex gap={10} mx={5}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Image src='/imagelogo/eaglesecure.png' h={'50px'} w={'50px'} />
                            </Box>
                            <Flex direction={'column'}>
                                <Box color={'red'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>

                                    2FA Not Enabled
                                </Box>
                                <Box maxW={'300px'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>
                                    Enabling two-factor authentication is great way to secure your account.
                                </Box>
                                <Link color={'orange'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>Setup 2FA Now</Link>
                            </Flex>
                        </Flex>
                    </Card>
                </GridItem>
            </Grid>
        </>
    )



}
const Mobilecollapse2 = ({ onClose }) => {
    const navigate = useNavigate();


    return (

        <>

            <Card borderRadius={0} display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} justifyContent={'center'} width={'full'}>

                <Flex justifyContent={'start'} alignItems={'center'} >
                    <Flex direction={'column'} width={'100%'} >


                        {
                            userOption.map((data, index) => (



                                <React.Fragment key={index}>

                                    <Button
                                        width={'100%'}
                                        borderRadius={'none'}
                                        border={'0px'} bg={'transparent'}
                                        py={8}
                                        key={index}
                                        justifyContent="flex-start"
                                        _hover={{
                                            bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                        }}
                                        onClick={() => {

                                            navigate(`${data.to}`);
                                            onClose();
                                        }

                                        }

                                    >
                                        <Flex align="center" gap={2}>
                                            {data.icon}
                                            <span>{data.btn_name}</span>
                                        </Flex>
                                    </Button>
                                    <Divider />
                                </React.Fragment>



                            ))
                        }


                    </Flex>


                </Flex>


            </Card>
        </>
    )



}






const userOption = [
    {
        icon: <FaUser />,
        btn_name: "Profile",
        to: 'profileSetting'
    },
    {
        icon: <AiOutlineSecurityScan />,
        btn_name: "Security",
        to: 'security'

    },
    {
        icon: <AiOutlineBank />,
        btn_name: "Payment Methods",
        to: 'paymentMethod'

    },
    {
        icon: <MdDomainVerification />,
        btn_name: "Verification",
        to: 'verification'

    },
    {
        icon: <CiCircleQuestion />,
        btn_name: "Security Questions",
        to: 'securityQuestions'

    },

]

const userOption1 = [
    {
        icon: <FaArrowTrendUp />,
        btn_name: "Account Setting"
    },
    {
        icon: <HiMiniArrowPath />,
        btn_name: "Criptico Community "
    },
    {
        icon: <IoBagOutline />,
        btn_name: " Developer"
    }


]

export default Settings