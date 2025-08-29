import React, { useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { keccak256 } from 'js-sha3';
import bs58check from 'bs58check';
import elliptic from 'elliptic';
import { Buffer } from 'buffer';

const bip32 = BIP32Factory(ecc);



export const TronWalletGenerator = async (mnemonic, walletid) => {
    // const mnemonic = 'spy soup struggle rival immense car art all name inch come slot'
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = bip32.fromSeed(seed);
    const child = root.derivePath(`m/44'/195'/0'/0/${walletid}`);

    const privateKey = toHexString(child.privateKey);
    const publicKey = getPublicKey(privateKey);
    const address = publicKeyToTronAddress(publicKey);

    const walletData = { mnemonic, privateKey, address };
    const resp = {
        address: address,
        key: privateKey
    }
    return resp;
};
function toHexString(uint8Array) {
    return '0x' + Array.from(uint8Array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

function getPublicKey(privateKeyHex) {
    const ec = new elliptic.ec('secp256k1');
    const key = ec.keyFromPrivate(privateKeyHex.slice(2)); // Remove '0x'
    return key.getPublic().encode('hex');
}


function publicKeyToTronAddress(publicKey) {
    const pubKeyBytes = Buffer.from(publicKey, 'hex').slice(1); // remove 0x04 prefix
    const hash = keccak256.arrayBuffer(pubKeyBytes); // keccak256 returns ArrayBuffer
    const addressHex = '41' + Buffer.from(hash).slice(-20).toString('hex'); // take last 20 bytes
    return bs58check.encode(Buffer.from(addressHex, 'hex'));
}




