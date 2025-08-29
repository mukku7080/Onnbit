import React, { useState } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

const TESTNET = bitcoin.networks.testnet;

const SendBtcNew = () => {
    const [recipient, setRecipient] = useState('');
    const [txId, setTxId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const sendBitcoin = async () => {
        setLoading(true);
        setError('');
        setTxId('');

        try {
            // ✅ Replace this with your own testnet WIF (from faucet-generated wallet)
            const WIF = 'cR6F9ZQYJ52VSYi7XmQGGs6q9xRNdJtm7ZW3TLhFdeCGm1W7Ew5i'; // TESTNET WIF
            const keyPair = bitcoin.ECPair.fromWIF(WIF, TESTNET);
            const sender = bitcoin.payments.p2wpkh({
                pubkey: keyPair.publicKey,
                network: TESTNET,
            });

            const fromAddress = sender.address;
            if (!fromAddress) throw new Error('Invalid sender address');
            if (!recipient) throw new Error('Recipient address required');

            const sendAmount = 1000; // in satoshis
            const fee = 500;

            // ✅ Step 1: Fetch UTXOs
            const { data: utxos } = await axios.get(
                `https://mempool.space/testnet/api/address/${fromAddress}/utxo`
            );

            if (!utxos.length) throw new Error('No UTXOs available');

            const psbt = new bitcoin.Psbt({ network: TESTNET });

            let totalInput = 0;

            for (const utxo of utxos) {
                psbt.addInput({
                    hash: utxo.txid,
                    index: utxo.vout,
                    witnessUtxo: {
                        script: sender.output,
                        value: utxo.value,
                    },
                });
                totalInput += utxo.value;
                if (totalInput >= sendAmount + fee) break;
            }

            if (totalInput < sendAmount + fee) {
                throw new Error('Not enough balance');
            }

            const change = totalInput - sendAmount - fee;

            // ✅ Step 2: Add outputs
            psbt.addOutput({
                address: recipient,
                value: sendAmount,
            });

            if (change > 0) {
                psbt.addOutput({
                    address: fromAddress,
                    value: change,
                });
            }

            // ✅ Step 3: Sign and finalize
            psbt.signAllInputs(keyPair);
            psbt.finalizeAllInputs();

            const rawTx = psbt.extractTransaction().toHex();

            // ✅ Step 4: Broadcast
            const { data: txid } = await axios.post(
                'https://mempool.space/testnet/api/tx',
                rawTx,
                { headers: { 'Content-Type': 'text/plain' } }
            );

            setTxId(txid);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h3>Send Bitcoin on Testnet</h3>
            <input
                type="text"
                placeholder="Recipient testnet address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            />
            <button onClick={sendBitcoin} disabled={loading || !recipient}>
                {loading ? 'Sending...' : 'Send 1000 sats'}
            </button>

            {txId && (
                <p>
                    ✅ TxID: <a href={`https://mempool.space/testnet/tx/${txId}`} target="_blank" rel="noreferrer">{txId}</a>
                </p>
            )}
            {error && <p style={{ color: 'red' }}>❌ {error}</p>}
        </div>
    );
};

export default SendBtcNew;
