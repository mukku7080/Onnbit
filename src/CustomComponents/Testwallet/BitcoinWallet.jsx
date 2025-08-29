// import React, { useState } from "react";
// import * as bitcoin from "bitcoinjs-lib";
// import * as bip39 from "bip39";
// import BIP32Factory from "bip32";
// import * as tinysecp from "tiny-secp256k1";

// const bip32 = BIP32Factory(tinysecp);

// const BitcoinWallet = () => {
//     const [mnemonic, setMnemonic] = useState("");
//     const [addresses, setAddresses] = useState([]);
//     const [privateKeys, setPrivateKeys] = useState([]);

//     const generateWallets = async () => {
//         try {
//             // Use a predefined mnemonic or generate a new one
//             const newMnemonic = "half adult crash dog dog behind achieve blind poet regular traffic creek";
//             setMnemonic(newMnemonic);

//             // Convert mnemonic to seed
//             const seed = await bip39.mnemonicToSeed(newMnemonic);
//             const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);

//             let generatedAddresses = [];
//             let generatedPrivateKeys = [];

//             // Generate multiple addresses (e.g., first 5)
//             for (let i = 0; i < 5; i++) {
//                 const path = `m/84'/0'/0'/0/${i}`; // Correct BIP84 path for Bech32 addresses
//                 const keyPair = root.derivePath(path);

//                 // Generate Bech32 (bc1...) address
//                 const { address } = bitcoin.payments.p2wpkh({
//                     pubkey: keyPair.publicKey,
//                     network: bitcoin.networks.bitcoin,
//                 });

//                 // Get private key in Wallet Import Format (WIF)
//                 const privateKeyWIF = keyPair.toWIF();

//                 generatedAddresses.push(address);
//                 generatedPrivateKeys.push(privateKeyWIF);
//             }

//             setAddresses(generatedAddresses);
//             setPrivateKeys(generatedPrivateKeys);
//         } catch (error) {
//             console.error("Error generating wallets:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Bitcoin Wallet Generator</h2>
//             <button onClick={generateWallets}>Generate Wallets</button>
//             {mnemonic && <p><strong>Mnemonic:</strong> {mnemonic}</p>}

//             {addresses.length > 0 && (
//                 <div>
//                     <h3>Generated Addresses:</h3>
//                     <ul>
//                         {addresses.map((addr, index) => (
//                             <li key={index}>
//                                 <strong>Address {index + 1}:</strong> {addr} <br />
//                                 <strong>Private Key:</strong> {privateKeys[index]}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BitcoinWallet;
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

const BitcoinWallet = () => {

    const generateWallet = () => {
        alert("hello");
    }
    return (
        <>

            <Flex mt={50}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius soluta minus quibusdam est ab? Tempora libero expedita temporibus accusantium error
                nam fugit fugiat?</Flex>
            <Button onClick={generateWallet} mt={40}>
                Generate Wallet
            </Button>

        </>


    )
}

export default BitcoinWallet
