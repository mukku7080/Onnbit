import React, { useState, useEffect } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import { Buffer } from 'buffer';
import axios from 'axios';
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Box,
    Text,
    Alert,
    AlertIcon,
    Heading,
    Card,
    CardHeader,
    CardBody,
    Divider,
    Spinner,
    useToast,
    InputGroup,
    InputLeftElement,
    Icon
} from '@chakra-ui/react';
import { FaWallet, FaUser, FaBitcoin } from 'react-icons/fa';

const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.testnet; // Change to bitcoin.networks.bitcoin for mainnet

const SendBitcoinAsset = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [fetchingBalance, setFetchingBalance] = useState(false);
    const toast = useToast();

    // Convert hex private key to WIF format
    const hexToWIF = (hexKey) => {
        try {
            // Remove 0x prefix if present
            const cleanHex = hexKey.replace(/^0x/, '');

            // Convert hex to Buffer
            const privateKeyBuffer = Buffer.from(cleanHex, 'hex');

            // Create ECPair from private key buffer
            const keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { network });

            // Return WIF format
            return keyPair.toWIF();
        } catch (error) {
            throw new Error('Invalid hex private key format');
        }
    };

    // Detect and convert private key format
    const processPrivateKey = (key) => {
        if (!key) return '';

        // Check if it's hex format (starts with 0x or is 64 hex characters)
        if (key.startsWith('0x') || (key.length === 64 && /^[0-9a-fA-F]+$/.test(key))) {
            return hexToWIF(key);
        }

        // Otherwise assume it's already in WIF format
        return key;
    };

    // Fetch wallet address from private key
    const fetchWalletAddress = async () => {
        try {
            if (!privateKey) {
                setStatus('Please enter a private key');
                return;
            }

            setFetchingBalance(true);

            // Process the private key (convert hex to WIF if needed)
            const processedKey = processPrivateKey(privateKey);
            const keyPair = ECPair.fromWIF(processedKey, network);
            const publicKeyBuffer = Buffer.from(keyPair.publicKey);

            const { address } = bitcoin.payments.p2wpkh({
                pubkey: publicKeyBuffer,
                network,
            });

            setWalletAddress(address);

            // Also fetch balance
            await fetchBalance(address);

            setStatus('Wallet address fetched successfully');
            toast({
                title: 'Success',
                description: 'Wallet address fetched successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error fetching wallet address:', error);
            setStatus(`Error: ${error.message}`);
            toast({
                title: 'Error',
                description: `Failed to fetch wallet address: ${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setFetchingBalance(false);
        }
    };

    // Fetch wallet balance
    const fetchBalance = async (address) => {
        try {
            const response = await axios.get(`https://mempool.space/testnet/api/address/${address}`);
            const balance = response.data.chain_stats.funded_txo_sum - response.data.chain_stats.spent_txo_sum;
            setWalletBalance(balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setWalletBalance(0);
        }
    };

    // Send Bitcoin transaction
    const sendBitcoin = async () => {
        try {
            if (!privateKey || !recipientAddress || !amount) {
                setStatus('Please fill in all fields');
                return;
            }

            if (!walletAddress) {
                setStatus('Please fetch wallet address first');
                return;
            }

            setIsLoading(true);
            setStatus('Preparing transaction...');

            // Process the private key (convert hex to WIF if needed)
            const processedKey = processPrivateKey(privateKey);
            const keyPair = ECPair.fromWIF(processedKey, network);
            const publicKeyBuffer = Buffer.from(keyPair.publicKey);

            const { address: fromAddress } = bitcoin.payments.p2wpkh({
                pubkey: publicKeyBuffer,
                network,
            });

            // Fetch UTXOs
            const utxoResponse = await axios.get(`https://mempool.space/testnet/api/address/${fromAddress}/utxo`);
            const utxos = utxoResponse.data;

            if (!utxos.length) {
                throw new Error('No UTXOs found. Your wallet might be empty.');
            }

            const psbt = new bitcoin.Psbt({ network });
            let inputSum = 0;

            // Add inputs
            for (let i = 0; i < utxos.length; i++) {
                const utxo = utxos[i];
                const txHexResponse = await axios.get(`https://mempool.space/testnet/api/tx/${utxo.txid}/hex`);
                const txHex = txHexResponse.data;
                const tx = bitcoin.Transaction.fromHex(txHex);
                const output = tx.outs[utxo.vout];

                // Force real Buffer conversion from Buffer2 or Uint8Array
                const scriptBuffer = Buffer.from(output.script.buffer, output.script.byteOffset, output.script.byteLength);

                // Validate output script belongs to us
                let outputAddress;
                try {
                    outputAddress = bitcoin.address.fromOutputScript(scriptBuffer, network);
                } catch (err) {
                    console.error("Error deriving address from script:", err);
                    continue;
                }

                if (outputAddress !== fromAddress) {
                    console.warn(`Address mismatch! UTXO address: ${outputAddress}, From Address: ${fromAddress}`);
                    continue;
                }

                psbt.addInput({
                    hash: utxo.txid,
                    index: utxo.vout,
                    witnessUtxo: {
                        script: scriptBuffer,
                        value: utxo.value,
                    },
                });

                // // const output = tx.outs[utxo.vout];

                // // const scriptBuffer =
                // //     output.script.constructor.name.startsWith('Buffer') ? output.script : Buffer.from(output.script);


                // // // const scriptBuffer = Buffer.from(output.script);
                // // console.log('Script Type:', typeof output.script, output.script.constructor.name);
                // const output = tx.outs[utxo.vout];

                // const scriptBuffer = Uint8Array.prototype.isPrototypeOf(output.script)
                //     ? Buffer.from(output.script)
                //     : output.script;

                // console.log('Script Type:', typeof output.script, output.script.constructor.name);





                // // Verify address match
                // let outputAddress;
                // try {
                //     outputAddress = bitcoin.address.fromOutputScript(scriptBuffer, network);
                // } catch (err) {
                //     console.error("Error deriving address from script:", err);
                //     continue;
                // }

                // if (outputAddress !== fromAddress) {
                //     console.warn(`Address mismatch! UTXO address: ${outputAddress}, From Address: ${fromAddress}`);
                //     continue;
                // }

                // psbt.addInput({
                //     hash: utxo.txid,
                //     index: utxo.vout,
                //     witnessUtxo: {
                //         script: scriptBuffer,
                //         value: utxo.value,
                //     },
                // });

                inputSum += utxo.value;
                if (inputSum >= parseInt(amount) + 1) break; // estimate 2000 sats fee
            }

            const sendAmount = parseInt(amount);
            const fee = 1; // 2000 sats fee
            const change = inputSum - sendAmount - fee;

            if (inputSum < sendAmount + fee) {
                throw new Error('Insufficient balance for transaction and fees.');
            }

            // Add output for recipient
            psbt.addOutput({
                address: recipientAddress,
                value: sendAmount,
            });

            // Add change output if needed
            if (change > 0) {
                psbt.addOutput({
                    address: fromAddress,
                    value: change,
                });
            }

            // Sign all inputs
            for (let i = 0; i < psbt.inputCount; i++) {
                psbt.signInput(i, keyPair);
                const isValid = psbt.validateSignaturesOfInput(i);
                if (!isValid) {
                    throw new Error(`Signature validation failed for input ${i}`);
                }
            }

            psbt.finalizeAllInputs();

            const txHexFinal = psbt.extractTransaction().toHex();
            setStatus('Broadcasting transaction...');

            const broadcastResponse = await axios.post('https://mempool.space/testnet/api/tx', txHexFinal);

            setStatus(`Transaction sent successfully! TXID: ${broadcastResponse.data}`);
            toast({
                title: 'Transaction Sent',
                description: `TXID: ${broadcastResponse.data}`,
                status: 'success',
                duration: 10000,
                isClosable: true,
            });

            // Refresh balance
            await fetchBalance(fromAddress);

        } catch (error) {
            console.error('Transaction error:', error);
            setStatus(`Transaction failed: ${error.message}`);
            toast({
                title: 'Transaction Failed',
                description: error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Convert satoshis to BTC
    const satoshisToBTC = (satoshis) => {
        return (satoshis / 100000000).toFixed(8);
    };

    return (
        <Box maxWidth="600px" margin="50px auto" padding="20px">
            <Card>
                <CardHeader>
                    <Heading size="lg" textAlign="center" color="orange.500">
                        <Icon as={FaBitcoin} mr={2} />
                        Send Bitcoin Asset
                    </Heading>
                    <Text textAlign="center" color="gray.600" mt={2}>
                        Wallet to Wallet Bitcoin Transfer
                    </Text>
                </CardHeader>

                <CardBody>
                    <VStack spacing={4}>
                        {/* Private Key Input */}
                        <FormControl isRequired>
                            <FormLabel>Private Key (WIF or Hex Format)</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={FaWallet} color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    type="password"
                                    placeholder="Enter your private key (WIF or hex format)"
                                    value={privateKey}
                                    onChange={(e) => setPrivateKey(e.target.value.trim())}
                                />
                            </InputGroup>
                        </FormControl>

                        {/* Fetch Wallet Address Button */}
                        <Button
                            onClick={fetchWalletAddress}
                            colorScheme="blue"
                            width="100%"
                            isLoading={fetchingBalance}
                            loadingText="Fetching..."
                        >
                            Fetch Wallet Address & Balance
                        </Button>

                        {/* Wallet Address Display */}
                        {walletAddress && (
                            <Box width="100%" p={4} bg="gray.50" borderRadius="md">
                                <Text fontSize="sm" fontWeight="bold" mb={1}>
                                    Your Wallet Address:
                                </Text>
                                <Text fontSize="sm" wordBreak="break-all" color="blue.600">
                                    {walletAddress}
                                </Text>
                                <Text fontSize="sm" mt={2}>
                                    <strong>Balance:</strong> {satoshisToBTC(walletBalance)} BTC
                                    <Text as="span" color="gray.500" ml={2}>
                                        ({walletBalance} satoshis)
                                    </Text>
                                </Text>
                            </Box>
                        )}

                        <Divider />

                        {/* Recipient Address Input */}
                        <FormControl isRequired>
                            <FormLabel>Recipient Address</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={FaUser} color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Enter recipient's Bitcoin address"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value.trim())}
                                />
                            </InputGroup>
                        </FormControl>

                        {/* Amount Input */}
                        <FormControl isRequired>
                            <FormLabel>Amount (Satoshis)</FormLabel>
                            <Input
                                type="number"
                                placeholder="Enter amount in satoshis"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <Text fontSize="xs" color="gray.500" mt={1}>
                                {amount && `≈ ${satoshisToBTC(amount)} BTC`}
                            </Text>
                        </FormControl>

                        {/* Send Button */}
                        <Button
                            onClick={sendBitcoin}
                            colorScheme="orange"
                            width="100%"
                            isLoading={isLoading}
                            loadingText="Sending..."
                            disabled={!walletAddress || !privateKey || !recipientAddress || !amount}
                        >
                            Send Bitcoin
                        </Button>

                        {/* Status Display */}
                        {status && (
                            <Alert status={status.includes('Error') || status.includes('failed') ? 'error' : 'info'}>
                                <AlertIcon />
                                <Text fontSize="sm">{status}</Text>
                            </Alert>
                        )}

                        {/* Fee Information */}
                        <Box width="100%" p={3} bg="yellow.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="yellow.400">
                            <Text fontSize="sm" fontWeight="bold" mb={1}>
                                Important Notes:
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                                • This is for Bitcoin Testnet. Switch network for mainnet use.
                                <br />
                                • Transaction fee: ~1 satoshis
                                <br />
                                • Accepts both WIF format (starts with L/K/5/c/9) and hex format (0x...)
                                <br />
                                • Keep your private key secure and never share it
                                <br />
                                • Double-check recipient address before sending
                            </Text>
                        </Box>
                    </VStack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default SendBitcoinAsset;