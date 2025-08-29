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
    Box
} from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { useOtherDetail } from "../../Context/otherContext";
import { grayGradient } from "../../Styles/Gradient";
import { useOffer } from "../../Context/OfferContext";

const TraderLocation = ({ }) => {

    const { setQueryParams } = useOffer()
    const { countryCode } = useOtherDetail();
    const defaultOption = countryCode?.find(country => country.name.toLowerCase() === 'india')?.name || "Loading.....";


    const [searchTerm, setSearchTerm] = useState("");
    const [btnName, setBtnName] = useState(defaultOption);

    const filteredItems = (countryCode || []).filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    useEffect(() => {
        setBtnName(defaultOption);
        setQueryParams((prev) => ({ ...prev, location: defaultOption.toLocaleLowerCase() }))
    }, [countryCode]);


    return (
        <>
            <Menu matchWidth>
                <MenuButton
                    as={Button}
                    rightIcon={<MdKeyboardArrowDown />}
                    borderRadius={5}
                    w={'100%'}

                >
                    <Flex gap={2}>
                        <Box display={'flex'} alignItems={'center'} >

                            <IoLocationOutline />
                        </Box>

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

                                        setBtnName(location.name);
                                        setQueryParams((prev) => ({ ...prev, traderLocation: location?.name.toLocaleLowerCase() }))
                                    }

                                    }
                                >
                                    {location.name}
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



export default TraderLocation;
