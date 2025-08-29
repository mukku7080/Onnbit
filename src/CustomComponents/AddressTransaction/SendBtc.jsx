import React, { useState } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import { Buffer } from 'buffer';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import CryptoJS from 'crypto-js'; // Import CryptoJS

const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.testnet;

const SendBitcoin = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    const sendBitcoin = async () => {
        try {
            setStatus('Preparing transaction...');
            const keyPair = ECPair.fromWIF(privateKey, network);
            console.log('✅ Key pair created from WIF');

            // Ensure public key is a Buffer
            const publicKeyBuffer = Buffer.from(keyPair.publicKey);


            console.log('🔍 Public key (Buffer check):', Buffer.isBuffer(publicKeyBuffer), publicKeyBuffer);
            console.log("key pair", keyPair);

            const { address: fromAddress } = bitcoin.payments.p2wpkh({
                pubkey: publicKeyBuffer, // Use the Buffer
                network,
            });

            console.log('📬 From Address:', fromAddress);

            // Fetch UTXOs
            console.log(`🌐 Fetching UTXOs for ${fromAddress}...`);
            const utxoResponse = await axios.get(`https://mempool.space/testnet/api/address/${fromAddress}/utxo`);
            const utxos = utxoResponse.data;
            console.log('📦 Fetched UTXOs:', utxos);

            if (!utxos.length) throw new Error('No UTXOs found.');

            const psbt = new bitcoin.Psbt({ network });
            let inputSum = 0;

            for (let i = 0; i < utxos.length; i++) {
                const utxo = utxos[i];
                console.log(`🔍 Fetching raw tx for UTXO ${utxo.txid}...`);
                const txHexResponse = await axios.get(`https://mempool.space/testnet/api/tx/${utxo.txid}/hex`);
                const txHex = txHexResponse.data;
                const tx = bitcoin.Transaction.fromHex(txHex);
                const output = tx.outs[utxo.vout];

                // Ensure the script is a Buffer
                // console.log('🔍 Script before Buffer conversion:', output.script);
                const scriptBuffer = Buffer.isBuffer(output.script) ? output.script : Buffer.from(output.script);
                // console.log('🔍 Script as Buffer:', scriptBuffer);

                // Derive the address from the output script
                let outputAddress;
                try {
                    outputAddress = bitcoin.address.fromOutputScript(scriptBuffer, network);
                } catch (err) {
                    console.error("Error deriving address from script:", err);
                    outputAddress = null; // Or handle the error as appropriate
                }

                console.log("Derived address from output script:", outputAddress);

                // Compare the derived address with the fromAddress
                if (outputAddress !== fromAddress) {
                    console.warn(`⚠️ Address mismatch!  UTXO address: ${outputAddress}, From Address: ${fromAddress}`);
                    // You might want to skip this UTXO if the addresses don't match
                    continue; // Skip to the next UTXO
                } else {
                    console.log("✅ Address match!");
                }

                console.log("witnessUtxo:", {
                    script: scriptBuffer,
                    value: utxo.value,
                });

                psbt.addInput({
                    hash: utxo.txid,
                    index: utxo.vout,
                    witnessUtxo: {
                        script: scriptBuffer,  // Ensure script is a Buffer
                        value: utxo.value,
                    },
                });

                inputSum += utxo.value;
                if (inputSum >= parseInt(amount) + 1000) break; // estimate 1000 sats fee
            }

            console.log('💰 Accumulated input:', inputSum, 'sats');
            if (inputSum < parseInt(amount) + 1000) {
                throw new Error('❌ Insufficient balance.');
            }

            const sendAmount = parseInt(amount);
            const fee = 1000;
            const change = inputSum - sendAmount - fee;

            console.log('🔢 Send Amount:', sendAmount);
            console.log('💸 Fee:', fee);
            console.log('🔁 Change:', change);

            psbt.addOutput({
                address: toAddress,
                value: sendAmount,
            });

            if (change > 0) {
                psbt.addOutput({
                    address: fromAddress,
                    value: change,
                });
                console.log('💸 Adding change output');
            }

            console.log("PSBT input count:", psbt.inputCount);

            for (let i = 0; i < psbt.inputCount; i++) {
                console.log(`Signing input ${i}...`);
                psbt.signInput(i, keyPair?.privateKey);
                console.log(`Input ${i} signed.`);
                const isValid = psbt.validateSignaturesOfInput(i);
                console.log(`Signature validation for input ${i}: ${isValid}`);
                if (!isValid) {
                    throw new Error(`❌ Signature validation failed for input ${i}`);
                }
            }

            psbt.finalizeAllInputs();

            const txHexFinal = psbt.extractTransaction().toHex();
            console.log('📜 Final TX Hex:', txHexFinal);

            const broadcastResponse = await axios.post('https://mempool.space/testnet/api/tx', txHexFinal);
            setStatus(`✅ Transaction sent! TXID: ${broadcastResponse.data}`);
        } catch (err) {
            console.error('❌ Error occurred:', err);
            setStatus(`❌ Error occurred: ${err.message}`);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: '100px auto', padding: 20 }}>
            <h2>Send Bitcoin (Testnet)</h2>
            <input
                type="text"
                placeholder="Your Private Key (WIF)"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value.trim())}
                style={{ width: '100%', marginBottom: 10, padding: '8px' }}
            />
            <input
                type="text"
                placeholder="Recipient Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value.trim())}
                style={{ width: '100%', marginBottom: 10, padding: '8px' }}
            />
            <input
                type="number"
                placeholder="Amount (Satoshis)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '100%', marginBottom: 10, padding: '8px' }}
            />
            <Button onClick={sendBitcoin} style={{ width: '100%', padding: 10 }}>
                Send Bitcoin
            </Button>
            {status && <p style={{ marginTop: 20 }}>{status}</p>}
        </div>
    );
};

export default SendBitcoin;
