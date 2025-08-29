import { Box, Button, Flex, Heading, Icon, Image, Menu, MenuButton, MenuList, MenuItem, Modal, ModalOverlay, ModalContent, ModalFooter, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, ButtonGroup, FormControl, Input, FormLabel, IconButton, InputRightElement, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useAuth } from '../../Context/AuthContext';
import { useAccount } from '../../Context/AccountContext';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useUser } from '../../Context/userContext';
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as tinysecp from "tiny-secp256k1";
import { Buffer } from "buffer";
const bip32 = BIP32Factory(tinysecp);


const CreateWallet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [blockChainType, setblockChainType] = useState(cryptoOption[0].blockchainDetail);

    const [headername, setHeaderName] = useState(cryptoOption[0].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[0].logo);
    const resetState = () => {
        setHeaderName(cryptoOption[0].name);
        setHeaderLogo(cryptoOption[0].logo);
    }
    return (
        <>


            <Button onClick={onOpen}
                sx={gradientButtonStyle}

            >
                Create Wallet
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src={headerlogo} boxSize={5}></Image>
                            {headername} Wallet

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={5} my={10}>

                            <SelectBlockChain index={0} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} setblockChainType={setblockChainType} />


                            <Flex p={2} bg={'green.50'} borderRadius={5} fontWeight={700} color={'green'}>
                                Verify your password to procced with wallet creation.

                            </Flex>
                            <PasswordVerification blockChainType={blockChainType} onClose={onClose} />

                        </Flex>
                    </ModalBody>

                </ModalContent>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button>Save</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

const PasswordVerification = ({ blockChainType = {}, onClose }) => {
    // const { blockchain, network, asset } = blockChainType;
    const [password, setPassword] = useState('');
    const { handlePasswordMatch, passwordmatch } = useAuth();
    const [showpassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isProceeding, setProceeding] = useState(false);
    const { handleCreateWallet, handleUpdateweb3WalletAddress, handleGetWeb3Wallet } = useAccount();
    const [keyphrase, setKeyPhrase] = useState();
    const [walletid, setWalletId] = useState();
    const [iscelebrate, setCelebrate] = useState(false);
    const [walleterror, setWalletError] = useState(null);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isPassWordMessageShow, setPasswordMessageShow] = useState(false);
    const [passworSEMessage, setPasswordSEMessage] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [privateKeys, setPrivateKeys] = useState([]);
    // const [createWalletErrorMessage, setCreateWalletErrorMessage] = useState(false);
    const { user } = useUser();
    const handleClick = async () => {
        setLoading(true);
        try {
            const res = await handlePasswordMatch(password);
            if (res.passwordVerified) {
                setIsInputDisabled(true);
                setPasswordMessageShow(true);
                console.log(res?.message);
                setPasswordSEMessage(res?.message);
                setLoading(false);
                const response = await handleCreateWallet(blockChainType);
                if (response?.status) {
                    if (!response.walletAddressUpdate) {
                        setKeyPhrase(response?.data.phrase)
                        setWalletId(response?.data.wallet_id);
                    }
                    else {
                        await handleGetWeb3Wallet();
                        setCelebrate(true);
                        setTimeout(() => {
                            onClose();
                            setPasswordMessageShow(false);
                            setIsInputDisabled(false);
                            setPasswordSEMessage('');
                        }, 3000);
                    }

                }
                else {
                    setWalletError(response?.message);
                }



            }
            else {

                setPasswordSEMessage(res?.message);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {

            setLoading(false);

        }

    }
    const generateBitcoinWallet = async (mnemonic) => {
        setProceeding(true);
        // const decrypted = await decryptWithKey(keyphrase, user.user_id);
        // const finalDecryption = await decryptWithKey(decrypted.phrase, decrypted.key);
        // const mnemonic = finalDecryption;

        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed, bitcoin.networks.testnet);

        let generatedAddresses = [];
        let generatedPrivateKeys = [];

        // Generate multiple addresses (e.g., first 5)
        const path = `m/84'/0'/0'/0/${walletid}`; // BIP84 path for Bech32 addresses
        const keyPair = root.derivePath(path);

        // Generate Bech32 (bc1...) address
        const { address } = bitcoin.payments.p2wpkh({
            pubkey: Buffer.from(keyPair.publicKey),
            network: bitcoin.networks.testnet,
        });

        // Get private key in Wallet Import Format (WIF)
        const privateKeyWIF = keyPair.toWIF();

        generatedAddresses.push(address);
        generatedPrivateKeys.push(privateKeyWIF);

        setAddresses(generatedAddresses);
        setPrivateKeys(generatedPrivateKeys);
        const response = {
            address: address,
            key: privateKeyWIF
        }
        return response;

    }

    const generateWalletAddress = async () => {
        setProceeding(true);
        const decrypted = await decryptWithKey(keyphrase, user.user_id);
        const finalDecryption = await decryptWithKey(decrypted.phrase, decrypted.key);
        const mnemonic = finalDecryption;
        if (blockChainType.network === 'btc') {
            const resp = await generateBitcoinWallet(mnemonic);
            const values = {
                "wallet_id": walletid,
                "wallet_address": resp.address,
                "wallet_key": resp.key
            }
            const response = await handleUpdateweb3WalletAddress(values);
            if (response.data.status) {

                await handleGetWeb3Wallet();
                setProceeding(false);
                setCelebrate(true);
                setTimeout(() => {
                    setIsInputDisabled(false);
                    onClose();
                    setPasswordMessageShow(false);

                }, 3000);
            }
        }
        else {

            const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
            const wallet = new ethers.Wallet(hdNode.derivePath(`m/44'/60'/0'/0/${walletid}`).privateKey);
            const values = {
                "wallet_id": walletid,
                "wallet_address": wallet.address,
                "wallet_key": wallet.privateKey
            }
            const response = await handleUpdateweb3WalletAddress(values);
            if (response.data.status) {

                await handleGetWeb3Wallet();
                setProceeding(false);
                setCelebrate(true);
                setTimeout(() => {
                    setIsInputDisabled(false);
                    onClose();
                    setPasswordMessageShow(false);

                }, 3000);
            }
        }



    };
    async function decryptWithKey(encryptedData, customKey) {
        try {
            // Step 1: Base64 decode the encrypted data
            const decodedData = atob(encryptedData);
            const iv = new Uint8Array(decodedData.slice(0, 16).split('').map(c => c.charCodeAt(0)));
            const ciphertext = new Uint8Array(decodedData.slice(16).split('').map(c => c.charCodeAt(0)));

            // Step 2: Derive the key (SHA-256 hash of customKey)
            const encoder = new TextEncoder();
            const keyMaterial = encoder.encode(customKey);
            const keyHash = await crypto.subtle.digest('SHA-256', keyMaterial);

            // Step 3: Import the key
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                keyHash,
                { name: 'AES-CBC' },
                false,
                ['decrypt']
            );

            // Step 4: Decrypt the data
            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: 'AES-CBC', iv: iv },
                cryptoKey,
                ciphertext
            );

            // Step 5: Convert decrypted data to string
            const decoder = new TextDecoder();
            const decryptedData = decoder.decode(decryptedBuffer);

            // Step 6: Parse JSON if possible
            try {
                return JSON.parse(decryptedData);
            } catch (e) {
                return decryptedData;  // Return as plain text if not JSON
            }
        } catch (error) {
            console.error('Decryption failed:', error);
            throw new Error('Decryption failed.');
        }

    }
    return (
        <>

            {

                <Flex direction={'column'} gap={3} >
                    <FormControl isRequired>
                        <FormLabel>password</FormLabel>
                        <InputGroup>

                            <Input name="password" isDisabled={isInputDisabled} placeholder='Enter Password' value={password} type={showpassword ? "text" : "password"} _focus={{ boxShadow: '0px', border: '0px' }} onChange={(e) => setPassword(e.target.value)} />

                            <InputRightElement >
                                <IconButton
                                    bg={'transparent'}
                                    h="1.75rem"
                                    size=""
                                    // border={'1px solid #c05621'}
                                    px={4}
                                    py={3}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    icon={true ? <IoMdEye /> : <IoMdEyeOff />}
                                    aria-label="Toggle Password Visibility"
                                    _hover={{ bg: 'transparent' }}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Flex justifyContent={'space-between'} >
                        {
                            isPassWordMessageShow ?
                                passwordmatch?.passwordVerified === true &&
                                <Box color='green.500' fontWeight={700}>{passworSEMessage}</Box>

                                :
                                <Box color={'red.500'}>{passworSEMessage}</Box>

                        }
                        <Button
                            isLoading={isLoading}
                            isDisabled={isInputDisabled}
                            loadingText='wait' onClick={handleClick}
                            alignSelf={'center'}
                            textAlign={'center'}
                            sx={gradientButtonStyle}
                            size={'md'}
                            // variant={'outline'}
                            w={'80px'}
                        >
                            Verify
                        </Button>
                    </Flex>
                    {
                        keyphrase &&

                        <Button isLoading={isProceeding} loadingText='Procceding...' sx={gradientButtonStyle} onClick={generateWalletAddress}>Proceed to wallet creation</Button>

                    }
                    {
                        walleterror &&
                        <Flex color={'red'} fontSize={'14px'} fontWeight={600} px={4}>{walleterror}</Flex>
                    }
                    {
                        iscelebrate &&
                        <Flex justifyContent={'center'} alignItems={'center'} direction={'column'}>
                            <></>
                            <Box color={'green'}>Woohoo! Your Wallet is Created 🎉</Box>
                            <Image src='/imagelogo/wallet.gif'></Image>
                        </Flex>
                    }
                </Flex>
            }
        </>
    )
}


const SelectBlockChain = ({ index, setHeaderName, setHeaderLogo, setblockChainType }) => {
    const [option, setOption] = useState(cryptoOption[index].name);
    const [logo, setlogo] = useState(cryptoOption[index].logo);
    return (
        <>
            <Menu matchWidth >

                <MenuButton as={Button} py={8} w={'full'} borderRadius={5} bg={'gray.100'} rightIcon={<MdKeyboardArrowDown />} _hover={{ bg: 'gray.100' }}  >
                    <Flex gap={2}>
                        <Image boxSize={5} src={logo}></Image>
                        {option}
                    </Flex>

                </MenuButton>
                <MenuList borderRadius={0} p={2}  >
                    {cryptoOption.map((data, index) => (
                        <React.Fragment key={index}>
                            <MenuItem key={data.name} onClick={() => {
                                setOption(data.name);
                                setHeaderName(data.name);
                                setHeaderLogo(data.logo);
                                setlogo(data.logo);
                                setblockChainType(data.blockchainDetail)
                            }} gap={3} _hover={{ bg: "blue.100" }}><Image boxSize={5} src={data.logo}></Image>{data.name}</MenuItem>
                        </React.Fragment>
                    ))}

                </MenuList>
            </Menu>
        </>
    )
}





const cryptoOption = [
    {
        name: 'Bitcoin',
        logo: '/imagelogo/bitcoin-btc-logo.png',
        blockchainDetail: {
            blockchain: "bitcoin",
            network: "btc",
            asset: "btc"
        }
    },
    {
        name: 'Ethereum',
        logo: '/imagelogo/ethereum-eth-logo.png',
        blockchainDetail: {
            blockchain: "ethereum",
            network: "erc20",
            asset: "eth"
        },
    },
    {
        name: 'Binance',
        logo: '/imagelogo/bnb-bnb-logo.png',
        blockchainDetail: {
            blockchain: "binance",
            network: "bep20",
            asset: "bnb"
        },
    },
    {
        name: 'Tether',
        logo: '/imagelogo/tether-usdt-logo.png',
        blockchainDetail: {
            blockchain: "ethereum",
            network: "erc20",
            asset: "usdt"
        },
    },
]


export const gradientButtonStyle = {
    backgroundImage: 'linear-gradient(to right, #FF512F 0%, #F09819 51%, #FF512F 100%)',
    // margin: '10px',
    textAlign: 'center',
    // textTransform: 'uppercase',
    transition: '0.5s',
    backgroundSize: '200% auto',
    color: 'white',
    // boxShadow: '0 0 20px #eee',
    borderRadius: '5px',
    // display: 'block',
    _hover: {
        backgroundPosition: 'right center',
        color: 'white',
        textDecoration: 'none',
    },
};
export default CreateWallet;