import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Heading, Image, Input, InputGroup, InputRightAddon, Tooltip, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaCopy, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { useOtherDetail } from '../../../Context/otherContext'

const InviteFriend = () => {
    const { handleReferralLink } = useOtherDetail();
    const [text, setText] = React.useState('')
    const [copied, setCopied] = React.useState(false)
    const bgcolor = useColorModeValue('white', 'gray.700');
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const referalCode = async () => {
            setLoading(true);
            const response = await handleReferralLink();
            setText(response.referralLink);

        }
        referalCode();
        setTimeout(() => {
            setLoading(false);
        }, 2000);

    }, [])


    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {

            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000)
        }).catch((err) => {
            console.log(err);

        }
        )
    }


    return (
        <>
            <Flex w={'full'} className='main' direction={'column'} bg={bgcolor} borderRadius={5} boxShadow={'md'}

            // bgImage={'https://www.shutterstock.com/image-illustration/yellow-qr-code-sample-smartphone-260nw-2234243287.jpg'}
            // bgSize={'cover'}
            // bgPosition={'center'}
            // bgRepeat={'no-repeat'}
            // position="relative"
            // _before={{

            //     content: '""',
            //     position: "absolute",
            //     inset: 0,
            //     backdropFilter: "blur(10px)", // Adjust blur strength
            //     zIndex: -1,
            // }}

            >
                <Flex direction={'column'}
                    gap={5} p={5}
                // bg="rgba(255, 255, 255, 0.2)"
                // backdropFilter={{ base: "blur(10px)", md: 'none' }}
                >

                    <Heading >Invite friends to join <Box as='span' color={'orange.300'}>Cryptico</Box></Heading>



                    <Flex className='subContainer' gap={5} w={'full'} direction={{ base: 'column', md: 'row' }} >


                        <Flex className='sub1' flex={1} border={'1px solid #dcdcdc'} direction={'column'} borderRadius={5}>
                            <Flex borderBottom={'1px solid #dcdcdc'}>

                                <Flex p={5} w={'full'}>
                                    <Heading size={'md'} fontWeight={800}>Referral link</Heading>
                                </Flex>
                            </Flex>
                            <Flex p={5} w={'full'} direction={'column'} gap={5}>
                                <FormControl>
                                    <FormLabel> Your referral link</FormLabel>
                                    <InputGroup>
                                        <Input type={'text'} value={text} onChange={(e) => setText(e.target.value)} placeholder={loading ? 'loading....' : text} />

                                        <InputRightAddon gap={2} bg={'transparent'} p={1}>
                                            <Tooltip isOpen={copied} label='Copied!' bg='black' color='white' placement='top' hasArrow={true}>


                                                <Button size={'sm'} w={'full'} onClick={handleCopy}> <FaCopy /></Button>

                                            </Tooltip>
                                        </InputRightAddon>
                                    </InputGroup>

                                </FormControl>
                                <Box>
                                    Anyone who uses this link will become your referral on Cryptico

                                </Box>
                                <Box>
                                    Share your link on social media
                                </Box>
                                <ButtonGroup>
                                    <Button><FaFacebook /></Button>
                                    <Button><FaTwitter /></Button>
                                    <Button><FaWhatsapp /></Button>
                                    <Button><FaInstagram /></Button>
                                </ButtonGroup>
                            </Flex>
                        </Flex>
                        <Flex className='sub2' flex={1} border={'1px solid #dcdcdc'} borderRadius={5} direction={'column'} >
                            <Flex borderBottom={'1px solid #dcdcdc'}>

                                <Flex w={'full'} p={5} >
                                    <Heading size={'md'} fontWeight={800}> Referral QR code</Heading>
                                </Flex>
                            </Flex>
                            <Flex p={5} gap={10}>

                                <Image boxSize={200} src='/imagelogo/Qr.png'></Image>
                                <Box textAlign={'end'}>Anyone who scans this QR code will become your referral on Cryptico</Box>
                            </Flex>


                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}


export default InviteFriend