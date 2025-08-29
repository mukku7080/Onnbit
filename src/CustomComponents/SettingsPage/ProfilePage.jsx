import React, { useEffect, useRef, useState } from 'react'
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
    InputRightAddon,
    Spinner,
    useToast,
    Alert,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react'
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
import { useUser } from '../../Context/userContext';
import { gradientButtonStyle } from '../Wallet/CreateWallet';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [istoogle, setToogle] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();
    const [visibility, setVisibility] = useState("firstName");
    const [isLoading, setIsLoading] = useState(false);
    const [usernameLoading, setUsernameLoading] = useState(false);
    const { user, setUser, handleChangeProfilePic, handleUserNameChange, error } = useUser()
    const [image, setImage] = useState(null);
    const [username, setUserName] = useState('');
    const fileInputRef = useRef(null);
    const [usernameResponse, setUsernameResponse] = useState(null);
    const toast = useToast
    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imagePreviewUrl = URL.createObjectURL(file);
        setImageUrl(imagePreviewUrl); // Set preview image
        try {
            setIsLoading(true);
            const res = await handleChangeProfilePic(file);
            if (res?.profile_image_url) {
                const updatedUrl = `${res.profile_image_url}?timestamp=${new Date().getTime()}`;
                setUser((prevUser) => ({ ...prevUser, profile_image_url: updatedUrl })); // Update state
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleUsername = async () => {
        try {
            setUsernameLoading(true);
            const res = await handleUserNameChange(username);
            console.log(res);
            if (res?.status === true) {
                setUser((prevUser) => ({ ...prevUser, username: res.username })); // Update state
                setUsernameResponse(
                    <Alert status="success" variant="left-accent">
                        <AlertIcon />
                        <AlertTitle>Username updated successfully</AlertTitle>
                    </Alert>
                );
                setTimeout(() => setUsernameResponse(null), 3000);
            }
        }
        catch (error) {
            setUsernameResponse(
                <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    <AlertTitle>{error?.errors?.username?.[0]}</AlertTitle>
                </Alert>
            );
            setTimeout(() => setUsernameResponse(null), 3000);
        }
        finally {
            setUsernameLoading(false);
        }
    }
    return (
        <Flex gap={5} direction={'column'} my={5}>
            <Flex gap={10} direction={{ base: 'column-reverse', md: 'row', lg: 'row' }} >
                <Flex flex={1} >
                    <Flex direction={'column'} gap={5} w={{ base: '100%', md: '100%', lg: '100%' }}>

                        <Flex alignItems={'center'} gap={2}>

                            <Heading>
                                Account settings

                                <Box color={'green.400'} fontSize={'16px'} > &nbsp;ID verified</Box>
                            </Heading>
                        </Flex>
                        <Flex gap={{ base: 0, sm: 2 }} alignItems={'center'} flexWrap={'wrap'}>
                            <Box>{user && user.email}</Box>
                            <Button size={'sm'} px={0} bg={'transparent'} textDecoration={'underline'}>change email</Button>
                        </Flex>
                        <Flex>
                            <Box p={4} borderWidth={1} borderRadius="lg" w={'full'}>
                                <Text fontSize="lg" fontWeight="bold" mb={3}>
                                    How would you like others to see your name during trades?
                                </Text>
                                <RadioGroup onChange={setVisibility} value={visibility}>
                                    <Stack spacing={3}>
                                        <Radio value="firstName">First name and initial</Radio>
                                        <Radio value="fullName">Full name</Radio>
                                        <Radio value="hide">Hide full name</Radio>
                                    </Stack>
                                </RadioGroup>
                            </Box>
                        </Flex>

                        <NumberDropdown />

                    </Flex>





                </Flex>


                {/* User_Image & name Section --------------------------------------------------------------------------------------- */}

                <Flex flex={1}>

                    <Flex alignItems={'start'} justifyContent={'start'} gap={5} w={'full'} direction={{ base: 'column', xl: 'column' }} >
                        <Flex gap={3} flex={.5} alignItems={'start'} direction={{ base: 'column', sm: 'column', md: 'column', xl: 'row' }} w={{ base: '100%', md: '100%', lg: '100%' }}>

                            {user ? (
                                <Avatar key={user.profile_image_url} border={'1px solid white'} boxSize={'150px'} src={user && user.profile_image_url} />
                            ) : (
                                <Spinner size="xl" color="black" />
                            )}

                            {/* <Avatar size={{ base: 'lg', sm: 'xl' }} alignSelf={'start'} src={user && user.profile_image_url} /> */}
                            <Flex direction={'column'} gap={3} alignItems={'start'} justifyContent={'start'} w={'100%'} mt={5}>

                                <Button isLoading={isLoading} w={'200px'} sx={gradientButtonStyle} loadingText='uploading..' onClick={handleClick} variant={'outline'} rightIcon={<MdUpload />}>
                                    Upload Image
                                </Button>
                                <Box fontSize={'14px'} >
                                    Upload a nice picture, preferably of yourself. If you upload any explicit or otherwise inappropriate image, we’ll remove it immediately.
                                </Box>
                                <Flex direction={'column'} gap={2} w={'full'}>
                                    <Heading size={'md'} color={'orange'}>{user && user.username}</Heading>
                                    <Flex justifyContent={'space-between'} alignItems={'center'} border={'1px solid #dcdcdc'} borderRadius={5} >
                                        <InputGroup   >

                                            <Input placeholder='Change username'
                                                isDisabled={user?.username_changed}
                                                border={'none'}
                                                _hover={{ border: "none" }}
                                                _focus={{ boxShadow: "none", border: "none" }}
                                                w={'full'}
                                                onChange={(e) => {
                                                    setUserName(e.target.value)
                                                }}

                                            ></Input>

                                            <InputRightAddon border={'none'} px={0} borderRightRadius={4} bg={'transparent'}>
                                                <Button mr={1} isLoading={usernameLoading} loadingText='saving...' spinner={null} size={'sm'} isDisabled={user?.username_changed} sx={gradientButtonStyle} bg={'transparent'} w={'full'} _hover={{ bg: 'transparent' }} onClick={handleUsername}>save</Button>
                                            </InputRightAddon>

                                        </InputGroup>
                                    </Flex>
                                    {usernameResponse}
                                    <Box p={2} bg={useColorModeValue('orange.100', 'gray.500')} borderRadius={5} fontSize={'14px'} fontWeight={'bold'}> you can change your username only once</Box>
                                </Flex>
                                <Input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Flex>
                        </Flex>



                    </Flex>
                </Flex>
                {/* User_Image & name Section end--------------------------------------------------------------------------------- */}

            </Flex>



            <Divider />


            <Flex w={{ base: '100%', md: '100%', lg: '100%' }} gap={{ base: 5, md: 10 }} direction={{ base: 'column', md: 'row' }} >
                <Flex direction={'column'} gap={5} flex={1}>
                    <Heading size={'sm'}>Prefered Currency</Heading>

                    <Flex justifyContent={'space-between'} alignItems={'center'} border={'1px solid #dcdcdc'} borderRadius={5} width={'full'} >
                        <InputGroup>

                            <Input placeholder='Enter Amount'
                                border={'none'}
                                _hover={{ border: "none" }}
                                _focus={{ boxShadow: "none", border: "none" }}

                            ></Input>
                            {
                                false &&
                                <InputRightElement>
                                    <Button><MdKeyboardArrowDown /></Button>
                                </InputRightElement>
                            }
                        </InputGroup>
                        <CurrencyDropdown />
                    </Flex>
                </Flex>
                <Flex flex={1}>
                    <LanguageSelectorDropdown />
                </Flex>
            </Flex>
            <Flex w={{ base: '100%', md: '100%', lg: '100%' }}>
                <FormControl gap={4}>
                    <FormLabel mb={3}>
                        <Heading size={'sm'}>Bio</Heading>
                    </FormLabel>
                    <Textarea h={'150px'} placeholder='Your bio appear publicaly on your profile ' />

                    <Box fontSize={'14px'}>Maximum 3 lines and 180 characters</Box>
                </FormControl>
            </Flex>
        </Flex>
    )
}




// const ProfileAvatar = ({ user }) => {
//     useEffect(()=>{

//     },[])
//     return (
//         <>
//             {user ? (
//                 <Avatar border={'1px solid white'} size="xl" src={user && user.profile_image_url} />
//             ) : (
//                 <Spinner size="xl" color="black" />
//             )}
//         </>
//     )
// }

export default ProfilePage
