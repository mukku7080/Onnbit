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
    Image,
    Menu,
    MenuList,
    MenuButton,
    MenuItem
} from '@chakra-ui/react'
import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

function FaqAccordion({ title, btn1, btn2, isOptionButton }) {

    const [option, setOption] = useState(cryptoOption[0].name);
    return (
        <Accordion defaultIndex={[0]} allowMultiple gap={10} width={'100%'}  >


            <AccordionItem  >
                <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' fontSize={'lg'} fontWeight={600} textAlign='left' p={2}>
                            What is Cryptico
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>

                </h2>
                <AccordionPanel mt={5}>


                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.


                </AccordionPanel>
            </AccordionItem>


            <AccordionItem  >
                <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' fontSize={'lg'} fontWeight={600} textAlign='left' p={2}>
                            How to invest in Cryptico
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>

                </h2>
                <AccordionPanel mt={5}>


                Another content goes here...


                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export const Mybadge = ({ bgcolor }) => {
    return (

        <Badge

            borderRadius="full"
            bg={bgcolor}
            color="white"
            px={2}
        >
            1
        </Badge>
    )
}

const cryptoOption = [
    { name: 'All CryptoCurrencies' },
    { name: 'Bitcoin' },
    { name: 'Ethereum' },
    { name: 'USDC' },
    { name: 'Tether' },
]

export default FaqAccordion;