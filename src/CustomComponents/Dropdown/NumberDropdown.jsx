import React from 'react'
import {
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
   
    Box,
    Button,
    Image,
    
    Input,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    VStack,


  
} from '@chakra-ui/react'

import { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useOtherDetail } from "../../Context/otherContext";

const NumberDropdown = () => {

    return (
        <Flex w={'100%'} direction={'column'} gap={1}>
            <Heading size={'sm'}>Phone</Heading>

            <Flex justifyContent={'space-between'} alignItems={'center'} borderRadius={5} border={'1px solid #dcdcdc'} >
                <InputGroup>

                    <Input placeholder='Enter phone number'
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
                <NumberDropdownNew />
            </Flex>
            <Button textDecoration={'underline'} p={0} size={'sm'} bg={'transparent'} alignSelf={'start'}>Change Number</Button>
        </Flex>
    )
}

const NumberDropdownNew = () => {

    const { handleCountryCode, CountryCode } = useOtherDetail();

    const [searchTerm, setSearchTerm] = useState("");
    const [option, setOption] = useState("India");

    const filteredItems = (CountryCode || []).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <Menu placement="bottom-end">
                <MenuButton
                    as={Button}
                    bg={'transparent'}
                    borderRadius={5}
                    _hover={{ bg: "transparent" }}
                    size={'sm'}
                    minW={{ base: "auto", md: "100px" }} // Ensures it doesn't shrink too much
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    rightIcon={<MdKeyboardArrowDown />}
                    _focus={{ boxShadow: "none" }}
                    _active={{ bg: "transparent" }}
                    onClick={handleCountryCode}

                >

                    {option}
                </MenuButton>

                <MenuList p={2} borderRadius={0}

                    maxHeight="300px" // Limit height
                    overflowY="auto" // Enable scrolling
                    zIndex={1000}

                >

                    <InputGroup mb={2}>
                        <InputLeftElement pointerEvents="none" pb={'6px'}>
                            <IoMdSearch color="gray.500" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            size="sm"
                        />
                    </InputGroup>



                    {/* Menu Items */}
                    <VStack align="stretch" spacing={1}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <MenuItem key={index} _hover={{ bg: "blue.100" }}
                                    onClick={() => {
                                        setOption(item.code);
                                    }}>
                                    <Flex justifyContent={'space-between'} w={'full'}>

                                        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} gap={5} borderBottom={'1px solid #f5f7fa'}>
                                            <Image boxSize={5} src={item.flag_url}></Image>

                                            {item.dialing_code}
                                        </Flex>
                                        <Box mr={3}>{item.currency_symbol}</Box>
                                    </Flex>
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem isDisabled>No results found</MenuItem>
                        )}
                    </VStack>
                </MenuList>
            </Menu>

        </>
    );
};

export default NumberDropdown