import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Heading,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const options = ["Hindi", "English", "Arabia", "pasto", "Zapnies",'chineess'];

const LanguageSelectorDropdown = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // Add or remove item from selectedItems
  const toggleSelection = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  // Remove selected item
  const removeSelection = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <Box w={'100%'}  display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      {/* Selected Items Display */}
      <Flex wrap="wrap" gap={2} mb={2}>
      <Heading size={'sm'}>Languages</Heading>
        {selectedItems.map((item) => (
          <Tag key={item} size="md" variant="solid" colorScheme="orange">
            <TagLabel>{item}</TagLabel>
            <TagCloseButton onClick={() => removeSelection(item)} />
          </Tag>
        ))}
      </Flex>

      {/* Dropdown Menu */}
      <Menu>
        <MenuButton justifyContent={'space-between'} as={Button} variant={'outline'} _hover={{ bg: 'none' }} w="full">
          <Flex justifyContent={'space-between'}>

            Select Languages
            <MdKeyboardArrowDown />
          </Flex>
        </MenuButton>
        <MenuList p={2}>
          {/* Search Input */}
          <InputGroup mb={2}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement pointerEvents="none">
              <MdKeyboardArrowDown color="gray.500" />
            </InputRightElement>
          </InputGroup>

          {/* Filtered Items - Excluding Selected Ones */}
          {options
            .filter(
              (item) =>
                !selectedItems.includes(item) &&
                item.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <MenuItem key={item} onClick={() => toggleSelection(item)}>
                {item}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelectorDropdown;
