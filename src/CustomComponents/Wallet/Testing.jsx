import React from 'react';
import { ethers } from 'ethers';
import { Button, Flex, Box } from '@chakra-ui/react';

const Testing = () => {
    const handleclick = async () => {
        console.log('hello');

        // Create an HD Wallet from the mnemonic
        const mnemonic = 'spy soup struggle rival immense car art all name inch come slot';
        const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

        console.log("Master Wallet Address:", hdNode.address); // First address

        // Generate multiple wallet addresses
        for (let i = 0; i < 5; i++) {
            const wallet = new ethers.Wallet(hdNode.derivePath(`m/44'/60'/0'/0/${1}`).privateKey);

            console.log(`Wallet ${i + 1}:`);
            console.log("Address:", wallet.address);
            console.log("Private Key:", wallet.privateKey);
            console.log("----------------------");
        }
    };

    return (
        <Flex mt={50}>
           

            <Button mt={10} bg={'orange'} onClick={handleclick}>Click Me</Button>
        </Flex>
    );
};

export default Testing;
