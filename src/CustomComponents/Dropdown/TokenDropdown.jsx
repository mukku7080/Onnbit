import React, { useEffect, useState } from 'react'
import {
    Box, Button, Card, Flex,
    Menu, MenuButton, MenuItem, MenuList,
    Image,


} from '@chakra-ui/react';


import { MdKeyboardArrowDown } from "react-icons/md";
import { useOffer } from '../../Context/OfferContext';


const TokenDropdown = ({ index, setIndex }) => {
    const { setQueryParams } = useOffer();
    const safeIndex = index !== undefined ? index : 0;
    const [option, setOption] = useState(cryptoOption[safeIndex]?.name);
    const [logo, setLogo] = useState(cryptoOption[safeIndex]?.logo);

    useEffect(() => {
        // Update option and logo whenever index changes
        if (cryptoOption[safeIndex]) {
            setOption(cryptoOption[safeIndex].name);
            setLogo(cryptoOption[safeIndex].logo);
            setQueryParams((prev) => ({ ...prev, cryptocurrency: cryptoOption[safeIndex].name.toLocaleLowerCase() }))

        }
    }, [safeIndex]);

    return (
        <>
            <Menu matchWidth >

                <MenuButton as={Button} w={'full'} variant={'outline'} borderRadius={5} border={'1px solid #dcdcdc'} rightIcon={<MdKeyboardArrowDown />} _hover={{ bg: 'transparent' }}  >
                    <Flex gap={2}>
                        <Image boxSize={5} src={logo}></Image>
                        {option}
                    </Flex>

                </MenuButton>
                <MenuList borderRadius={0} p={2}  >
                    {cryptoOption.map((data, index) => (
                        <React.Fragment key={index}>
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    setOption(data.name);
                                    setLogo(data.logo);
                                    setQueryParams((prev) => ({ ...prev, cryptocurrency: data.name.toLocaleLowerCase() }))
                                    setIndex(index);

                                }} gap={3} _hover={{ bg: "blue.100" }}><Image boxSize={5} src={data.logo}></Image>{data.name}
                            </MenuItem>
                        </React.Fragment>
                    ))}

                </MenuList>
            </Menu>
        </>
    )
}
const cryptoOption = [
    { name: 'Bitcoin', logo: '/imagelogo/bitcoin-btc-logo.png' },
    { name: 'Ethereum', logo: '/imagelogo/ethereum-eth-logo.png' },
    { name: 'Binance', logo: '/imagelogo/bnb-bnb-logo.png' },
    { name: 'Tether', logo: '/imagelogo/tether-usdt-logo.png' },
]
export default TokenDropdown