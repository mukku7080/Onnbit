import { useState } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    VStack,
    Image,
    Flex,
    Box
} from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useOtherDetail } from "../../Context/otherContext";

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
const items = ["USD", "INR", "Rial", "Phonepay", "Dirham", "Taka", "Dollar", "yuro", "pisa", "Grain", "CD"];



export default NumberDropdownNew;
// import { useEffect, useState } from "react";
// import {
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem,
//     Button,
//     Input,
//     InputGroup,
//     InputLeftElement,
//     InputRightElement,
//     VStack,
//     Flex,
//     Box,
//     Image
// } from "@chakra-ui/react";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { IoMdSearch } from "react-icons/io";
// import { IoLocationOutline } from "react-icons/io5";
// import { useOtherDetail } from "../../Context/otherContext";

// const NumberDropdownNew = ({ formikHelpers = {}, name }) => {
//     // const { values = {}, handleChange = {}, handleBlur = {}, errors = {}, touched = {} } = formikHelpers;
//     const {
//         values = {},
//         handleChange = () => { }, // Default to a no-op function
//         handleBlur = () => { },
//         errors = {},
//         touched = {},
//     } = formikHelpers || {}; // Ensure formikHelpers is not undefined

//     const { countryCode } = useOtherDetail();
//     const defaultOption = countryCode?.[0]?.code || "Loading.....";


//     const [searchTerm, setSearchTerm] = useState("");
//     const [btnName, setBtnName] = useState(defaultOption);

//     const filteredItems = (countryCode || []).filter((location) =>
//         location.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );


//     useEffect(() => {
//         // If no option is selected, set the default one
//         setBtnName(defaultOption);
//         handleChange({ target: { name, value: defaultOption } });

//         // deaultLocation();

//     }, [countryCode]);


//     return (
//         <>
//             <Menu>
//                 <MenuButton
//                     as={Button}
//                     rightIcon={<MdKeyboardArrowDown />}
//                     borderRightRadius={0}
//                     w={'100%'}
//                     size={'sm'}

//                 >
//                     <Flex gap={2}>
//                         {/* <Box display={'flex'} alignItems={'center'} >

//                             <IoLocationOutline />
//                         </Box> */}

//                         {btnName}
//                     </Flex>
//                 </MenuButton>

//                 <MenuList p={2} borderRadius={0}
//                     maxHeight="300px" // Limit height
//                     overflowY="auto" // Enable scrolling

//                     maxW={{ base: '252px', sm: 'none' }}

//                 >
//                     {/* Search Box */}
//                     <InputGroup mb={2}>
//                         <InputLeftElement pointerEvents="none" pb={'6px'}>
//                             <IoMdSearch color="gray.500" />
//                         </InputLeftElement>
//                         <Input
//                             placeholder="Search..."
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             value={searchTerm}
//                             size="sm"
//                         />
//                     </InputGroup>

//                     {/* Menu Items */}
//                     <VStack align="stretch" spacing={1}>
//                         {filteredItems.length > 0 ? (
//                             filteredItems.map((location, index) => (
//                                 <MenuItem key={index}
//                                     _hover={{ bg: "blue.100" }}
//                                     onClick={() => {

//                                         setBtnName(location.code);
//                                         handleChange({ target: { name, value: location?.name || defaultOption } });
//                                     }

//                                     }
//                                     onChange={handleChange}



//                                 >
//                                     <Flex justifyContent={'space-between'}>
//                                         <Flex gap={2}>

//                                             <Image boxSize={5} src={location.flag_url}></Image>
//                                             {location.code}
//                                         </Flex>
//                                         <Box>

//                                             {location.dialing_code}
//                                         </Box>
//                                     </Flex>
//                                 </MenuItem>
//                             ))
//                         ) : (
//                             <MenuItem isDisabled>No results found</MenuItem>
//                         )}
//                     </VStack>
//                 </MenuList>
//             </Menu>
//         </>
//     );
// };
// const location = ["India", "Russia", "Ukrain", "Brazil", "Israil", "Kazakistan"];



// export default NumberDropdownNew;
