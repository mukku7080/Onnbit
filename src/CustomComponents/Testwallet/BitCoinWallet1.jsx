import React, { useState } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const BitcoinWallet1 = () => {
    const [address, setAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const generateWallet = () => {
        // Step 1: Generate a random key pair
        const keyPair = bitcoin.ECPair.makeRandom();

        // Step 2: Get the private key in WIF (Wallet Import Format)
        const privateKeyWIF = keyPair.toWIF();
        setPrivateKey(privateKeyWIF);

        // Step 3: Derive the Bitcoin address
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
        setAddress(address);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Bitcoin Wallet Generator</h2>
            <button onClick={generateWallet} style={{ padding: '10px 20px', backgroundColor: '#f7931a', color: 'white', border: 'none', cursor: 'pointer' }}>
                Generate Wallet
            </button>

            {address && (
                <div style={{ marginTop: '20px' }}>
                    <p><strong>Bitcoin Address:</strong> {address}</p>
                    <p><strong>Private Key (WIF):</strong> {privateKey}</p>
                </div>
            )}
        </div>
    );
};

export default BitcoinWallet1;
