import { Heading, Flex, FormControl, FormLabel, Select, Box, Input, Textarea, Checkbox, InputGroup, InputRightAddon, Tooltip, FormErrorMessage } from '@chakra-ui/react'
import React from 'react'
import SearchableMultiSelect from '../Dropdown/SearchableMultiSelect'
import { PiQuestionLight } from "react-icons/pi";
import { MdKeyboardArrowDown } from 'react-icons/md';

const OtherSettings = ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => {
    const [option, setOption] = React.useState('Select offers');
    values.offerTags = option;
    console.log(values);



    return (
        <Flex direction={'column'} gap={10}>
            <Heading size={'md'} fontWeight={700}>Trade Instruction</Heading>

            <form >
                <Flex gap={10} direction={'column'}>

                    <FormControl>
                        <FormLabel mb={3}>
                            <Heading size={'sm'}>Offer Tags</Heading>
                        </FormLabel>
                        <SearchableMultiSelect setOption={setOption} />

                        <Box fontSize={'14px'}>Select up to 3 tags that best describe your offer terms.</Box>
                    </FormControl>

                    <FormControl>
                        <FormLabel mb={3}>
                            <Heading size={'sm'}>Your Offer Label</Heading>
                        </FormLabel>
                        <Input placeholder='maximum 25 character, only letters,number and dashes.' name={'label'} onChange={handleChange} mb={3}>

                        </Input>
                        <Box fontSize={'14px'}>Make your offer stand out to other users with a catchy label. Your offer label can be up to 25 characters long and can contain letters, numbers, the apostrophe and the hyphen.</Box>
                    </FormControl>




                    <FormControl isRequired >
                        <FormLabel mb={3} fontWeight={700}>Offer Term
                            {/* <Heading size={'sm'}>Offer Term</Heading> */}
                        </FormLabel>
                        <Textarea h={'150px'} placeholder='write your term here' name={'term'} onChange={handleChange} />

                        <Box fontSize={'14px'}>Anybody who views your offer will see these terms. Keep them simple and clear to make your offer sound attractive.</Box>
                    </FormControl>





                    {/* <FormControl>
                        <FormLabel mb={3}>
                            <Heading size={'sm'}>Trade Instructions</Heading>
                        </FormLabel>
                        <Textarea h={'150px'} placeholder='List your instructions for trade partner.' />
                        <Box fontSize={'14px'}>To ensure a successful trade be transparent about what you expect from your trade partner and list out what you need.</Box>
                    </FormControl> */}


                    <FormControl>
                        <FormLabel mb={3}>
                            <Heading size={'md'} mb={3}> Verification</Heading>
                            <Flex>
                                <Checkbox name='isVerified' onChange={handleChange}>Require your trade partner to have verified their ID</Checkbox>
                            </Flex>
                        </FormLabel>
                    </FormControl>

                    <FormControl>
                        <FormLabel mb={3}>
                            <Heading size={'md'} mb={3}> Visibility</Heading>
                            <Flex>
                                <Checkbox name='visibility' onChange={(e) => setFieldValue('trusted_users')}>Show this offer only to my list of trusted users</Checkbox>
                            </Flex>
                        </FormLabel>
                    </FormControl>


                    <Flex justifyContent={'center'} alignItems={'start'} gap={5} direction={'column'} my={10}  >
                        <Flex gap={10} w={{ sm: '80%', md: '50%' }} direction={'column'}>
                            <Flex direction={'column'} flex={1} borderRadius={5} gap={5}>
                                <Flex gap={2}>

                                    <Heading size={'md'}>
                                        Minimum Trades Required

                                    </Heading>
                                    <Box mt={1} as='span'>
                                        <Tooltip hasArrow label='Set how many successfull trades your partner needs to have to start trade with you' fontWeight={300} bg='white' color='black'>
                                            <Box as='span'>

                                                <PiQuestionLight />
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </Flex>
                                <Box fontSize={'14px'}>
                                    Show my offer only to users who have completed at least:
                                </Box>
                                <InputGroup  >
                                    <Input borderRadius={5} placeholder='type...'  ></Input>
                                    <InputRightAddon bg={'transparent'} borderRadius={5} >
                                        <Box>Past Trades</Box>
                                    </InputRightAddon>
                                </InputGroup>
                            </Flex>
                            <Flex direction={'column'} flex={1} borderRadius={5} gap={5}>
                                <Flex gap={2}>

                                    <Heading size={'md'}>
                                        Limit for New Users
                                    </Heading>
                                    <Box mt={1} as='span'>
                                        <Tooltip hasArrow label='You can set a custom limit for cryptico users attempting there first trade on plateform' fontWeight={300} bg='white' color='black'>
                                            <Box as='span'>

                                                <PiQuestionLight />
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </Flex>
                                <Box fontSize={'14px'}>
                                    New users can only trade up to:
                                </Box>
                                <InputGroup >
                                    <Input borderRadius={5} placeholder='type...'  ></Input>
                                    <InputRightAddon bg={'transparent'} borderRadius={5}>
                                        <Box>INR</Box>
                                    </InputRightAddon>
                                </InputGroup>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </form>
        </Flex>
    )
}



const Toolmessage = ({ message }) => {
    return (
        <>

        </>
    )
}

export default OtherSettings