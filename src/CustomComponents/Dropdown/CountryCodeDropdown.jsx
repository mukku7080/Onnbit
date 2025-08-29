import { useEffect, useState } from "react";
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
    Flex,
    Box,
    Image
} from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { useOtherDetail } from "../../Context/otherContext";

const CountryCodeDropdown = ({ formikHelpers = {}, name, setCountryCode }) => {
    // const { values = {}, handleChange = {}, handleBlur = {}, errors = {}, touched = {} } = formikHelpers;
    const {
        values = {},
        handleChange = () => { }, // Default to a no-op function
        handleBlur = () => { },
        errors = {},
        touched = {},
    } = formikHelpers || {}; // Ensure formikHelpers is not undefined

    const { countryCode } = useOtherDetail();
    const defaultOption = countryCode?.[0]?.dialing_code || "Loading.....";


    const [searchTerm, setSearchTerm] = useState("");
    const [btnName, setBtnName] = useState(defaultOption);

    const filteredItems = (countryCode || []).filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    useEffect(() => {
        // If no option is selected, set the default one
        setBtnName(defaultOption);
        handleChange({ target: { name, value: defaultOption } });
        setCountryCode(defaultOption);

        // deaultLocation();

    }, [countryCode]);


    return (
        <>
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<MdKeyboardArrowDown />}
                    borderRightRadius={0}
                    w={'100%'}
                    size={'sm'}

                >
                    <Flex gap={2}>
                        {/* <Box display={'flex'} alignItems={'center'} >

                            <IoLocationOutline />
                        </Box> */}

                        {btnName}
                    </Flex>
                </MenuButton>

                <MenuList p={2} borderRadius={0}
                    maxHeight="300px" // Limit height
                    overflowY="auto" // Enable scrolling

                    maxW={{ base: '252px', sm: 'none' }}

                >
                    {/* Search Box */}
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
                            filteredItems.map((location, index) => (
                                <MenuItem key={index}
                                    _hover={{ bg: "blue.100" }}
                                    onClick={() => {
                                        setCountryCode(location.dialing_code);
                                        setBtnName(location.dialing_code);
                                        handleChange({ target: { name, value: location?.name || defaultOption } });
                                    }

                                    }
                                    onChange={handleChange}



                                >
                                    <Flex justifyContent={'space-between'} gap={5}>
                                        <Flex gap={2}>

                                            <Image boxSize={5} src={location.flag_url}></Image>
                                            {location.code}
                                        </Flex>
                                        <Box pl={10}>

                                            {location.dialing_code}
                                        </Box>
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
const location = ["India", "Russia", "Ukrain", "Brazil", "Israil", "Kazakistan"];



export default CountryCodeDropdown;