import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuGroup,
  MenuDivider,
  Box,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";

const NestedDropdown = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<MdKeyboardArrowDown />}
        bg="orange.500"
        color="white"
        _hover={{ bg: "orange.600" }}
      >
        Main Menu
      </MenuButton>
      <MenuList>
        {/* Main Menu Items */}
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>

        {/* Submenu */}
        
        <Menu >
          <MenuButton as={MenuItem} _hover={{ bg: "gray.100" }}>
            Nested Menu
          </MenuButton>
          <MenuList>
            <MenuItem>Nested Option 1</MenuItem>
            <MenuItem>Nested Option 2</MenuItem>
            <MenuItem>Nested Option 3</MenuItem>
          </MenuList>
        </Menu>

        <MenuDivider />
        <MenuItem>Option 3</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NestedDropdown;
