import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Badge,
    Flex,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    Avatar,
    Heading
} from '@chakra-ui/react'
import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const now = new Date();
function RecentTradePartnerAccordian({ index, user }) {

    const [option, setOption] = useState(cryptoOption[0].name);
    return (
        <>

            <Accordion key={index} defaultIndex={[1]} allowMultiple gap={10} width={'100%'}  >
                <AccordionItem  >
                    <h2>
                        <AccordionButton>
                            <Avatar name={user?.partner_details?.name} src={user?.partner_details?.profile_image_url}></Avatar>
                            <Box as='span' flex='1' fontSize={'md'} fontWeight={600} textAlign='left' p={4}>
                                {user?.partner_details?.name} <br />
                                {
                                    user?.buyer_status === 'success' ?

                                        <Flex gap={2} alignItems={'center'} color={'#6B8E23'}>
                                            <Box display={'flex'} alignItems='center'>
                                                <IoMdCheckmark />
                                            </Box>
                                            <Box  >Successfull</Box>
                                        </Flex>
                                        :
                                        <Flex gap={2} alignItems={'center'} color={'#B76E79'}>
                                            <Box display={'flex'} alignItems='center'>
                                                <MdOutlineCancel />
                                            </Box>
                                            <Box  >Cancel</Box>
                                        </Flex>
                                }
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>

                    </h2>
                    <AccordionPanel mt={5}>
                        <Box width={'full'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'} >
                            <Flex wrap={'wrap'} >
                                <Heading size={'sm'} fontWeight={400}>Trade Date : </Heading>

                            </Flex>
                            {dayjs(user?.created_at)
                                .tz('Asia/Kolkata')
                                .format('DD MMM YYYY, hh:mm A')}

                        </Box>

                        {/* for small screen dorpdow button */}

                        <Box width={'full'} display={{ base: 'flex', md: 'flex' }} flexWrap={'wrap'} justifyContent={'space-between'} py={2} >


                            <Menu placement='bottom-end'>

                                <MenuButton as={Button} variant={'outline'} display={{ base: 'flex', md: 'flex' }} borderRadius={0} border={'1px solid #dcdcdc'} rightIcon={<MdKeyboardArrowDown />} width={'100%'}  >
                                    Action

                                </MenuButton>
                                <MenuList borderRadius={0} >
                                    {menuitem.map((data, index) => (
                                        <>
                                            <MenuItem key={index} color={'gray'} width={'full'}>{data.item}</MenuItem>
                                        </>
                                    ))}

                                </MenuList>
                            </Menu>


                        </Box>

                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>

    );
}



const cryptoOption = [
    { name: 'All CryptoCurrencies' },
    { name: 'Bitcoin' },
    { name: 'Ethereum' },
    { name: 'USDC' },
    { name: 'Tether' },
]

const menuitem = [
    {
        item: "Add To Trusted List"
    },
    {
        item: "Add To Blocked List"
    },
    {
        item: "view This Trade"
    }
]



export default RecentTradePartnerAccordian;