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
    VStack,
} from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
// import { SearchIcon } from "@chakra-ui/icons";

const PaymentDropdown = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isShow, setShow] = useState(false);
    const [option,setOption] = useState(items[0])

    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<MdKeyboardArrowDown />}
                bg="orange.500"
                color="white"
                borderRadius={5}
                _hover={{ bg: "orange.600" }}
                _expanded={{ bg: "orange.400" }}
            >
                {option}
            </MenuButton>
            <MenuList minW="100%" p={2} borderRadius={0}>
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
                        filteredItems.map((item, index) => (
                            <MenuItem key={index} _hover={{ bg: "blue.100" }} onClick={() => {
                                setShow((prev) => !prev);
                                setOption(item);
                            }}>
                                {item}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem isDisabled>No results found</MenuItem>
                    )}
                </VStack>
            </MenuList>
        </Menu>
    );
};
const items = ["IMPS Transefer", "Bank Transfer", "Paytm Wallet", "Phonepay", "Google Pay", "Net Banking"];

export default PaymentDropdown;
